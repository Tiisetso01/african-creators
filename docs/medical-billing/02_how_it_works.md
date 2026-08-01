# Medical Billing in SA — How It Actually Works

## The Players

| Player | Who They Are | Role |
|--------|-------------|------|
| **Practice** | GP, specialist, physio, dentist, allied health | Provides the service, submits the claim |
| **Patient** | The person being treated | Has medical aid, pays the gap |
| **Medical Aid** | Discovery, Momentum, Bonitas, GEMS, Medihelp, Bestmed | Pays the portion they cover |
| **Billing Person** | Receptionist or dedicated billing admin | Does all the admin work |
| **Billing Software** | GoodX, Elixir-Live, Healthbridge, Rx Systems | The system they capture everything into |
| **Billing Company** | Outsourced billing bureaus | Some practices outsource billing entirely |

---

## The Codes — Why This Is Complex

Every claim submitted to a medical aid must contain three types of codes correctly combined:

### ICD-10 Codes (Diagnosis)
What was wrong with the patient. Over 70,000 codes exist. Example:
- `J06.9` — Acute upper respiratory infection, unspecified (common cold)
- `M54.5` — Low back pain
- `E11.9` — Type 2 diabetes without complications

The code must match the procedure. If they don't align, the claim is rejected.

### Procedure / Tariff Codes
What the doctor did. Based on the NHRPL (National Health Reference Price List) or medical aid-specific tariff schedules. Example:
- `0190` — Consultation, new patient, level 1
- `0191` — Consultation, established patient
- `2540` — ECG with interpretation

### NAPPI Codes
Medicines and consumables dispensed. Each product has a unique NAPPI number. These are included when the practice dispenses medication or uses consumables.

---

## The Monthly Cycle

### Daily — Consultation and Capture
```
Patient arrives → receptionist verifies medical aid membership
    │
    ├── Check if patient's benefits are still active
    ├── Check if pre-authorisation is required for the procedure
    │       └── If yes: call medical aid, wait on hold, get auth number
    │
Doctor sees patient
    │
    ├── Doctor records diagnosis and procedures on encounter form or in system
    │
Billing person captures the claim:
    ├── Select correct ICD-10 code(s) for the diagnosis
    ├── Select correct procedure/tariff code(s)
    ├── Add NAPPI codes if medication was dispensed
    ├── Attach pre-auth number if applicable
    └── Submit claim electronically to medical aid via billing software
```

### Daily to Weekly — Claims Processing
```
Medical aid receives claim
    │
    ├── Auto-adjudication: claim processed immediately if codes are clean
    │       └── Payment reflects on next payment run (weekly or bi-weekly)
    │
    └── Manual review: flagged if:
            ├── Code combination is unusual
            ├── Pre-auth missing or expired
            ├── Patient benefits exhausted
            ├── Duplicate claim detected
            └── Provider not registered on patient's plan
```

### Monthly — Reconciliation and Collections
```
Billing person pulls statement from medical aid portal
    │
    ├── Match payments received against claims submitted
    ├── Identify short-payments (medical aid paid less than claimed)
    ├── Identify rejections (medical aid paid nothing)
    ├── Identify pending claims (still processing)
    │
For each rejection:
    ├── Read the rejection reason code
    ├── Investigate: wrong code? missing auth? patient not covered?
    ├── Correct the claim
    └── Resubmit — and wait again
    │
For each short-payment:
    ├── Calculate the gap (difference between claimed and paid)
    ├── Generate patient statement for the gap amount
    └── Send to patient — and then chase for payment
    │
For outstanding patient accounts:
    ├── Print or email statements
    ├── Follow up by phone or SMS
    └── Escalate to debt collection if 90+ days overdue
```

---

## The Medical Aids and How They Differ

| Medical Aid | Market Share | Key Notes |
|-------------|-------------|-----------|
| **Discovery Health** | ~30% of SA market | Most complex rules, highest tariffs, fastest processing |
| **Momentum Health** | ~10% | Multiple plans with different benefit structures |
| **Bonitas** | ~8% | Strong in public sector, complex plan variations |
| **GEMS** | ~7% | Government Employees Medical Scheme, stable but slow |
| **Medihelp** | ~5% | Smaller, fewer plan complexities |
| **Bestmed** | ~4% | Known for good service levels |
| **Other schemes** | ~36% | 20+ smaller schemes, each with own rules |

A busy GP practice deals with all of them simultaneously. Each has its own:
- Submission portal or EDI channel
- Tariff schedule (what they'll pay for each code)
- Pre-authorisation requirements
- Rejection reason codes
- Payment schedule
- Appeal process

---

## Pre-Authorisation — The Biggest Time Sink

Some procedures require the medical aid's approval **before** the patient is treated. Without it, the claim is rejected regardless of how correct the coding is.

**Procedures commonly requiring pre-auth:**
- Hospital admissions
- MRI and CT scans
- Certain specialist consultations
- Surgical procedures
- Chronic medication registration
- Oncology treatment

**The pre-auth process:**
1. Billing person or nurse calls the medical aid's pre-auth line
2. Wait on hold — average 15–45 minutes per call
3. Provide: patient details, diagnosis, procedure codes, treating doctor details
4. Medical aid gives a reference number (valid for a specific date/period)
5. Reference number must be captured on every claim related to that episode

One hospital admission can require multiple pre-auths across different departments. A busy practice can spend 3–4 hours a day just on pre-authorisation calls.

---

## Tariff Negotiations and the Gap

Medical aids do not pay the full fee the doctor charges. They pay according to their tariff schedule — typically a percentage of the NHRPL (National Health Reference Price List).

- Discovery might pay 200% of NHRPL
- Bonitas might pay 100% of NHRPL
- A hospital plan might pay only 80% of NHRPL

The doctor charges their own rate (usually higher). The difference — called the **gap** — is billed to the patient.

Gap billing creates a second collections cycle on top of the medical aid collections cycle. Two sets of accounts to manage, two sets of follow-ups, two sets of outstanding balances.

---

## Annual Work (On Top of Daily/Monthly)

- **HPCSA renewal** — practitioners renew registration annually
- **BHF registration** — practices register with Board of Healthcare Funders to submit claims
- **Tariff schedule updates** — medical aids update tariffs annually, billing software must be updated
- **ICD-10 code updates** — codes change, retired codes cause rejections if not updated
- **Practice accreditation** — some medical aids require periodic re-accreditation
