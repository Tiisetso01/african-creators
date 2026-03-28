# Accounting Automation — System Architecture

## Overview

The system has three surfaces — the accountant dashboard, the client portal, and the WhatsApp bot — all sitting on top of a single backend that integrates with accounting software, SARS eFiling, and communication channels.

---

## System Map

```
┌─────────────────────────────────────────────────────────────────┐
│                        USERS                                    │
│                                                                 │
│   Firm Owner / Accountant          Client (Business Owner)      │
│         │                                    │                  │
│   [Accountant Dashboard]          [Client Portal]  [WhatsApp]  │
└──────────────────┬─────────────────────┬─────────────┬─────────┘
                   │                     │             │
                   └─────────────────────▼─────────────┘
                                    [API Layer]
                                         │
              ┌──────────────────────────┼─────────────────────────┐
              │                          │                          │
        [Automation Engine]       [AI Processing]          [Integrations]
              │                          │                          │
     Scheduled jobs              Reconciliation             Xero / Sage /
     Document chasing            Categorisation             QuickBooks
     Deadline tracking           Anomaly detection          WhatsApp API
     Report delivery             Payslip generation         SARS eFiling
     Invoice reminders           Query answering            Email (Resend)
                                                            Storage (S3)
                                         │
                                   [Database]
                                  PostgreSQL / Supabase
```

---

## Layer 1 — Frontend

### Accountant Dashboard
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Who uses it:** Firm owner and accountants (desktop-first)

**Key screens:**
| Screen | Purpose |
|--------|---------|
| Client Overview | Grid of all clients — document status, deadline status, work status |
| Client File | All work for one client — bookkeeping, VAT, payroll, reports |
| AI Reconciliation View | Transaction list with AI suggestions — confirm/correct interface |
| Deadline Board | Calendar view of all upcoming SARS deadlines across all clients |
| Debtors Dashboard | Outstanding invoices across all clients |
| Reports | Firm's own billing, revenue, time tracking |

### Client Portal
- **Framework:** Next.js (same codebase, separate route group)
- **Auth:** Magic link / OTP — no password
- **Who uses it:** Business owners (mobile-friendly)

**Key screens:**
| Screen | Purpose |
|--------|---------|
| Financial Dashboard | Live income, expenses, VAT position, cash |
| Document Upload | Drag-and-drop or WhatsApp link — sends to firm |
| Reports Archive | Download any past management account as PDF |
| Outstanding Items | What the firm is still waiting for from the client |

---

## Layer 2 — API Layer

Built as a Next.js API routes layer or a separate Node.js/Express service.

**Key API groups:**

| Group | Endpoints | Purpose |
|-------|-----------|---------|
| `/clients` | CRUD | Manage client records |
| `/documents` | Upload, list, status | Document collection and tracking |
| `/bookkeeping` | Transactions, confirm, flag | AI reconciliation workflow |
| `/vat` | Calculate, pre-fill, submit | VAT return pipeline |
| `/payroll` | Calculate, approve, generate | Payroll run pipeline |
| `/reports` | Generate, send, archive | Management accounts |
| `/messages` | Send, receive, log | WhatsApp and email messaging |
| `/deadlines` | List, track, remind | Deadline management |
| `/webhooks` | Xero, Sage, WhatsApp | Inbound events from integrations |

---

## Layer 3 — Automation Engine

Handles all scheduled and event-driven tasks. Built on **n8n** (self-hosted) or a custom job queue (BullMQ + Redis).

**Scheduled Jobs:**

| Job | Trigger | Action |
|-----|---------|--------|
| Document request | 1st of month, 7am | WhatsApp + email to client |
| Follow-up reminder | Day 4 if no docs | WhatsApp to client |
| Escalation | Day 7 if no docs | Urgent WhatsApp to client + flag accountant |
| Deadline warning | 7 days before SARS date | Internal alert to accountant |
| Report delivery | When bookkeeping marked complete | Generate PDF + email client |
| Debtors reminder | Day 7, 14, 30 after invoice due | Email to client's customer |
| Firm invoice | End of month | Generate and send firm's own invoices |
| Payment reminder | 7 days after firm invoice unpaid | Email to client |

**Event-Driven Triggers:**

| Event | Action |
|-------|--------|
| Document uploaded | Update status, notify accountant |
| WhatsApp message received | Route to bot handler |
| Bookkeeping confirmed complete | Trigger VAT calc + report generation |
| Payroll approved | Generate payslips + EMP201 |
| Payment received (from bank feed) | Mark invoice paid |

---

## Layer 4 — AI Processing

