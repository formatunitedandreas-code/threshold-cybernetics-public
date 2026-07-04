# Public Release Action Receipt Validator Harness

This v0.9.1 harness provides a public-safe, reproducible Release Action Receipt Validator.

It validates a release action plan against a scoped receipt:

- release tag
- allowed actions
- file allowlist
- forbidden actions
- forbidden claims

It is not private core logic and does not publish private Threshold source.

It does not install hooks, wrap git, wrap gh, intercept Codex tools, authorize commits, authorize tags, authorize GitHub releases, claim product readiness, claim deployment readiness, claim security remediation, or claim runtime authority.

Run:

```bash
npm ci
npm test
npm run produce-validator-readout -- --plan ./fixtures/valid/v0.9.1-release-action.plan.public-safe.json --receipt ./fixtures/valid/v0.9.1-release-action.receipt.public-safe.json --out ../real-repo-runs/self-governance-validator-v0-9-1/validator-readout.public-safe.json
```
