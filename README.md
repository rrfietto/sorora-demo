# Sorora · Grow together

A frontend-only, interactive pitch demo of a university-sponsored study community for women in STEM. Built with Vite, React, TypeScript, Tailwind CSS, and lucide-react. `SORORA_AGENT_BRIEF.md` is the product source of truth.

## Run

Use **Node 22.13+** (Node 22 LTS recommended).

```sh
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

```sh
npm run build    # TypeScript validation + static build in dist/
npm run preview # Preview the production build
npm test        # Matching, capacity, persistence, reset regression tests
```

**This machine has Node 14 and a full system npm-cache drive.** A Node 22 runtime was installed into ignored `.tools/` and a project-local npm cache was used. The command launcher automatically uses that runtime when the system Node is too old. Thus the regular `npm run dev`, `npm run build`, and `npm test` commands work here without a system upgrade. To recreate that fallback:

```sh
npm install --prefix .tools node@22 --cache .npm-cache --no-audit --no-fund
npm install --cache .npm-cache --no-audit --no-fund
```

## Share with teammates on GitHub Pages

Deployment is configured for a repository named **`sorora-demo`**. You still need to create the repository in your GitHub account; this project has not been uploaded or published automatically.

1. Create a **public** GitHub repository named `sorora-demo`. Leave the initial README, `.gitignore`, and license options unchecked, because this project already has its files. Public repositories can use GitHub Pages for free.
2. Push this project’s root contents to its `main` branch, including `.github/workflows/deploy-pages.yml`. Use Git or GitHub Desktop; do not upload `node_modules`, `.tools`, `.npm-cache`, `artifacts`, or `dist` (already ignored).
3. Open the repository’s **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.
4. In **Actions**, open **Deploy Sorora demo to GitHub Pages**. If the initial push ran before Pages was enabled, choose **Run workflow** or rerun the failed workflow.
5. Once deployment succeeds, Pages will show your shareable URL: `https://YOUR-GITHUB-USERNAME.github.io/sorora-demo/`.

Every push to `main` runs the regression tests, builds using Node 22, and publishes `dist/`. There are no API keys or custom deployment secrets. The workflow does not run screenshot/video tests. Relative Vite asset paths and hash navigation let the app work at `/sorora-demo/` without route rewrites; renaming the repository does not require a base-path change.

The website is publicly accessible, even though the app illustrates an institution-sponsored program. Access is simulated, all content must remain fictional, and each teammate gets independent browser-local progress and preferences—not shared membership or live meetings. Private repositories may require a paid GitHub plan for Pages.

## Language, appearance, and availability

Use the header’s **EN / PT-BR** selector to switch between English and Brazilian Portuguese across student and university views. The sun/moon button switches light/dark mode. Both preferences are saved separately in this browser and remain selected when you reset the student demo. Your own name, goal, and reflection text is kept as entered.

Availability includes **Saturday and Sunday**. The existing fictional pods meet on weekdays, so selecting a weekend correctly shows the no-match state instead of inventing a compatible group. Weekend choices survive a reload.

In university view, the sidebar uses an institution icon rather than Zoe’s profile avatar.

`npm run test:appearance` runs optional screenshot-free browser checks for language/theme toggles, weekend availability, persistence, and mobile overflow (requires the local Playwright setup described below).

## Ideal 60–90 second recording

Use a **1440×900** browser viewport at 100% zoom. Close unrelated tabs and click **Reset demo** before recording.

1. **Welcome (0–10s):** Show “Study together. Belong together.” and university-sponsored access. Click **Find my study pod**, then **Continue with Northbridge (Demo)**. This is explicitly simulated institution access, not registration or authentication.
2. **Preferences (10–20s):** Keep **Zoe**, **Calculus I**, **Beginner**, **Wednesday**, **18:00**. Click **Find a group**.
3. **Matches (20–30s):** Pause on the three compatible cards and explainable matching reasons. Join **Calculus Circle**.
4. **Community (30–45s):** Show the five coherent members, the next derivatives session, the personal goal, and the two human-connection prompts. Scroll slightly if needed. Click **Start guided session**.
5. **Session (45–65s):** Select a response and complete each of the four steps. On the study step, reveal the worked chain-rule example. On reflection, pick a goal or type a short personal note. Click **Complete this step**, then **Finish session**.
6. **Progress (65–75s):** Show **1 session completed**, four guided steps, and a next-week intention. Reload if you want to demonstrate persistence.
7. **University (75–90s):** Use **University view**. Show the sample metrics and participation chart, then scroll to institutional subscription value and the aggregate-only privacy note. Individual reflections never appear here.

