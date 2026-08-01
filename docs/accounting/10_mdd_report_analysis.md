# Minimum Disclosure Document (MDD) — Report Analysis & Automation Plan

## The Situation

Her boss said: **"If you can build one report to show that you can do this, we can work with you."**

The report they produce every month is the **Minimum Disclosure Document (MDD)** — shown in the BlueAlpha BCI Equity Fund document for February 2026. This is the proof of concept to build.

---

## What is an MDD?

The MDD is not an optional internal report. It is a **legal regulatory requirement** under the Collective Investment Schemes Control Act (CISCA) in South Africa. Every fund that accepts public investment must produce this document every month and make it publicly available.

Every single South African unit trust or collective investment scheme — there are hundreds of them — must produce this same document, in this same format, every single month.

**That is the market. BlueAlpha is just the door in.**

---

## Who is Involved

| Entity | Role |
|--------|------|
| **BlueAlpha Investment Management** | The investment manager — makes the decisions on what stocks to buy |
| **Boutique Collective Investments (BCI)** | The management company — legally responsible for the fund, part of Apex Group |
| **Apex Group** | The fund administrator — holds the money, tracks NAVs, sends daily data |
| **Standard Bank** | Custodian / Trustee — where the actual assets are held |
| **IRESS** | Data provider — source of performance and market data |
| **Bloomberg** | Data provider — source of benchmark and market data |

The friend works at **BlueAlpha**. Her daily data comes from **Apex** (the administrator). The MDD is produced using data from **IRESS and Bloomberg**.

---

## Every Data Field in the MDD — and Where It Comes From

### Section 1 — Fund Information (Static — set once, rarely changes)

| Field | Value | Source |
|-------|-------|--------|
| Portfolio Manager | Gary Quinn, Walter Jacobs | Manual config |
| Launch date | July 2014 | Manual config |
| JSE Code | BSEAF | Manual config |
| ISIN Number | ZAE000188603 | Manual config |
| ASISA category | SA Equity General | Manual config |
| Benchmark | SA Equity General | Manual config |
| Minimum investment | None | Manual config |
| Valuation time | 15:00 | Manual config |
| Transaction time | 14:00 | Manual config |
| Income declaration dates | 30 June / 31 December | Manual config |
| Annual Service Fee | 1.44% incl. VAT | Manual config |

These never change month to month. Set once in a database and done.

---

### Section 2 — Monthly Updated Data (Changes Every Month)

| Field | Value (Feb 2026) | Source |
|-------|-----------------|--------|
| Date of Issue | 09/03/2026 | Auto-generated (end of month + processing time) |
| NAV price at month end | 274.77 cpu | **Apex** (fund administrator) |
| Portfolio value | R 36 Million | **Apex** (fund administrator) |
| New month's return | Feb: 4.2% | **IRESS** |
| TER figures | 1.68% / 1.04% / 2.72% | **Apex / BCI** (annual calculation, updated yearly) |
| Income distributions | 1.08 cpu (Dec 2025) | Fund records — from Apex |

---

### Section 3 — Performance Table (Calculated)

| Metric | Calculation | Data Needed |
|--------|-------------|-------------|
| Cumulative 1 Year | Total return over last 12 months | Monthly returns from IRESS |
| Cumulative 3 Years | Total return over 36 months | Monthly returns from IRESS |
| Cumulative 5 Years | Total return over 60 months | Monthly returns from IRESS |
| Cumulative 10 Years | Total return over 120 months | Monthly returns from IRESS |
| Since Inception | Total return from July 2014 | All monthly returns from IRESS |
| Annualised (all periods) | Compound annual growth rate | Derived from cumulative returns |
| ASISA Category Average | Same periods, benchmark comparison | **IRESS** (benchmark data) |

All of these are **calculated automatically** from the monthly returns history. No manual work needed once the formula logic is built.

---

### Section 4 — Risk Statistics (Calculated)

| Metric | How It's Calculated | Data Needed |
|--------|-------------------|-------------|
| Standard deviation (1yr) | Volatility of monthly returns over 12 months | Monthly returns history |
| Standard deviation (3yr) | Volatility over 36 months | Monthly returns history |
| Maximum drawdown (1yr) | Largest peak-to-trough decline over 12 months | Monthly returns history |
| Maximum drawdown (3yr) | Largest peak-to-trough decline over 36 months | Monthly returns history |
| Highest calendar year | Best full-year return since inception | Annual returns derived from monthly |
| Lowest calendar year | Worst full-year return since inception | Annual returns derived from monthly |

All calculated. Formula logic is standard in finance — build once, runs forever.

---

### Section 5 — Monthly Returns Table (Historical)

The table showing Jan–Dec returns from 2017 to 2026 (YTD).

