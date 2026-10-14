# SORORA — Product Context & Hackathon Demo Build Brief

**Status:** Build specification for a one-person, coding-agent-assisted hackathon demo.  
**Product name:** Sorora (working name). **Tagline:** Grow together.  
**Primary audience:** Women studying STEM at participating universities.  
**Paying customer:** University, STEM department, or academic support program.  
**Deliverable:** A beautiful, credible, interactive, screenshot-ready web demo, **not** a production-ready service.

> **Instruction to the coding agent:** Treat this document as product truth for the demo. Make sensible implementation decisions independently, avoid gold-plating, and prioritize presentation quality plus one flawless user journey. Never portray mock verification, sample usage metrics, sample conversations, or mock university subscriptions as real.

## 1. Why Sorora exists

In male-dominated STEM programs, women can experience social isolation, limited peer support, lower belonging, and weaker informal academic networks. These can contribute to uncertainty about continuing in STEM, beyond academic performance alone. Sorora addresses the **community and belonging problem through an immediate academic benefit**, not through generic social networking.

**Core thesis:** A student joins because she needs help studying; she returns because she has a consistent, supportive peer circle.

**Core experience:** Small, recurring **Study Pods** of approximately 4–5 women taking a similar STEM course or subject. Each pod has a weekly meeting, a guided study agenda, accountability, and lightweight prompts designed to build trust and mutual support. The product can later expand from course support to research, applications, scholarships, and career advancement.

**Evidence and boundaries:**
- Dennehy & Dasgupta (2017), an experiment with 150 incoming women engineering students, found benefits from assignment to women peer mentors for belonging, confidence, and retention-related outcomes. **This tested peer mentoring, not Sorora or Study Pods.** https://pmc.ncbi.nlm.nih.gov/articles/PMC5468611/
- Research on undergraduate STEM students in calculus and physics found social belonging associated with intentions to persist, with a stronger association for women. **Association is not proof of Sorora's effect.** https://pubmed.ncbi.nlm.nih.gov/31736819/
- Ong et al., *Counterspaces for women of color in STEM higher education*, documents meaningful support from peer groups, collaborative study, and supportive spaces. https://onlinelibrary.wiley.com/doi/full/10.1002/tea.21417
- A longitudinal follow-up to the peer-mentoring experiment reports favorable outcomes lasting through college and afterward. Again, **mentoring evidence does not validate this particular app**. https://pubmed.ncbi.nlm.nih.gov/36369261/

**Allowed pitch claim:** "Sorora is designed around research connecting supportive peer relationships and a sense of belonging with persistence in STEM."  
**Do not claim:** "Sorora increases retention by X%," "research proves Study Pods work," or that demo metrics come from real users.

## 2. Updated business model: university-first access

This supersedes earlier proposals of general open public registration.

- **Universities purchase a subscription/license** to sponsor Sorora for their eligible students. Students do not need to pay to join the standard Study Pods offering.
- The institution manages or approves **which students are eligible for the specific sponsored program**. During onboarding, the user selects a participating institution and proceeds via a **simulated institutional sign-in/invitation acceptance**.
- A matching institutional email domain can establish an association with a school, but **it does not verify gender or program eligibility**. A real service would need institution-administered entitlement/roster rules and an agreed, inclusive eligibility policy. The demo must not pretend to verify gender.
- Outside-university access may eventually require a separate manual document/identity and eligibility review process with appropriate privacy safeguards. **Do not implement** external registration, document upload, identity classification, or gender inference in the demo.
- The initial community should be oriented around a participating university, with the option to add cross-institution pods later through institutional partnerships.
- University value proposition: helps coordinate repeatable peer-support programs; lowers friction of joining study groups; provides **aggregated**, privacy-respecting visibility into participation. Effects on student retention are to be evaluated, not promised.
- Optional future pathways: institution-approved volunteer STEM professionals supporting special pods; corporate/scholarship sponsorship; research and application pods. No pricing commitment for the MVP.

### Safety / trust framing

No real authentication, SSO, document verification, gender checks, or student eligibility checks in this demo. Show a small, clear "Demo access — institution verification simulated" label when appropriate. Use fake users, fake institutions, fake conversations, and sample statistics. A report/help action may be a nonfunctional *visibly labeled preview*, not a pretend working safety workflow. For a production version: privacy review, real SSO or institution roster authorization, moderation, reporting, abuse response, and inclusive enrollment criteria are prerequisite tasks.

## 3. The hackathon objective

A solo creator using a coding agent needs appealing screenshots and a **30–90 second screen recording** to generate interest during a short pitch. Judges do not require production infrastructure, multi-user real-time functionality, a real paying university, live backend, or deployment.

**Demo must visually communicate BOTH sides of the model:**
1. **Student story:** university-based access → subject/availability → matched study pod → useful weekly session → belonging and progress.
2. **University story:** simple administrator overview showing the institution's sponsored program and aggregate engagement (fictional demo metrics).

