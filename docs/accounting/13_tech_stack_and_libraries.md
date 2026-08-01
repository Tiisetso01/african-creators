# Tech Stack & Libraries — Full Decision Document

## How to Read This Document

Every choice below has a reason. The finance industry handles real money — wrong data, wrong calculation, wrong format means real consequences. The tech must be correct, auditable, and reliable. Speed of development matters but it comes second to correctness.

The stack is split into three layers:
- **Core** — shared by both the file-based and API method
- **File-Based Method** — for ingesting Excel exports and email attachments
- **API Method** — for connecting directly to Bloomberg, IRESS, FactSet, StatPro, Apex

---

## Core Infrastructure (Shared by Both Methods)

### Frontend — Next.js 15 + React 19 + TypeScript

**Why Next.js:** Already in the project. App Router gives server components, which means heavy data processing (reading files, calculating returns) stays on the server — never exposed to the browser. API routes handle all backend logic in the same codebase.

**Why TypeScript:** Financial data has strict shape requirements. A NAV price must be a number. A date must be a valid date. A portfolio code must match a known fund. TypeScript enforces this at compile time. Without it, a string slipping through where a number is expected breaks a calculation silently — the worst kind of bug in a finance system.

```
Framework:     Next.js 15 (App Router)
Language:      TypeScript 5
Runtime:       Node.js 22 (LTS)
Package mgr:   pnpm (faster installs, strict dependency resolution)
```

---

### UI — Tailwind CSS 4 + shadcn/ui + Recharts

**shadcn/ui:** Component library built on Radix UI primitives. Already in the project. Gives the dashboard tables, forms, modals, status badges without building from scratch.

**Recharts:** React-based chart library. Used for two things:
1. The dashboard performance charts (portfolio vs benchmark — live)
2. The MDD growth chart (rendered inside the PDF via Puppeteer)

**Why Recharts over Chart.js or D3:** Recharts renders as React components — same code works in the browser dashboard and inside the Puppeteer PDF renderer. No need to learn two charting systems.

```
Styling:       Tailwind CSS 4
Components:    shadcn/ui (Radix UI + class-variance-authority)
Charts:        recharts
Icons:         lucide-react
```

---

### Database — Supabase (PostgreSQL)

**Why Supabase:**
- PostgreSQL underneath — the right database for financial time-series data
- Row-level security — BlueAlpha's data is invisible to any other firm in the system
- Realtime subscriptions — the dashboard updates the moment new data arrives
- Built-in storage — uploaded Excel files and generated PDFs stored in the same platform
- Edge functions — serverless functions that run close to the data

**Key tables and why they are designed this way:**

```sql
-- Stores every daily NAV — never overwrite, only append
-- This is your audit trail. SARS and FSCA can audit 5 years back.
CREATE TABLE daily_nav (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  fund_id     uuid REFERENCES funds(id),
  date        date NOT NULL,
  nav_price   numeric(18, 6) NOT NULL,   -- 6 decimal places — NAV precision
  portfolio_value_zar  numeric(18, 2),
  source      text NOT NULL,             -- 'apex_email' | 'apex_sftp' | 'manual'
  raw_file_id uuid,                      -- link to the original file in storage
  created_at  timestamptz DEFAULT now(),
  UNIQUE(fund_id, date)                  -- one NAV per fund per day
);

-- Stores every flow — never delete, mark as voided if wrong
CREATE TABLE daily_flows (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  fund_id       uuid REFERENCES funds(id),
  date          date NOT NULL,
  flow_type     text CHECK (flow_type IN ('subscription', 'redemption')),
  amount_zar    numeric(18, 2) NOT NULL,
  units         numeric(18, 6),
  unit_class    text,
  portfolio_code text,
  source        text NOT NULL,
  raw_file_id   uuid,
  voided        boolean DEFAULT false,
  created_at    timestamptz DEFAULT now()
);

-- Stores every daily return
CREATE TABLE daily_returns (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  fund_id     uuid REFERENCES funds(id),
  date        date NOT NULL,
  return_pct  numeric(10, 6) NOT NULL,  -- stored as decimal: 0.042 = 4.2%
  source      text NOT NULL,
  raw_file_id uuid,
  created_at  timestamptz DEFAULT now(),
  UNIQUE(fund_id, date)
);

-- Stores benchmark data separately — benchmark is not a fund
CREATE TABLE daily_benchmark (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  benchmark_code  text NOT NULL,         -- 'J200', 'J203', 'ASISA_EQ_GEN'
  date            date NOT NULL,
  return_pct      numeric(10, 6) NOT NULL,
  closing_value   numeric(18, 4),
  source          text NOT NULL,
  created_at      timestamptz DEFAULT now(),
  UNIQUE(benchmark_code, date)
);
```

