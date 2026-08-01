# Medical Billing — User Flows

## Actors

| Actor | Who | What They Need |
|-------|-----|---------------|
| **Doctor / Practice Owner** | GP, specialist, physio, dentist | See their revenue position, know claims are being followed up |
| **Billing Person** | Receptionist or dedicated billing admin | Get through the work without spending all day on hold or chasing |
| **Patient** | The person being treated | Understand what they owe and why, pay easily |
| **Medical Aid** | Discovery, Momentum, Bonitas, etc. | Receive correctly coded claims, pay valid ones |

---

## Flow 1 — Daily Claim Submission

```
Patient arrives at practice
    │
    ├── Billing person verifies medical aid membership in real time
    │       └── System checks: Is the patient active? What plan are they on? 
    │           Benefits remaining? Any alerts?
    │
    ├── Pre-auth check:
    │       └── Does this consultation/procedure require pre-authorisation?
    │               If YES → Flow 2 (Pre-Auth)
    │               If NO  → proceed
    │
Doctor sees patient → records diagnosis and procedures
    │
    ├── Billing person opens billing software (GoodX / Elixir / Healthbridge)
    ├── Creates encounter for the patient
    ├── Selects ICD-10 diagnosis code(s)
    ├── Selects procedure/tariff code(s)
    ├── Adds NAPPI codes for any medication or consumables
    ├── Attaches pre-auth number if applicable
    ├── Checks for obvious code conflicts before submitting
    └── Submits claim electronically to medical aid
```

---

## Flow 2 — Pre-Authorisation

```
Billing person or nurse identifies procedure requiring pre-auth
    │
    ├── Calls medical aid pre-auth line
    ├── Waits on hold (15–45 minutes)
    ├── Provides: patient ID, medical aid number, diagnosis, procedure codes,
    │            treating doctor's practice number, proposed date of service
    │
    ├── Medical aid approves or requests more information
    │       If approved:
    │           ├── Gets authorisation reference number
    │           ├── Notes validity period (specific dates)
    │           ├── Records auth number in billing software against patient
    │           └── Proceeds with treatment and claim
    │
    │       If more info required:
    │           ├── Doctor prepares motivation letter or clinical notes
    │           ├── Fax or email to medical aid
    │           ├── Wait 24–72 hours for response
    │           └── Follow up if no response received
    │
    └── If denied:
            ├── Request formal denial in writing
            ├── Doctor reviews and decides whether to appeal
            ├── Appeal submitted with clinical motivation
            └── Wait — average 5–10 business days for appeal outcome
```

---

## Flow 3 — Claim Rejection Follow-Up

```
Weekly: Billing person downloads remittance from each medical aid portal
    │
    ├── Imports remittance into billing software
    ├── System matches payments to claims
    │
    ├── For each rejection:
    │       ├── Read rejection reason code
    │       ├── Look up what the code means
    │       ├── Pull original claim and patient file
    │       │
    │       ├── Wrong code → correct and resubmit
    │       ├── Missing pre-auth → call medical aid, appeal
    │       ├── Patient not on plan → switch to patient billing (Flow 5)
    │       ├── Benefits exhausted → switch to patient billing (Flow 5)
    │       └── Duplicate → provide proof it is not a duplicate, resubmit
    │
    └── Track resubmissions — follow up if no payment after 21 days
```

---

## Flow 4 — Payment Reconciliation

```
Medical aid processes payment run (weekly or bi-weekly)
    │
    ├── Payment deposited to practice bank account (lump sum)
    ├── Remittance advice sent (Excel / PDF / portal download)
    │
    ├── Billing person logs into each medical aid portal
    ├── Downloads remittance for each scheme
    │
    ├── For each line on remittance:
    │       ├── Match to original claim in billing software
    │       ├── Check: was full amount paid?
    │       │       If YES → mark claim as paid
    │       │       If NO  → flag as short-payment, calculate gap
    │       └── Update claim status
    │
    ├── Identify claims submitted but not on remittance:
    │       ├── Still processing? → check portal status
    │       └── Lost? → resubmit
    │
    └── Produce reconciliation report for practice manager / doctor
```

---

## Flow 5 — Patient Gap Billing and Collections

```
Medical aid payment processed, gap calculated
    │
    ├── Patient statement generated (amount owed + breakdown)
    ├── Statement emailed or posted to patient
    │
    ├── Day 7 — no payment: SMS reminder sent
    ├── Day 14 — no payment: second reminder (phone call or SMS)
    ├── Day 30 — no payment: billing person calls personally
    ├── Day 60 — no payment: final demand letter
    ├── Day 90 — no payment: referred to debt collection agency
    │
    ├── Patient disputes the amount:
    │       ├── Billing person investigates
    │       ├── Pulls original claim and medical aid EOB
    │       ├── Explains the gap calculation to patient
    │       └── Resolves or escalates to practice manager
    │
    └── Patient requests payment arrangement:
            ├── Billing person records arrangement
            ├── Monitors monthly payments manually
            └── Follows up if payment missed
```

---

## Flow 6 — Doctor's Daily Visibility (Currently Does Not Exist)

```
What the doctor wants to see every morning:
    │
    ├── Revenue billed yesterday
    ├── Revenue collected this week
    ├── Outstanding claims by age (30 / 60 / 90 days)
    ├── Top rejection reasons this month
    ├── Patient accounts overdue
    └── Cash in practice bank account
    
What actually happens:
    └── Doctor asks billing person → billing person pulls reports manually
        → doctor gets a verbal summary → no visibility until end of month
```

---

## Flow 7 — New Patient Onboarding

```
New patient arrives or books appointment
    │
    ├── Receptionist collects:
    │       ├── Medical aid name and plan
    │       ├── Medical aid membership number
    │       ├── Principal member details (if patient is a dependent)
    │       ├── ID number
    │       └── Contact details
    │
    ├── Verifies membership is active with medical aid
    ├── Captures patient details in billing software
    ├── Checks if practice is registered on patient's medical aid plan
    │       If not → inform patient they will be billed privately
    └── Saves file — ready for first claim
```
