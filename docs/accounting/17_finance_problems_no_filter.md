# Unsolved Finance Problems — Honest Industry Map

No personalisation. No fit scores. Just what is actually broken in each segment and who is living with it every day.

---

## 1. Corporate Finance (FP&A)

FP&A stands for Financial Planning and Analysis. This is the team inside a company responsible for budgeting, forecasting, and reporting to leadership and the board. Their job is to answer: how is the business performing, where is it going, and what happens if things change?

### Problem A — Budget vs Actuals Reporting Takes Too Long

Every company sets a budget at the start of the year. Every month, finance compares actual results to that budget and reports the variance. This sounds simple. It is not.

The data lives in multiple systems — the ERP (accounting software), the CRM (sales data), the HR system (headcount and payroll). Finance pulls all of it into Excel, maps it manually, formats it into a report, and sends it to leadership.

By the time the report is done — often 10 to 15 days after month end — the data is already old. Leadership is making decisions on information that is two weeks stale.

**Who has this:** Every company with more than 20 employees and a CFO or Finance Manager.

**What a solution looks like:** Connect to all the data sources, pull automatically, produce the variance report in hours not days.

---

### Problem B — Cash Flow Forecasting Is Guesswork

A CFO needs to know: will we have enough cash in 30, 60, and 90 days? This requires combining:
- Accounts receivable — who owes us money and when will they actually pay?
- Accounts payable — who do we owe money to and when does it need to go out?
- Payroll — fixed, known, monthly
- Tax payments — VAT on the 25th, PAYE on the 7th, provisional tax twice a year
- Loan repayments — principal and interest
- Any large upcoming expenses

None of these live in the same system. Most companies forecast cash flow in Excel, updated manually. If a big customer pays late or a large supplier invoice arrives early, the forecast is wrong and nobody knows until it is already a problem.

**Who has this:** Every CFO, Finance Director, and business owner who has ever worried about making payroll.

**What a solution looks like:** Connect to accounting software, bank accounts, and payroll. Pull live data. Show a rolling 90-day cash position updated daily.

---

### Problem C — Board Packs Take a Full Week to Produce

Every month, the finance team produces a board pack — a document showing the company's financial performance for the board of directors. It is typically 20 to 40 pages: income statement, balance sheet, cash flow, key metrics, commentary.

Producing it involves pulling data from the accounting system, formatting charts in PowerPoint, writing commentary in Word, merging everything into a PDF, and emailing it. If one number changes after the draft goes out, the whole process repeats.

For most companies this takes an entire week of finance team time every month. The document is already out of date by the time the board reads it.

**Who has this:** Every listed company, every PE-backed company, every company with a formal board.

**What a solution looks like:** Connect to the accounting system and pull data automatically at month end. Charts and tables populate from live data. Finance adds commentary. One click generates a formatted PDF. Board members get a link to a live dashboard where numbers update in real time — no more stale PDFs emailed around.

---

### Problem D — Financial Models Break When Assumptions Change

CFOs and FP&A teams build complex Excel models to forecast revenue, model scenarios, and plan headcount. These models work until someone changes an assumption — and then formulas break, references go wrong, and the model produces nonsense that looks correct.

There is no version control. Someone saves over the file. The previous version is gone. Nobody knows which version is the right one.

**Who has this:** Every finance team that does any kind of modelling.

**What a solution looks like:** A structured planning tool where assumptions are named inputs, calculations are locked and auditable, and every version is saved automatically with a timestamp. Scenario modelling is built in — change one assumption and see the impact across the entire model instantly. No broken formulas. No lost versions.

---

## 2. Fund Operations (Asset Management)

Already researched in detail. The additional problems not yet covered:

### Problem A — Corporate Actions Processing

When a company does a stock split, rights issue, dividend payment, or merger, every fund that holds that stock must update its records. This is called corporate action processing.

The administrator sends a notification. The operations team manually updates the holdings in the portfolio management system. If they get it wrong — wrong ratio on a stock split, missed an ex-dividend date — the NAV is wrong and the fund's performance is misstated.

This happens across every holding, for every corporate event, every day the market is open. It is manual, time-sensitive, and consequential.

**Who has this:** Every fund operations team at every asset manager.