**Why `numeric` not `float`:** Float point arithmetic is not safe for money. `0.1 + 0.2` in floating point is `0.30000000000000004`. PostgreSQL `numeric` is exact decimal arithmetic. Every financial figure in this system uses `numeric`.

```
Database:      Supabase (PostgreSQL 15)
ORM:           Drizzle ORM (TypeScript-first, SQL-like syntax, no magic)
Migrations:    Drizzle Kit
Storage:       Supabase Storage (Excel uploads, generated PDFs)
Realtime:      Supabase Realtime (dashboard live updates)
```

**Why Drizzle ORM over Prisma:** Drizzle generates raw SQL that is visible and auditable. Prisma abstracts the SQL — in a financial system you need to know exactly what query is running. Drizzle also has better TypeScript inference and is significantly faster.

---

### Data Validation — Zod

**This is not optional in a financial system.**

Every piece of data entering the system — from a file, from an API, from a form — is validated against a strict schema before being stored. If the data does not match the schema, it is rejected and flagged for review. Nothing broken enters the database silently.

```typescript
// Example: validating a parsed row from an Apex Excel file
const ApexFlowRowSchema = z.object({
  date: z.string().transform(val => parseISO(val)),  // handles date format variations
  portfolio_code: z.string().min(1).max(20),
  transaction_type: z.enum(['Subscription', 'Redemption']),
  amount: z.string().transform(val => new Decimal(val.replace(/,/g, ''))),
  units: z.string().transform(val => new Decimal(val.replace(/,/g, ''))),
  unit_class: z.string(),
})

// If any row fails validation — the entire file is rejected, not partially stored
```

**Why Zod:** TypeScript types only exist at compile time. Zod validates at runtime — when the actual file data arrives. It also transforms data (string to date, string to decimal) in the same step as validation.

```
Validation:    zod
Decimals:      decimal.js (arbitrary precision arithmetic for all financial calculations)
Dates:         date-fns (parsing, formatting, business day calculations)
```

**Why `decimal.js` for all calculations:** Standard JavaScript numbers are IEEE 754 floating point. `0.1 + 0.2 !== 0.3` in JavaScript. Every return calculation, every NAV calculation, every percentage in this system uses `decimal.js` for exact results.

---

### Job Scheduling — BullMQ + Redis

Daily triggers must be reliable. If the 7am job that reads the Apex email fails, it must retry. If it fails three times, it must alert the operations team. A simple cron job cannot do this.

**BullMQ** is a Node.js job queue backed by Redis. Every job is persisted — if the server restarts, jobs survive and continue. Every job has a retry policy. Every job has a log.

```typescript
// Daily flows job — fires at 7:00 AM every weekday
import { Queue, Worker } from 'bullmq'

const flowsQueue = new Queue('daily-flows', { connection: redis })

// Scheduled in the queue
await flowsQueue.add('process-apex-email', {}, {
  repeat: { pattern: '0 7 * * 1-5' },  // 7am Monday to Friday
  attempts: 3,
  backoff: { type: 'exponential', delay: 5000 }
})

// Worker that processes the job
const worker = new Worker('daily-flows', async (job) => {
  await processApexEmailAttachment()
  await generateFlowsReport()
  await postToTeams()
}, { connection: redis })
```

```
Job queue:     BullMQ
Message store: Redis (Upstash Redis — serverless, no server to manage)
Monitoring:    Bull Board (visual dashboard for job status and history)
```

