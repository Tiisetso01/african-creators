# Fund Operations — Field Research (Tuesday Meeting)

## Who She Is

Works in fund operations at an asset manager. Handles daily reporting for **11 portfolios**. Her job is to pull data from multiple systems every morning and produce two reports that portfolio managers need to see by **12pm every day**.

---

## The Two Daily Reports She Produces

### Report 1 — Money Flows (Cash Flow Report)

**What it is:** A daily record of all client withdrawals (redemptions) and deposits across portfolios.

**Her process, step by step:**

1. Opens **Outlook** and searches for a specific portfolio code in her inbox
2. Does this individually for each of the 11 portfolios — one search at a time
3. Opens the Excel file attached to the email (she already knows the format)
4. Filters the file by date — looking for that specific day's entries
5. Looks for rows described as **"regular redemption"** or specific unit classes
6. Copies those rows (the withdrawal and deposit entries)
7. Pastes them into a separate document called the **"Morning Flow Excel"**
8. The Morning Flow Excel has pre-built formulas — it auto-calculates totals
9. The output shows the total flow for the day (example: R4 million in/out)
10. She posts this report to **Microsoft Teams** so portfolio managers can see it

**Data source:** Fund administrator — **Apex Group** — sends this data via email every morning.

---

### Report 2 — Performance Report

**What it is:** A daily comparison of how each portfolio performed vs the market benchmark. Portfolio managers need this to see if they beat or lost to the market that day.

**Her process, step by step:**

**Data source 1 — Portfolio performance (StatPro):**
1. Opens **StatPro** website (a portfolio analytics platform)
2. Extracts each portfolio's performance for that day
3. Pastes the numbers into a performance report spreadsheet
4. The spreadsheet calculates the portfolio return automatically

**Data source 2 — Benchmark performance (Bloomberg):**
1. Opens **Bloomberg** terminal
2. Looks up the benchmark index — for SA portfolios this is the **JSE Top 40 or All Share index**
3. The benchmark is a market-created portfolio of the top 40 South African companies — it represents "the market"
4. Extracts the benchmark's daily performance
5. Pastes it into the same spreadsheet

**Data source 3 — Additional data (FactSet):**
1. Opens **FactSet** (another financial data platform — similar to StatPro)
2. Searches by fund name (e.g. "Blue Alpha")
3. Exports the data to Excel
4. Pastes it into the report — it auto-populates additional fields via formulas

**The comparison:**
The spreadsheet calculates: **Portfolio performance minus Benchmark performance**

- Positive = the fund beat the market (good)
- Negative = the market beat the fund (shown in red)

This final report is sent to portfolio managers every day by 12pm.

---

## Systems She Uses Every Day

| System | What It Is | How She Uses It |
|--------|-----------|-----------------|
| **Apex** | Fund administrator | Sends money flow data via email every morning |
| **Outlook** | Email | Receives Apex data, searches by portfolio code |
| **StatPro** | Portfolio analytics platform | Source of each portfolio's daily performance |
| **Bloomberg** | Market data terminal | Source of JSE benchmark performance |
| **FactSet** | Financial data platform | Additional performance and fund data |
| **Morning Flow Excel** | Internal spreadsheet | Aggregates cash flow data, has pre-built formulas |
| **Performance Report Excel** | Internal spreadsheet | Aggregates all performance data, calculates comparison |
| **Microsoft Teams** | Internal comms | Where she posts both reports for portfolio managers |

---

## The Exact Pain in Her Own Words

> "It would be so nice to just extract things and not have to do all of this manually."

> "You save so much money — you won't have to hire an operations person."

> "If we can automate a lot of things, you don't need like two people, you need one person."

She said this unprompted. She already sees the automation opportunity herself.

---

## What the Product Would Do

Instead of her spending the first half of every day doing this manually:

1. **Connect to Apex email** — parse the incoming data automatically, extract flows per portfolio
2. **Connect to StatPro API** — pull daily performance per portfolio automatically
3. **Connect to Bloomberg API** — pull benchmark performance automatically
4. **Connect to FactSet API** — pull additional fund data automatically
5. **Auto-populate both reports** — Morning Flow and Performance Report filled in without her touching them
6. **Auto-post to Teams** — report sent to portfolio managers at a set time every day

Her job shifts from **"copy, paste, copy, paste, copy, paste"** to **"review and confirm."**

---

## Key Observations

- This happens **every single day** — not monthly like accounting. Daily pain is higher urgency.
- She does this for **11 portfolios** — multiplying the manual work significantly
- The deadline is **12pm daily** — hard cut-off, creates morning stress every day
- Data comes from **5 different systems** — none of which talk to each other
- All the intelligence (formulas, calculations, comparisons) already exists in the Excel — the only manual work is the data gathering and pasting
- **She is not the buyer** — her employer is. But she is the internal champion who would advocate for the tool.

---

## What to Validate Next

- Does her employer have any existing tool that partially solves this? Or is Excel the official solution?
- Who is her manager — is there a Head of Operations or COO who owns this problem?
- How many other people at her firm do the same thing?
- Do other asset managers in Cape Town run the same process?
- Would her manager be open to a 30-minute conversation?

---

## The Opportunity in One Line

Five systems, two reports, eleven portfolios, every single day, all done manually in Excel. That is the product.
