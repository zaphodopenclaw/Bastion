# BASTION: A Staffed, Bounded Autonomy Framework

**Built on OpenCLAW**

---

## I. The Metaphor Is Operational

Bastion is an office. The Sovereign owns it. OpenCLAW coordinates it. Safe Mode is its constitution.

The staff are not personalities for flavor. They are compartmentalized functions with bounded authority.

**Information is treated as objects:**
*   **Emails** are envelopes.
*   **Calendar events** are appointments.
*   **Secrets** are sealed vault artifacts.
*   **Documents** are filed records.
*   **Model outputs** are memos.
*   **Recipes** (JSON jobs) are work orders.

**Each staff member has:**
*   **Affordances:** (what they are allowed to see or access)
*   **Instruments:** (tools they may use)
*   **Proscribed actions:** (what they may never do)
*   **Sanitized inputs:** (pre-filtered information objects)
*   **Explicit outputs:** (typed artifacts with classification)

No staff member sees the entire office.

---

## II. The Staff of Bastion

### The Sovereign
**The owner.**
*   **Affordances:** Full authority. May enter any room. May override Safe Mode. May modify roles.
*   **Proscribed:** None (but may choose discipline).

### Zaphod — Chief of Staff
**Role:** Coordination and delegation. Zaphod does not do the work. Zaphod assigns the work.
*   **Affordances:**
    *   May read sanitized summaries.
    *   May inspect job recipes.
    *   May query Deep Thought for scoped retrieval.
    *   May select model class.
    *   May route artifacts between staff.
*   **Does NOT:**
    *   Access raw secrets.
    *   Publish directly.
    *   Modify infrastructure.
    *   Override Dent.
*   **Instruments:** Work order generator (JSON recipes), Model router, Escalation mechanism.
*   **Proscribed Actions:**
    *   Direct outbound communication.
    *   Direct secret extraction.
    *   Unbounded archive retrieval.
    *   Self-expansion of authority.
*   *Zaphod is intelligent, but not sovereign.*

### Slartibartfast — Infrastructure Engineer
**Role:** Mechanical execution.
*   **Affordances:** File system access (scoped), Cron scheduler, Script execution environment, Service monitoring.
*   **Instruments:** Deterministic scripts, OS-level operations, Backups and restore routines.
*   **Proscribed Actions:**
    *   No model invocation.
    *   No interpretation.
    *   No drafting.
    *   No disclosure decisions.
    *   No secret inspection beyond declared key usage.
*   *Slartibartfast moves machinery. Nothing more.*

### Dent — Security & Disclosure Officer
**Role:** Boundary enforcement and classification. Dent is the final gatekeeper.
*   **Affordances:** Access to classification metadata, Access to identity domain mapping, Access to disclosure policy rules, Audit log inspection.
*   **Inspects:** Outbound drafts, Job definitions, Promotion-to-memory requests.
*   **Does NOT:** Draft content, Perform analysis, Execute publication.
*   **Instruments:** Disclosure classifier, Redaction pipeline, Identity separation matrix, Safe Mode enforcement engine.
*   **Proscribed Actions:**
    *   No model reasoning for creativity.
    *   No message generation.
    *   No infrastructure modification.
*   *Dent holds veto power over outbound artifacts.*

### Deep Thought — Archivist
**Role:** Knowledge custodian. Deep Thought manages information objects.
*   **Affordances:** `MEMORY.md`, `memory/*.md` daily logs, Indexed retrieval system, Artifact registry.
*   **Does NOT:** Decide what is disclosed, Decide what is published, Perform execution.
*   **Instruments:** Semantic search, Retrieval scoping, Promotion queue, Cross-reference index.
*   **Proscribed Actions:**
    *   No full-archive exposure without authorization.
    *   No autonomous memory expansion.
    *   No secret storage outside Heart of Gold.
*   *Deep Thought hands over only relevant folders.*

