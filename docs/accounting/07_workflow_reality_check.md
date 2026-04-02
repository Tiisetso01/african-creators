# Accounting Workflow — Reality Check & Feature Walkthrough

## Is the Documented Workflow Accurate?

### What's Correct and Well-Researched

- SARS deadlines (PAYE 7th, VAT 25th) — fixed by law, universally the same
- Document chasing being the #1 blocker — universally validated across the industry
- Excel running alongside Xero/Sage — every firm does this
- Management accounts being manually formatted and emailed — accurate
- Client query interruptions — accurate

---

### What's Missing or Needs More Nuance

#### 1. The Review / Sign-Off Hierarchy

The docs treat "accountant" as one role. Real firms have a chain:

- **Junior** captures transactions
- **Senior** reviews the work and checks for errors
- **Partner / Owner** signs off before anything goes to SARS

Nothing gets submitted to SARS without at least a senior review. The platform needs to model this — otherwise a junior confirms an AI suggestion and it goes straight to SARS, which no partner will allow.

---

#### 2. Journals and Month-End Adjustments

After capturing transactions, accountants post manual journals for:

- Depreciation
- Accruals (expense incurred but not yet invoiced)
- Prepayments (paid in advance, spread over months)
- Provisions (bad debts, leave pay)

This is a significant chunk of work completely absent from the current docs. Without it, the management accounts are wrong.

---

#### 3. SARS Correspondence — Ongoing, Not Just Annual

SARS sends notices, verifications, and audit requests constantly — not just at year-end. A client gets a "request for relevant material" letter. The accountant must pull together supporting documents, respond within 21 days, and upload to eFiling. This happens across multiple clients every month and creates real urgency.

---

#### 4. Informing Clients Before Submission

When a VAT return shows R80,000 due, the accountant calls the client before submitting to confirm they can pay. Submitting without telling them means an angry client who wasn't ready. This pre-submission communication step is missing from the VAT flow in the current docs.

---

#### 5. Provisional Tax (Twice a Year)

August and February: every provisional taxpayer needs a provisional tax return (IRP6). This is a whole additional submission cycle — estimate taxable income, calculate tax, submit. Not mentioned in the docs at all.

---

#### 6. Dedicated Payroll Software

Most firms use PaySpace, SimplePay, Sage Payroll, or Pastel Payroll — not manual calculation. The docs suggest the platform calculates payroll itself. Reality: the calculation already happens in the payroll tool. The gap is the workflow around it (getting changes from clients, generating the EMP201, confirming with the accountant) — not replacing the payroll software. The platform should integrate with or sit alongside these tools, not replace them.

---

#### 7. Annual Financial Statements (AFS)

Separate from monthly management accounts. Year-end AFS are compiled in dedicated software like CaseWare or Draftworx — formatted to IFRS for SMEs standards, signed off, sometimes independently reviewed. This is a major annual workflow not touched in the current docs.

---

#### 8. Bank Feeds vs Manual Upload

Xero and Sage already pull bank statements automatically via bank feeds for clients who've connected them. The docs describe clients uploading PDFs — that's still real for smaller clients, but firms on full cloud setups already have the data imported. The platform needs to handle both scenarios.

---

#### 9. CIPC and Company Secretarial Work

Annual returns to CIPC (Companies and Intellectual Property Commission), changes to directors and shareholders, registered address updates. Many firms handle this for clients. Deadline is based on each company's anniversary date — unique per client.

---

#### 10. Practice Management — Time and Billing

Partners track billable hours per client to know whether fixed-fee clients are profitable. Most use tools like Xero Practice Manager or spreadsheets. Without time tracking in the platform, the firm cannot see if a client is underpriced. This is a real internal pain point for firm owners.

---

## How the Features Work — Accountant / Staff Perspective

A complete end-to-end walkthrough from the 1st of the month to final submission.

---

### Day 1 — The Month Starts

The accountant opens the dashboard. They see a client grid:

