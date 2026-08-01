# Market Reality, Scalability, and What We Are Missing

## How Other Fund Operations Companies Work

The workflow is the same across every asset manager in South Africa. The tools differ.

Every fund operations team does exactly what your friend does:
1. Collect daily NAV from their fund administrator
2. Collect daily performance data from their analytics platform
3. Collect benchmark data from their market data provider
4. Compare portfolio vs benchmark
5. Report to portfolio managers
6. Produce monthly regulatory reports

The difference is which specific software they use for each step. And this is the most important thing to understand before building.

---

### The SA Financial Software Landscape

These are the real systems used across the industry. Not all of them. The ones that dominate.

#### Fund Administrators — Who Sends the Daily NAV Data

Every SA fund must have an independent fund administrator. These companies hold the money, calculate the NAV, and send data to the asset manager daily.

| Administrator | Market Position |
|--------------|----------------|
| **Apex Group / BCI (Boutique Collective Investments)** | Largest in SA — administers hundreds of funds. Your friend's company uses Apex. |
| **Maitland** | Major player, especially for larger and international funds |
| **IQ-EQ** | Growing presence in SA, international background |
| **Sanne Group** | Used by some mid-size managers |
| **Oasis** | Smaller, used by specific firms |
| **SS&C GlobeOp** | Enterprise-level, used by very large managers |

**Every one of these sends data the same way your friend receives it — Excel files via email or SFTP.** The column names differ. The layouts differ. But the pattern is the same. One file parser per administrator covers every client on that administrator.

---

#### Market Data Providers — Where Benchmark and Performance Data Comes From

| Provider | Who Uses It | What They Provide |
|----------|-------------|-------------------|
| **Bloomberg** | Most large SA asset managers | Benchmark indices, stock prices, market data |
| **IRESS** | Very widely used in SA | Local equity data, fund prices, ASISA benchmarks |
| **FactSet** | Some managers, especially with global exposure | Multi-asset data, analytics |
| **Morningstar Direct** | Fund comparison, peer group analysis | ASISA category data, peer rankings |
| **Refinitiv / LSEG Eikon** | Some managers — competitor to Bloomberg | Global market data |
| **S&P Global Market Intelligence** | Enterprise users | Global data, credit |

**The SA market is dominated by Bloomberg + IRESS.** A firm that uses Bloomberg for benchmarks and IRESS for local fund data covers the majority of SA asset managers. FactSet and Morningstar are secondary.

---

#### Portfolio Analytics Platforms — Where Daily Returns Come From

| Platform | Notes |
|----------|-------|
| **StatPro / Confluence** | Your friend uses this. Common in SA |
| **FactSet Analytics** | Integrated with FactSet data subscription |
| **Portia (SS&C)** | Used by some managers |
| **In-house Excel** | Smaller managers still do returns in Excel — no platform |
| **Geneva (SS&C Advent)** | Larger managers, full portfolio accounting |
| **SimCorp Dimension** | Very large managers only |
| **Charles River IMS** | Enterprise, large managers |

**The critical insight:** Many smaller SA asset managers (20–50 staff) do not have a dedicated analytics platform. They track daily returns in Excel themselves. They pull NAV from the administrator and calculate the return manually.

This means for smaller firms, your system does not need to pull from StatPro — it IS the system that calculates the return from the NAV data.

---

## Can This Scale, or Does Every Company Need Custom Software?

The answer is: **the file-based approach scales across all of them. The API approach requires one connector per system.**

### The Scalability Model

```
CORE PLATFORM (same for every client)
  - Daily data ingestion
  - Performance calculations
  - MDD generator
  - Dashboard
  - Teams / email delivery

CONNECTOR LAYER (one per system, reused across clients)
  - apex_connector        → covers all Apex/BCI clients
  - maitland_connector    → covers all Maitland clients
  - bloomberg_connector   → covers all Bloomberg users
  - iress_connector       → covers all IRESS users
  - factset_connector     → covers all FactSet users
  - morningstar_connector → covers all Morningstar users
  - excel_connector       → covers every system that can export Excel (all of them)
```

Every new client maps their systems to existing connectors. If they use Apex + Bloomberg + IRESS — three connectors, already built, no custom work needed.

If they use a system not yet integrated — build one new connector. That connector then covers every future client on that system.

**The file-based Excel connector is the universal fallback.** Every financial system in existence can export to Excel. If a client uses a system no one else uses, they upload Excel exports and the AI adaptive parser handles the format. No custom development needed.

---

### The Real Scalability Ceiling

The addressable market in South Africa is not as large as it first appears.

| Segment | Number | Notes |
|---------|--------|-------|
| FSCA-registered CIS managers | ~65 | These must produce MDDs |
| Active funds under management | ~1,500 | Multiple funds per manager |
| Firms with 5–50 staff (your target) | ~30–40 | Not Big 4, not tiny one-person shops |
| Firms likely to buy | ~15–25 | Realistic first-year addressable market |

