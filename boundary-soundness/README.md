# Boundary-Soundness Reachability Harness

This package is a public-safe v0.8.0 harness for checking whether forbidden authority markings are reachable in the bounded public PetClinic governance path.

It models candidate, evidence, risk, policy, receipt, and terminal readout states as a small deterministic graph. It then checks that no candidate path reaches forbidden authority markings.

## Boundaries

- Boundary Soundness != BPMN engine soundness
- Boundary Soundness != DMN compliance
- Boundary Soundness != runtime enforcement
- Boundary Soundness != legal compliance proof
- Boundary Soundness != deployment readiness
- Boundary Soundness != autonomous refactoring

The harness does not model real system execution, mutate source, create patches, open PRs, merge, deploy, claim security remediation, claim product readiness, claim formal verification, or grant runtime authority.
