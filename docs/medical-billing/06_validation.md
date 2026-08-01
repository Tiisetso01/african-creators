# Medical Billing Automation — Validation Strategy

## The Honest Starting Point

Do not build anything yet. The accounting sector comes first.

Medical billing has real pain but higher barriers — regulation, data sensitivity, domain complexity. The right move is to validate it properly before committing any build time to it.

Validation here means: find 3 billing people willing to show you their day. Not pitch them. Watch them work.

---

## What We Need to Validate

| Question | Why It Matters |
|----------|---------------|
| Which rejection type costs them the most money? | Tells us where to start building |
| Do they track rejections at all? | If they don't track it, they don't know what they're losing |
| How much time does reconciliation actually take? | Size of the time-saving opportunity |
| Would they pay a % of recovered revenue? | Tests the performance pricing model |
| Who makes the buying decision? | Doctor or practice manager — determines who to sell to |
| Are they on GoodX, Elixir, or Healthbridge? | Determines which integration to build first |
| How many medical aids do they deal with daily? | Scopes the reconciliation problem |
| Has their billing person left recently? | Creates urgency around institutional knowledge |

---

## How to Find People to Talk To

**LinkedIn:**
Search: `"medical billing" "South Africa"` or `"practice manager" "GP" "South Africa"`
Look for: Practice managers, billing administrators, medical billing consultants

**Facebook Groups:**
- "South African Medical Receptionists and Practice Managers" — active community, honest conversations
- "SA Medical Billing Practitioners" — if it exists, check

**Directly:**
Walk into any private GP practice. Ask to speak to the practice manager. Say:
> "I'm researching how medical billing works in SA — specifically around rejection follow-up and reconciliation. Would you be willing to give me 20 minutes?"

Most will say yes. Practices are not suspicious of curiosity. They are suspicious of sales pitches.

**Medical billing bureaus:**
Companies that do outsourced billing for practices. They have the highest concentration of pain because they deal with hundreds of practices simultaneously. Names to look for: Healthman, MedBill, Medbillpro, PBX Medical Billing.

---

## Who to Approach First

**Target: Small-to-medium private GP practices**
- 1–3 doctors
- 1–2 billing people
- 30–60 patients a day
- Dealing with 5–10 different medical aids

**Why this size:**
- Small enough that the billing person is doing everything manually
- Large enough that the rejection volume is significant
- The doctor is also the owner — one decision maker, fast yes or no
- No procurement process, no committee

**Not yet:**
- Hospital groups — too large, too institutional, too slow
- Single-person practices — too small, not enough volume to justify the cost
- Specialists — more complex coding, more pre-auth requirements, better to learn GPs first

---

## The 3-Conversation Test

Before writing a line of code or building anything, have 3 conversations with billing people.

In each conversation, ask:

1. "Walk me through what you did yesterday — from first patient to end of day."
2. "Which part of that do you dread the most?"
3. "If you could remove one thing from your day, what would it be?"
4. "How do you currently track rejected claims?"
5. "Roughly what percentage of your submitted claims get rejected?"
6. "What happens to the ones you don't have time to follow up?"
7. "If someone could recover those rejected claims for you and take 20% of what they recover — would that be interesting?"

Listen for:
- Do they mention document chasing? (same as accounting)
- Do they mention reconciliation taking a full day?
- Do they know their rejection rate off the top of their head? (If yes, they care about it. If no, they're not tracking it.)
- Does the doctor have any visibility at all? (Usually no.)

If 2 out of 3 mention the same pain unprompted — that is where to start building.

---

## The Minimum Viable Product (If Validated)

Do not build a platform. Build one thing that solves one problem.

**Start with: Rejection Follow-Up as a Service**

Manually, using the practice's existing software access:
- Review their rejections weekly
- Identify which ones can be fixed and resubmitted
- Correct and resubmit on their behalf
- Charge 20% of whatever is recovered

No product. No code. Just the service. This proves:
- Practices will pay for it
- The recovery rate justifies the model
- You learn the domain deeply before building anything

Do this for 2–3 practices for 3 months. Then decide what to automate.

---

## Competitive Landscape

| Competitor | What They Do | Gap |
|-----------|-------------|-----|
| **GoodX** | Practice management software with billing | Does not automate rejection follow-up or patient collections |
| **Elixir-Live** | Similar to GoodX | Same gap |
| **Healthbridge** | EDI submission and some analytics | No automation layer for follow-up |
| **Outsourced billing bureaus** | Full-service billing outsourcing | Expensive (5–10% of gross revenue), no technology advantage |
| **MedEbridge** | Claims switching and EDI | Infrastructure layer, not automation layer |

**The gap:** Nobody is doing automated rejection follow-up with AI-assisted coding correction. Nobody is doing automated patient gap collection via WhatsApp. Nobody is giving the doctor a real-time dashboard without asking them to change their software.

---

## Regulatory Considerations (Non-Negotiable)

Before touching any patient data in a production environment:

- **POPIA compliance** — Patient data is the most protected category. A data processing agreement must be in place with every practice.
- **HPCSA awareness** — Not directly regulated by HPCSA but must not cross into clinical decision-making. Coding suggestions are administrative, not clinical.
- **CMS (Council for Medical Schemes)** — Any system that interacts with medical aid claims must understand CMS regulations on claim submission.
- **Cyber liability insurance** — Before handling any patient financial data at scale.

Get a healthcare data compliance consultant to review before any production launch. This is not optional.

---

## The Honest Timeline

| Phase | What | When |
|-------|------|------|
| Now | Focus on accounting sector — first customers, first revenue | Months 1–3 |
| Month 3 | Have 3 conversations with billing people — validate the pain | Month 3 |
| Month 4 | If validated: offer rejection follow-up as a manual service to 2 practices | Month 4–6 |
| Month 7 | If service works: decide whether to build the automation layer | Month 7+ |
| Month 12+ | If building: start with rejection intelligence + patient follow-up bot | Year 2 |

The accounting sector is the training ground. The processes, the automation patterns, the client relationships — all of it transfers. Medical billing is the same playbook with higher stakes.
