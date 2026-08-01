# Medical Billing — Integration Landscape (What Actually Exists)

## The Hard Truth

This is not a space where you find a REST API, get an API key, and start building. The SA medical billing ecosystem was built over 30 years on legacy EDI infrastructure. Most of it is closed, proprietary, and requires formal commercial agreements before you can touch it.

Every assumption about "connecting to their system" needs to be verified before it goes into a product plan.

---

## Billing Software — What Actually Exists

### GoodX
- **Public API:** None
- **Developer portal:** None
- **Integration docs:** None publicly available
- **What it has:** Pre-built closed integrations with MediSwitch/SwitchOn and MediKredit (for claims switching), MIMS/NAPPI drug databases, and myGrandCentral patient portal — all vendor-managed, not accessible to third parties
- **How to integrate:** Contact help@goodx.co.za and negotiate a commercial partnership. Timeline and cost unknown.
- **What we can use now:** CSV and Excel exports that GoodX generates — these are available to any user of the software and do not require API access

### Elixir-Live (Altron HealthTech)
- **Public API:** None
- **Developer portal:** None
- **Integration docs:** None publicly available
- **What it has:** Built-in integrations with SwitchOn (their own claims switch), RecoMed (telehealth), and Engage Mx (patient engagement) — all proprietary partnerships
- **How to integrate:** Contact Altron HealthTech directly. As the parent company of SwitchOn, any integration conversation goes through them.
- **What we can use now:** Data exports from Elixir-Live (CSV/Excel)

### Healthbridge
- **Public API:** None
- **Developer portal:** None
- **Integration docs:** None publicly available
- **What it has:** Three listed partner integrations (Retail Capital, RecoMed, SnapScan) — all closed partnerships
- **How to integrate:** Direct commercial arrangement required
- **What we can use now:** Data exports

---

## Medical Aids — What Actually Exists

### Discovery Health
- **Public API:** None
- **Developer portal:** None
- **HP Zone (provider portal):** Web-based portal for member validation, pre-auth, claims search — not accessible via API, human login required
- **HealthID:** Discovery's EHR platform for doctors — no public API
- **How claims reach Discovery:** Via claims switch (MediKredit or SwitchOn) — Discovery is on the receiving end, not offering direct integration
- **Contact for integration:** No public integration programme exists

### Momentum Health
- **Public API:** None
- **Developer portal:** None
- **Provider portal:** Web-based, human login required
- **How claims reach Momentum:** Via claims switch

### Bonitas
- **Public API:** None
- **Developer portal:** None
- **How claims reach Bonitas:** Via claims switch

### GEMS (Government Employees Medical Scheme)
- **Public API:** None
- **Developer portal:** None
- **What exists:** GEMS Provider App on Google Play (human-facing, not API-accessible), ICT Service Desk for internal issues
- **Internal note:** GEMS job listings reference SOAP and REST APIs used internally — confirming the technology exists but is not publicly exposed
- **How claims reach GEMS:** Via claims switch

---

## The Real Integration Layer — Claims Switches

This is where claims actually flow. Not directly to medical aids — through a switch in the middle.

### MediKredit
- **Website:** medikredit.co.za
- **What it is:** The leading claims switching service in SA — routes claims from practice software to medical aids
- **Integration method:** XML over HTTP with XSD schema validation
- **What the integration covers:**
  - Eligibility checks (is this patient covered?)
  - FamCheck (family member verification)
  - AuthCheck (pre-authorisation requests and responses)
  - Claims submission
  - Reversals and resubmissions
  - Remittance advice retrieval
- **Developer access:** Yes — but only through formal vendor accreditation
- **Accreditation process:** Apply as a PMS vendor → receive integration pack → build against their XML spec → test in their dedicated vendor testing environment (available 24/7) → go live after sign-off
- **Timeline:** Months, not weeks
- **Contact:** medikredit.co.za/clients/practice-management-software-vendors/
- **Why this matters:** This is the only way to programmatically submit claims and receive remittance data in SA. Everything else is manual.