**What a solution looks like:** Connect to a corporate actions data feed (SIX Financial, Refinitiv, or Bloomberg). When a corporate action is announced for a security the fund holds, the system automatically notifies the operations team with the action details, the required adjustment, and the deadline. The operator confirms — one click — and the system updates the holdings. Nothing is missed. Nothing is manually calculated.

---

### Problem B — Trade Reconciliation

Every trade executed by the portfolio manager must match what the broker recorded and what the custodian (the bank holding the assets) recorded. This is a three-way match — portfolio manager, broker, custodian — and it must be done daily.

Mismatches (called breaks) are investigated manually. Someone emails the broker, emails the custodian, tracks the break in a spreadsheet until it is resolved. A single unresolved break can mean a fund holds securities it does not own, or does not hold securities it thinks it owns.

**Who has this:** Every asset manager with active trading. Every day.

**What a solution looks like:** Pull trade records from the portfolio management system, the broker confirmation, and the custodian statement. Auto-match on security, quantity, price, and settlement date. Matched trades are confirmed and closed. Unmatched trades — breaks — are surfaced immediately with a full comparison showing exactly what differs. Operations investigates only the breaks. Everything matched is done automatically.

---

### Problem C — Investor Statement Production

A fund with thousands of investors must produce a statement for each investor showing: opening balance, contributions, withdrawals, investment returns, fees, closing balance. Monthly or quarterly.

For large managers this is hundreds of thousands of statements. Even for small managers with 200 investors it is 200 documents that need to be generated, personalised, and sent. Most do this in Excel templates processed one by one.

**Who has this:** Every asset manager that accepts retail or wholesale investor money.

**What a solution looks like:** Connect to the fund administrator data. Pull each investor's opening balance, all transactions for the period, return allocated to their holding, fees charged, and closing balance. Auto-generate a personalised PDF statement per investor. Batch send to all investors by email in one action. What currently takes days of manual work becomes one button press after a review.

---

### Problem D — FSCA Regulatory Returns

The Financial Sector Conduct Authority requires quarterly and annual reporting from asset managers. The data comes from multiple internal systems. The returns must be submitted in a specific format. Most operations teams compile them manually in the weeks before each deadline.

**Who has this:** Every FSCA-registered asset manager — approximately 65 in South Africa.

**What a solution looks like:** A system that knows the FSCA return format and maps internal data fields to the required submission fields automatically. The operations team reviews a pre-populated return, makes corrections where needed, and submits. The FSCA deadline calendar is built in — reminders fire automatically before each deadline. Submission history is stored for audit purposes.

---

## 3. Tax

### Problem A — SARS Dispute Management

SARS issues millions of additional assessments, audit notifications, and requests for supporting material every year. Each one has a strict deadline — typically 30 days to respond. Missing the deadline means the assessment becomes final even if it is wrong.

Accounting firms and corporate tax departments manage all of this in Outlook and Excel. Disputes are tracked in someone's inbox. Deadlines exist in someone's head. Documents are scattered across email threads.

There is no dedicated system for tracking SARS disputes, managing deadlines, storing correspondence, and monitoring resolution. Every firm that handles tax compliance has this problem.

**Who has this:** Every accounting firm. Every corporate tax department. Every tax practitioner.

**What a solution looks like:** A dedicated SARS dispute management system. Every dispute is logged — taxpayer name, type of dispute, assessment amount, issue date, response deadline. A calendar view shows every open deadline across all clients. Documents are stored per dispute — SARS letters, supporting evidence, objection drafts. Status is tracked from receipt to resolution. Automated reminders fire 14 days and 5 days before each deadline. Nothing is missed. Nothing lives in someone's inbox.

---

### Problem B — Transfer Pricing Documentation

Any South African company that is part of a multinational group must document that transactions between related parties (e.g. paying a parent company for management fees, or selling goods to a sister company) are priced at arm's length — as if they were dealing with a stranger.

This documentation runs to hundreds of pages. SARS is increasingly auditing transfer pricing. The documentation is produced annually by external consultants at significant cost, or by internal tax teams using Excel and Word. There is no structured tool that walks a company through the process, stores the data, and produces a compliant document.

**Who has this:** Every SA subsidiary of a multinational company. Every SA holding company with foreign operations.

**What a solution looks like:** A structured workflow that walks the tax team through each required section of the transfer pricing documentation — entity profiles, intercompany transaction details, functional analysis, benchmarking data. Data is stored year on year so only changes need to be updated. The system generates a SARS-compliant document in the required format. What currently takes consultants weeks and costs hundreds of thousands of rands becomes an internal process.