**Primary deliverable:** Responsive web application with deterministic seeded data and lightweight browser state. The main flows must be clickable, not just static images. Prioritize a coherent, attractive product over feature count. The mock admin view only needs to look credible and be navigable.

## 4. Recommended technology and engineering boundaries

- **Stack:** Vite + React + TypeScript + Tailwind CSS + lucide-react; use lightweight client-side routing (React Router) if useful. Use CSS transitions sparingly. Do not introduce a full backend merely to demonstrate auth or pods.
- **Data:** Static typed arrays/objects for fictional universities, student, pods, agendas, events, and aggregated metrics. `localStorage` for the demo student's selected course, joining a pod, and completing a session. Include **Reset demo** so video retakes start fresh.
- **No:** Supabase/Firebase, actual SSO, OpenAI API, real messaging, video calls, ID uploads, payments, email services, file storage, analytics SDKs, paid services or API keys.
- **Hosting:** Not required. If needed later, build static output via `npm run build` and deploy `dist/` on Netlify (or other static hosting). Documentation: https://vite.dev/guide/static-deploy.html and https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/.
- Make one-command local run and static build work. Sensible modular components and documented data are preferable to complex abstraction.

## 5. Required student experience (prioritize these)

### A. Landing / institutional gateway
- Strong hero: **"Study together. Belong together."** Subtext: "A study community for women in STEM, made accessible through your university."
- Institution-sponsored message / pill, CTA: **"Find my study pod"**.
- Simulated participating university sign-in. Default fictional example: **Northbridge University**. Add text indicating it is a fictional demo institution.
- No open "Sign up with personal email" flow. Instead: **"Access provided by participating universities"** and, optionally, a non-operational "University partnerships" CTA pointing to the admin showcase.
- One-click **"Continue with Northbridge University (Demo)"** works without requiring real credentials.

### B. Student onboarding / match preferences
- Friendly 1-step form: first name (default **Maya**), subject (Calculus I, Intro to Programming, Physics I, Organic Chemistry), study level (e.g. beginner/intermediate), preferred study day/time. Optional study goal.
- Institution is preselected and shown as "Northbridge University — Demo program".
- Clicking **"Find a pod"** runs actual deterministic match/filter logic using subject, available slots, and available capacity; display why a result matches.
- Add a thoughtful no-matches state with **"Change availability"**; do not fake a match with incompatible availability.

### C. Pod matches and joining
- 2–3 appealing cards when using the default demo preferences; each shows course, day/time, capacity (e.g. **4/5 members**), a warm one-sentence purpose, and fictional initials/avatars.
- Clear matched reasons. Real "Join pod" interaction: updates membership in browser state and routes to pod workspace; prevent a duplicate join.
- Use a deterministic dataset of ~6–8 pods. Favor same-university matching for this iteration.

### D. Pod workspace — the hero screenshot
- Example: **Calculus Circle**, Wednesday 18:00; members Maya, Sofia, Lina, Noor, Elena (fictional), as appropriate to capacity after joining.
- Show a welcome note, members, next weekly study session, current theme (derivatives), a goal card and at least one visible human-connection prompt: **"What do you need help with this week?"** + **"What can you help someone with?"**
- Optional volunteer facilitator profile, explicitly framed as part of a future facilitator model, not required for the pod's existence.
- Primary CTA: **"Start guided session"**.

### E. Guided session + progress
- 4-step, ~45-minute agenda: (1) 5-minute check-in; (2) 10-minute question exchange; (3) 20-minute collaborative study; (4) 10-minute reflection / next-week goal.
- Interactions should be meaningful and fast for screen recording: check off steps, enter a short reflection or select a preset, finish session, and show visible completed state.
- Completing a session updates a simple progress card, e.g. **"1 session completed"**, and points toward returning next week. Do not overinvest in gamification or streaks.
- Show two types of value: study support **and** supportive relationships.

## 6. Required university-facing showcase (can be read-only)

A distinct, clean **"University program"** or **"Institution dashboard"** view, reachable via a visible demo switcher / navigation. It does not require real roles or auth; say **"Illustrative university dashboard"**.

Content:
- Northbridge University / Sorora partnership header, with "Sponsored student access" and fictional program status.
- Cards for **active pods**, **participating students**, **sessions completed**, **weekly participation**. Suggested example numbers: 12 pods, 48 students, 36 sessions, 75% participation; mark **Sample data** somewhere unmistakable.
- One attractive simple weekly participation bar chart (no expensive charting dependency necessary), current pod categories, and 2–3 program highlights.
- Privacy note: "Program coordinators see aggregate participation, not students' private reflections."
- Do not claim any real change in student persistence or retention.

## 7. Screen capture plan / visual requirements

Priority captures for the short presentation:
1. **Institution-sponsored welcome screen**: shows the university-first business model immediately.
2. **Compatible study pods / matching results**: makes academic usefulness clear.
3. **Inside a pod + guided session**: makes belonging and recurring interaction clear.
4. **University dashboard**: visually explains who pays and why.

