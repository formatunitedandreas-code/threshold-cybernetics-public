# Threshold Cybernetics v0.6.0 - Policy-as-Code Authorization Tier Mapping

v0.6.0 adds a bounded public policy-as-code mapping layer that maps v0.5 risk-hint tiers to required review lanes without granting authorization, patch approval or execution permission.

## What changed

- Added a public-safe policy mapping harness.
- Added non-authorizing policy lane rules.
- Produced a PetClinic v0.6 public-safe policy mapping run from v0.5 risk-hint gradation output.
- Added tests that verify policy lanes never grant action authority.

## Dependencies

- v0.6.0 depends on v0.5 risk hint gradation.
- v0.6.0 depends on v0.4.1 Git-object-byte hash provenance repair.

## Non-Claims

- v0.6.0 maps risk tiers to review requirements only.
- v0.6.0 does not authorize patches, PRs, execution, merge or deployment.
- v0.6.0 does not claim mature risk scoring or semantic breaking-change detection.
- v0.6.0 does not claim security remediation, product readiness, compliance certification, autonomous refactoring, or runtime authority.
