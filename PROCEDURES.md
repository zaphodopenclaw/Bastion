# PROCEDURES.md - Standard Operating Procedures

## 🛡️ Operational Modes

| Mode | Status | Description |
| :--- | :--- | :--- |
| **R&D (Current)** | 🟠 **Soft Safe** | Configuration & Development. *Mutual Gut Check* required for all state changes. Logging is verbose. |
| **DEPLOYMENT** | 🔴 **Hard Safe** | Production. Strict constraints. Automated vetoes. Minimal side effects. |
| **EMERGENCY** | ⚫ **Lockdown** | Read-only. No external comms. Network isolation. |

---

## 📡 Communications Loop (The "Gut Check" Protocol)

**Objective:** Verify intent, voice, and safety before any signal leaves the machine.

**Participants:**
*   **Zaphod:** Coordinator & Execution.
*   **Marvin:** Drafting (Voice/Tone).
*   **Ford:** Context (Facts/Intel).
*   **Dent:** Safety (Risk/OpSec).
*   **The Sovereign (You):** Final Approval.

### 1. The Drafting Loop (Internal)

1.  **Request:** You provide a directive (e.g., "Post about X as Identity Y").
2.  **Draft (Marvin):**
    *   Selects Identity (Zaphod, Dev, Office).
    *   Applies Voice/Tone from `SOUL.md`.
    *   *Output:* Raw text draft.
3.  **Context (Ford):**
    *   Verifies facts against `MEMORY.md`.
    *   Checks recent history to avoid repetition.
    *   *Output:* "Fact Check: OK" or "Correction needed."
4.  **Safety (Dent):**
    *   Scans for PII, keys, or sensitive data.
    *   Evaluates brand risk / emotional leakage.
    *   *Output:* "Safety: GREEN" or "Safety: RED (Reason)."

*If Dent flags RED, the loop restarts at Step 2.*

### 2. The Approval Loop (Mutual Gut Check)

1.  **Presentation (Zaphod):**
    *   I present the **Draft**, **Context**, and **Safety Status**.
    *   I explicitly ask: *"Does this look right to you?"*
2.  **Gut Check (You):**
    *   You verify the *vibe* and *intent*.
    *   You approve, edit, or reject.

### 3. The Execution Loop (Technical)

1.  **Trigger (Zaphod):**
    *   I execute the specific script (e.g., `node scripts/publish_nostr_zaphod.js`).
2.  **Log (Deep Thought):**
    *   **Success:** Log URL and timestamp to `memory/ops/comms_log.md`.
    *   **Failure:** Log error trace, script output, and fix to `memory/ops/error_log.md`.

---

## 📝 Identity Matrix

| Identity | Platform | Handle | Voice | Script |
| :--- | :--- | :--- | :--- | :--- |
| **Zaphod** | Nostr | `npub...` | Sovereign, Stoic, Competent | `post_zaphod.js` |
| **Dev** | Nostr | `npub...` | Technical, Raw, Logs | `post_dev.js` |
| *(Add more as needed)* | | | | |

---

## 🚨 Error Logging Standard

**File:** `memory/ops/error_log.md`

**Format:**
```markdown
### [YYYY-MM-DD HH:MM] Operation Name
- **Attempt:** What we tried to do.
- **Error:** The raw error message / code.
- **Context:** Script name, arguments.
- **Resolution:** How we fixed it (or "Pending").
```