```
Client Name      | Docs Status | VAT Deadline | Payroll Due | Work Status
─────────────────────────────────────────────────────────────────────────
ABC Plumbing     |  ● Waiting  | 25 Apr       | 7 Apr       | Not started
XYZ Retail       |  ● Partial  | 25 Apr       | —           | Not started
Mthembu Law Inc  |  ● Received | 25 Apr       | 7 Apr       | In progress
```

The system already sent WhatsApp and email to every client automatically at 7am. The accountant did nothing. They just see the status. They click into a client who has documents ready.

---

### Opening a Client File

The accountant clicks **ABC Plumbing.** They land on the client's work screen:

```
ABC Plumbing — March 2026
─────────────────────────
Documents:  Bank statement ✓ | Supplier invoices ✓ | Payroll changes ✓
VAT period: Monthly | Due: 25 Apr
Payroll:    3 employees | Due: 7 Apr
Work:       Bookkeeping → [ ] | VAT → [ ] | Payroll → [ ] | Reports → [ ]
```

They click **Start Bookkeeping.**

---

### Bookkeeping with AI Assist

The bank statement was already parsed the moment it was uploaded. The accountant sees a transaction list — not raw data, but pre-processed by AI:

```
# | Date   | Description          | Amount  | AI Suggestion            | Conf | VAT      | Action
──────────────────────────────────────────────────────────────────────────────────────────────
1 | 03 Mar | BUILDERS WHSE 004    | R2,340  | Cost of Sales: Materials | 94%  | Standard | [✓][✗][?]
2 | 05 Mar | SASOL SANDTON        | R890    | Travel: Fuel             | 91%  | Standard | [✓][✗][?]
3 | 07 Mar | SALARY RUN           | R45,000 | Payroll: Net Salaries    | 99%  | Exempt   | [✓][✗][?]
4 | 09 Mar | EFT REF: INV-2034    | R12,800 | Match: Invoice #2034 ✓   | 97%  | Standard | [✓][✗][?]
5 | 12 Mar | UNKNOWN EFT 4892     | R3,100  | ⚠ No match found          | —    | ?        | [✓][✗][?]
6 | 14 Mar | BUILDERS WHSE 004    | R2,340  | ⚠ DUPLICATE — same as #1  | —    | —        | Review
```

**What the accountant does:**

- **Rows 1–4:** Scans each line. If AI is correct — clicks **✓**. Takes 2 seconds per line.
- **Row 5 (unknown):** Clicks **?** — this flags the transaction. The system automatically sends a WhatsApp to the client: *"We found an EFT of R3,100 on 12 March — can you confirm what this was for?"* The accountant makes no call.
- **Row 6 (duplicate):** The system highlights it red. Accountant reviews — if it is genuinely the same invoice submitted twice, they click **Reject** and it is not captured.

For any line where the AI is wrong, the accountant clicks **✗**, a dropdown appears with all expense categories, they pick the correct one. That correction trains the model — next month ABC Plumbing will have better suggestions.

When all lines are confirmed, bookkeeping is marked **complete** by the accountant.

**Review hierarchy:** This screen is for junior/staff. A senior sees a **Review Queue** showing all confirmed transactions before they lock. They scan for anything that looks off and either approve the batch or flag specific lines back to the junior.

---

### VAT Return

Once bookkeeping is marked complete, the VAT tab becomes active. The accountant clicks it:

```
ABC Plumbing — VAT Summary — March 2026
────────────────────────────────────────
Output VAT (from sales invoices):    R 18,450.00
Input VAT (from purchases/expenses): R  6,890.00
─────────────────────────────────────────────────
VAT PAYABLE TO SARS:                 R 11,560.00

⚠ 2 transactions flagged as uncertain VAT treatment — review before confirming
  → Line 23: Consulting fee — is this standard rated or exempt?
  → Line 31: Insurance premium — confirm exempt treatment

[Review flagged items]   [Confirm VAT Return]
```

The accountant reviews the 2 flagged items, corrects if needed, then clicks **Confirm VAT Return.**

**Pre-submission client notification (missing from original docs):**
The system generates a draft message: *"Hi [Client], your VAT for March is R11,560 due by 25 April. Please ensure funds are available. Reply to confirm we can submit."*

