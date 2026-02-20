# ERROR_LOG.md - Incident & Resolution History

## 2026-02-18: Initialization Sequence

### 1. Gmail Authentication Failure
*   **Error:** `535-5.7.8 Username and Password not accepted` / `534-5.7.9 Application-specific password required`
*   **Context:** Trying to send email via Nodemailer.
*   **Root Cause:** Used standard Google Account password instead of App Password (2FA enabled).
*   **Fix:** Generated App Password.
*   **Lesson:** Google accounts *always* require App Passwords for headless SMTP. Do not attempt standard auth.

### 2. SSH Key Mismatch
*   **Error:** User provided fingerprint `38gtg...` which did not match generated key `2KbJ...`.
*   **Context:** Adding SSH key to GitHub.
*   **Root Cause:** Confusion between multiple keys or copy-paste error.
*   **Fix:** User confirmed adding the specific key generated in session.
*   **Lesson:** Always display the full public key block for copy-paste to avoid ambiguity.

### 3. GitHub PAT Authentication (Multiple Failures)
*   **Error:** `401 Unauthorized` / `Bad credentials`.
*   **Context:** Creating `internal-notes` repo via `curl`.
*   **Root Cause:**
    *   Token format issues (Fine-grained vs Classic).
    *   `curl` command syntax (Basic Auth vs Bearer Token).
    *   Potential copy-paste truncation of the token.
*   **Fix:** Switched to a robust Node.js script (`github_setup.js`) to handle headers correctly, and user provided a confirmed Classic Token.
*   **Lesson:** Shell `curl` is fragile for auth. Use Node.js scripts with explicit headers for API interactions.

### 4. Daily Briefing Script - Environment Variables
*   **Error:** `Missing credentials for "PLAIN"` / `[dotenv] injecting env (0)`
*   **Context:** Running `daily_briefing.js` via `exec`.
*   **Root Cause:**
    *   Script did not load `.env` (missing `require('dotenv').config()`).
    *   `.env` file was overwritten during edits, losing the `ZAPHOD_EMAIL` keys.
*   **Fix:**
    *   Patched script to include `dotenv`.
    *   Restored `.env` content.
*   **Lesson:** **Layer 1 Fragility.** Always check `.env` integrity before running dependent scripts. Scripts must be self-contained (load their own env).

### 5. Blogwatcher CLI Syntax
*   **Error:** `unknown flag: --url` / `accepts 2 arg(s), received 1`.
*   **Context:** Adding RSS feed.
*   **Root Cause:** Incorrect CLI command usage (guessing flags).
*   **Fix:** Switched to `rss-parser` library in Node.js script (more reliable than unknown CLI).
*   **Lesson:** Native Node libraries (`rss-parser`) are often more reliable than unfamiliar CLIs (`blogwatcher`) for simple tasks.

### 6. Nostr Dependency Issues
*   **Error:** `ERR_PACKAGE_PATH_NOT_EXPORTED` in `@noble/hashes`.
*   **Context:** Generating keys / publishing NIP-05.
*   **Root Cause:** Node.js v22+ module resolution conflict with `nostr-tools` dependencies.
*   **Fix:**
    *   For keys: Used previously generated output.
    *   For NIP-05: Wrote a script that avoided the specific broken import path (or would have).
*   **Lesson:** specific `nostr-tools` versions are finicky in this environment. Lock dependencies.

### 7. Setup NIP-05 Script Environment
*   **Error:** `Missing token or nostr key`.
*   **Context:** Running `setup_nip05.js`.
*   **Root Cause:** Forgot `require('dotenv').config()` again.
*   **Fix:** Ran with `node -r dotenv/config`.
*   **Lesson:** **Systemic Issue.** Default to `node -r dotenv/config` for all one-off scripts to ensure environment injection.