**Model:** OpenAI GPT-4o or Claude (via API) — used for natural language understanding and document analysis.
**Embeddings:** For training per-client context (transaction history, supplier patterns).

**AI Tasks:**

| Task | Input | Output |
|------|-------|--------|
| Transaction categorisation | Bank line description + amount | Suggested expense category + confidence |
| VAT classification | Transaction + supplier name | VAT treatment (standard / zero / exempt) |
| Invoice matching | Bank transaction + invoice list | Best matching invoice + confidence score |
| Receipt parsing | Receipt image (OCR) | Amount, date, merchant, VAT amount |
| Duplicate detection | New invoice vs existing invoices | Flag if likely duplicate |
| Anomaly detection | Transaction vs client history | Flag if unusual |
| WhatsApp query handling | Client message + client data | Natural language reply with correct figures |
| Payslip generation | Employee data + payroll inputs | Calculated payslip per employee |

**Per-client learning:**
Each client builds a profile over time — their suppliers, their typical expense categories, their seasonal patterns. The AI uses this to improve suggestion accuracy per client. Corrections made by the accountant feed back into the model.

---

## Layer 5 — Integrations

### Accounting Software

| Software | Integration Method | What We Pull / Push |
|----------|--------------------|---------------------|
| Xero | Official REST API + webhooks | Chart of accounts, transactions, invoices, contacts, bank feeds |
| Sage One | REST API | Same as Xero |
| QuickBooks | REST API + webhooks | Same as Xero |

**Sync strategy:** Pull data on demand + listen to webhooks for real-time updates. Never store financial data independently — always sync back to the source of truth (the accounting software).

### WhatsApp

| Option | Notes |
|--------|-------|
| WhatsApp Business API (via Twilio or 360dialog) | Production-grade, supports two-way messaging, templates |
| Meta Cloud API (direct) | Cheaper, more setup |

Each accounting firm gets their own WhatsApp number or uses the platform's shared number with client routing by WhatsApp number.

### SARS eFiling

SARS does not have a public API. Two options:

| Option | How | Tradeoff |
|--------|-----|----------|
| Browser automation | Playwright/Puppeteer logs into eFiling, fills the form, submits | Works now, fragile if SARS changes UI |
| Pre-fill + guide | System pre-fills all values, accountant pastes into eFiling manually | More manual, more reliable |

**Recommended start:** Pre-fill approach. Build browser automation once the product is proven and the volume justifies it.

### Email
- **Provider:** Resend (transactional email)
- **Used for:** Document request emails, report delivery, payment reminders, firm invoices

### Document Storage
- **Provider:** Supabase Storage or AWS S3
- **What's stored:** Uploaded bank statements, invoices, receipts, generated PDFs (payslips, management accounts, VAT summaries)
- **Retention:** 7 years (SARS audit requirement)

---

## Layer 6 — Database

**Provider:** Supabase (PostgreSQL)

**Core tables:**

| Table | Purpose |
|-------|---------|
| `firms` | Accounting firm accounts |
| `accountants` | Staff within each firm |
| `clients` | Business clients of each firm |
| `documents` | Every file uploaded — type, status, uploaded_at |
| `transactions` | Bank transactions per client |
| `ai_suggestions` | AI output per transaction — category, match, confidence |
| `confirmations` | Accountant decisions on each suggestion |
| `deadlines` | SARS deadlines per client |
| `payroll_runs` | Each payroll run — employees, amounts, status |
| `payslips` | Individual payslips per employee per run |
| `vat_returns` | VAT return per client per period |
| `reports` | Generated management accounts — link to PDF in storage |
| `messages` | Log of all WhatsApp and email messages sent |
| `invoices` | Firm's own invoices to clients |

**Row-level security:** Each firm can only see their own clients. Each client portal user can only see their own data.

---

## Deployment

| Component | Where |
|-----------|-------|
| Next.js app (dashboard + portal) | Vercel |
| Automation engine (n8n or BullMQ) | Railway or Render |
| Database | Supabase (managed PostgreSQL) |
| Document storage | Supabase Storage or S3 |
| AI calls | OpenAI API / Anthropic API |
| WhatsApp | Twilio or 360dialog |
| Email | Resend |

---

## What Gets Built First (Phase 1)

Do not build everything at once. Start with the highest-pain problem that proves the product works.

**Phase 1 — Document Chasing Bot**
- Client record setup
- WhatsApp integration (send + receive)
- Document upload link
- Document status tracking dashboard
- Automated follow-up sequence

**That alone is worth paying for.** Everything else is Phase 2 and beyond once the first clients are live.