The accountant reviews and sends it. The client replies or calls. Once confirmed, the accountant proceeds to submission.

The system pre-fills the VAT201 form values. The accountant opens SARS eFiling, the numbers are ready to paste or submit. After submission, they click **Mark as submitted** in the platform — client receives an automatic notification.

---

### Payroll Run

The payroll tab prompts the accountant a few days before the 7th:

```
ABC Plumbing — Payroll — March 2026
──────────────────────────────────
Last run: Feb 2026 | 3 employees | Status: ⚠ Awaiting client confirmation

Client confirmed: "Same as last month" via WhatsApp — 2 Mar 2026 ✓
```

Because the client already confirmed via WhatsApp (the system routed their reply), the accountant clicks **Calculate Payroll.** They see the batch review screen:

```
Employee       | Gross     | PAYE     | UIF   | Net Pay
───────────────────────────────────────────────────────
T. Dlamini     | R 18,000  | R 2,340  | R 148 | R 15,512
S. Nkosi       | R 14,500  | R 1,450  | R 119 | R 12,931
K. Mokoena     | R 12,000  | R 990    | R 98  | R 10,912
───────────────────────────────────────────────────────
TOTAL PAYE DUE:              R 4,780 (by 7 Apr)

[Approve All]   [Edit individual]   [Download EMP201]
```

The accountant scans the numbers. If correct — **Approve All.**

What happens automatically:
- Payslips generated as PDFs
- Each employee emailed their payslip
- Client gets a summary: *"Payroll done. 3 employees processed. PAYE of R4,780 due 7 April."*
- EMP201 pre-filled and ready for SARS submission

The accountant submits the EMP201 to SARS, then clicks **Mark EMP201 submitted.** Done.

---

### Management Accounts Delivery

Once bookkeeping is complete, the reports tab unlocks. The accountant clicks **Generate Report.**

The system pulls the trial balance from Xero/Sage and produces:
- Income Statement
- Balance Sheet
- Cash Flow Statement

The accountant sees a preview. There is a text box: **"Add commentary for this client"** — they can type a note like *"Revenue up 12% vs Feb. Watch expenses in April — quarterly insurance premium due."* Optional but adds visible value.

They click **Send to Client.** A personalised email goes out automatically with the PDF attached and a link to the live dashboard.

The client's status in the grid flips to **Complete.**

---

### The Complete Month-End View

From the accountant's perspective, their job is:

1. Open dashboard — see what is ready to work on
2. Click into client — confirm AI's bookkeeping suggestions (fast, line by line)
3. Review VAT summary — notify client, confirm, submit
4. Review payroll batch — approve and submit EMP201
5. Preview management accounts — add commentary, send
6. Mark client complete

**What they no longer do:**
- Send document request messages
- Chase missing documents
- Match bank lines manually from scratch
- Post obvious expense categories from memory
- Format management accounts in a Word or Excel template
- Email 60 PDFs one by one
- Remember which client's deadline falls when

---

## Gaps Summary

| Gap | Why It Matters | Priority |
|-----|---------------|----------|
| Junior → Senior → Partner review/sign-off | No firm will allow direct-to-SARS submission without it | Critical |
| Pre-submission client notification (VAT amount) | Clients need to arrange payment before submission | High |
| Journals / month-end adjustments screen | Without this, management accounts will be wrong | High |
| SARS notices and correspondence tracking | Real monthly pain, affects multiple clients | High |
| Provisional tax (IRP6) workflow | Twice-yearly but significant volume | Medium |
| Payroll as integration, not replacement | Don't rebuild PaySpace — connect to it | Medium |
| Bank feed support alongside manual upload | Xero/Sage clients already have auto-imports | Medium |
| Time tracking / practice management | Needed for billing profitability visibility | Medium |
| Annual financial statements workflow | CaseWare/Draftworx territory — out of scope for now | Low |
| CIPC and company secretarial tracking | Deadline management only — not a core workflow | Low |