Style: refined, welcoming, modern educational SaaS, **not** childish or stereotypically "pink for women." Use an off-white or warm neutral base, dark ink text, restrained lavender/indigo accents and one warm accent, sophisticated typography, generous whitespace, rounded but not oversized cards, legible charts, credible fictional student avatars as initials. Consistent design tokens. Support desktop ~1440×900 (screenshots), and mobile. Good hover/focus states, keyboard navigability, semantic form labels, readable contrast. Avoid generic placeholder lorem ipsum, excessive emojis, loud gradients, fake stock-testimonials, intrusive animation, and unfinished/blank routes. No requirement for real photography or AI-generated assets.

Product copy cues:
- "Your university, your community."
- "Find people working through the same challenges."
- "A recurring space to study, share, and grow."
- "Make progress together — one session at a time."
- "Study together. Belong together."

## 8. Demo-specific seed data and logic

- Default institution: fictional **Northbridge University**. No claims of actual institutional sponsorship.
- Default student: **Maya**, first-year student studying Calculus I, available Wednesday 18:00.
- Default recommended pod: **Calculus Circle** (Wednesday 18:00; 4 of 5 seats filled, before Maya joins).
- Seed at least six pods across the four offered subjects and multiple days/levels, including one full pod and one compatible alternative. All dates/times displayed consistently in one selected timezone (e.g. Europe/Athens), with a visible timezone label.
- Joining one pod should show it as 5/5 and student membership visibly updated. Do not allow capacity to become 6/5. Group member list should stay coherent with the new count.
- Persist the demo's state to browser localStorage and provide a prominent enough reset mechanism in demo controls.
- Admin metrics are fictional aggregate illustrations and need not be derived from the local one-person interaction; label clearly so this is not misleading.
- Mock pod members' introductions and notes are fictional. Do not suggest users can send actual messages to people elsewhere.

## 9. Scope discipline and acceptance criteria

**Must have** before polish: landing and simulated institution entry; functional onboarding; valid matching with no-match; join pod; session check-in/completion; updated progress; read-only admin showcase; reset; mobile support.

**Nice to have:** quick demo mode that preloads selections, tiny success animations, lightweight informative facilitator card, tasteful microinteractions, print/screenshot-friendly layouts.

**Do not build for this demo:** real external registration, SSO integration, KYC / IDs / gender verification, volunteer vetting, chat system, calling, complex pod scheduling, AI lesson generation, complex matching, gamified leaderboards, institution billing, certificates, 3D chemistry molecules, research/internship application flows, production analytics or multi-tenant data security.

**Acceptance checklist:**
1. `npm install` and `npm run dev` launch successfully; `npm run build` succeeds.
2. Demo visitor selects the fictional university and enters without credentials, with truthful simulation labeling.
3. Student onboarding finds correct matches; incompatible/full pods do not appear as joinable; no-match state works.
4. Student joins a pod, sees correct member/capacity state, completes a guided session and views updated progress.
5. Reload retains local demo state; Reset demo restores seeded defaults.
6. Admin view is polished, uses obvious sample data, and discloses aggregation-only privacy intent.
7. At desktop presentation resolution the four target screenshots look deliberate, content-rich and coherent; mobile pages remain usable.
8. The product does not falsely claim to verify gender, institution authorization, payment, or external communication.

## 10. Product roadmap (pitch only; not demo scope)

1. Pilot: institution-sponsored course-based study pods; test first attendance, repeat participation, and belonging survey feedback.
2. Expand: exam pods, facilitator support and trusted professional volunteer circles.
3. Advance: research, scholarships, internships, presentation rehearsal, postgraduate application pods.
4. Scale: institutional integrations, moderation, privacy-first aggregated dashboards, partnership-funded access, cross-campus optional cohorts.

**Proposed pilot metrics** (hypotheses, not achieved results): join rate, first session attendance, 2-week return rate, self-reported belonging, and institutional willingness to sponsor. Actual persistence/retention effects need rigorous longer-term evaluation.

## 11. What came from where

**Internal project sources (concept, not evidence of effectiveness):**
- `Study Pods Plan Maria edit(1).docx`: working name Sorora; Grow together; 4–5 student pods; course/time matching; session progress; optional STEM-professional volunteer coordinators; future Research/Exam/Application/Practice Pods; universities as subscriber; deployment optional; no need for full service.
- `Copy of TEAM 001(1).png` (business model canvas): higher education institutions as customers/partners, women students as users, campus communication distribution, platform/community value, potential optional individual memberships, cost considerations, safety concerns and reporting.
- Updated founder instructions (this conversation): **institution-first enrollment supersedes open sign-up**; outside applicants require future verification; one-person build with coding agent; demo used primarily for screenshots/short presentation video.

**External research:** Links in Section 1; they motivate the intervention direction but **do not validate Sorora's outcomes**.

**Implementation/design decisions proposed specifically for this demo (not settled product facts):** Northbridge University, Maya, Calculus Circle, illustrative admin numbers, React/Vite stack, exact UI copy, demo state model and demo-only authentication substitute. Change these easily if asked; do not present them as existing partnerships or users.
