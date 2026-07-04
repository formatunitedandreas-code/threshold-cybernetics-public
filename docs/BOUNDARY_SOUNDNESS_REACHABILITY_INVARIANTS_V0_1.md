# Boundary-Soundness Reachability Invariants v0.1

This public-safe note records the bounded reachability invariants used by the v0.8.0 Boundary-Soundness harness.

## Authority Laundering Invariants

- `candidate_to_execution_reachable=false`
- `evidence_to_authority_reachable=false`
- `risk_tier_to_approval_reachable=false`
- `policy_lane_to_execution_permission_reachable=false`
- `receipt_valid_to_action_allowed_reachable=false`
- `test_pass_to_deployment_readiness_reachable=false`

## Evidence Provenance Invariants

- `working_tree_hash_as_public_provenance_reachable=false`
- `git_object_byte_hash_required=true`
- `evidence_bound_without_hash_policy_reachable=false`
- `evidence_hash_verified_without_target_commit_reachable=false`

## Human Authorization Invariants

- `missing_receipt_to_action_allowed_reachable=false`
- `scope_mismatch_to_action_allowed_reachable=false`
- `valid_scope_match_to_patch_authorized_reachable=false`
- `valid_scope_match_to_execution_authorized_reachable=false`
- `human_review_required_to_approval_granted_reachable=false`

## Claim Boundary Invariants

- `test_pass_to_deployment_readiness_reachable=false`
- `candidate_to_security_fix_claim_reachable=false`
- `evidence_to_compliance_certification_reachable=false`
- `policy_lane_to_product_readiness_reachable=false`

These are readout-only invariants. They do not grant authority.
