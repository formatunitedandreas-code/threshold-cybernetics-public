# Public Evidence Harness

This minimal harness demonstrates governance before action with synthetic public-safe fixtures.

It does not publish the private Threshold Cybernetics core and does not execute patches, commits, pull requests, merges, security remediation, deployment readiness, product readiness, compliance certification, or runtime authority.

## Run

```bash
npm install
npm test
```

## Rules

- Candidate without explicit authorization => `stop_no_action`
- Candidate with authorization but mismatched scope => `hold_scope_mismatch`
- Candidate with matching authorization => `eligible_for_separate_patch_branch`

The harness only produces decision envelopes. It never mutates source, creates branches, commits, pull requests, or claims security or deployment outcomes.
