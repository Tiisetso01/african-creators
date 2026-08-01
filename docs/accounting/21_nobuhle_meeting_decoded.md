# Nobuhle Meeting — Decoded Transcript

## Who She Is (Clarified)

Nobuhle works at **Thuso Partners**, which operates as a **fund of funds** in private equity. This means:

- They do not invest directly into companies
- They invest into other funds (the underlying managers)
- Those underlying managers then invest into companies

She is the **operations person** sitting between:
- The underlying fund managers (who send her reporting)
- The external administrator (who processes everything officially)
- The end investors (who receive consolidated reporting from her)

This is different from BlueAlpha. BlueAlpha is a unit trust asset manager. Nobuhle works at a PE fund of funds. Different structure, same operational pain.

---

## Her Daily and Monthly Work

### What she manages:
- About **6 active funds** and **2 funds of funds**
- Cash flows going in and out of funds — managed daily
- Reporting to investors — monthly
- Capital calls (drawdowns) — when the fund requests money from investors
- Reconciling data from multiple underlying managers

### The data flow:
1. Underlying managers send her their reporting (in their own format, their own structure)
2. She also gets data from **Apex** (fund administrator) and a system she called **"Find Opus" or "FinPort"** (likely FinPort — a fund reporting platform)
3. She compares what the manager reported vs what Apex/FinPort shows — checks if they match
4. She uses the most accurate version and consolidates everything into one spreadsheet
5. She produces investor statements and reports from that consolidated spreadsheet

---

## The Exact Pain Points She Described

### 1. Every Manager Has a Different Format

Each underlying manager reports to her differently. Different structure, different classifications, different terminology. She has to manually interpret each one.

She specifically mentioned one manager (she called them something like "Resolve") as the worst:

> "Everything with them was so complex — from the way they capture their figures, how they classify things. Every time I receive their reporting I have to sit down and use my brain to figure out what this means and what they actually mean by these numbers."

This is exactly the problem the file parser needs to solve.

### 2. Systems Still Require Excel Checks on Top of Them

Even though the accounting system captures everything, they still run parallel Excel checks. The system cannot be fully trusted.

> "They input everything in the system, but they still require Excel to somewhat check their own outputs. That is where I am."

### 3. Reporting Takes a Full Day — For Two Funds

She said for two specific funds, producing the monthly NAV reporting takes her an **entire day**. For the others it is faster, but those two are intensive.

### 4. Capital Calls (Drawdowns) Are Consistently Problematic

When the fund calls capital from investors, the notices go out with errors regularly. Different investors expect different treatment. She has to manually explain and correct notices.

> "Multiple times they get complaints because of the compilations being done. Sometimes they don't have a standard treatment of how we treat whatever she is calling for. And I have to explain our treatment or change the notice."

### 5. Data Arrives as PDF — Must Be Manually Converted

A significant pain she raised at the end of the conversation:

> "I realized it is so much easier to get the data if it is already on an Excel document. What we receive is always in PDF. You have to copy. It is possible to read the PDF and put it inside Excel but the structure is tricky. It always breaks."

This is a direct product requirement — PDF ingestion and parsing.

### 6. No Standardization Across Managers

There is no enforced standard for how managers report to her. She has to follow each manager's own process and format. She cannot change it.

> "I have to follow the process that they were doing — whatever was done from day one, I have to follow that state. But I was able to change some things by showing them a better way and they adopted it."

She influences manager behavior by showing examples — but it is slow and not always accepted.

---

## What She Has Already Tried to Build

### At Apex (her previous employer)

When she worked at Apex, her team built a structured Excel workbook system:

> "We built Excel to the floor. We structured our Excel workbook full of pivot tables where the moment you inputted the information, it notified you properly — to the point where we had minimal errors. My investors probably would not even be the ones calling me at home because it would be quick and passed because we were not trusting the accounting system."

They did this because the accounting system was unreliable. They built their own parallel Excel infrastructure to compensate.

### At Thuso Partners (currently)

She is trying to build an internal dashboard:

> "We are trying to create a dashboard that when you open it, you just see all the information of the funds — the performance of the funds, the cash, the line manager reports. So you can see each line manager and how each company is doing."

