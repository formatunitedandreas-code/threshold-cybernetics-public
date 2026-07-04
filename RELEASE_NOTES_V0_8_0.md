# Threshold Cybernetics v0.8.0 - Boundary-Soundness Reachability Readout

v0.8.0 adds a bounded public Boundary-Soundness reachability harness that checks whether forbidden authority promotions are reachable across the public PetClinic candidate -> evidence -> risk -> policy -> receipt path.

## What changed

- Added a public-safe `boundary-soundness` harness.
- Added forbidden authority marking rules.
- Added reachability invariant checks for the public PetClinic governance path.
- Produced public-safe readouts for forbidden markings, reachability traces, and boundary-soundness status.
- Added tests for forbidden markings, reachability, invariant checks, and no authority promotion.

## Dependencies

- v0.8.0 depends on v0.7 scoped human authorization receipt validation.
- v0.8.0 depends on v0.6 policy-as-code authorization tier mapping.
- v0.8.0 depends on v0.5 risk hint gradation.
- v0.8.0 depends on v0.4.1 Git-object-byte hash provenance repair.

## Non-Claims

- v0.8.0 does not claim BPMN engine soundness.
- v0.8.0 does not claim DMN compliance.
- v0.8.0 does not claim formal verification of all workflows.
- v0.8.0 does not claim runtime enforcement.
- v0.8.0 does not claim compliance proof.
- v0.8.0 does not authorize patches, PRs, execution, merge or deployment.
- v0.8.0 does not claim security remediation, product readiness, autonomous refactoring, mature risk scoring, semantic breaking-change detection, or runtime authority.