**Why Upstash Redis over self-hosted:** Upstash is serverless Redis. No Redis server to manage or pay for when idle. Pricing is per request. For a job queue that fires daily, this is significantly cheaper than a dedicated Redis instance.

---

### Authentication — Supabase Auth + NextAuth.js

**Supabase Auth:** Handles the client portal (business owners logging in with OTP/magic link). Integrated directly with the database row-level security — when a client logs in, they can only query their own data.

**NextAuth.js v5 (Auth.js):** Handles the operations dashboard (the firm's own staff). Supports Microsoft OAuth — since the company already uses Microsoft 365, staff log in with their work Microsoft account. No separate password to manage.

```
Operations dashboard:  NextAuth.js v5 + Microsoft OAuth (Azure AD)
Client portal:         Supabase Auth (magic link / OTP)
Session storage:       Supabase database sessions
```

---

### Teams Integration — Microsoft Graph API

```typescript
// Posting a report to a Teams channel
import { Client } from '@microsoft/microsoft-graph-client'
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials'
import { ClientSecretCredential } from '@azure/identity'

const credential = new ClientSecretCredential(tenantId, clientId, clientSecret)
const authProvider = new TokenCredentialAuthenticationProvider(credential, {
  scopes: ['https://graph.microsoft.com/.default']
})
const client = Client.initWithMiddleware({ authProvider })

await client.api(`/teams/${teamId}/channels/${channelId}/messages`).post({
  body: {
    contentType: 'html',
    content: `<b>Daily Flows Report — ${formatDate(today)}</b><br>${reportHtml}`
  },
  attachments: [{ /* PDF attachment */ }]
})
```

```
SDK:           @microsoft/microsoft-graph-client
Auth:          @azure/identity (ClientSecretCredential)
MSAL:          @azure/msal-node (token management)
```

---

### PDF Generation — Puppeteer

The MDD has a specific visual layout — charts, tables, colour-coded sections, the BlueAlpha logo. Building this in a low-level PDF library would take weeks and look wrong. Puppeteer renders an HTML page (a Next.js React component) to PDF — any layout achievable in a browser is achievable in the PDF.

```typescript
import puppeteer from 'puppeteer'

async function generateMDD(fundId: string, month: string): Promise<Buffer> {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  // Load the MDD React page with fund data pre-rendered
  await page.goto(`http://localhost:3000/mdd-preview/${fundId}/${month}`, {
    waitUntil: 'networkidle0'  // wait for charts to finish rendering
  })

  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,   // include background colours
    margin: { top: '15mm', bottom: '15mm', left: '12mm', right: '12mm' }
  })

  await browser.close()
  return pdf
}
```

```
PDF engine:    puppeteer (headless Chromium)
Deployment:    @sparticuz/chromium (Chromium binary for serverless/Vercel)
Charts in PDF: recharts (same components as dashboard — renders in Puppeteer)
```

**Why not react-pdf or PDFKit:** They have their own layout engines that do not match CSS. Getting the MDD layout pixel-perfect in those libraries would take much longer than building it as a React page and rendering it with Puppeteer.

---

### Email Outbound — Resend

Already in the project. Used for:
- Sending generated MDDs to distribution lists
- Sending notifications when data fails validation
- Sending alerts when a job fails

---

## File-Based Method — Libraries and How They Work

### Excel File Parsing — SheetJS (xlsx)

The most important library for the file-based approach. Reads `.xlsx`, `.xls`, and `.csv` files in Node.js — no Excel installation required.

```typescript
import * as XLSX from 'xlsx'

