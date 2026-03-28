# Accounting Automation — User Flows

## Actors

| Actor | Who They Are | What They Need |
|-------|-------------|----------------|
| **Firm Owner** | The accountant who owns the practice | Set up the firm, add clients, control what's automated |
| **Accountant / Staff** | Employees working on client files | Do the work faster with AI assistance |
| **Client** | The business owner being served | Send documents easily, get reports, ask questions |

---

## Flow 1 — Firm Onboarding (Once)

```
Firm Owner
    │
    ├── Signs up on platform
    ├── Connects accounting software (Xero / Sage / QuickBooks)
    ├── Adds clients one by one OR imports from accounting software
    │       └── For each client: name, email, WhatsApp number, VAT period, PAYE status, tax deadlines
    ├── Chooses which automations to activate per client
    │       └── Document chasing ON/OFF | Deadline reminders ON/OFF | Auto-reports ON/OFF
    └── Platform is live — automations begin on the 1st of next month
```

---

## Flow 2 — Monthly Document Collection (Repeats Every Month)

```
1st of the month — system triggers automatically
    │
    ├── WhatsApp + email sent to client:
    │       "Hi [Name], please send your bank statements and invoices for [Month]."
    │       └── Includes secure upload link
    │
    ├── Client uploads documents via link (no login required)
    │       └── Supports: PDF, image, Excel, CSV
    │
    ├── System logs what has been received vs outstanding
    │
    ├── Day 4 — no response: automatic follow-up sent
    ├── Day 7 — still nothing: escalation message (urgent tone)
    ├── Day 10 — 5 days before VAT deadline: firm owner flagged internally
    │
    ├── Accountant opens dashboard → sees all clients in a grid
    │       Green = documents received | Yellow = partial | Red = nothing yet
    │
    └── Once all documents received → moves to Flow 3
```

---

## Flow 3 — Bookkeeping with AI Assist

```
Accountant opens client file
    │
    ├── Bank statement is parsed automatically — each transaction listed
    │
    ├── For each transaction, AI shows:
    │       - Suggested match (invoice or expense)
    │       - Suggested expense category
    │       - Suggested VAT treatment
    │       - Confidence score
    │
    ├── Accountant works through the list:
    │       ✓ Confirm  |  ✗ Reject + correct  |  ? Flag for client query
    │
    ├── Flagged items → client notified automatically via WhatsApp:
    │       "We found a transaction of R2,340 on 14 March. Can you confirm what this was for?"
    │
    ├── Duplicate invoices highlighted in red before capturing
    │
    ├── Unusual transactions flagged separately for review
    │
    └── Once bookkeeping is complete → moves to Flow 4 (VAT) and Flow 5 (Payroll)
```

---

## Flow 4 — VAT Return Submission

```
System detects bookkeeping is marked complete for VAT period
    │
    ├── Calculates VAT automatically:
    │       Output VAT (from sales) minus Input VAT (from expenses) = amount due/refund
    │
    ├── Shows accountant a VAT summary screen:
    │       - Total output VAT
    │       - Total input VAT
    │       - Net payable / refundable
    │       - Any flagged transactions that could affect the return
    │
    ├── Accountant reviews → clicks Confirm
    │
    ├── System pre-fills the VAT201 on SARS eFiling
    │
    ├── Accountant does final check on eFiling → submits
    │
    └── Submission confirmation logged against client record
            └── Client notified: "Your VAT return for [Month] has been submitted. Amount due: R[X]"
```

---

## Flow 5 — Payroll Run

```
Before the 7th of every month
    │
    ├── System prompts accountant: "Payroll due for [Client] — any changes this month?"
    │
    ├── Client confirms or updates via WhatsApp:
    │       "Same as last month" OR "Add R500 commission for [Employee]"
    │
    ├── System calculates:
    │       Gross salary → PAYE → UIF → SDL → Net pay per employee
    │
    ├── Payslip review screen:
    │       All employees listed — gross, deductions, net
    │       Accountant reviews batch → clicks Approve All (or adjusts individual)
    │
    ├── Payslips generated as PDFs → emailed to each employee automatically
    │
    ├── EMP201 form pre-filled → accountant submits to SARS
    │
    └── Client notified: "Payroll for [Month] done. [X] employees paid. EMP201 submitted."
```

---

## Flow 6 — Management Accounts Delivery

```
Bookkeeping marked complete
    │
    ├── System generates management accounts automatically:
    │       - Income statement
    │       - Balance sheet
    │       - Cash flow statement
    │
    ├── Accountant previews the report
    │       └── Can add a note / commentary before sending
    │
    ├── One click → PDF generated, personalised email sent to client
    │
    ├── Client receives email with attached PDF + link to live dashboard
    │
    └── Delivery logged — no manual emailing, no copy-paste, no formatting
```

---

## Flow 7 — Client Query via WhatsApp

```
Client sends WhatsApp message to firm's number:
    "What's my VAT this month?"
    │
    ├── Bot reads the message
    ├── Identifies the client by WhatsApp number
    ├── Pulls current VAT figure from accounting software
    └── Replies instantly:
            "Hi [Name], your VAT for March is R4,200 due by 25 March.
             Your return has [not yet / already] been submitted."

Other queries handled the same way:
    "Did you submit my return?" → checks submission log → replies
    "Can I get my March financials?" → sends PDF automatically
    "What do I owe?" → pulls debtors/creditors position → replies
```

---

## Flow 8 — Client Portal (Self-Service)

```
Client receives monthly report email
    │
    ├── Clicks "View Live Dashboard" link
    ├── Logs in (email + OTP — no password to remember)
    │
    ├── Sees their own numbers:
    │       - Income this month vs last month
    │       - Expenses breakdown by category
    │       - VAT position
    │       - Cash in bank
    │       - Outstanding invoices (debtors)
    │       - What they owe suppliers (creditors)
    │
    ├── Can download any historical report as PDF
    │
    └── "Ask a question" button → goes to WhatsApp bot or accountant directly
```

---

## Flow 9 — Aged Debtors Follow-Up

```
Accountant marks invoices as unpaid in the system
    │
    ├── Day 7 overdue → polite reminder sent to client's customer automatically
    ├── Day 14 overdue → second reminder, firmer tone
    ├── Day 30 overdue → final notice, CC to accountant
    │
    ├── Accountant sees debtors dashboard:
    │       - All unpaid invoices across all clients
    │       - Days overdue
    │       - Last reminder sent
    │       - Amount outstanding
    │
    └── Accountant can pause, escalate, or mark as resolved
```

---

## Flow 10 — Firm's Own Invoicing

```
End of month — system prompts firm owner:
    "Time to invoice [Client Name] — R[monthly fee]. Send?"
    │
    ├── Firm owner confirms → invoice generated and emailed automatically
    │
    ├── Invoice unpaid after 7 days → automated reminder sent
    ├── Invoice unpaid after 14 days → second reminder
    ├── Invoice unpaid after 21 days → firm owner flagged
    │
    └── Payment received → logged, invoice marked paid, client record updated
```
