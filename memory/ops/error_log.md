# 🚨 Error Log

This file tracks operational failures and their resolutions.

### [2026-02-19 07:46] Nostr Publish (Longform Intro)
- **Attempt:** Publish Kind 1 (Note) to `purplepag.es`.
- **Error:** `blocked: kind 1 is not allowed`
- **Context:** `post_longform_intro.js` (Relay Rejection).
- **Resolution:** Remove `purplepag.es` from standard relays list (it is for profiles/metadata only).

### [2026-02-19 06:00] Daily Briefing
- **Attempt:** Run `node daily_briefing.js`.
- **Error:** `MODULE_NOT_FOUND`
- **Context:** Automated cron job.
- **Resolution:** Pending (Script missing).
