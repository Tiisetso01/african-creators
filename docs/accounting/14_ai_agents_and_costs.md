# AI, Agents, and Costs — Full Analysis

## Where AI and Agents Fit

The core of this system is a data pipeline — collect, validate, calculate, generate, deliver. That is deterministic code, not AI. AI added for the sake of AI makes the system less reliable, not more. But there are specific places where AI genuinely solves a real problem that code alone cannot.

---

### Where AI Is Genuinely Needed

#### 1. Adaptive File Parser — The Most Important AI Use Case

This is the problem no one talks about until it breaks in production.

Apex changes their Excel column layout. Bloomberg renames a column. FactSet adds a new field and shifts everything. The parser breaks. The morning report does not run. The operations team is stuck until a developer fixes the parser — which could take hours or days.

An AI layer fixes this:

```
New file arrives
       ↓
Parser tries to read it with existing schema
       ↓
Validation fails — columns do not match expected layout
       ↓
AI agent receives: the file + the expected schema
       ↓
AI figures out the new column mapping:
  "old column 'Transaction_Type' is now 'Txn_Type'"
  "old column 'ZAR_Amount' is now 'Amount_ZAR'"
       ↓
AI proposes the updated mapping
       ↓
Operations person confirms (one click)
       ↓
Parser updates, file processes, no developer needed
```

**Why this matters:** Every financial data vendor changes their export format at least once a year. Without this, a format change means a developer emergency. With it, the operations person handles it themselves in 2 minutes.

**Model:** Claude or GPT-4o — given the file and the schema, LLMs are excellent at figuring out column mappings from context.

---

#### 2. Data Anomaly Detection Before Storage

Before any daily data enters the database, AI checks whether the numbers make sense.

```
Today's data arrives:
  BlueAlpha BCI Equity Fund daily return: -47.3%
  JSE All Share daily return: -0.4%

Rule-based check: return is outside ±15% threshold → flag

AI check (additional layer):
  "A -47% single day return on a diversified SA equity fund
   is implausible given a -0.4% market move. This is likely
   a data entry error or a decimal point issue in the source file.
   Possible correct value: -4.73% (decimal shift) or -0.473%"
```

The AI does not reject the data. It flags it with a specific explanation and a suggested correction. The operations person reviews before anything is stored.

**Why not just use rules:** Rules catch the obvious cases (outside a threshold). AI catches the subtle ones — a plausible-looking number that is wrong in context. A -2.3% return on a day the market was up 3.1% is within a normal range but suspicious. AI flags it with reasoning. A rule would not.

---

#### 3. Month-End Reconciliation Agent

Before the MDD is generated, an agent runs a full reconciliation check:

```
Agent checks:
  ✓ NAV from Apex on 28 Feb = 274.77 cpu
  ✓ Calculated NAV from daily returns chain = 274.77 cpu
  ✗ MISMATCH: portfolio value from Apex = R36.2M
               calculated from units × NAV = R36.0M
               Difference: R200,000

Agent investigates:
  → Checks for any large flows on 28 Feb
  → Found: R210,000 subscription received late (T+1 settlement)
  → Explains: "The R200k difference is explained by a subscription
     that was received on 28 Feb but settles on 3 Mar (T+1).
     Apex includes it in the portfolio value but it is not yet
     in the units count. This is expected. No error."

Agent verdict: Approved — MDD can be generated
```

Without the agent, a human has to do this investigation. It takes 30–60 minutes per fund. With the agent, it takes 30 seconds and the human just reads the explanation and confirms.

---

#### 4. Natural Language Interface for Portfolio Managers

Portfolio managers currently get a report posted to Teams at 12pm. If they want to ask a follow-up question, they call the operations team.

With an AI interface:

```
Portfolio manager types in Teams:
  "How did the BCI Equity Fund compare to the benchmark
   over the last 3 months?"

System responds:
  "BlueAlpha BCI Equity Fund — Last 90 Days (Jan–Mar 2026)
   Fund return:      +11.2%
   Benchmark return: +9.8%
   Active return:    +1.4% (outperformed)

   Best month: February (+4.2%, benchmark +3.8%)
   Worst month: January (+3.2%, benchmark +3.1%)"
```

The system connects to the database and queries it using natural language — the LLM translates the question into a database query, executes it, formats the response. No code needed per question type.

**Implementation:** Function calling / tool use with Claude or GPT-4o. The LLM receives the question and a set of available functions (getPortfolioReturn, getBenchmarkReturn, getFlowsForPeriod). It calls the right functions and formats the answer.

---

#### 5. MDD Commentary Draft

The MDD could optionally include a short commentary section — a paragraph explaining the month's performance. Currently this is not in the BlueAlpha MDD, but it is standard in higher-end fund fact sheets.

