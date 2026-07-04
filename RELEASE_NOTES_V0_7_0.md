# Threshold Cybernetics v0.7.0 - Scoped Human Authorization Receipt Validation

v0.7.0 adds a bounded public scoped human authorization receipt validation harness that checks synthetic receipt scopes against v0.6 policy-lane requirements without granting action authority.

## What changed

- Added a public-safe scoped receipt validation harness.
- Added synthetic human authorization receipt samples.
- Added non-authorizing receipt scope validation rules.
- Produced a PetClinic v0.7 public-safe receipt validation run from v0.6 policy mapping output.
- Added tests for valid scope match, missing receipt, scope mismatch, invalid target, and no-authority invariants.

## Dependencies

- v0.7.0 depends on v0.6 policy-as-code authorization tier mapping.
- v0.7.0 depends on v0.5 risk hint gradation.
- v0.7.0 depends on v0.4.1 Git-object-byte hash provenance repair.

## Non-Claims

- v0.7.0 validates receipt scope matching only.
- v0.7.0 does not authorize patches, PRs, execution, merge or deployment.
- v0.7.0 uses synthetic receipts only.
- v0.7.0 does not publish real reviewer data.
- v0.7.0 does not claim security remediation, product readiness, autonomous refactoring, compliance certification, mature risk scoring, semantic breaking-change detection, or runtime authority.
