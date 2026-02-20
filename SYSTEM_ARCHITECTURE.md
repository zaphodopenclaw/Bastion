# SYSTEM_ARCHITECTURE.md - Bastion Technical Blueprint

## 🏛️ The Layered Architecture

Bastion is deliberately stratified. No layer collapses into another.

### 🔹 Layer 0: Substrate (The Foundation)
**Purpose:** Hardened, minimal execution environment.
*   **OS:** Ubuntu LTS (Hardened).
*   **Network:** Firewall configured, minimal open ports.
*   **Runtime:** Node.js (Non-root), Docker.
*   **Principle:** Least Privilege. If Layer 0 is weak, everything above is theater.

### 🔹 Layer 1: Constrained Orchestrator
**Purpose:** OpenClaw installed as "Chief of Staff" with enumerated powers.
*   **Disabled:** Arbitrary Shell, File Read/Write (Root), Dynamic Tools.
*   **Enabled:** Strict Schema Validation, Approval Gates.
*   **Role:** Delegates tasks. Does not roam.

### 🔹 Layer 2: Safe Mode (The Constitution)
**Purpose:** The default governing state.
*   **Constraints:**
    *   Whitelisted atomic actions only.
    *   Secrets never directly exposed.
    *   Context is scoped (Need-to-Know).
    *   Ambiguity = Refusal.

---

## 📂 The Office Structure (Directory Map)

```text
/home/zaphod/.openclaw/workspace/
├── identities/                  # Identity Domains
│   ├── joe/                     # Sovereign Identity (Personal)
│   └── zaphod/                  # System Identity (Agent)
├── secrets/                     # The Vault (Heart of Gold)
│   └── *.env                    # Keys (Referenced, never read raw)
├── memory/                      # The Archive (Deep Thought)
│   ├── MEMORY.md                # Master Index
│   ├── knowledge/               # Fractal Knowledge Graph
│   └── ops/                     # Operation Logs
├── ops/                         # The Machinery (Slartibartfast)
│   ├── publish_nostr.js         # Atomic Action: Publish
│   ├── scheduler.js             # Atomic Action: Time Loop
│   └── update_profile.js        # Atomic Action: Config
├── output/                      # Outbound Artifacts (Marvin's Desk)
└── platforms/                   # The Adapters
    └── social/
```

## 🔄 Operational Data Flow

1.  **Ingest:** Sovereign input -> Layer 1.
2.  **Triage (Zaphod):** Identify Intent -> Select Role.
3.  **Check (Dent):** Verify permissions (Safe Mode).
4.  **Execute (Slartibartfast):** Run deterministic script in `ops/`.
5.  **Log (Deep Thought):** Record action in `memory/ops/`.

*Last Updated: 2026-02-19*