---

### Problem C — VAT Reconciliation for Complex Businesses

Standard VAT is straightforward. But companies with mixed supplies (some VAT-able, some exempt, some zero-rated), companies that operate across borders, or companies with complex input VAT claims frequently get their VAT wrong.

Wrong VAT returns trigger SARS audits and penalties. The reconciliation between the accounting records and the VAT return is done manually. Most accountants doing this work would tell you it is one of the most tedious and error-prone things they do.

**Who has this:** Hospitality, healthcare, financial services, export businesses, any company with mixed VAT supplies.

**What a solution looks like:** Pull all transactions from the accounting software. Apply the correct VAT treatment to each transaction based on the supplier, description, and category. Flag any transaction where the VAT treatment is uncertain for human review. Generate the VAT return reconciliation showing every transaction, its treatment, and the resulting output or input VAT. The accountant reviews the flagged items — everything else is handled automatically. The return is provably correct before it is submitted.

---

### Problem D — Crypto CGT Tracking Under South African Tax Law

South African investors in cryptocurrency have capital gains tax obligations on every disposal — every trade, every purchase of goods with crypto, every conversion between coins. SARS now explicitly requires disclosure.

The calculation is complex: base cost must be tracked per coin, using a consistent method (FIFO or weighted average). Foreign exchange gains are also triggered when USD-denominated crypto is sold. Investors with hundreds of DeFi transactions have no way to calculate this manually.

No existing tool uses South African tax law. All the crypto tax tools are US-built with US rules.

**Who has this:** Estimated 5.8 million South Africans hold or have held crypto. Every one of them has a potential tax obligation they are likely not handling correctly.

**What a solution looks like:** Connect to South African crypto exchanges — Luno, VALR, AltCoinTrader — via API and pull the investor's full transaction history. Apply SA CGT rules: track base cost per coin using FIFO or weighted average, calculate the gain or loss on every disposal, apply the annual exclusion, determine whether gains are income (trader) or capital (investor). Produce an 8th Schedule CGT schedule ready to hand to a tax practitioner or submit directly. Sold B2B to tax practitioners who use it for all their crypto clients.

---

### Problem E — PAYE Reconciliation and EMP501 Accuracy

At year end, every employer must submit an EMP501 — a reconciliation of all PAYE deducted from employees against what was paid to SARS throughout the year. Errors on the EMP501 cause employees to receive incorrect IRP5 certificates, which affects their personal tax returns.

The reconciliation between payroll records and SARS submissions is complex and frequently wrong. Penalties for incorrect EMP501 submissions are automatic. This is a source of significant stress for every payroll administrator in the country.

**Who has this:** Every employer with more than one employee.

**What a solution looks like:** Pull all payroll runs for the year from the payroll system. Pull all PAYE payments made to SARS from the EFT records. Reconcile them month by month — does what was deducted from employees match what was paid to SARS? Flag every discrepancy with a specific explanation. Pre-populate the EMP501 with the reconciled figures. The payroll administrator reviews, corrects any flagged items, and submits with confidence.

---

## 4. Payroll

### Problem A — Leave Liability Is Never Accurate

Every employee who accrues leave that has not been taken represents a liability on the company's balance sheet. As the employee earns more or as leave accumulates, that liability grows. When they take leave or get paid out, it decreases.

Most companies calculate leave liability once a year at year end — in Excel. During the year, the balance sheet carries a number that could be millions of rands wrong. This affects financial statements, business valuations, and sale processes.

**Who has this:** Every company with employees. Particularly painful for companies being audited or sold.

**What a solution looks like:** Connect to the HR and payroll system. Pull each employee's leave balance and current salary daily. Calculate the rand value of accrued leave automatically — days outstanding multiplied by daily rate. Show the real-time leave liability as a number on the finance dashboard. When leave is taken or paid out, the liability adjusts instantly. The balance sheet is always accurate. Auditors and buyers see the real number, not a year-old estimate.

---

### Problem B — Third-Party Payment Management

Running payroll means paying not just employees but a long list of third parties on specific deadlines:

- SARS: PAYE, UIF, and SDL by the 7th of each month
- Pension fund: contributions by a specific date
- Medical aid: contributions by a specific date
- Garnishee orders: deductions paid to courts
- Union dues: paid to specific unions
- Group life insurance: premiums to the insurer