function parseApexFlowFile(buffer: Buffer) {
  const workbook = XLSX.read(buffer, { type: 'buffer', cellDates: true })
  const sheet = workbook.Sheets[workbook.SheetNames[0]]

  // Convert to JSON — each row becomes an object
  const rows = XLSX.utils.sheet_to_json(sheet, {
    raw: false,        // convert numbers to strings (we handle precision ourselves)
    dateNF: 'yyyy-mm-dd',
    defval: null
  })

  // Validate every row with Zod before touching the database
  return rows.map(row => ApexFlowRowSchema.parse(row))
}
```

**Why SheetJS:** It is the standard. Handles every Excel quirk — merged cells, multiple sheets, different date serial systems between Windows and Mac Excel, hidden rows, special number formats. Everything Apex and Bloomberg export will be readable.

```
Excel parsing:   xlsx (SheetJS)
CSV parsing:     csv-parse (streaming parser for large files)
```

**`csv-parse` for large files:** If Apex ever sends large CSV files instead of Excel, `csv-parse` handles them as a stream — processes row by row without loading the entire file into memory.

---

### Email Parsing — Microsoft Graph API (Mailbox Reading)

Since the company already uses Microsoft 365, the best approach is to connect directly to the operations mailbox via Microsoft Graph API and read incoming emails. No third-party email parsing service needed.

**How it works:**

```typescript
// Poll the mailbox every 15 minutes from 6:30am for new Apex emails
async function checkForApexEmail(date: string) {
  const messages = await graphClient
    .api('/users/operations@bluealpha.co.za/messages')
    .filter(`receivedDateTime ge ${startOfDay} and from/emailAddress/address eq 'data@apexgroup.com'`)
    .select('id,subject,receivedDateTime,hasAttachments')
    .get()

  for (const message of messages.value) {
    if (!message.hasAttachments) continue

    // Download the attachment
    const attachments = await graphClient
      .api(`/users/operations@bluealpha.co.za/messages/${message.id}/attachments`)
      .get()

    for (const attachment of attachments.value) {
      if (attachment.name.endsWith('.xlsx') || attachment.name.endsWith('.xls')) {
        const buffer = Buffer.from(attachment.contentBytes, 'base64')
        await processApexFlowFile(buffer, message.id)
      }
    }
  }
}
```

**Why Microsoft Graph over Postmark/Mailgun:** The company does not need to change any email routing. No email forwarding rules, no new email addresses. The system reads the existing mailbox directly. One OAuth 2.0 app registration covers this and the Teams integration.

```
Email reading:   Microsoft Graph API (@microsoft/microsoft-graph-client)
Auth:            @azure/identity
Fallback:        Postmark Inbound (if Microsoft Graph access is denied)
```

---

### File Upload Interface — Supabase Storage + React Dropzone

For StatPro, Bloomberg, and FactSet files — she uploads them through the dashboard.

```typescript
import { useDropzone } from 'react-dropzone'

// Drag and drop zone in the dashboard
function FileUploadZone({ onUpload, label }: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/csv': ['.csv']
    },
    maxFiles: 1,
    onDrop: async (files) => {
      const file = files[0]
      // Upload to Supabase Storage (original file preserved for audit)
      const { data } = await supabase.storage
        .from('raw-uploads')
        .upload(`${today}/${label}/${file.name}`, file)

      // Trigger parsing job
      await fetch('/api/parse-upload', {
        method: 'POST',
        body: JSON.stringify({ fileId: data.path, source: label })
      })
    }
  })
}
```

**Why store the original file:** Every uploaded file is kept in Supabase Storage linked to the data it produced. If a number in the database is ever questioned, you can pull the original file and verify. Full audit trail.

```
Upload UI:       react-dropzone
File storage:    Supabase Storage (originals kept permanently)
Progress:        Supabase Storage upload progress events
```

---

### File Parsing — Per Source

Each data source has its own parser because each has its own column layout. The parser is a pure function — takes a buffer, returns validated data. Easy to test, easy to update when the source changes their format.

```
parsers/
  apex-flows.parser.ts        → reads Apex Excel, extracts subscriptions/redemptions
  statpro-returns.parser.ts   → reads StatPro export, extracts daily return per portfolio
  bloomberg-benchmark.parser.ts → reads Bloomberg export, extracts index daily returns
  factset-analytics.parser.ts → reads FactSet export, extracts additional analytics
```

Each parser:
1. Reads the file with SheetJS
2. Detects the column layout (handles minor format changes)
3. Validates every row with Zod
4. Returns typed, validated data — or throws with a clear error message

---

## API Method — Libraries and How They Work

### Bloomberg — BLPAPI (Node.js)

Bloomberg's official Node.js SDK. Connects to the Bloomberg infrastructure via a persistent socket connection. Requires the Bloomberg API service to be running on a machine with a terminal or B-PIPE connection.

```typescript
import * as blpapi from 'blpapi'