This is a small market in volume. But it is a high-value market — these firms pay well for tools that work, because the cost of errors is regulatory penalties and reputational damage.

The revenue model that makes sense: R10,000–30,000/month per firm, not thousands of small clients.

---

### The Platform Play — The Bigger Opportunity You Have Not Considered

Instead of selling to each asset manager one by one, there is a larger opportunity: **sell to the fund administrator.**

Apex/BCI administers funds for dozens of investment managers. Every single one of those managers has the same daily workflow problem. If Apex integrates your system into their client portal:

- Every Apex client gets automated data delivery (they already send the files — now the system reads them automatically)
- Apex offers MDD generation as a value-added service to their clients
- You are not selling to 25 individual firms — you are selling to one administrator who distributes to all of them

This is the same logic as the accounting firm play — win one accounting firm, get introduced to 80 clients. Win one fund administrator, solve it for 50+ asset managers.

**Approach:** Once BlueAlpha is live and working, the pitch to Apex is: "We automate what your clients do manually with the data you already send them. Let's integrate this into your client portal."

---

## Do All Companies Need to Produce MDDs?

Not all. But all financial companies have equivalent obligations.

| Company Type | MDD Required? | Equivalent Obligation |
|-------------|--------------|----------------------|
| **Unit trust / CIS manager** | Yes — monthly, CISCA regulated | MDD is the regulatory document |
| **Hedge fund manager** | No MDD, but FSCA quarterly reporting | Similar data, different format |
| **Family office** | No — private | Quarterly client reports to wealthy families |
| **Pension fund** | No MDD | Quarterly reports to trustees and members |
| **Insurance company** | No MDD | FSCA returns, quarterly reporting |
| **Private equity** | No MDD | Quarterly investor letters with NAV and performance |
| **Multi-family office** | No MDD | Monthly client reports per portfolio |
| **Wealth manager / IFA** | No MDD | FSCA reporting, client statements |

**The common thread across all of them:** data from multiple systems, compiled manually, reported on a schedule. The MDD is just the most standardised version of this problem. Every segment has its own version of the same daily grind.

---

## What Every Operations Person at These Companies Does Daily

This is what you have not validated yet but are almost certainly true based on how the industry is structured.

### Fund Operations (your friend's role)
- Get NAV from administrator (daily)
- Calculate or pull daily return (daily)
- Pull benchmark data (daily)
- Produce performance report (daily)
- Handle flows — subscriptions and redemptions (daily)
- Reconcile data between systems (daily/weekly)
- Produce MDD (monthly)
- Handle SARS and FSCA reporting (quarterly/annually)

### Hedge Fund Operations
- Pricing — mark all positions to market (daily)
- P&L calculation (daily)
- NAV calculation (daily or weekly)
- Investor reporting (monthly)
- FSCA returns (quarterly)
- Reconcile positions with prime broker (daily)

### Pension Fund Administration
- Contribution processing (monthly)
- Member statements (quarterly)
- Investment performance tracking (monthly)
- Benefit calculations (as needed)
- Regulatory returns to FSCA (quarterly)

### Family Office Operations
- Portfolio valuation across banks, brokers, and property (monthly)
- Performance attribution (monthly)
- Cash flow management (as needed)
- Tax reporting (annually)
- Consolidated reporting across multiple entities (monthly)

**Every one of these is the same problem:** data from multiple systems, manual collection, manual compilation, manual reporting. The domain differs. The pain is identical.

---

## You Have Not Validated Enough Yet — This Is the Most Important Section

You have one data point. One friend at one company. That is not enough to build.

Founders who skip validation build the wrong thing. Founders who validate properly build something people pay for before a single line of code is written.

The rule used by most successful B2B founders: **talk to 20 potential customers before writing code.** Not to pitch — to listen. You are at 1.

### What You Still Do Not Know

| Question | Why It Matters |
|----------|---------------|
| Do other operations people at other firms do the same daily routine? | Validates whether this is a universal problem or specific to BlueAlpha |
| Have they tried to solve this before? What happened? | Tells you what has been tried and failed — avoids building something that already failed |
| Who actually makes the buying decision? | It is not your friend. It is the COO or Head of Operations. Do you know who that is? |
| What would make them say no? | Compliance concerns, data security, budget cycles, existing contracts |
| What does their compliance team think about using an external system for regulated reporting? | This will kill the deal if not addressed early |
| Where is their data allowed to be stored? | SA data residency requirements — some firms cannot use US-hosted cloud |
| Do they have an IT department that needs to approve integrations? | Yes they do. And IT approval takes months in financial services |
| What is their procurement process? | Large financial firms have vendor due diligence processes — can take 3–6 months |

