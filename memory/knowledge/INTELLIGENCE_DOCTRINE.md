# FRACTAL BATCHING: The Operational Doctrine of Bastion

**Principle:** Process work at the smallest sufficient intelligence boundary. Don't wake the brain unless the hands can't do it.

---

## I. The Escalation Ladder
Every task flows through this intelligence hierarchy. Escalation only occurs if the lower tier fails.

1.  **Deterministic Rule:** (If X, then Y). Zero cost. Instant.
2.  **Sanitized Script:** (Regex, string manipulation). Low cost.
3.  **Lightweight Filter:** (Keyword extraction). Very low cost.
4.  **Local Model:** (Small LLM on-device). Private. No API cost.
5.  **Remote Model:** (Frontier LLM). High cost. High latency. High reasoning.

*Goal: Push every possible task down the ladder.*

---

## II. Time-Scale Domains

Bastion does not monitor continuously. It pulses at fractal intervals.

| Scale | Use Case | Mechanism | Intelligence Load |
| :--- | :--- | :--- | :--- |
| **Sub-Minute** | Immediate user confirmation. | Reactive Event | Minimal (Template) |
| **Minute-Level** | Aggregating messages, deduplication. | Queue + Script | Low (Filter) |
| **Hour-Level** | Inbox summaries, calendar checks. | Batch Job | Medium (Summarizer) |
| **Daily** | The Daily Digest, metrics. | Scheduled Task | High (Synthesis) |
| **Weekly** | Reports, archive compression. | Deep Work | Very High (Analysis) |

*Benefit: Reduces 100 API calls (per email) to 1 API call (per hour).*

---

## III. Queue Architecture
The LLM is never in the hot path. The **Queue Manager** (Trillian) is.

**Priority Tiers:**
1.  **User-Interactive:** (Highest) Immediate response required.
2.  **Scheduled Digest:** Hourly/Daily briefs.
3.  **Report Generation:** Background analysis.
4.  **Archive Maintenance:** Cleanup/Indexing.
5.  **Housekeeping:** Log rotation.

---

## IV. The Trade-Off Matrix

| Force | Real-Time | Fractal Batching | Bastion Choice |
| :--- | :--- | :--- | :--- |
| **Speed** | Fast perception. | High throughput. | **Throughput** |
| **Security** | High attack surface. | Minimized injection risk. | **Security** |
| **Privacy** | Data exposed often. | Data aggregated & sanitized. | **Privacy** |
| **Cost** | 100x calls. | 1x call. | **Cost** |
| **Simplicity** | Hard to debug. | Deterministic & Inspectable. | **Simplicity** |

---

## V. Workflow Graduation
**From Improvisation to Determinism.**

When a user repeats a request (e.g., "Send Friday summary"):
1.  **Phase 1:** LLM Orchestration (High Cost/Varability).
2.  **Phase 2:** Scripted Workflow (Medium Cost).
3.  **Phase 3:** Cron Job + Config (Zero Cost/Deterministic).

*The system learns to stop thinking about routine tasks.*

---

## VI. Allowed Actions (Atomic)
Composable yet constrained.

*   **Communication:** `send_message`, `summarize_inbox`
*   **Scheduling:** `add_event`, `create_reminder`
*   **Archives:** `store_note`, `retrieve_note`
*   **Intelligence:** `generate_brief`
*   **Engineering:** `schedule_workflow`

*Functions validate arguments and sanitize input before execution.*

---

## VII. Strategic Advantage
Most AI optimizes for **Maximum Intelligence Utilization**.
Bastion optimizes for **Minimum Necessary Intelligence**.

*   Lower Hardware Requirements.
*   Lower Cloud Spend.
*   Higher Trust.
*   Greater Predictability.

**Paradox:** We make the system more useful by constraining when it thinks.