const session = new blpapi.Session({
  serverHost: '127.0.0.1',  // Bloomberg API service on the same machine
  serverPort: 8194
})

session.start()

session.on('SessionStarted', () => {
  session.openService('//blp/refdata')
})

session.on('ServiceOpened', () => {
  // Request daily return for JSE Top 40 and All Share
  const request = session.getService('//blp/refdata').createRequest('HistoricalDataRequest')
  request.push('securities', 'J200 Index')   // JSE Top 40
  request.push('securities', 'J203 Index')   // JSE All Share
  request.push('fields', 'PX_LAST')          // closing price
  request.push('fields', 'CHG_PCT_1D')       // daily % change
  request.set('startDate', '20260412')
  request.set('endDate', '20260412')
  request.set('periodicitySelection', 'DAILY')

  session.sendRequest(request)
})

session.on('data', (data) => {
  // Process and store benchmark data
  const benchmarkData = BloombergResponseSchema.parse(data)
  await storeBenchmarkData(benchmarkData)
})
```

**Infrastructure note:** BLPAPI requires a machine running the Bloomberg API service. This is either a Bloomberg terminal (physical machine) or a B-PIPE server. The API call goes to that machine — not to Bloomberg's cloud directly. The company's Bloomberg machine must be accessible from the application server.

**Deployment consideration:** The Bloomberg API worker runs on Railway or a dedicated VM, not Vercel. Vercel is serverless — BLPAPI needs a persistent socket connection.

```
Bloomberg SDK:   blpapi (official npm package)
Connection:      Persistent socket to Bloomberg API service
Data requested:  PX_LAST, CHG_PCT_1D for benchmark indices
Fallback:        File-based Bloomberg export parsing
```

---

### IRESS — REST API with OAuth 2.0

IRESS does not have a public npm package. It is a standard REST API with OAuth 2.0 authentication. Use `axios` with an interceptor that automatically refreshes the token.

```typescript
import axios from 'axios'

// Token management — auto-refresh before expiry
const iressClient = axios.create({
  baseURL: 'https://api.iress.com/v1'
})

iressClient.interceptors.request.use(async (config) => {
  const token = await getIressToken()  // cached, refreshed when near expiry
  config.headers.Authorization = `Bearer ${token}`
  return config
})

// Get fund performance for a specific date
async function getFundReturn(fundCode: string, date: string) {
  const response = await iressClient.get(`/funds/${fundCode}/performance`, {
    params: { date, fields: 'daily_return,nav' }
  })
  return IressReturnSchema.parse(response.data)
}

// Get ASISA category average — for MDD benchmark comparison
async function getASISACategoryReturn(category: string, date: string) {
  const response = await iressClient.get(`/benchmarks/${category}/returns`, {
    params: { date }
  })
  return IressReturnSchema.parse(response.data)
}
```

```
HTTP client:     axios
Auth:            OAuth 2.0 client credentials (client_id + client_secret from IRESS)
Token cache:     Redis (Upstash) — cached for token lifetime, shared across workers
Rate limiting:   Bottleneck (npm) — respects IRESS API rate limits automatically
```

**`Bottleneck` for rate limiting:** IRESS, like all financial APIs, has rate limits. `Bottleneck` wraps every API call and ensures they are spaced correctly — no manual sleep(), no 429 errors.

---

### FactSet — Official SDK

FactSet has official TypeScript/JavaScript SDKs on npm. This is the cleanest API integration.

```typescript
import { PricesApi, ReturnsApi } from '@factset/sdk-factsetprices'
import { ApiClient } from '@factset/sdk-utils'

// Configure with OAuth 2.0
const client = ApiClient.instance
client.factsetOauth2.accessToken = await getFactSetToken()

const returnsApi = new ReturnsApi()

