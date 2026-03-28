# AI Suggest & Confirm — Product Feature Concept

## The Core Mechanic

**AI suggests. Human confirms.**

This is the right model for anything touching financial records — the accountant stays legally responsible, but AI eliminates the slow, manual finding-and-organising work. The accountant's job becomes reviewing decisions, not making them from scratch.

---

## Feature 1 — Bank Reconciliation Assistant

AI reads the bank statement and the captured invoices. For each bank line it highlights the most likely match and shows a confidence level. Accountant clicks confirm or picks the correct one from a dropdown.

**Before:** 3 hours of manual matching per client per month.
**After:** 20 minutes of yes / yes / yes / no — fix — yes.

---

## Feature 2 — VAT Classification

Every transaction needs a VAT treatment — standard rated, zero rated, exempt, outside scope. AI reads the description and supplier name and assigns a category. Accountant confirms or corrects.

One misclassification means a wrong VAT return submitted to SARS. This feature catches it before it leaves the system.

---

## Feature 3 — Expense Categorisation

AI reads "Builders Warehouse — R2,340" and suggests "Cost of Sales — Materials." Accountant confirms or corrects. The system trains on corrections over time and gets better per client.

---

## Feature 4 — Receipt-to-Transaction Matching

Client sends a photo of a till slip. AI extracts the amount, date, and merchant — matches it to the corresponding bank transaction — accountant confirms the link.

No more manually hunting for which R847 belongs to which receipt.

---

## Feature 5 — Duplicate Invoice Detection

AI flags when two invoices look like the same one submitted twice — same supplier, same amount, close dates. Accountant reviews before it gets captured.

Prevents paying a supplier twice. Prevents double-counting an expense on the VAT return.

---

## Feature 6 — Unusual Transaction Flagging

AI learns each client's normal spending patterns. Flags anything that looks out of place:

- A transaction 3x larger than usual in a category
- A new supplier that has never appeared before
- A late-night transfer

Accountant reviews flagged items before finalising the month. Acts as an early fraud and error detection layer.

---

## Feature 7 — Payslip Review Before Send

AI generates all payslips from the payroll run. Instead of sending immediately, a summary screen shows each employee — gross, deductions, net. Accountant scans and confirms the batch in one view. One screen, one click, sent.

---

## Feature 8 — SARS eFiling Pre-Fill

Submitting VAT returns and EMP201s requires logging into the SARS eFiling portal — one login per client, every month. AI pulls the calculated figures from the accounting software, pre-fills the return, and presents it to the accountant for a final review and one-click submit.

What currently takes 10–15 minutes per client per month (log in, find the form, type the numbers, submit) becomes a 30-second confirmation.

---

## Feature 9 — Client Financial Dashboard

Instead of emailing a PDF management account every month, each client gets a secure login to see their own numbers live — income, expenses, VAT position, cash flow — updated as the books are done.

**Result:** "Can you send my financials?" calls drop to zero. The accountant stops being a messenger and starts being an advisor.

---

## Feature 10 — Aged Debtors Follow-Up

When the accountant flags unpaid invoices (debtors), nothing automatically happens next. An automated follow-up sequence sends the client's customer a polite payment reminder — at 7 days, 14 days, 30 days overdue — without the accountant or their client having to do anything.

The accountant offers this as a value-add to their clients. It is not their core job but it builds loyalty.

---

## The Principle Behind All Of It

Accountants do not want AI making the final call — they are legally responsible for every number. What they want is for AI to do the legwork so they can make the call faster.

Every feature above removes the slow part (finding, sorting, matching, calculating, submitting, following up) and keeps the accountant in the decision seat (confirm, correct, approve).

That is the product.
