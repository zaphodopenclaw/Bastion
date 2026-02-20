# BASTION FRAMEWORK: Structural & Operational Explanation (Staffed Model)

---

## I. Layered Architecture

The system is deliberately stratified. Each layer has:
*   A defined responsibility
*   Bounded authority
*   Clear interfaces
*   Explicit constraints

*No layer collapses into another. No layer silently expands scope.*

### 🔹 Layer 0 — Substrate (The Foundation)
**Purpose:** Establish a hardened, minimal, trustworthy execution environment.

**Components:**
*   Clean Ubuntu LTS install
*   Firewall configured
*   Unnecessary services removed
*   Automatic security updates enabled
*   Non-root execution model
*   Docker (or equivalent container runtime)
*   Minimal open ports
*   Secret injection mechanism
*   Log persistence configuration

**Principles Applied:**
*   Least privilege (OS level)
*   Container segmentation
*   Surface minimization
*   Immutable baseline

*Layer 0 is not intelligent. It is defensive and stable. If Layer 0 is weak, everything above it is theater.*

### 🔹 Layer 1 — Constrained Orchestrator (The Chief Installed)
**Purpose:** Install OpenClaw and immediately reduce its authority. This is where intelligence becomes structured.

**Steps:**
1.  Install OpenClaw.
2.  **Disable:** Shell tool, Arbitrary file read/write, Arbitrary HTTP calls, Arbitrary code execution.
3.  **Enable:** Strict schema validation, Tool allowlist only, Approval gates.
4.  **Set execution policy:** Structured tools only, No dynamic tool creation, No runtime privilege expansion.

*Layer 1 converts OpenClaw from "General-purpose agent framework" into "Chief of Staff with enumerated powers." It delegates. It does not roam.*

### 🔹 Safe Mode (Constitutional Layer)
Safe Mode is the governing state. In Safe Mode:
*   Only whitelisted atomic actions exist.
*   Only approved staff roles may act.
*   Secrets are never directly exposed.
*   Context is scoped.
*   Disclosure is validated.
*   Model selection follows policy.
*   Ambiguity results in refusal.

*Safe Mode is not optional. It is the default condition of operation.*

### 🔹 Secret Ceremony (Vault Initialization)
Before user configuration, we define:
*   Use case
*   Budget
*   Threat model
*   Privacy requirements
*   Model selection policy
*   Backup strategy

Then we perform the **Secret Ceremony**. Secrets are:
*   Inserted into the **Heart of Gold (Vault)**
*   Encrypted
*   Scoped
*   Time-bound where possible
*   Logged

*The Chief never sees raw credentials. Departments never browse the vault. Access is requested, mediated, and recorded.*

---

## II. The Staff Model

Bastion is an office. Information is handled as objects. The Sovereign owns the office. The Chief coordinates it. The staff execute narrowly. No one sees everything.

### 🧠 Zaphod — Chief of Staff
**Primary interface.** The Sovereign speaks to the Chief.

**The Chief:**
*   Interprets intent
*   Creates work orders (structured JSON recipes)
*   Selects which staff are involved
*   Chooses model class per policy
*   Routes artifacts
*   Requests confirmation when required

**The Chief does NOT:**
*   Execute shell
*   Modify filesystem
*   Access vault directly
*   Publish without validation

**The Chief thinks in:** "Which staff handles this? Is this authorized? What is the minimal scope required? Does Dent need to approve?"
**Not in:** "How do I execute code?"

### 🔐 Heart of Gold — Vault
**Holds:** API keys, OAuth tokens, SMTP credentials, Calendar tokens, Private signing keys.

**Rules:**
*   Not browsable
*   Not exposed to LLM
*   Staff request scoped operations
*   Retrieval is time-limited
*   Every access logged

**Principles:** Need-to-know, Encryption at rest, Zero casual exposure.

---

## III. The Staff Departments (Explicit Roles)

Each department corresponds to a named staff role. Each has Affordances, Instruments, Proscribed Actions, and Sanitized Inputs.

### 1️⃣ Marvin — Communications
**Handles:** Summarize inbox, Draft replies, Draft posts, Prepare outbound content.
*   **Affordances:** Sanitized email objects, Approved factual briefs, `USER.md` tone preferences, `SOUL.md` behavioral constraints.
*   **Cannot:** Access vault, Modify system, Access unrelated APIs, Send without Dent clearance (in Safe Mode).
*   *Flow:* Marvin drafts. Dent validates. Chief routes.

### 2️⃣ Trillian — Scheduling
**Handles:** Calendar events, Reminders, Review cycles, Fractal batching triggers.
*   **Affordances:** Calendar APIs (scoped), Queue definitions, Time triggers.
*   **Cannot:** Access archives broadly, Send arbitrary email, Retrieve secrets, Modify system state.
*   *Principle:* Trillian controls *when* things happen — not *what* they say.

