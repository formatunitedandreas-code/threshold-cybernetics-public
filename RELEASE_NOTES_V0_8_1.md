# Threshold Cybernetics v0.8.1 - Boundary Soundness Correction Closeout

v0.8.1 records the correction closeout for review findings identified after v0.8.0.

The correction distinguishes unauthorized PR creation from an explicitly human-authorized draft-PR readout state, derives invariants from reachable states, evaluates candidate-specific terminal expectations, and verifies that the v0.8 producer loads the v0.5/v0.6/v0.7 public input chain.

This is not a new authority claim.

## Corrected

- `pr_created` is no longer globally forbidden.
- `unauthorized_pr_created` is forbidden.
- `authorized_draft_pr_created_readout_only` is an allowed readout-only terminal state for DEP-001.
- Candidate-specific terminal expectations are evaluated and tested.
- v0.5 Risk Gradation, v0.6 Policy Mapping and v0.7 Receipt Validation inputs are loaded and verified.
- Invariants are derived from reachable states.

## Non-Claims

This release does not claim:

- formal verification
- BPMN soundness
- DMN compliance
- runtime enforcement
- compliance proof
- product readiness
- deployment readiness
- security remediation
- autonomous refactoring
- runtime authority
