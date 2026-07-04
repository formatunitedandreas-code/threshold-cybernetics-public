# Scoped Human Authorization Receipt Validation Harness

This package is a public-safe v0.7.0 harness for validating synthetic human authorization receipt scopes against v0.6 policy-lane requirements.

It uses synthetic receipt IDs and synthetic reviewer IDs only. It does not publish real reviewer data, signatures, customer names, private prompts, private logs, PetClinic source, scanner reports, or private core logic.

## Boundaries

- Receipt Validation != Patch Execution
- Receipt Valid != Action Allowed
- Receipt Scope Match != Runtime Authority
- Human Review Completed != Deployment Approval

The harness checks whether a synthetic receipt scope matches a required review scope. It does not grant authorization, execute patches, create PRs, merge, deploy, claim security remediation, claim product readiness, claim mature risk scoring, claim semantic breaking-change detection, or grant runtime authority.