- Historical rows (2017–2025) → already exist, stored in database
- New row entry each month → one new number from **IRESS**
- YTD → sum of months so far in the current year, auto-calculated

---

### Section 6 — Portfolio Holdings (Monthly Snapshot)

| Data | Value (Feb 2026) | Source |
|------|-----------------|--------|
| Top 10 holdings + % | Gold Fields 10%, AngloGold 8%, etc. | **Apex / BCI** — portfolio holdings report |
| Sector allocation | Basic Materials 32%, Financials 25%, etc. | **Apex / BCI** — sector breakdown |
| Effective exposure | Net Equity 96%, Net Cash 4% | **Apex / BCI** |

This data is sent by the fund administrator at month-end. Currently received as a file and manually placed into the template.

---

### Section 7 — Growth Chart (R1,000 Investment)

The line chart showing how R1,000 invested at inception (July 2014) has grown vs the benchmark.

- Calculated from all monthly returns since inception
- Two lines: Fund vs ASISA Category Average
- Auto-generated from the returns history once it's in the database

---

## What is Currently Done Manually

| Step | What Happens Now | Time Estimate |
|------|-----------------|--------------|
| Pull NAV from Apex | Email received, number copied from file | 5–10 min per fund |
| Pull monthly return from IRESS | Log into IRESS, find the fund, export | 5–10 min per fund |
| Pull benchmark from Bloomberg/IRESS | Same process | 5 min |
| Pull holdings from Apex/BCI | File received, data extracted | 10–15 min per fund |
| Recalculate performance tables | Excel formulas — usually pre-built but needs checking | 10 min per fund |
| Update the Word/PDF template | Copy numbers into the template fields | 15–20 min per fund |
| Generate PDF | Export to PDF | 2 min per fund |
| Review and distribute | Check before sending | 10 min per fund |

**Total per fund per month: ~60–75 minutes**
**For 11 funds: ~11–14 hours of manual work every month**

---

## What the Proof of Concept Builds

A web application that produces the MDD automatically for BlueAlpha's funds.

### Input (what the system receives):
- NAV and holdings file from Apex at month-end (email attachment or SFTP)
- Monthly return from IRESS (API call or file upload)
- Benchmark return from IRESS or Bloomberg (API call or file upload)

### Processing (what the system does automatically):
- Appends the new month's return to the historical returns table
- Recalculates all cumulative and annualised performance figures
- Recalculates risk statistics (standard deviation, max drawdown)
- Updates the growth chart data
- Pulls in the new holdings and sector allocation
- Populates all static fields from the fund configuration

### Output (what comes out):
- A formatted PDF that matches the regulatory MDD template exactly
- Ready to publish and distribute — no manual formatting

### Interface:
1. Operations person receives month-end data
2. Uploads or confirms data in the web app
3. Reviews the generated MDD on screen
4. Clicks **Approve and Generate PDF**
5. PDF is ready — same day, no formatting work

---

## What to Build for the Proof of Concept

Start with one fund only — **BlueAlpha BCI Equity Fund – A class**.

Phase 1 scope:
- Fund configuration screen (static data, set once)
- Monthly returns database (historical data imported once)
- Manual data entry screen (enter NAV, return, holdings for the month)
- Automatic calculation of all performance metrics
- PDF generation matching the MDD template layout exactly
- Output: a PDF that looks identical to the February 2026 document

Phase 1 does **not** need:
- API connections to IRESS, Bloomberg, or Apex
- Automation of data pulling
- Multiple funds

Data entry is still manual in Phase 1. The value shown is: **we eliminated the formatting, the calculations, and the template work.** The operations person just enters the numbers — the system does everything else.

Once Phase 1 is approved, Phase 2 adds API connections and full automation.

---

## The Bigger Opportunity

BlueAlpha has 11 portfolios. Every one of them needs this document every month.

But BlueAlpha is one of hundreds of South African asset managers. Every single one must produce an MDD monthly. Boutique Collective Investments (BCI) alone administers funds for multiple investment managers — all of them have the same problem.

| Scope | Funds | MDDs per year |
|-------|-------|---------------|
| BlueAlpha only | 11 | 132 |
| BCI-administered funds | 50+ | 600+ |
| SA collective investment schemes | 1,500+ | 18,000+ |

The MDD format is standardised by ASISA. Build it once for BlueAlpha, sell it to every fund manager in the country.

---

## Immediate Next Steps

1. Get a sample of the raw data files they receive from Apex and IRESS — understand the exact format
2. Get the Word or Excel template they currently use to produce the MDD
3. Build Phase 1: manual data entry → automated calculations → PDF output
4. Present the generated PDF next to the February 2026 document — if it matches, the conversation with the boss moves to a contract