```
AI receives:
  - Monthly return: +4.2%
  - Benchmark return: +3.8%
  - Top contributors: Gold Fields +0.9%, AngloGold +0.7%
  - Top detractors: MTN -0.2%
  - Market context: JSE All Share +3.8%, rand strengthened 1.2% vs USD

AI drafts:
  "The Fund delivered a return of 4.2% in February 2026,
   outperforming the SA Equity General category average of 3.8%.
   Gold and platinum holdings were the primary contributors,
   benefiting from continued commodity price strength. The
   overweight position in Gold Fields and AngloGold Ashanti
   added 1.6% to relative performance. MTN was the primary
   detractor as telecoms came under pressure mid-month."

Portfolio manager reviews → edits → approves → included in MDD
```

Human stays in control. AI does the first draft. This is the same "AI suggests, human confirms" model from the accounting platform.

---

### Where AI Is NOT Needed

| Component | Why AI Is Not Needed |
|-----------|---------------------|
| Core calculations (returns, std dev, drawdown) | Pure deterministic math — `decimal.js` handles it exactly |
| PDF generation | Template rendering — Puppeteer handles it |
| Job scheduling | Cron logic — BullMQ handles it |
| Teams posting | API call — Microsoft Graph handles it |
| File parsing (normal case) | Known schema — SheetJS + Zod handles it |
| Database operations | SQL — Drizzle handles it |
| Authentication | Standard OAuth — handled by auth libraries |

AI added to these would make them slower, more expensive, and less reliable. Code is better than AI for deterministic processes.

---

### Agent Architecture

The AI components run as agents — they have tools available to them and can take multi-step actions.

```
┌─────────────────────────────────────────┐
│           AGENT LAYER                    │
│                                          │
│  File Adaptation Agent                   │
│    Tools: read_file, compare_schema,     │
│           propose_mapping, update_parser │
│                                          │
│  Anomaly Detection Agent                 │
│    Tools: get_historical_returns,        │
│           get_market_data, flag_record   │
│                                          │
│  Reconciliation Agent                    │
│    Tools: get_nav, get_flows,            │
│           get_calculated_nav, explain    │
│                                          │
│  Query Agent (Teams interface)           │
│    Tools: get_returns, get_flows,        │
│           get_holdings, get_benchmark    │
└─────────────────────────────────────────┘
           │
           ▼
    Claude API (claude-sonnet-4-6)
    or OpenAI GPT-4o
```

**Model choice:** Claude Sonnet 4.6 (the model running this conversation). Reasons:
- Strong at structured data analysis and column mapping
- Large context window handles full Excel file contents
- Tool use / function calling is reliable
- Anthropic API is simpler to integrate than OpenAI's

---

## Costs

### File-Based Method — Monthly Running Costs

#### Infrastructure

| Service | Plan | Monthly Cost |
|---------|------|-------------|
| **Vercel** | Pro | $20 |
| **Supabase** | Pro | $25 |
| **Upstash Redis** | Pay-per-request | ~$5–10 |
| **Railway** | Starter (BullMQ workers) | $5–15 |
| **Resend** | Pro (if >3,000 emails/month) | $20 |
| **Microsoft 365** | Already paid by the company | $0 |
| **Supabase Storage** | Included in Pro, ~50GB/month | $0–5 |

**Infrastructure total: ~$75–90/month (~R1,400–1,700/month)**

#### AI Costs (File-Based Method)

| Usage | Estimated monthly volume | Cost |
|-------|------------------------|------|
| Anomaly detection (per data point) | ~500 checks/month | ~$5 |
| File adaptation agent (when needed) | 0–5 uses/month | ~$2–10 |
| Reconciliation agent (month-end per fund) | 11 runs/month | ~$5 |
| Query agent (Teams queries) | ~50 queries/month | ~$3 |

**AI total: ~$15–25/month (~R280–470/month)**

**File-Based Method Total: ~$90–115/month (~R1,700–2,200/month)**

---

### API Method — Monthly Running Costs

The API method has the same infrastructure costs as the file-based method, plus the cost of API access to each financial data system.

#### Infrastructure (Same as Above)
~$75–90/month

#### API Access Costs

This is where the important distinction is: **the company already subscribes to all of these systems.** The question is whether API access is included or costs extra.

