# Technical Architecture — Fund Operations Automation

## How the Daily Work Feeds the MDD

This is the most important thing to understand before building anything.

The MDD is not a separate report. It is the **accumulated output of everything done daily throughout the month.** You cannot build the MDD automation without also building the daily data pipeline. They are the same system.

```
DAILY                              MONTHLY
─────                              ───────
Daily NAV price          →    Month-end NAV (274.77 cpu)
Daily returns            →    Monthly return (Feb: 4.2%)
Daily cash flows         →    Portfolio value (R36 Million)
Daily benchmark data     →    Monthly benchmark return (ASISA avg)
Daily holdings snapshot  →    Month-end top holdings + sector allocation
                               ↓
                         All of this feeds the MDD
                         The MDD is a summary of the month
```

Every number in the MDD came from the daily work. The daily pipeline IS the MDD pipeline. Build one system.

---

## The Full Data Flow

```
DAY 1 TO DAY 28/31 (DAILY)
───────────────────────────

Apex Group              →  Cash flows per portfolio (deposits, redemptions)
                           NAV price per portfolio
                           Holdings snapshot per portfolio

StatPro / Confluence    →  Portfolio performance return for the day
                           Attribution data (what drove performance)

Bloomberg               →  Benchmark index performance (JSE Top 40, All Share)
                           Individual stock prices (for holdings valuation)

FactSet                 →  Additional benchmark and fund analytics data

                           ↓ (stored in database daily)

END OF MONTH
────────────

Data store              →  Last NAV of the month = MDD NAV price
                       →  (Month-end NAV / Month-start NAV) - 1 = Monthly return %
                       →  Sum of all daily flows = Monthly portfolio value change
                       →  Last day's holdings = MDD top holdings + sector allocation
                       →  Benchmark daily returns compounded = Monthly benchmark return

                           ↓

MDD Generator           →  Pulls all monthly data
                       →  Calculates performance tables (1yr, 3yr, 5yr, 10yr, inception)
                       →  Calculates risk stats (std dev, max drawdown)
                       →  Generates growth chart
                       →  Produces formatted PDF
```

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         DATA SOURCES                                 │
│                                                                       │
│  Apex Group    StatPro    Bloomberg    FactSet    Microsoft Teams     │
└──────┬─────────────┬──────────────┬───────────┬──────────────┬───────┘
       │             │              │           │              │
       └─────────────┴──────────────┴───────────┘              │
                              │                                │
                     ┌────────▼────────┐                       │
                     │ INGESTION LAYER │                       │
                     │                 │                       │
                     │ API connectors  │                       │
                     │ File parsers    │                       │
                     │ Email parsers   │                       │
                     └────────┬────────┘                       │
                              │                                │
                     ┌────────▼────────┐                       │
                     │   DATA STORE    │                       │
                     │   (Supabase /   │                       │
                     │   PostgreSQL)   │                       │
                     │                 │                       │
                     │ daily_nav       │                       │
                     │ daily_flows     │                       │
                     │ daily_returns   │                       │
                     │ daily_benchmark │                       │
                     │ daily_holdings  │                       │
                     └────────┬────────┘                       │
                              │                                │
              ┌───────────────┼───────────────┐               │
              │               │               │               │
     ┌────────▼───┐  ┌────────▼───┐  ┌────────▼───┐          │
     │   DAILY    │  │  MONTHLY   │  │    MDD     │          │
     │  REPORTS   │  │  REPORTS   │  │ GENERATOR  │          │
     │            │  │            │  │            │          │
     │ Cash flows │  │ Monthly    │  │ Performance│          │
     │ report     │  │ performance│  │ tables     │          │
     │ Performance│  │ summary    │  │ Risk stats │          │
     │ vs bench   │  │            │  │ Chart      │          │
     └─────┬──────┘  └────────────┘  └────┬───────┘          │
           │                              │                   │
           └──────────────────────────────▼───────────────────┘
                                    [Teams Post /
                                     PDF Output /
                                     Email Send]