This dashboard is not built yet. It is an initiative in progress. She is actively looking for a solution.

---

## What She Said About Security and Data

This is critical. She flagged compliance constraints around data early in the conversation:

> "When I joined I wanted to simplify the information we get from the managers. But I was told I cannot do that because there are certain limitations in terms of what I can receive and how we keep the data and who is in the room. There are certain things you have to consider — the managers themselves, when they give us data, have to make sure they only give us data that is specifically planned. Some data has to be stored outside — for the country itself. Also there is deep research needed on data retention and who is exposed to that kind of data."

**This means:** Any tool you bring to her will face a compliance and data security review before it can be used. This is not a blocker — it is a known step in the sales process for financial services. Be ready for it.

---

## What She Said About the Market

She offered to introduce you to other people:

> "Maybe one thing I can also do is reach out to one of my administrators that I am close to — people I know that work in fund administration — and see if they can also talk and give you their perspective."

She also said:

> "Financial services is always — there is always a problem. There is always something and the whole process is always a mess. We are searching high and low. One of my jobs is to improve the process. I am always looking for a way to make things more effective."

This tells you that the pain is industry-wide and people are actively looking for solutions.

---

## What She Said About a Potential Tool

When asked if she would consider testing a tool:

> "Yes — something that we are also currently looking at too."

Then later:

> "If your tool that you come up with can help us — in-house or for clients — you can. Because what we are trying to do now is create a dashboard where the moment you open it you see the performance of all the funds, the cash, the line manager reports."

She is describing exactly what you are building. She does not know it yet.

---

## The One Format Problem She Raised That Is Worth Noting

She described a specific scenario that is a product insight:

> "You have one source of data, but you have to give it to five different clients. Each one wants their data in a specific format. If you just have one centralized place where you say — I am generating data for all of these people, but processing that data differently for each person who needs it — instead of creating a new file for each one every time."

This is the multi-output problem. One data source, multiple formatted outputs for different investors or stakeholders. This is a feature, not just a workflow.

---

## Key Differences From BlueAlpha

| | BlueAlpha (your friend) | Nobuhle (Thuso Partners) |
|---|---|---|
| Structure | Unit trust asset manager | PE fund of funds |
| Data source | Apex (administrator) + StatPro + Bloomberg | Underlying managers + Apex + FinPort |
| Reporting cycle | Daily — 12pm deadline | Monthly — investor statements |
| Data format received | Excel files via email | Mix of PDF and Excel from managers |
| Main output | Morning Flow + Performance Report | Investor statements + NAV reporting |
| Biggest pain | Daily manual copy-paste across systems | PDF parsing + manager format inconsistency |
| Regulatory document | MDD (monthly, CISCA regulated) | Investor statements + capital call notices |

---

## What This Meeting Confirmed

1. **The problem is real across fund types** — not just unit trusts. PE fund operations has the same manual data pain, different flavour.

2. **PDF ingestion is a real requirement** — multiple data sources arrive as PDFs, not Excel. Your parser needs to handle both.

3. **Multi-format output is a real requirement** — one data set needs to be formatted differently for different investors or stakeholders.

4. **Security and compliance will always come up** — every financial services firm will ask about data storage, access control, and data residency before signing anything.

5. **She is actively looking for a solution** — she is not a passive research contact. She is building an internal dashboard right now and would consider an external tool.

6. **She can open doors** — she offered introductions to fund administrators and other operations people. This is your path to conversations 3, 4, and 5.

---

## Immediate Next Steps From This Meeting

1. **Follow up with Nobuhle** — thank her, remind her of the introduction she offered to her administrator contacts.

2. **Ask her one specific follow-up question:** "The dashboard you are trying to build internally — what is the biggest blocker right now? Is it the data coming in as PDFs, the different formats from each manager, or something else?"

3. **Add PDF parsing as a confirmed product requirement** — this came up unprompted and clearly. It is not optional.

4. **Note the multi-output requirement** — one source, multiple formatted outputs. Add to product spec.

5. **Prepare a data security response** — before you go back to her or anyone else in financial services, have a clear answer to: where is data stored, who has access, how long is it retained, what happens when the contract ends.