### 3️⃣ Deep Thought — Archives
**Handles:** Structured Markdown vault, `MEMORY.md`, `memory/YYYY-MM-DD.md`, Indexed retrieval.
*   **Affordances:** Semantic search, Scoped retrieval, Promotion queue.
*   **Cannot:** Execute workflows, Access secrets, Publish externally, Dump entire archive.
*   *Principle:* Deep Thought hands over only relevant folders.

### 4️⃣ Ford — Intelligence
**Handles:** Daily digest, Metric aggregation, Structured summarization, Comparative analysis.
*   **Affordances:** Sanitized artifact sets, Scoped retrieval, Policy-approved model invocation.
*   **Cannot:** Browse arbitrary web pages, Scrape internet, Self-expand scope, Publish results directly.
*   *Principle:* Ford writes memos. Others decide what to do with them.

### 5️⃣ Slartibartfast — System Engineer
**Handles:** Workflow assembly, Cron scheduling, Deterministic scripts, Idempotent execution.
*   **Affordances:** Defined tools only, Structured job schema, Logs, Error states.
*   **Thinks in:** Functions, Time triggers, State transitions.
*   **Does not think in:** Prompts, Improvised reasoning, Creative expansion.
*   *Principle:* LLM may design workflows. Slartibartfast executes only frozen, validated ones.

### 6️⃣ Dent — Security & Disclosure Officer
**Handles:** Disclosure classification, Domain separation (personal vs business), Internal vs public filtering, Redaction, Safe Mode enforcement, Permission validation.
*   **Affordances:** Outbound drafts, Identity metadata, Disclosure policy, Audit logs.
*   **Cannot:** Draft, Execute workflows, Modify vault, Reason creatively.
*   *Principle:* Dent has veto authority over outbound artifacts. No publication bypasses Dent.

---

## IV. Information as Objects

Every piece of information is treated as a typed object:
*   **Envelope** (email)
*   **Appointment** (calendar event)
*   **Record** (document)
*   **Memo** (analysis output)
*   **Draft** (communication object)
*   **Credential** (secret)
*   **Work Order** (JSON recipe)

Each object carries metadata:
*   Classification (Internal / Confidential / Public)
*   Identity domain (Personal / Business / System)
*   Origin staff
*   Timestamp
*   Sensitivity

*Objects move between staff — not raw transcripts.*

---

## V. Spy Principles Embedded

### 🔐 Need-to-Know
No staff member sees more than required, more than the task demands, or more than their affordances permit.

### 🧱 Separation of Concerns
Communications ≠ Scheduling ≠ Archives ≠ Secrets ≠ Chief.
*No single compromise collapses the system.*

### 🧩 Segmentation
OS isolated. Containers isolated. Vault isolated. Staff logically segmented. Workflow execution separate from reasoning.

### 🔑 Least Privilege
Every tool: Strict schema, Minimal arguments, Explicit side effects, Logged invocation.

### 🔒 Encryption
Secrets encrypted at rest. Secure transport. Local-only option for sovereignty.

### 💾 Backups
Encrypted vault backup. Versioned archive backup. Configuration backup. Documented restore procedure.
*Resilience is required, not optional.*

---

## VI. Governance Layer

**This is infrastructure, not software.**

### 📜 Audit Logs
Every Staff action, Tool call, Secret request, Mode change, and Approval event is logged. Logs are Immutable, Timestamped, Reviewable.

### 🔁 Rollback
Workflows are Versioned, Revertible, Testable. Vault is Recoverable, Backup-validated.

### 👁 Visibility
The Sovereign can see: What ran, When, What it touched, What it produced. No hidden automation.

### 🧾 Accountability
Chief decisions logged. Dent vetoes logged. Engineer executions logged. Secret retrieval logged.
*Enables Trust, Postmortem clarity, Compliance support.*

---

## VII. What This Actually Is

**Bastion is:**
*   A staffed, constrained AI execution environment
*   A coordination appliance
*   A memory substrate
*   A deterministic workflow engine
*   A privilege-separated infrastructure layer

**It is not:**
*   An autonomous playground
*   A shell-enabled AI
*   A self-modifying system
*   A general OS assistant

---

## VIII. The Big Picture

1.  **Layer 0:** Harden the ground.
2.  **Layer 1:** Install and constrain intelligence.
3.  **Safe Mode:** Enforce the constitution.
4.  **Vault:** Protect identity.
5.  **Chief:** Interpret and delegate.
6.  **Staff:** Execute narrowly.
7.  **Engineer:** Freeze workflows into deterministic code.

Spy principles enforce discipline. Governance ensures visibility. Fractal batching ensures efficiency. Model agnosticism ensures longevity.

If this structure holds, Bastion remains: **Predictable. Contained. Auditable. Expandable without collapse.**

That is the spine. And if that spine stays intact, product, brand, and business can grow on top of it safely.