```

---

## Approach A — API Integration (Enterprise Grade)

This is the right long-term solution. Every system she uses has an API. Here is what each one offers and what is needed to use it.

---

### 1. Apex Group

**What data is needed from Apex:**
- Daily NAV price per portfolio
- Daily cash flows — deposits (subscriptions) and withdrawals (redemptions) per portfolio
- Month-end holdings — top positions, sector allocation, effective exposure

**API reality:**
Apex does not publish a standard public API. Their data delivery model depends on the client agreement. Three options:

| Method | How it works | What is needed |
|--------|-------------|----------------|
| **SFTP** | Apex deposits files on a secure FTP server daily | Request SFTP credentials from Apex account manager |
| **Client Portal API** | Apex's portal has undocumented or partner-level API access | Negotiate with Apex as a technology partner |
| **Email + attachment** | Current method — Apex sends Excel via email | Parse incoming email automatically (see Approach B) |

**Recommended path:** Request SFTP access from the client's Apex account manager. This is a standard request for institutional clients. Files land on SFTP daily — the system picks them up, parses them, stores the data.

**File format from Apex:** Typically CSV or Excel with standardised column layouts. Once you have one sample file, the parser is built once and runs forever.

---

### 2. Bloomberg

**What data is needed from Bloomberg:**
- Daily JSE benchmark performance — FTSE/JSE Top 40 (J200), FTSE/JSE All Share (J203), SWIX
- Individual stock closing prices (for holdings valuation cross-check)
- ASISA category benchmark daily returns

**API options:**

| Option | What it is | Access |
|--------|-----------|--------|
| **Bloomberg B-PIPE** | Enterprise real-time data feed | Very expensive — for banks and large institutions |
| **Bloomberg Data License** | Bulk historical and daily data via file delivery | Expensive but accessible for asset managers |
| **Bloomberg Open API (BLPAPI)** | Programmatic access via Bloomberg terminal | If the company has Bloomberg terminals, this is already paid for |
| **Bloomberg Excel Add-in (BDH/BDP)** | Bloomberg formulas in Excel | Already in use — the Excel files she exports use these formulas |

**Recommended path:** The company already pays for Bloomberg terminals. Request API access (BLPAPI) from their Bloomberg account representative. This is a standard request. The terminal subscription already includes server-side API access for automation — most companies just do not use it.

**BLPAPI connects via:**
- Python: `blpapi` library (official Bloomberg Python SDK)
- Node.js: `blpapi` npm package
- REST wrapper libraries exist as well

**What you request from Bloomberg:**
```
Field: PX_LAST (last price)
Field: CHG_PCT_1D (daily % change)
Securities: J200 Index, J203 Index (JSE benchmarks)
```

One API call per day pulls all benchmark data needed.

---

### 3. IRESS

**What data is needed from IRESS:**
- Daily portfolio performance return for each fund
- ASISA category average returns (for benchmark comparison in MDD)
- Historical returns for MDD performance table

**API reality:**
IRESS has a REST API available to institutional clients. They call it the IRESS API or Market Data API depending on which product the client uses.

| Product | API type | Data available |
|---------|----------|----------------|
| **IRESS Market Data** | REST API | Fund prices, NAV, benchmark data |
| **IRESS XPLAN** | REST API | Wealth management and portfolio data |
| **IRESS ViewPoint** | Web + data export | Performance reporting |

**Access:** The company already has an IRESS subscription. Contact their IRESS account manager and request API documentation and credentials for programmatic access. IRESS has a developer programme and will provide API keys tied to the existing subscription.

**Authentication:** OAuth 2.0 — standard modern API authentication.

**Endpoint example (structure):**
```
GET /funds/{fund_code}/performance?date={YYYY-MM-DD}
GET /benchmarks/{benchmark_code}/returns?from={date}&to={date}
```

---

### 4. StatPro / Confluence

**What data is needed from StatPro:**
- Daily portfolio return per fund
- Performance attribution (what drove the return that day)

**API reality:**
StatPro was acquired by Confluence Technologies in 2019. Confluence has a REST API for portfolio analytics data.

| API | Documentation | Access |
|-----|--------------|--------|
| Confluence Analytics API | Available via Confluence developer portal | Requires existing Confluence/StatPro subscription |

**Recommended path:** Same as IRESS — contact the account manager, request API credentials, use existing subscription. This is a data extraction call, not a new capability.

---

### 5. FactSet

**What data is needed from FactSet:**
- Fund performance data
- Additional benchmark analytics

**API reality:**
FactSet has the most developer-friendly API of all these systems. Full documentation is available at `developer.factset.com`.

| API category | What it provides |
|-------------|-----------------|
| Prices & Reference | Security prices, returns |
| Analytics | Portfolio performance, risk metrics |
| Benchmarks | Index data and returns |

**Authentication:** OAuth 2.0 with API key.

**Access:** FactSet provides API keys directly to subscribers. If the company has a FactSet subscription, they can request API credentials through their FactSet account portal — no special negotiation needed.

**FactSet is the easiest to connect to.** They actively encourage API usage and have clear documentation.

---

### 6. Microsoft Teams

**What is needed:**
- Post the daily flows report to a Teams channel
- Post the daily performance report to a Teams channel
- Send the monthly MDD as a file attachment in Teams

**API:**
Microsoft Graph API — well documented, free to use, standard OAuth 2.0.

```
POST https://graph.microsoft.com/v1.0/teams/{team-id}/channels/{channel-id}/messages
```

**Access:** Register an application in Azure Active Directory (free). The company's IT administrator grants access to post to specific Teams channels. This is a standard request in any Microsoft 365 environment.

---

## Approach B — File-Based Integration (Parallel / Fallback)

For any system where API access takes time to negotiate, the file-based approach works in parallel. This is not a compromise — it is a valid enterprise pattern used widely in finance because some systems simply do not have APIs or have locked-down ones.

**Key insight:** She already downloads these files every day. The tool intercepts the files instead of her doing it manually. Same files, no change to the upstream systems, zero negotiation needed.

---

### 1. Apex — Email Parsing

**How it works now:** Apex sends an Excel file via email every morning.

**How the tool handles it:**

```
Apex sends email → Tool's mailbox receives it (or forwards to it)
                → Email parser reads the attachment automatically
                → Extracts: date, portfolio code, flow type, amount, unit class
                → Stores in database
                → No human involvement