// Get benchmark returns
const benchmarkReturns = await returnsApi.getSecurityReturns({
  ids: ['JALSH:S', 'J200:S'],  // JSE All Share, JSE Top 40
  startDate: '2026-04-12',
  endDate: '2026-04-12',
  frequency: 'D',              // Daily
  returnType: 'GROSS'
})

const validated = FactSetReturnSchema.parse(benchmarkReturns)
```

**Available FactSet SDK packages:**
```
@factset/sdk-factsetprices        — prices and returns
@factset/sdk-fundamentals         — fundamental data
@factset/sdk-portfolioreportingbatcher  — batch portfolio reports
@factset/sdk-utils                — shared auth utilities
```

```
FactSet SDK:     @factset/sdk-factsetprices, @factset/sdk-utils
Auth:            OAuth 2.0 (FactSet confidential client)
Rate limiting:   Bottleneck
```

---

### StatPro / Confluence — REST API

Same pattern as IRESS — no npm package, standard REST + OAuth 2.0.

```typescript
const confluenceClient = axios.create({
  baseURL: 'https://api.confluence.com/v2'
})

async function getPortfolioReturn(portfolioId: string, date: string) {
  const response = await confluenceClient.get(`/portfolios/${portfolioId}/returns`, {
    params: { date, frequency: 'daily' }
  })
  return StatProReturnSchema.parse(response.data)
}
```

```
HTTP client:     axios
Auth:            OAuth 2.0 (credentials from Confluence account manager)
Rate limiting:   Bottleneck
```

---

### Apex — SFTP

Apex deposits files on a secure SFTP server daily. The system polls the SFTP server every morning, downloads new files, processes them.

```typescript
import SftpClient from 'ssh2-sftp-client'

const sftp = new SftpClient()

async function downloadApexFiles(date: string) {
  await sftp.connect({
    host: process.env.APEX_SFTP_HOST,
    port: 22,
    username: process.env.APEX_SFTP_USER,
    privateKey: process.env.APEX_SFTP_PRIVATE_KEY  // SSH key auth — more secure than password
  })

  // List files in today's directory
  const files = await sftp.list(`/outbound/bluealpha/${date}/`)

  for (const file of files) {
    if (file.name.endsWith('.xlsx')) {
      const buffer = await sftp.get(`/outbound/bluealpha/${date}/${file.name}`)
      await sftp.end()

      // Store original in Supabase Storage
      await supabase.storage.from('raw-uploads').upload(`apex/${date}/${file.name}`, buffer)

      // Parse and validate
      await processApexFile(buffer)
    }
  }
}
```

```
SFTP client:     ssh2-sftp-client
Auth:            SSH private key (stored in environment variable / secret manager)
Scheduling:      BullMQ job at 6:30am daily (before the 7am report deadline)
Retry:           3 attempts with exponential backoff if SFTP connection fails
```

---

## Financial Calculations — How They Work

All MDD performance metrics are calculated from the stored daily/monthly returns. These calculations run once at month-end and are stored — they are not recalculated on every page load.

```typescript
import Decimal from 'decimal.js'

// Compound monthly returns to get cumulative return over any period
function compoundReturns(monthlyReturns: number[]): Decimal {
  return monthlyReturns.reduce(
    (acc, r) => acc.mul(new Decimal(1).plus(new Decimal(r))),
    new Decimal(1)
  ).minus(1)
}

// Annualise a cumulative return over a number of years
function annualise(cumulativeReturn: Decimal, years: number): Decimal {
  return cumulativeReturn.plus(1)
    .pow(new Decimal(1).dividedBy(years))
    .minus(1)
}

// Standard deviation of monthly returns (volatility)
function standardDeviation(returns: number[]): Decimal {
  const decReturns = returns.map(r => new Decimal(r))
  const mean = decReturns.reduce((a, b) => a.plus(b)).dividedBy(returns.length)
  const squaredDiffs = decReturns.map(r => r.minus(mean).pow(2))
  const variance = squaredDiffs.reduce((a, b) => a.plus(b)).dividedBy(returns.length - 1)
  return variance.sqrt().mul(new Decimal(Math.sqrt(12)))  // annualised
}

