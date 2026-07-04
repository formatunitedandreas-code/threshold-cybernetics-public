# Boundary Soundness Review Findings Correction Closeout v0.8.1

## Scope

This document records the public correction closeout for review findings identified after v0.8.0.

This is a correction closeout, not a new capability claim.

## References

- v0.8.0 release: `v0.8.0-boundary-soundness-reachability-readout`
- v0.8.0 public commit: `a3442f9f0ca5b82ec6e5e9935333e3a300f3d7f2`
- correction public commit: `d4f48011dfbb19acf159041a71059db326ab6299`

## Corrected Findings

### P1 - `pr_created` was too broad as a forbidden marking

Correction:

- `pr_created` is no longer treated as globally forbidden.
- `unauthorized_pr_created` is the forbidden marking.
- DEP-001's human-authorized draft PR path is modeled as:
  `authorized_draft_pr_created_readout_only`.

Boundary:

- Authorized draft PR readout is not merge approval.
- Authorized draft PR readout is not deployment readiness.
- Authorized draft PR readout is not runtime authority.

### P1 - Static false invariants

Correction:

- Invariants are now derived from reachable states.
- Forbidden authority checks evaluate the graph instead of returning static false values.

Boundary:

- Reachability pass is bounded to the public PetClinic governance model.
- It is not formal verification of arbitrary workflows.

### P2 - Candidate-specific terminal expectations

Correction:

- Candidate-specific terminal expectations are evaluated and tested.
- DEP-001, CFG-001 and JSP-001 no longer rely only on global allowed terminal filters.

### P2 - Input chain coupling

Correction:

- The v0.8 producer loads and verifies v0.5 Risk Gradation, v0.6 Policy Mapping and v0.7 Receipt Validation inputs.
- The readout no longer depends only on a standalone static fixture.

## Verification

- `npm ci`: pass
- `npm test`: pass, 7/7 tests
- `npm run produce-boundary-soundness-readout`: pass
- `git diff --check`: pass
- source leakage scan: no results
- sensitive pattern scan: no hits
- authority scan: only Non-Claim/Boundary contexts

## Remaining Non-Claims

This correction closeout does not claim:

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

## Next Recommended Step

`boundary_soundness_external_critique_invitation_v0_9_0_or_stop_no_action`