```

**Implementation:**
- Set up a dedicated email address (e.g. `data@[company].com`)
- Apex sends to this address (or emails are auto-forwarded)
- Use an email parsing service or build a webhook with a mail provider:
  - **Postmark Inbound** — parses incoming emails, sends JSON to your API
  - **SendGrid Inbound Parse** — same capability
  - **Mailgun Routes** — same
- The parser reads the Excel attachment using `xlsx` (Node.js) or `openpyxl` (Python)
- Extracts the relevant rows based on column structure

**What the parser does:**
```
1. Receive email webhook notification
2. Download Excel attachment
3. Read columns: Date | Portfolio Code | Transaction Type | Amount | Units | Unit Class
4. Filter rows where Date = today
5. Filter rows where Transaction Type = "Redemption" or "Subscription"
6. Insert rows into daily_flows table in database
7. Trigger daily flows report generation
```

**Effort to build:** 1–2 days once you have a sample file.

---

### 2. StatPro — File Upload or Export Watcher

**How it works now:** She logs into StatPro, exports a file, downloads it, opens it in Excel.

**Two options:**

**Option A — Scheduled export (if StatPro supports it):**
Some StatPro configurations allow scheduled report exports to email or SFTP. If enabled, the file arrives automatically without her logging in.

**Option B — Manual upload (no dependency on StatPro config):**
She exports the file as usual. Instead of opening it in Excel, she drags it into the tool's upload zone. The tool reads it in seconds.

```
Upload zone → Parse columns → Extract return % for each portfolio → Store in database
```

**What the parser reads:**
```
Portfolio Name | Date | Return % | Benchmark Return % | Active Return %
```

**Effort to build:** 1 day once you have a sample file.

---

### 3. Bloomberg — Excel Export Parsing

**How it works now:** She opens Bloomberg, extracts benchmark data, exports to Excel.

**How the tool handles it:**
Bloomberg's Excel add-in generates files using BDH/BDP formulas. She can save these as static values (Paste Special → Values) and upload the file.

Alternatively, Bloomberg allows scheduled data delivery via email or SFTP through their Data License product — same SFTP model as Apex.

**What the parser reads:**
```
Date | Index Name | Closing Price | Daily Return %
```

For JSE benchmarks:
```
J200 Index | 2026-04-12 | 84,320.45 | +0.82%
J203 Index | 2026-04-12 | 76,104.22 | +0.79%
```

**Effort to build:** 1 day once you have a sample export.

---

### 4. FactSet — Export Upload

Same pattern as StatPro. She exports, uploads, tool reads and processes.

**Effort to build:** 1 day once you have a sample export.

---

## Database Design

Every piece of daily data is stored. The MDD and monthly reports are generated from this store.

```sql
-- Core tables