| System | They Already Pay? | API Access Cost |
|--------|------------------|----------------|
| **Bloomberg Terminal** | Yes (~R400,000–500,000/year per terminal) | Usually included in terminal license. Request from Bloomberg account rep. Cost: **$0 additional** |
| **Bloomberg B-PIPE** (if terminal not sufficient) | No — this is enterprise data feed | $50,000–150,000+/year — not relevant for a firm this size |
| **IRESS** | Yes | API access typically included in existing subscription. Request from IRESS account manager. Cost: **$0–$500/month** |
| **FactSet** | Yes | API included in subscription for licensed users. Some endpoints cost extra. Cost: **$0–$1,000/month** |
| **StatPro / Confluence** | Yes | API access negotiated with account manager. Cost: **$0–$500/month** |
| **Apex SFTP** | Yes (fund admin agreement) | Standard data delivery, no additional cost. Cost: **$0** |
| **Microsoft Graph** | Yes (M365 subscription) | Free to use. Cost: **$0** |

**Realistic additional API cost: $0–$2,000/month depending on negotiation**

Most of this is $0 because they already pay for the platforms. The API is just a different way of accessing data they have already licensed.

**API Method Total: ~$75–2,090/month (~R1,400–39,000/month)**

The wide range depends entirely on what each vendor charges for API access on top of the existing subscription. The first conversation with each vendor's account manager will clarify this. In most cases it is $0 or a small enablement fee.

---

### One-Time Setup Costs

These apply regardless of method:

| Item | Effort | Notes |
|------|--------|-------|
| Azure AD app registration (Teams + Graph API) | 2 hours | Free to register |
| Supabase project setup + schema | 1 day | One-time |
| Bloomberg API service setup | 1 day (with Bloomberg's help) | Done by Bloomberg technical team |
| IRESS API credentials request | 1–2 weeks (waiting on vendor) | Not a dev task — admin task |
| FactSet API credentials | 1 week | Same |
| Apex SFTP access request | 1–2 weeks | Not a dev task — admin task |

**Vendor credential requests are not development work.** They are emails and forms. They take 1–2 weeks to process. Start these requests before writing code so there is no waiting.

---

### AI Cost Deep Dive

For anyone unfamiliar with how API pricing works for LLMs:

Claude Sonnet 4.6 pricing:
- Input tokens: $3.00 per million tokens
- Output tokens: $15.00 per million tokens

What a token is: roughly 4 characters. A full Excel file with 500 rows and 10 columns is approximately 50,000–100,000 tokens depending on content.

| AI Task | Input tokens | Output tokens | Cost per run |
|---------|-------------|--------------|-------------|
| Anomaly detection (one data point) | ~500 | ~200 | ~$0.005 |
| File adaptation (one file) | ~80,000 | ~1,000 | ~$0.26 |
| Reconciliation check (one fund) | ~5,000 | ~500 | ~$0.02 |
| Natural language query | ~2,000 | ~500 | ~$0.01 |
| MDD commentary draft | ~3,000 | ~800 | ~$0.02 |

**The AI costs are negligible.** The expensive part of this system is the data vendors, not the AI.

---

### What to Charge BlueAlpha

The pricing must be anchored to the value delivered, not the infrastructure cost.

**What the system saves them:**

| Saving | Calculation | Monthly value |
|--------|------------|--------------|
| Operations staff time (daily reports) | 3 hrs/day × 22 working days × R200/hr | R13,200 |
| Operations staff time (MDD production) | 11 funds × 75 min × R200/hr | R2,750 |
| Avoided headcount (scale without hiring) | Half of one junior operations analyst | R12,500 |
| **Total monthly value delivered** | | **~R28,000–30,000** |

**Suggested pricing:**

| Phase | What is live | Monthly fee |
|-------|-------------|------------|
| Phase 1 (daily reports, file-based) | Daily flows + performance reports automated | R5,000/month |
| Phase 2 (+ MDD generator) | Daily + monthly MDD for all 11 funds | R10,000/month |
| Phase 3 (+ API connections) | Fully automated, no file uploads | R18,000/month |
| Full platform | Everything live, API-connected, AI layer | R25,000/month |

**Start at R5,000 for Phase 1.** It is easy to say yes to. Once it is live and they feel the daily relief, upselling to Phase 2 and 3 is a conversation about adding more value, not a new sales process.

At R25,000/month at full build-out, the margin on ~R2,000/month infrastructure is strong. And unlike the accounting firm opportunity, this client is already validated — the boss gave a conditional green light.

---

### Scalability — The Bigger Picture

BlueAlpha has 11 funds. But BCI (Boutique Collective Investments) administers funds for many investment managers. Every one of them has the same MDD problem.

Once the system is built for BlueAlpha:

| Client | Funds | Monthly fee | Annual revenue |
|--------|-------|-------------|---------------|
| BlueAlpha | 11 | R25,000 | R300,000 |
| Second asset manager | 8 | R20,000 | R240,000 |
| Third asset manager | 15 | R30,000 | R360,000 |
| BCI (white-label) | All their funds | R80,000+ | R960,000+ |

The infrastructure cost barely changes per client. New clients are new fund configurations in the same database. The product scales on the same codebase.