// Maximum drawdown — largest peak-to-trough decline
function maxDrawdown(navPrices: number[]): Decimal {
  let peak = new Decimal(navPrices[0])
  let maxDD = new Decimal(0)

  for (const price of navPrices) {
    const decPrice = new Decimal(price)
    if (decPrice.gt(peak)) peak = decPrice
    const drawdown = peak.minus(decPrice).dividedBy(peak)
    if (drawdown.gt(maxDD)) maxDD = drawdown
  }

  return maxDD.negated()  // returned as negative number
}
```

---

## Full Technology Summary

### Core (Both Methods)
| Category | Choice | Package |
|----------|--------|---------|
| Framework | Next.js 15 | `next` |
| Language | TypeScript 5 | `typescript` |
| UI Components | shadcn/ui + Radix | `@radix-ui/*` |
| Styling | Tailwind CSS 4 | `tailwindcss` |
| Charts | Recharts | `recharts` |
| Database | Supabase PostgreSQL | `@supabase/supabase-js` |
| ORM | Drizzle | `drizzle-orm`, `drizzle-kit` |
| Auth (staff) | NextAuth.js v5 + Microsoft | `next-auth`, `@azure/identity` |
| Auth (clients) | Supabase Auth | Built-in |
| Validation | Zod | `zod` |
| Decimals | decimal.js | `decimal.js` |
| Dates | date-fns | `date-fns` |
| Job Queue | BullMQ | `bullmq` |
| Redis | Upstash Redis | `@upstash/redis` |
| Job Monitoring | Bull Board | `@bull-board/express` |
| PDF Engine | Puppeteer | `puppeteer`, `@sparticuz/chromium` |
| Teams | Microsoft Graph | `@microsoft/microsoft-graph-client` |
| Email Out | Resend | `resend` |
| HTTP Client | Axios | `axios` |
| Rate Limiting | Bottleneck | `bottleneck` |

### File-Based Method Only
| Category | Choice | Package |
|----------|--------|---------|
| Excel Parsing | SheetJS | `xlsx` |
| CSV Parsing | csv-parse | `csv-parse` |
| Email Reading | Microsoft Graph | `@microsoft/microsoft-graph-client` |
| File Upload UI | react-dropzone | `react-dropzone` |
| File Storage | Supabase Storage | Built-in |

### API Method Only
| Category | Choice | Package |
|----------|--------|---------|
| Bloomberg | BLPAPI Node.js | `blpapi` |
| IRESS | REST via Axios | `axios` |
| FactSet | Official SDK | `@factset/sdk-factsetprices` |
| StatPro | REST via Axios | `axios` |
| Apex SFTP | ssh2-sftp-client | `ssh2-sftp-client` |

---

## Deployment Architecture

```
Vercel
  └── Next.js app (dashboard, client portal, API routes)
  └── Puppeteer PDF generation (via Vercel Functions with @sparticuz/chromium)

Railway (or Render)
  └── BullMQ workers (job queue processors — persistent, not serverless)
  └── Bloomberg BLPAPI connector (needs persistent socket — cannot run on Vercel)
  └── SFTP polling worker

Upstash
  └── Redis (BullMQ backing store, token cache)

Supabase
  └── PostgreSQL database
  └── Storage (uploaded files, generated PDFs)
  └── Auth
  └── Realtime

External
  └── Bloomberg API service (on company's infrastructure)
  └── IRESS API (cloud, OAuth 2.0)
  └── FactSet API (cloud, OAuth 2.0)
  └── StatPro/Confluence API (cloud, OAuth 2.0)
  └── Apex SFTP server (on Apex's infrastructure)
  └── Microsoft 365 (Graph API for Teams and mailbox)
```

**Why Bloomberg worker cannot be on Vercel:** Vercel functions are serverless — they terminate after execution. Bloomberg BLPAPI needs a persistent TCP socket connection that stays open. The Bloomberg worker must run on a persistent server (Railway, Render, or a VM).

**Why everything else can be on Vercel:** API calls (IRESS, FactSet, StatPro) are stateless HTTP requests. They work fine in serverless functions. Only Bloomberg is special.
