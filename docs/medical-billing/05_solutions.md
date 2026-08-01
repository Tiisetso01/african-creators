# Medical Billing — Automation Solutions

## The Core Mechanic (Same as Accounting)

**System handles the repetitive work. Human makes the decisions.**

The billing person cannot be replaced — they carry legal and clinical accountability. But everything that is rule-based, repetitive, and schedulable can be automated. That frees the billing person to handle the work that genuinely needs a human: appeals, patient disputes, complex queries.

---

## Critical Reality: No Direct APIs Exist

Before reading the solutions below, understand the actual integration landscape:

- **GoodX, Elixir, Healthbridge** — no public APIs, no developer portals, closed systems
- **Discovery, Momentum, Bonitas, GEMS** — no public APIs, no direct integration possible
- **Claims do not go directly to medical aids** — they go through a switch (MediKredit or SwitchOn) which routes them
- **To integrate with the switch programmatically** — you must go through a formal vendor accreditation process with MediKredit or Altron HealthTech (months, not days)
- **The only accessible API** — SpesNet has a REST API for member verification and code mapping, not claims submission

**What this means:** Most solutions below start manually — using screen access to the practice's existing software — and automate progressively as integrations are built. We are not plugging into an API on day one. We are working alongside the software that already exists.

See `07_integrations.md` for the full technical landscape.

---

## Solution 1 — Rejection Intelligence and Follow-Up

**The problem it solves:** Rejected claims that never get followed up because there is no time.

**How it actually works (honest version):**

Phase 1 — Manual service:
- We get read access to the practice's billing software
- We review all rejections weekly ourselves
- For each rejection, we identify the reason, suggest the fix, and prepare the corrected claim for the billing person to approve and resubmit
- We track every rejection and its outcome in a separate log

Phase 2 — Semi-automated (once we understand the patterns):
- Build a simple tool that imports rejection exports from GoodX/Elixir (both can export data as CSV/Excel even without an API)
- AI reads the rejection reason codes and categorises what happened
- Suggests the correction — billing person confirms
- Tracks resubmission outcomes manually until a switch integration is built

Phase 3 — Fully automated (after switch accreditation):
- System monitors claims in real time via MediKredit integration
- Rejections flagged instantly, corrections suggested, resubmissions tracked automatically

**Before:** Billing person manually reviews every rejection — hours a week, many never followed up.
**After (Phase 1):** We do it for them. They approve corrections in 10 minutes.

---

## Solution 2 — Pre-Auth Preparation (Not Automation)

**The problem it solves:** 1–4 hours a day on hold with medical aids.

**Honest reality:** Pre-auth cannot be submitted automatically — medical aids do not have APIs for it. The call still has to happen. What we can do is eliminate the preparation time.

**How it works:**
- When a procedure requiring pre-auth is identified, system prepares everything the billing person needs before they pick up the phone:
  - Patient details pre-filled
  - Correct procedure codes listed
  - Diagnosis codes listed
  - Doctor's practice number ready
  - Expected questions from the medical aid pre-answered
- Call that took 20 minutes of fumbling through files now takes 5 minutes
- Auth number captured into our tracking system as soon as the call ends
- Auth validity period tracked — alert sent 3 days before expiry

**What we cannot do yet:** Submit the pre-auth electronically. That requires MediKredit accreditation. It is on the roadmap, not day one.

---

## Solution 3 — Patient Gap Billing Follow-Up

**The problem it solves:** R50,000+ a month in uncollected gap payments.

**This is the easiest solution to build — no integration required.**

How it works:
- Billing person exports outstanding patient accounts from GoodX/Elixir (both support exports)
- We import that list and trigger automated follow-up sequences via WhatsApp and email
- Day 7 no payment → WhatsApp reminder sent automatically
- Day 14 no payment → second message, firmer tone
- Day 30 no payment → billing person flagged to call (with full account context on screen)
- Day 60 no payment → formal demand generated and sent
- Day 90 no payment → debt collection referral list generated for practice manager to approve

Patient replies:
- "I want to pay" → payment link sent instantly (Peach Payments or PayFast integration)
- "I dispute this" → flagged for billing person to handle
- "Can I pay in instalments?" → billing person notified to set up arrangement

**Why start here:** No API needed. CSV export from any billing software. WhatsApp Business API is the only integration required. This can be live in weeks, not months.

---

## Solution 4 — Reconciliation Assistance

**The problem it solves:** Full-day manual reconciliation across 10+ medical aid portals.

**Honest reality:** We cannot connect directly to medical aid portals via API — they do not have them. But we can eliminate most of the manual work using what is available.

How it works:
- Billing person downloads remittance files from each portal (still manual — one login per aid)
- Uploads all files to our system in one place (drag and drop)
- System reads all remittance formats (Excel, PDF, CSV — each medical aid sends a different format)
- Matches each line to the claim export from the billing software automatically
- Short-payments flagged with the delta
- Claims missing from remittance flagged as pending or lost
- Full reconciliation report ready in minutes instead of hours

