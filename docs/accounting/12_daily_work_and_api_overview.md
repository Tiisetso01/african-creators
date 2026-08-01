# Daily Work, APIs, and Build Strategy — Overview

## The Daily Work — Should We Build That Too?

Yes, and it is actually simpler than the MDD. Here is why.

The MDD requires calculations — standard deviation, max drawdown, cumulative returns, chart generation, PDF formatting. The daily reports are mostly just: read this file, extract these rows, put them here, send. Less complexity, faster to build.

The daily reports are also more painful than the MDD — they happen every single day with a hard 12pm deadline. The MDD happens once a month. If you automate the daily reports, she feels the relief immediately, every morning.

The boss asked for one report as proof. But if you show up with:
- The MDD automated (monthly)
- The daily flows report automated (daily)
- The daily performance report automated (daily)

That is a much stronger case than just the MDD alone.

And more importantly — the daily work is not separate from the MDD. The daily data is what builds the MDD. Every number in the MDD came from the daily pipeline. You cannot automate the MDD without first automating the daily data collection. Build both. They are the same system.

---

## Do These Systems Actually Have APIs?

Yes — all of them have APIs. But none of them are free or easy to access without a commercial agreement.

| System | API Exists? | Reality |
|--------|------------|---------|
| **Bloomberg** | Yes — BLPAPI | Requires a Bloomberg Terminal (~R450,000/year). If the company already has terminals, API access can be requested — but it is enterprise-level, not plug-and-play |
| **IRESS** | Yes — IRESS API | Requires a commercial agreement with IRESS. The company already pays for IRESS, so access is possible but needs to be formally requested from their account manager |
| **StatPro / Confluence** | Yes | Enterprise only — same situation. Access negotiated through existing subscription |
| **FactSet** | Yes — developer.factset.com | Requires a FactSet subscription, which the company has. FactSet is the most developer-friendly of all these systems |
| **Apex** | Limited | No clean public API. Data delivery happens via email or SFTP. Negotiate SFTP access with the Apex account manager |
| **Microsoft Teams** | Yes — Microsoft Graph API | Well documented, free to use, standard OAuth 2.0 |

The APIs exist. The barrier is not whether they exist — it is getting credentialed access to them. Since the company already subscribes to all of these platforms, the conversation is not about buying access. It is about requesting API credentials tied to what they already pay for.

---

## The Practical Approach — Work With What Already Exists

The file-based approach does not require API negotiations. It works from day one using files the company already receives and downloads every day.

### Daily Flows Report

**Right now:**
Apex sends email → she opens it → downloads Excel → filters by date → copies rows → pastes into Morning Flow Excel → posts to Teams

**With the tool:**
Apex sends email → tool reads the attachment automatically → extracts that day's rows → populates the flows report → posts to Teams

What gets built: an email parser that reads the Apex attachment the moment it arrives, finds the rows for today's date, extracts deposit and redemption entries for each portfolio, and formats the output. No Bloomberg needed. No IRESS needed. Just the Apex email.

### Daily Performance Report

**Right now:**
She exports from StatPro → exports from Bloomberg → exports from FactSet → pastes all three into Excel → Excel calculates the comparison → she posts to Teams

**With the tool:**
She uploads the three export files (drag and drop) → tool reads all three → calculates portfolio vs benchmark → generates the comparison report → posts to Teams

What gets built: a file upload interface. She drops in the three exports. The system reads them, runs the comparison, and outputs the report. She reviews and clicks send.

This cuts her morning from 3 hours to 20 minutes.

---

## The Build Order

| Phase | What Gets Built | Effort | Impact |
|-------|----------------|--------|--------|
| **1** | Daily flows — email parser reads Apex attachment → auto report → Teams | Medium | Felt every morning, immediately |
| **2** | Daily performance — file upload for 3 exports → auto comparison → Teams | Low | Removes the paste work daily |
| **3** | MDD report — monthly data already stored from phases 1 and 2 → auto calculations → PDF output | Medium | Monthly, impresses the boss |
| **4** | API connections — connect directly to IRESS, Bloomberg, FactSet, Apex SFTP | High | Removes even the file upload step |

Phase 1 and 2 solve her daily pain immediately. Phase 3 wins the contract. Phase 4 makes it a premium product worth significantly more.

---

## What to Get From Her Before Building Anything

### From her directly:
- A sample of the Apex email with the Excel attachment — to understand the exact column structure
- A sample export from StatPro for one day
- A sample export from Bloomberg for one day
- A sample export from FactSet for one day
- The current Morning Flow Excel — to understand what the output should look like
- The current Performance Report Excel — to understand the expected format

She does not need to share real client data. Numbers can be replaced with dummy values. The structure and column layout is all that is needed to build the parsers.

### From IT or management:
- Which Bloomberg product they use — terminal or enterprise data license
- Their IRESS product name and account contact
- Their FactSet account access and contact
- Whether their Apex agreement allows SFTP data delivery
- Microsoft 365 admin access to register the Teams integration application

### From the boss:
- Approval to access anonymised sample files
- Agreement on what success looks like for the proof of concept
- Introduction to the IT contact who manages system credentials
