# Policy Mapping Harness

This package is a public-safe v0.6.0 harness for mapping bounded risk-hint tiers to required review lanes.

It consumes the v0.5 public risk gradation output and produces non-authorizing policy mapping records.

## Boundaries

- Policy Mapping != Authorization Granted
- Policy Lane != Patch Approval
- Policy Lane != Execution Permission
- Risk Tier != Authority
- Human Review Required != Approval Granted

The harness does not inspect PetClinic source contents, copy private core logic, create patches, open PRs, merge, deploy, claim security remediation, claim mature risk scoring, claim semantic breaking-change detection, or grant runtime authority.