For a 30-second cut: welcome → default matches → join → community → university dashboard. Screenshot targets are welcome, matches, pod/session, and university overview.

**No-match path:** Before joining, change Calculus I to Monday at 18:00. No seeded pod matches. **Change availability** returns to preferences; Wednesday at 18:00 restores the exact options.

**Nearby-time path:** Choose Calculus I on Wednesday at 19:00. With no exact match, the demo suggests available pods on the same day at 18:00, clearly labeled as 60 minutes earlier. **Choose this time** opens a confirmation; cancel preserves your request, and **Accept time and join** updates your preferred time and membership. Nearby alternatives are limited to two hours before/after, the same institution/course/day, and open seats.

## Routes

Hash navigation works with static hosting; no server-side route rewrites required.

| Route            | Screen                                       |
| ---------------- | -------------------------------------------- |
| `/#/welcome`     | Institution-first landing and access dialog  |
| `/#/preferences` | One-step study preferences                   |
| `/#/matches`     | Compatible pods or honest no-match state     |
| `/#/pod`         | Joined community and next session            |
| `/#/session`     | Four-step guided personal walkthrough        |
| `/#/progress`    | Local completion and next-week intention     |
| `/#/university`  | Read-only illustrative institution dashboard |

Student routes require simulated access; pod/session require membership. The **Student view** switch returns to the current student's workspace. **Reset demo** clears membership, responses, and completion after confirmation.

## Fictional meeting generator

Inside the guided session, click **Generate demo meeting link** to create a Google Meet-style preview. It uses a stable room code and a reserved URL such as `https://meet.sorora.example/abc-defg-hij`, never a real Google Meet address. Expand the illustrative member allowlist to see each current pod member’s fictional `@northbridge.example` email, including the demo student.

**Copy demo link** copies the reserved URL; **Preview meeting** opens an in-app explanation, not a call. Generation persists across reloads and **Reset demo** clears it. Old saved demos keep their membership/progress when this feature is added.

No actual meeting, Google authorization, invitations, or email whitelist enforcement exists. Real Google access restrictions depend on supported host/access settings; sending invitations alone would not enforce an allowlist. This feature makes no external network requests and is translated in English and pt-BR.

## Data and boundaries

- Fictional **Northbridge University**, Zoe, eight typed pods, and fictional peer notes. No claimed UFV or real university sponsorship.
- Exact institution/course/day/time and open-seat matching is preferred. Only when no exact match exists, same-day alternatives within two hours are suggested, nearest first. Accepting a different time requires explicit confirmation. Level ranks equally close options; full pods are excluded. One pod membership per demo; no duplicate seats or capacity overflow.
- All times use **Europe/Athens**, displayed consistently. Sessions are weekly sample events, not a real scheduling service.
- Preferences, membership, meeting-generation status, agenda answers, private reflection, and completion live in `localStorage` under `sorora-demo-v1`. Reset replaces this state with fresh defaults. Browser storage is not secure authentication; use fictional information only. Storage denial is visibly disclosed, and malformed saved data recovers to defaults.
- One demonstration session; revisiting it does not inflate the count. “45 minutes” is the suggested agenda, not a running timer or proof of attendance.
- Admin figures are separate, static illustrations, **not** generated from local activity. The rising chart is sample data, not evidence of retention or belonging effects.
- No backend, real authentication, gender/eligibility verification, messaging, calls, payments, API keys, analytics, AI API, or external font/image requests. All artwork is inline SVG/CSS.
- Production would require institution-administered authorization, inclusive eligibility rules, privacy review, moderation and reporting, and rigorous pilot evaluation. This demo does not implement or claim those safeguards.

## Optional browser validation

The headless smoke test uses Microsoft Edge and local-only Playwright tooling, not an app dependency:

```sh
npm install --prefix .tools playwright --cache .npm-cache --no-audit --no-fund
npm run build
npm run test:browser
```

It starts a bounded temporary preview server, walks the full student flow, checks persistence, admin privacy, no-match and reset, and verifies desktop/mobile horizontal overflow. It saves screenshots to ignored `artifacts/` and stops the server afterward. Edge must be installed; change the Playwright channel if testing on another browser/platform.

## Code map

- `src/App.tsx`: navigation, institution access, student pages, session interactions.
- `src/data.ts`: typed fictional seeds and deterministic matching/capacity logic.
- `src/store.ts`: validated browser persistence and reset defaults.
- `src/UniversityDashboard.tsx`: separate read-only aggregate showcase.
- `src/styles.css`, `src/dashboard.css`: responsive visual system, motion, and presentation layouts.