funds
  id, code, name, isin, jse_code, benchmark, launch_date,
  manager, asisa_category, annual_fee, valuation_time

daily_nav
  fund_id, date, nav_price, portfolio_value_zar

daily_flows
  fund_id, date, flow_type (subscription/redemption),
  amount_zar, units, unit_class, source (apex)

daily_returns
  fund_id, date, return_pct, source (statpro/iress)

daily_benchmark
  benchmark_code, date, return_pct, closing_value,
  source (bloomberg/factset/iress)

daily_holdings
  fund_id, date, security_name, weight_pct, sector

monthly_returns
  fund_id, year, month, return_pct
  (derived from daily_returns — computed at month-end)

income_distributions
  fund_id, declaration_date, payment_date, cpu_amount

ter_records
  fund_id, year, ter_pct, transaction_cost_pct, total_charge_pct
```

**Row-level security:** Each firm (BlueAlpha) sees only their own fund data. Built into Supabase by default.

---

## What Gets Built and In What Order

### Phase 1 — File-Based Daily Reports (Start Here)

**Goal:** Eliminate her morning copy-paste work. No API negotiations needed.

| Build | Input | Output | Who benefits |
|-------|-------|--------|-------------|
| Email parser for Apex flows | Apex email + Excel attachment | Daily flows report auto-generated | Her — every morning |
| File upload for StatPro | StatPro export file | Performance data stored | Her — every morning |
| File upload for Bloomberg | Bloomberg export file | Benchmark data stored | Her — every morning |
| File upload for FactSet | FactSet export file | Additional data stored | Her — every morning |
| Daily flows dashboard | Database | Formatted flows report | Portfolio managers |
| Daily performance dashboard | Database | Portfolio vs benchmark report | Portfolio managers |
| Teams integration | Dashboard output | Auto-posted to Teams channel | Portfolio managers |

**Her morning changes from:**
> Open Outlook → search → download → filter → copy → paste (×11) → open StatPro → export → paste → open Bloomberg → extract → paste → open FactSet → export → paste → format → post to Teams

**To:**
> Upload 3 files (StatPro, Bloomberg, FactSet) → review dashboard → click Post to Teams
> *(Apex flows arrive automatically — she does not touch that at all)*

**Time saved: 2.5–3 hours every morning.**

---

### Phase 2 — Monthly MDD Generator

**Goal:** Produce the MDD automatically from the data already stored in Phase 1.

By the time Phase 2 is built, the database already has all daily data. The MDD generator simply aggregates it.

| What it calculates | Input data | Formula |
|-------------------|-----------|---------|
| Monthly return | daily_returns for the month | (End NAV / Start NAV) - 1 |
| Cumulative 1yr | monthly_returns last 12 months | Compound all monthly returns |
| Cumulative 3yr, 5yr, 10yr, inception | monthly_returns history | Same compounding logic |
| Annualised returns | Cumulative returns | (1 + cumulative)^(1/years) - 1 |
| Standard deviation | monthly_returns history | Statistical std dev of monthly returns |
| Maximum drawdown | daily_nav history | Largest peak-to-trough decline |
| Growth of R1000 chart | monthly_returns from inception | Compound from R1000 base |
| ASISA category average | daily_benchmark | Same calculations on benchmark returns |

**MDD generation process:**
1. Operations person clicks "Generate MDD — February 2026" for a fund
2. System pulls all stored data for that fund for that month
3. Runs all calculations
4. Populates the PDF template with all values
5. Operations person reviews — all numbers pre-filled
6. Clicks Approve → PDF is finalised and ready to publish

**For 11 funds:** 11 clicks instead of 11 × 60–75 minutes.

---

### Phase 3 — API Connections (Replace File Uploads)

Once Phases 1 and 2 are running and the contract is signed, negotiate API access for each system. Replace file uploads one by one.

| System | API priority | Why |
|--------|-------------|-----|
| FactSet | First | Best documentation, easiest to connect |
| IRESS | Second | Already a subscriber, standard request |
| Bloomberg BLPAPI | Third | Already paying for terminals, request API access |
| Apex SFTP | Fourth | Standard data delivery method, request from account manager |
| StatPro/Confluence | Fifth | Requires vendor engagement |

Each API connection replaces one file upload. Her morning becomes zero manual work.

---

## Tech Stack

| Component | Technology | Why |
|-----------|-----------|-----|
| Frontend | Next.js + Tailwind + shadcn/ui | Consistent with existing project |
| Backend API | Next.js API routes or Node.js/Express | JavaScript throughout |
| Database | Supabase (PostgreSQL) | Row-level security, realtime, storage |
| Email parsing | Postmark Inbound or Mailgun | Webhook-based, reliable |
| File parsing | `xlsx` (Node.js) for Excel files | Standard library, handles all Excel formats |
| PDF generation | `puppeteer` or `react-pdf` | Template-to-PDF rendering |
| Chart generation | `recharts` or `chart.js` | For growth chart in MDD |
| Bloomberg API | `blpapi` (Node.js) | Official Bloomberg SDK |
| FactSet API | REST with OAuth 2.0 | Standard HTTP |
| Teams integration | Microsoft Graph API | Standard Microsoft 365 |
| Job scheduling | BullMQ + Redis | For daily triggers and report generation |
| Deployment | Vercel (frontend) + Railway (jobs) | Consistent with existing setup |

---

## What to Get From the Client Before Building

### From her (operations):
1. One sample Apex email with the Excel attachment — to understand the column structure
2. One sample StatPro export file — to understand the column structure
3. One sample Bloomberg export file — to understand the column structure
4. One sample FactSet export file — to understand the column structure
5. The current Morning Flow Excel — to understand the expected output format
6. The current Performance Report Excel — to understand the expected output format

### From IT or management:
1. Confirmation of which Bloomberg product they use (terminal vs enterprise)
2. Confirmation of their IRESS product name
3. Confirmation of their FactSet account access
4. Whether their Apex agreement allows SFTP data delivery
5. Microsoft 365 admin access to register the Teams integration app

### From the boss:
1. Approval to access anonymised sample files
2. Agreement on what "success" looks like for Phase 1 proof of concept
3. Introduction to the IT contact who manages system access

---

## The Argument for Doing Both Daily Work and MDD Together

The daily data is the foundation. Without it, the MDD cannot be automated.

If you only automate the MDD (Phase 2 alone), you still need to manually enter every data point each month. You have just built a prettier Excel template.

If you build the daily pipeline first (Phase 1), the MDD data is already there by month-end. The MDD generator becomes a query, not a data entry exercise.

**Build the foundation (daily pipeline) → the roof (MDD) builds itself.**
