# 📋 MISSION MANIFEST: Phase 2 (Credentials)

**Status:** R&D Scaffolding Complete.
**Objective:** Activate the "Joe" (Sovereign) identity across platforms.

To proceed with the Multi-Identity Suite, I need the following credentials to populate `secrets/joe.env`.

## 🚨 Priority 1: The Open Web (Low Friction)

### 1. NOSTR (The Sovereign Layer)
*   **Need:** Your Private Key (`nsec` or Hex).
*   *Why:* To post as you without asking permission from a CEO.
*   *Action:* Export from your current client (Damus/Primal).

### 2. BLUESKY (The Bridge)
*   **Need:** Handle (e.g., `joe.bsky.social`) + **App Password**.
*   *Why:* Reach the "Twitter migration" crowd.
*   *Action:* Settings → App Passwords → "Add App Password". (Do NOT use your main login password).

---

## 🚧 Priority 2: The Walled Gardens (High Friction)

*Note: These require Developer Accounts. If too complex for tonight, we can skip.*

### 3. X / TWITTER
*   **Need:** API Key, API Secret, Access Token, Access Secret.
*   *Action:* Developer Portal → Create Project → App → User Auth Settings (Read/Write).

### 4. GOOGLE (Productivity)
*   **Need:** OAuth 2.0 Client ID + Client Secret.
*   *Why:* To sync Calendar and Mail.
*   *Action:* Google Cloud Console → Create Project → Enable APIs (Calendar, Gmail) → Create Credentials (OAuth Client ID).

---

## 🛠️ Status Report (R&D)
*   ✅ **Architecture:** Identity/Platform/Operation structure is built.
*   ✅ **Plumbing:** Tested config loading -> secret resolution -> mock publish.
*   ✅ **Zaphod:** Fully operational on Nostr.
*   ❌ **Joe:** Currently dormant (Waiting for keys).

**Ready when you are.**