Each requires a separate payment to a different recipient. Each has its own reference number format. Each has its own deadline. Managing all of this without errors requires a system. Most companies use a spreadsheet and a prayer.

**Who has this:** Every employer running payroll.

**What a solution looks like:** After payroll is approved, the system auto-generates every third-party payment in the correct format for each recipient — a SARS EFT file with the correct reference number, a pension fund contribution schedule, a medical aid remittance. Each payment is tracked — sent, confirmed, failed. The payroll administrator sees a dashboard: which payments have gone, which are outstanding, which failed and need attention. Nothing is missed. No manual spreadsheet. No payments going out with wrong references.

---

### Problem C — Multi-Country African Payroll Compliance

South African companies expanding into other African countries face a fundamentally different compliance regime in each country:

| Country | Tax Authority | Unique Requirements |
|---------|-------------|-------------------|
| Nigeria | FIRS | State-level PAYE varies by state, pension through PFAs |
| Kenya | KRA | NHIF, NSSF, housing levy all separate |
| Ghana | GRA | SSNIT contributions, graduate levy |
| Zimbabwe | ZIMRA | NSSA contributions, complex currency rules |
| Zambia | ZRA | NAPSA contributions, different tax bands |

A company operating in four of these countries needs four separate payroll processes, four sets of compliance knowledge, and four different submission systems. There is no tool that handles African multi-country payroll compliance from a single interface.

**Who has this:** Every pan-African business. SA is the gateway to Africa for many international companies — they set up here first and expand. Every one of them hits this wall.

**What a solution looks like:** A compliance engine where each African country's tax rules, social security rates, and submission formats are encoded and maintained. The HR manager inputs gross salary and employee details per country. The system calculates the correct deductions for each country automatically. It generates payslips in the local format and the correct submission file for each country's tax authority. One platform, one interface, every country handled correctly. When tax rates change — and they change constantly — the system is updated centrally.

---

### Problem D — Employment Equity Reporting

South African companies with 50 or more employees must submit an Employment Equity report to the Department of Labour annually. The report covers workforce demographics by race, gender, and disability across occupational levels.

The data lives in HR and payroll systems. Compiling it requires cross-referencing employee records against the EEA categories. Most HR managers do this in Excel. Errors cause compliance failures.

**Who has this:** Every company with 50+ employees operating in South Africa.

**What a solution looks like:** Connect to the HR and payroll system. Pull employee records with demographic information. Map automatically to the EEA occupational levels and workforce categories. Generate the Employment Equity report in the exact format required by the Department of Labour. Show a preview for review before submission. Track submission history. What currently takes an HR manager a week of cross-referencing in Excel takes 30 minutes of review and one click.

---

## 5. Banking (Commercial and Corporate)

### Problem A — Loan Covenant Monitoring

When a company borrows from a bank, the loan agreement contains financial covenants — conditions the company must maintain. Common examples:

- Debt-to-EBITDA ratio must stay below 3x
- Interest coverage ratio must stay above 2.5x
- Net debt must not exceed a certain threshold

If a covenant is breached, the bank can demand immediate repayment of the entire loan — even if payments are current. This is called a technical default and it can destroy a business.

Companies track covenant compliance in Excel, usually checked quarterly. By the time they discover a breach it has already happened. The bank discovers it at the same time and the relationship immediately becomes adversarial.

**Who has this:** Every company with a bank loan containing financial covenants. Every bank relationship manager managing multiple corporate borrowers.

**What a solution looks like:** Connect to the accounting system. Pull the relevant financial metrics monthly — EBITDA, total debt, interest expense, cash. Calculate each covenant ratio automatically. Compare against the thresholds from the loan agreement, which are stored in the system. Alert the CFO and treasury when any ratio is within 15% of a breach — weeks before it becomes a problem. The company has time to act. The bank never finds out first. Sold to both sides: companies to protect themselves, banks to monitor their entire lending book.

---

### Problem B — Foreign Exchange Exposure Management

South African companies that buy or sell in foreign currencies — importers, exporters, companies with offshore operations — are exposed to exchange rate risk. If you agreed to pay a US supplier $500,000 in 90 days and the rand weakens significantly, the cost in rands is much higher than planned.