### SwitchOn / MediSwitch (Altron HealthTech)
- **Website:** healthtech.altron.com/product-switchon/
- **What it is:** The other major claims switch — serves 8,000+ practices
- **Integration method:** XML-based, similar to MediKredit
- **Developer access:** Partial — documentation not publicly available, contact required
- **Accreditation process:** Similar to MediKredit — commercial arrangement and technical accreditation
- **Note:** Altron HealthTech owns both SwitchOn and Elixir-Live — any conversation about integrating with Elixir likely involves SwitchOn

---

## The One Accessible API — SpesNet

This is the only genuinely developer-accessible API found in the entire SA medical billing ecosystem.

- **Website:** spesnet.co.za
- **API docs:** api.spesnetgroup.co.za/docs/
- **Authentication:** OAuth 2.0
- **SDK:** NuGet packages for .NET available
- **Registration:** Required but not a formal accreditation process

**What the SpesNet API covers:**

| Endpoint | What It Does | Useful For |
|----------|-------------|-----------|
| Member Indicative Premium | Checks if an SA ID number has medical scheme commitments | Patient onboarding verification |
| Designated Service Provider | Validates if a provider is a DSP for a patient's plan | Prevents rejections before submission |
| Eligibility / Claim Validation | Validates claim data before submission | Pre-submission error catching |
| Health Code Index | Maps ICD-10, CPT4, procedure codes — validates combinations | Coding assistance tool |
| Funders File | Scheme administrator data | Reference data for all medical aids |

**What the SpesNet API does NOT cover:**
- Direct claims submission
- Pre-authorisation submission
- Remittance retrieval
- Real-time payment status

**Bottom line:** SpesNet is useful for validation and reference data. It is not a claims submission API. But the Health Code Index is exactly what we need for the coding assistance solution.

---

## What We Can Actually Do Without Accreditation

| Capability | How | Limitation |
|-----------|-----|-----------|
| Read rejection data | Import CSV/Excel exports from GoodX or Elixir | Manual export by billing person, not automated |
| Send patient follow-ups | WhatsApp Business API | Need WhatsApp Business API account |
| Process remittance files | Import files billing person downloads from portals | Still requires manual portal login |
| Validate ICD-10 codes | SpesNet Health Code Index API | Registration required, not claims submission |
| Check member eligibility | SpesNet Member Indicative Premium API | Indicative only, not definitive |
| Track pre-auths | Our own database | Manual capture, no automation |
| Doctor dashboard | Built from our own data | Only shows what we have tracked |

---

## The Path to Full Integration

| Stage | What | How | Timeline |
|-------|------|-----|----------|
| Now | Work with CSV exports and manual downloads | No integration needed | Immediate |
| 3–6 months | SpesNet API for code validation and eligibility | Register with SpesNet, build API integration | Weeks once registered |
| 6–12 months | Apply for MediKredit vendor accreditation | Contact MediKredit, begin accreditation process | Months |
| 12–18 months | Claims submission and remittance pull via MediKredit | After accreditation is complete | After accreditation |
| 18+ months | Full automation — no manual downloads, no portal logins | MediKredit or SwitchOn fully integrated | Year 2+ |

---

## First Contacts to Make (When Ready)

| Organisation | Contact | Purpose |
|-------------|---------|---------|
| SpesNet | api.spesnetgroup.co.za/docs/ — registration link on docs page | Code validation API — start here |
| MediKredit | medikredit.co.za/clients/practice-management-software-vendors/ | Switch accreditation — start conversations early even if building later |
| Altron HealthTech | healthtech.altron.com | SwitchOn accreditation + Elixir partnership |
| GoodX | help@goodx.co.za | Data export format documentation, potential partnership |

---

## The Honest Summary

Most of what was assumed about APIs in earlier planning documents was wrong. The SA medical billing ecosystem is largely closed. The integration path is:

1. **Start manual** — CSV exports, portal downloads, human screen access
2. **Use SpesNet** for code validation (the one real API available now)
3. **Apply to MediKredit** for switch accreditation — start early because it takes months
4. **Build automation progressively** as accreditations are granted

The business does not need full integration to start. Patient gap follow-up and rejection tracking via CSV exports can be live in weeks. Full claims automation is a year or more away.

Do not let the integration complexity stop the start. Start manually, validate the model, then build the integrations as the business grows.
