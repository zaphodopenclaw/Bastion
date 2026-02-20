# TODO.md - Project Roadmap

## 🚀 Multi-Identity Management Suite (R&D)
**Goal:** A controlled, reliable, and safe system for managing multiple identities across platforms.
**Status:** In Progress (Scaffolding Complete)
**Principles:** Reliability > Features, Determinism > Magic, Safety > Access.

### Phase 1: Architecture & Scaffolding [DONE]
- [x] Defined `SYSTEM_ARCHITECTURE.md` (Identity as Root).
- [x] Created directory structure (`identities/`, `platforms/`, `ops/`, `secrets/`).
- [x] Defined "Zaphod" (Sovereign) identity config.
- [x] Defined "Joe" (User) identity config.

### Phase 2: Credential Acquisition (Pending User)
- [ ] **NOSTR:** Get `nsec` or `hex` private key.
- [ ] **BlueSky:** Generate App Password (`Settings -> App Passwords`).
- [ ] **X / Twitter:** Create Developer App & Generate User Tokens.
- [ ] **Meta (FB/IG):** Create Meta App & Generate Page/User Access Tokens.
- [ ] **TikTok:** Create App & Request Content Posting scope.

### Phase 3: Platform Adapters (The Code)
- [ ] **Nostr Adapter (`platforms/nostr.js`):** Migrate `post_longform_intro.js` logic to a reusable class.
- [ ] **BlueSky Adapter (`platforms/bluesky.js`):** Implement `@atproto/api`.
- [ ] **X Adapter (`platforms/twitter.js`):** Implement `twitter-api-v2`.

### Phase 4: Operations (The Verbs)
- [ ] `ops/create.js`: Script to scaffold new post files with frontmatter.
- [ ] `ops/approve.js`: Script to validate and move drafts to `posts/YYYY/`.
- [ ] `ops/publish.js`: The main engine (Read Post -> Load Secrets -> Call Adapter -> Log).

### Phase 5: Scheduling & Reliability
- [ ] **Cron:** Simple loop to check for due posts.
- [ ] **Logging:** rigorous success/failure logs in `identities/{id}/logs/`.

---

## 🛡️ Other Tasks
- [ ] **Daily Briefing:** Fix `daily_briefing.js` (Missing script error).
- [ ] **Maintenance:** Review and rotate logs.