**Before:** Billing person spends a full day switching between portals, matching lines manually.
**After:** Downloads take 30 minutes. Our system does the matching. Billing person reviews exceptions only.

**Future state:** Once MediKredit accreditation is complete, remittance data can be pulled automatically — the portal logins go away entirely.

---

## Solution 5 — Real-Time Doctor Dashboard

**The problem it solves:** Doctor has no visibility until month end.

**No integration required for Phase 1** — data comes from billing software exports and our own tracking.

What the doctor sees on their phone:
- Revenue billed this week (from our tracking of claims submitted)
- Revenue collected vs outstanding (from reconciliation data we process)
- Rejection rate and top rejection reasons this month
- Patient accounts by age (30 / 60 / 90 days overdue)
- Pre-auths expiring this week

Built as a simple web dashboard — no app store, no install. Doctor opens a link on their phone.

---

## Solution 6 — Coding Assistance at Point of Capture

**The problem it solves:** Wrong ICD-10 or procedure codes cause rejections discovered weeks later.

**Integration available:** SpesNet's REST API provides a Health Code Index — maps ICD-10 codes, procedure codes, and validates combinations. This is one of the few real APIs in this ecosystem and it is exactly what we need for this solution.

How it works:
- Billing person types the diagnosis in plain language
- System queries SpesNet Health Code Index and suggests the correct ICD-10 code
- System checks the procedure codes against the diagnosis and flags known invalid combinations
- System checks via SpesNet whether pre-auth is likely required for this procedure
- Claim is validated before submission — not after rejection

**This can be built now.** SpesNet API is documented, accessible, and requires registration but not a long accreditation process.

---

## Solution 7 — Institutional Knowledge Capture

**The problem it solves:** When the billing person leaves, all knowledge walks out the door.

**No integration required.** This is a logging and documentation layer that sits on top of everything we do.

How it works:
- Every action we take on a claim is logged — what the rejection was, what we did, what the outcome was
- Common rejection fixes per medical aid are documented and searchable
- Payment arrangements with patients are recorded
- Appeals in progress tracked with deadlines
- New billing person (or new team member at our end) can see the full history of every account

---

## Solution 8 — Pre-Auth Tracker

**The problem it solves:** Pre-auths expire, claims get rejected weeks later because nobody tracked the validity period.

**No integration required** — we track auth numbers and expiry dates in our own system.

How it works:
- Every pre-auth captured when the billing person completes the call
- Validity period logged
- Alert sent to billing person 3 days before expiry if treatment not yet completed
- All pending pre-auths visible in one screen per patient
- When claim is submitted, billing person checks our tracker for the correct auth number

---

## What We Do Not Build (Boundaries)

| What | Why Not |
|------|---------|
| Replace GoodX, Elixir, or Healthbridge | Too entrenched, data lives there, practices will not switch |
| Submit claims directly to medical aids | No API exists — goes through switch, requires accreditation |
| Automate pre-auth submission | No API from medical aids — requires phone call |
| Handle clinical coding decisions | Doctor or qualified coder makes the final call — we suggest, they confirm |
| Manage clinical records or EHR | POPIA, HPCSA — separate product entirely, different risk profile |
| Connect to MediKredit switch immediately | Formal vendor accreditation required — Phase 2 at earliest |

---

## Build Order (Realistic)

| Phase | What to Build | Integration Needed |
|-------|--------------|-------------------|
| Phase 1 | Patient gap follow-up (WhatsApp sequences) | WhatsApp Business API only |
| Phase 1 | Rejection log and tracking (manual import from CSV exports) | None |
| Phase 1 | Pre-auth tracker (manual capture, automated alerts) | None |
| Phase 2 | Coding assistant using SpesNet Health Code Index API | SpesNet REST API |
| Phase 2 | Reconciliation matching (billing person still downloads, we process) | None |
| Phase 2 | Doctor dashboard (built from our own tracking data) | None |
| Phase 3 | Switch integration via MediKredit accreditation | MediKredit XML/XSD |
| Phase 3 | Automated remittance pull (remove portal logins) | MediKredit or SwitchOn |

---

## Revenue Model

| Stream | How |
|--------|-----|
| Percentage of recovered rejections | 15–20% of whatever we recover — zero risk for the practice |
| Monthly platform fee | Once automated tools are built — per practice, based on patient volume |
| Patient collections cut | Small percentage of gap payments collected via our system |
| Setup fee | One-time fee for onboarding, connecting to their exports, configuring sequences |

**Start with percentage-of-recovery only.** The pitch is: "We only make money when you make money." No upfront cost, no risk for the practice. Once we prove value, layer in the monthly fee.
