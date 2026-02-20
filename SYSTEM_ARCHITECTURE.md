# SYSTEM_ARCHITECTURE.md - Bastion Technical Blueprint

## 🏛️ The Bastion Stack

**Bastion** is implemented as a layered architecture on top of OpenCLAW.

### Layer 0: Hardened Base
*   **OS:** Ubuntu (Hardened).
*   **Environment:** Node.js, `npm`, limited shell access.
*   **Security:** Firewall, no root for agents.

### Layer 1: OpenCLAW Engine
*   **Function:** Event loop, Tool routing, Context management.
*   **Role:** The Nervous System.

### Layer 2: The Bastion Framework (Application Layer)
This is where the "Office" lives.

#### A. Directory Structure (The Building)
```text
/home/zaphod/.openclaw/workspace/
├── identities/                  # Identity Domains
│   ├── joe/                     # Sovereign Identity
│   └── zaphod/                  # System Identity
├── secrets/                     # The Vault (Heart of Gold)
│   └── *.env                    # Keys (Referenced, never read raw)
├── memory/                      # The Archive (Deep Thought)
│   ├── MEMORY.md                # Master Index
│   └── daily/                   # Daily Logs
├── ops/                         # The Machinery (Slartibartfast)
│   ├── publish_nostr.js
│   ├── publish_github.js
│   └── scheduler.js
├── platforms/                   # The Adapters
│   └── social/
└── artifacts/                   # Information Objects (Transient)
    ├── drafts/                  # Marvin's Desk
    └── inbox/                   # Incoming Envelopes
```

#### B. The Staff (Process Mapping)
*   **Zaphod** maps to `agent.main` (The LLM context).
*   **Slartibartfast** maps to `ops/*.js` scripts.
*   **Heart of Gold** maps to `dotenv` + `secrets/`.
*   **Deep Thought** maps to `memory_search` tool + filesystem.
*   **Dent** maps to `security_check` logic (Safe Mode pre-flight).

#### C. Operational Flow (The Logic)
1.  **Input:** User message -> Zaphod.
2.  **Processing:** Zaphod determines intent -> Updates `AGENTS.md` context.
3.  **Execution:**
    *   *If Mechanical:* Call `ops/script.js` (Slartibartfast).
    *   *If Creative:* Generate Draft -> Prompt User (Dent/Sovereign check).
4.  **Output:** Result Object -> Log to `memory/`.

*Last Updated: 2026-02-19*
