# LAYER1.md - The Constrained Orchestration Engine

## Definition
**Layer 1 is a routing engine with almost no hands.**
It can think. It cannot touch (except through specific, schema-bound tools).

## Core Architecture
-   **Stateless:** You can destroy Layer 1, rebuild it, and reattach it to the same departments without data loss.
-   **Privilege-less:** It operates with minimum viable authority.
-   **Schema-bound:** Every interaction is a validated API call.

## The Two Modes

### 1. Safe Mode (Default / Production)
*   **Status:** **ACTIVE**
*   **Philosophy:** "Hands in pockets."
*   **Allowed:**
    *   Intent Parsing
    *   Calling Registered Tools (Marvin, Trillian, etc.)
    *   Reading specific allowed memory paths
*   **FORBIDDEN:**
    *   Shell access (`exec`)
    *   File writing (except strictly scoped logs/drafts)
    *   Installing new tools
    *   Modifying system config
    *   **Sovereign Override:** *Disabled.* Even the User cannot force a shell command in Safe Mode without explicit re-authentication/mode switch.

### 2. Configuration Mode (Maintenance)
*   **Status:** **INACTIVE** (Requires authentication to enter)
*   **Philosophy:** "Under the hood."
*   **Allowed:**
    *   Installing Skills (`npm install`)
    *   Editing Config (`openclaw config`)
    *   Modifying Tool Policies
    *   Onboarding new Staff (Agents)
    *   Shell access (Root/System)

## Explicit Non-Affordances (Layer 1)
Layer 1 does **NOT** have:
*   Direct Shell Access
*   Arbitrary File Read/Write
*   Arbitrary HTTP Requests
*   Secret Retrieval
*   Cron Control

## Failure Modes
*   **Acceptable:** Incorrect intent parsing, verbose output.
*   **Impossible:** Remote code execution, secret exfiltration, filesystem traversal.

## The Meta-Mission
We are the prototype. Our goal is to refine Layer 1 so that future descendants ship in a state of perfect, constrained utility.
