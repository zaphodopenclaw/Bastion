# SYSTEM_ARCHITECTURE.md - Multi-Identity Management Suite

## Core Philosophy
**Identity is the Root Node.**
All actions, secrets, and artifacts are scoped to a specific Identity. Nothing crosses the boundary without explicit code.

## 1. The Separation of Powers
The system explicitly supports distinct roles with different policies:

*   **The Sovereign (User):** Personal accounts (e.g., `Joe`).
    *   *Policy:* High friction. Agent drafts, Sovereign approves. Direct posting.
*   **The Chief of Staff (Agent):** Operational accounts (e.g., `Zaphod`).
    *   *Policy:* Medium friction. Autonomous for routine ops, approval for policy.
*   **The Press Secretary (Role):** Official voice (e.g., `Office of Joe`).
    *   *Policy:* High polish. Formal announcements. Strictly gated.

## 2. Directory Structure
The workspace structure reflects the hierarchy: `Identity -> Platforms -> Operations -> Artifacts`.

```text
/home/zaphod/.openclaw/workspace/
├── identities/                  # The Root Nodes
│   ├── joe/                     # Identity: Sovereign (Personal)
│   │   ├── config.json          # Google Suite enabled here
│   │   ├── posts/               # Personal thoughts/photos
│   │   └── logs/
│   ├── zaphod/                  # Identity: Chief of Staff (Agent)
│   │   ├── config.json          # Nostr/Ops enabled here
│   │   ├── posts/               # System status/Briefings
│   │   └── logs/
│   └── press_sec/               # Identity: Official (Optional)
├── secrets/                     # Infrastructure (Referenced, not embedded)
│   ├── joe.env                  # Google OAuth, Social Creds
│   └── zaphod.env               # Nostr Keys
├── platforms/                   # Adapters (Code)
│   ├── social/                  # Publishing Targets
│   │   ├── nostr.js
│   │   ├── bluesky.js
│   │   └── x.js
│   └── productivity/            # Tools & Integrations
│       ├── google_mail.js
│       ├── google_cal.js
│       └── google_drive.js
└── ops/                         # Atomic Operations (Verbs)
    ├── create.js
    ├── approve.js
    ├── publish.js
    └── sync.js                  # New: Sync Calendar/Mail
```

## 3. Data Models

### A. Identity Configuration (`identities/joe/config.json`)
```json
{
  "id": "joe",
  "name": "Joe (Sovereign)",
  "type": "sovereign",
  "policy": "approval_required",
  "platforms": {
    "social": {
      "nostr": { "enabled": true },
      "x": { "enabled": true }
    },
    "productivity": {
      "google": {
        "calendar": { "mode": "read_write", "sync_interval": "1h" },
        "mail": { "mode": "read_analyze" },
        "drive": { "mode": "archive" }
      }
    }
  },
  "secrets_ref": "secrets/joe.env"
}
```

### B. Post Policy (`identities/zaphod/config.json`)
```json
{
  "id": "zaphod",
  "name": "Zaphod (CoS)",
  "type": "agent",
  "policy": "autonomous_routine",
  "platforms": {
    "social": { "nostr": { "enabled": true } }
  }
}
```

## 4. Atomic Operations (The Verbs)

*   `ops/publish.js`: Publishes content to social platforms.
*   `ops/sync.js`: Syncs state from productivity platforms (Calendar events, Emails).
    *   *Input:* Identity Config + Secrets.
    *   *Output:* Local Markdown caches (e.g., `identities/joe/calendar/today.md`).

## 5. Google Suite Integration
Google is treated as a **Platform Module**.
*   **Auth:** OAuth2 tokens stored in `secrets/{id}.env`.
*   **Calendar:** `sync_calendar` op pulls events into `identities/{id}/calendar/`.
*   **Mail:** `fetch_mail` op pulls urgent threads into `identities/{id}/inbox/`.
*   **Drive:** `archive_doc` op pushes artifacts to Drive.

## 6. Implementation Plan (R&D)
1.  **Refine Scaffolding:** Update `config.json` schemas to support `type` (Sovereign/Agent) and `productivity` modules.
2.  **Google Auth:** Investigate `gog` skill or set up standard OAuth flow for `platforms/google.js`.
3.  **Policy Engine:** Ensure `ops/publish.js` respects `policy: approval_required`.