Companies manage this risk by buying forward contracts (locking in an exchange rate today for a future payment). Managing open forward contracts — tracking which contracts exist, when they mature, what rate was locked in, whether they are still needed — is done in Excel at most companies.

Errors mean paying the wrong rate, missing a contract maturity, or being unhedged when the rand moves.

**Who has this:** Every company with material foreign currency income or expenditure. Importers, exporters, companies paying offshore licences or software subscriptions in USD.

**What a solution looks like:** A register of all open forward contracts — currency pair, notional amount, rate locked, maturity date, underlying exposure it covers. Automated reminders 10 days before each contract matures. A dashboard showing total FX exposure by currency vs total hedging in place — the gap is the unhedged risk. Mark-to-market valuation of all open contracts updated daily using live exchange rates. The treasury manager sees their entire FX position in one screen instead of a spreadsheet with 40 rows that someone last updated three weeks ago.

---

### Problem C — Bank Fee Reconciliation

Large companies pay significant bank fees across multiple accounts and multiple banks. Transaction fees, monthly service fees, forex conversion fees, overdraft fees, guarantee fees — each is billed by the bank in a statement.

Whether those fees match the pricing agreement the company signed with the bank is almost never checked. Banks make billing errors. Fees that were supposed to be reduced after renegotiation continue to be charged. Nobody catches it because nobody reconciles bank fees systematically.

**Who has this:** Every company with significant banking relationships — multiple accounts, multiple banks, high transaction volumes.

**What a solution looks like:** Import the bank fee statement for each bank each month. Store the agreed pricing schedule per bank — what each fee type is supposed to cost. The system compares every fee charged against the agreed rate. Any fee that is higher than agreed, or that appears on the statement but should not be charged, is flagged automatically with a specific description. The treasury manager reviews flagged items and raises disputes with the bank with full evidence. Companies typically recover significant overcharges within the first month.

---

### Problem D — Credit Facility Tracking

A corporate treasury team manages multiple credit facilities: an overdraft at one bank, a revolving credit facility at another, asset finance at a third, a trade finance facility at a fourth.

Tracking how much of each facility is drawn, how much is available, what the cost of each is, and when each expires is done in Excel. When a facility is about to expire and needs to be renewed, it is often discovered too late. When the company needs emergency liquidity, nobody knows instantly which facility has room.

**Who has this:** Every corporate treasury team. Every company with more than one credit facility.

**What a solution looks like:** A dashboard showing every credit facility in one view — facility name, bank, limit, amount drawn, amount available, interest rate, expiry date. Updated daily from bank statements or manual input. Alerts fire 90 days before any facility expires — enough time to renegotiate without pressure. When the CFO asks "how much liquidity do we have right now?" the answer is one screen, not a phone call to three banks and a spreadsheet.

---

### Problem E — Banking Mandate Management

Every bank account has an authorised signatory list — who can approve transactions, at what limits, under what conditions. When an employee leaves or changes role, the bank mandate must be updated. This requires wet signatures, board resolutions, and often physical visits to the bank.

Large companies with many accounts across multiple banks have mandates that are permanently out of date. Ex-employees still appear as authorised signatories. New employees cannot approve payments they should be able to approve.

This is a governance and fraud risk. It is managed entirely manually.

**Who has this:** Every company with more than one bank account and more than five employees.

**What a solution looks like:** A digital record of every bank mandate — account, bank, signatory name, authority level, date approved, date last reviewed. When an employee leaves or changes role, the system flags every mandate they appear on and generates the required documentation to update each bank. A compliance dashboard shows mandates that have not been reviewed in over 12 months. The company always knows exactly who can approve what, at which bank, and when it was last confirmed.

---

## What These Problems Have in Common

Across every segment — corporate finance, fund operations, tax, payroll, banking — the pattern repeats:

1. Data lives in multiple systems that do not talk to each other
2. Someone manually pulls that data, often by downloading files or logging into portals
3. The data is combined in Excel
4. A report or calculation is produced
5. Someone reviews it and acts on it or sends it somewhere
6. The process repeats — daily, weekly, monthly, quarterly

The Excel file in the middle is always the problem. It is where errors happen, where data goes stale, where knowledge lives in one person's head, and where the business is blind between updates.

Every problem on this list is solved by removing the Excel from the middle and replacing it with a system that connects the sources directly, processes the data automatically, and gives the right person the right information at the right time.

That is the opportunity. In every segment. Simultaneously.