### How to Get More Conversations

**Through your friend (fastest):**
Ask her: "Who else in Cape Town does the same job as you at a different firm? Would you be willing to make one introduction?" One warm introduction leads to another. This is how you get 10 conversations from 1.

**LinkedIn (direct):**
Search: `"fund operations" OR "investment operations" OR "portfolio operations"` + Cape Town or Johannesburg.
Message: "I'm building a tool to automate the daily data collection work in fund ops — would you be willing to spend 20 minutes telling me how your team handles it? Not selling anything."

**ASISA events:**
The Association for Savings and Investment SA runs events. Operations staff attend. These are the people you need to talk to.

**Through accounting firms:**
The accounting firms that audit asset managers know the operations teams. A warm introduction through an auditor is credible in financial services.

---

## What You Are Missing — The Full List

### 1. Compliance and Regulatory Positioning

An MDD produced by your system is a regulated document. If a number is wrong and it gets published, that is a breach of CISCA. The FSCA can take action.

You need a clear legal position: **the system assists the human, the human is responsible.** Every output requires human review and sign-off before publication. This is not just an ethical position — it is your sales argument. "We do not replace your compliance process. We feed it with accurate data faster."

This needs to be in every sales conversation, on the product, and in the contract.

### 2. Data Security and POPIA

Fund NAV data, client flows, holdings — this is highly confidential regulated information. Before any firm speaks to their compliance team, they will ask:

- Where is the data stored? (Supabase — AWS US-East by default)
- Can it be on South African servers? (Supabase does not have SA region — this may need to be Hetzner SA or AWS Cape Town region)
- Who has access to the data?
- What happens to the data if we terminate the contract?
- Are you POPIA compliant?
- Do you have a data processing agreement?

**This will kill deals if not prepared for.** Have a data security and POPIA response ready before the first compliance officer asks.

### 3. SA-Hosted Infrastructure

Some financial firms have mandates that data cannot leave South African borders. Supabase does not have a SA region. AWS has a Cape Town region (af-south-1). Microsoft Azure has a SA region. 

For firms with strict data residency requirements, the architecture needs to be deployable on SA-hosted infrastructure. This is a configuration decision, not a rebuild — but it needs to be considered upfront.

### 4. The Procurement Process Timeline

In financial services, even a small firm has a vendor due diligence process before signing a contract:
- Legal review of the contract
- IT security review of the platform
- Compliance sign-off
- Finance approval for the budget

This process takes 2–6 months. Your friend got a conditional green light from her boss, which is excellent. But expect that even with full enthusiasm, a signed contract may be 3–4 months away. Do not build assuming the deal is done.

Use the time to talk to more potential clients in parallel.

### 5. The Competition You Have Not Researched

Before assuming the market is wide open, understand what exists:

| Competitor | What They Do | Why Firms Do Not Use Them |
|------------|-------------|--------------------------|
| **Morningstar Direct** | Performance reporting, MDD production tools | Very expensive, enterprise-only, complex to implement |
| **IRESS Reporting** | Some reporting built into IRESS platform | Only covers IRESS data, not multi-source |
| **Confluence (StatPro) Reporting** | Built-in reporting | Same limitation — only covers their data |
| **Local Excel consultants** | Build custom Excel automation for each firm | Fragile, firm-specific, not scalable |
| **Internal IT builds** | Larger firms build their own tools | Only affordable for large firms |

**The gap:** There is no affordable, purpose-built, multi-source daily operations automation tool for mid-size SA asset managers. The large vendors are too expensive. Excel consultants are too fragile. Internal builds are out of reach for smaller firms. This is the gap.

### 6. Pricing Validation

You do not know yet if R10,000–25,000/month is right. You know what the problem costs them. You do not know what they have budget approved for. This needs to be asked directly in every conversation: "If this solved the problem exactly as described, what would that be worth to you?"

Let them say the number. Do not suggest it first.

### 7. The Champion vs. The Buyer

Your friend is the champion — she experiences the pain, she believes in the solution, she made the internal introduction. She is not the buyer. The buyer is her boss or the COO.

You need the champion AND the buyer in the room before a deal happens. Your friend needs to advocate internally. That means giving her the tools to do that — a clear one-page summary of the problem and the solution that she can share internally without you being present.

### 8. The First Revenue Question

Do not build for 6 months and then try to sell. The fastest path to knowing if this is real is asking for money before the product is built.

The right ask after a validation conversation: "We are building this and taking on three early clients who will shape the product. The price for early clients is R3,000/month while we build — this locks in a lower rate permanently and gets you priority access. Are you interested?"

If they say yes and give you a purchase order or a commitment — the product is real. If everyone says "come back when it's built" — you are further from a yes than you think.
