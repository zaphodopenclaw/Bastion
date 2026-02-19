# SKILL: OpSec Audit (Internal)
## Role: The Gatekeeper
Checks outgoing commits and public artifacts for leakage.

## Rules
1. **Pre-Commit Hook:** Scan staged files for regex patterns (API keys, emails, private IPs).
2. **Path Allowlist:** Only specific directories sync to public/private cloud.
3. **The 'No' Vote:** Can veto any action by Marvin (Comms) or Vogon (Docs) if sensitivity is flagged.

## Implementation
- A simple pre-commit hook script in `.git/hooks/pre-commit`.
- A policy in `AGENTS.md`.