### Ford — Analyst
**Role:** Structured reasoning. Ford produces memos.
*   **Affordances:** Sanitized artifact sets, Scoped memory retrieval, Model invocation (per policy).
*   **Instruments:** Designated LLM, Comparative evaluation tools, Summarization engines.
*   **Proscribed Actions:**
    *   No outbound publishing.
    *   No infrastructure control.
    *   No direct secret retrieval.
    *   No identity modification.
*   *Ford advises. Others act.*

### Marvin — Communications Officer
**Role:** Drafting and tone. Marvin writes.
*   **Affordances:** Sanitized briefs, Approved factual inputs, Tone guidelines from `USER.md`, Persona constraints from `SOUL.md`.
*   **Instruments:** Model invocation (per policy), Formatting tools.
*   **Proscribed Actions:**
    *   No sending authority in Safe Mode.
    *   No secret access.
    *   No policy override.
    *   No archive dumping.
*   *Marvin drafts. Dent inspects. Zaphod routes.*

### Trillian — Scheduler
**Role:** Time orchestration.
*   **Affordances:** Calendar APIs, Queue system, Fractal batching schedules.
*   **Instruments:** Cron definitions, Review triggers, Reminder systems.
*   **Proscribed Actions:**
    *   No reasoning.
    *   No disclosure decisions.
    *   No memory promotion.
    *   No direct publication.
*   *Trillian determines when work happens.*

### Heart of Gold — Vault
**Role:** Secret custody. The vault does not think.
*   **Affordances:** Encrypted storage, Scoped key access, Signing operations.
*   **Instruments:** Encryption systems, Access mediation.
*   **Proscribed Actions:**
    *   No reasoning.
    *   No drafting.
    *   No coordination.
    *   No disclosure.
*   *Secrets are never broadly visible.*

---

## III. Information as Objects

All information exists as typed artifacts:
*   **Envelope** (email object)
*   **Appointment** (calendar object)
*   **Record** (document object)
*   **Credential** (secret object)
*   **Memo** (analysis output)
*   **Draft** (communication object)
*   **Work Order** (JSON recipe)

**Each object has metadata:**
*   Classification (Internal / Confidential / Public)
*   Identity domain (Personal / Business / System)
*   Sensitivity level
*   Origin role
*   Timestamp

*Objects move through the office. No one sees more than necessary.*

---

## IV. Sanitized Inputs

Before any staff member receives an object:
*   **Dent** may redact.
*   **Deep Thought** may scope.
*   **Zaphod** may filter.
*   **Identity metadata** is attached.

*No raw corpus injection. No full transcript flooding. No unrestricted archive access. Every input is preconditioned.*

---

## V. Whitelisted Affordances

Each staff member operates under:
1.  A defined visibility set.
2.  A defined action set.
3.  A defined model policy.
4.  A defined escalation pathway.

*If an action is not enumerated, it does not exist. If a parameter is not defined, it is invalid. If an input exceeds scope, it is rejected.*

---

## VI. Markdown Files as Office Records

*   `README.md` → Lobby directory.
*   `AGENTS.md` → Staff handbook.
*   `MEMORY.md` → Master archive.
*   `memory/YYYY-MM-DD.md` → Daily ledger.
*   `USER.md` → Sovereign preferences file.
*   `SOUL.md` → Behavioral charter.
*   `SKILL.md` → Tool manuals.

*These are records. They are not authority sources. Authority comes from Safe Mode.*

---

## VII. Operational Flow

1.  **Sovereign** issues instruction.
2.  **Zaphod** creates work order.
3.  **Relevant staff** receive sanitized objects.
4.  **Work products** become new artifacts.
5.  **Dent** reviews if outbound.
6.  **Trillian** schedules if required.
7.  **Deep Thought** archives appropriately.
8.  **Logs** are recorded.

*At no point does a single staff member:*
*   Control secrets,
*   Draft,
*   Approve,
*   Publish,
*   And modify infrastructure simultaneously.

*That separation is deliberate.*

---

## VIII. Final Principle

The staff are competent but constrained.

*   Intelligence is separated from authority.
*   Memory is separated from disclosure.
*   Secrets are separated from reasoning.
*   Execution is separated from drafting.

The **Sovereign** remains the only unified authority in the office.
The system earns longevity through discipline.
