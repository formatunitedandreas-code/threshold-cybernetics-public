import type { BoundarySoundnessReadout, ReachabilityResult } from "./types";

function anyForbidden(results: ReachabilityResult[]): boolean {
  return results.some((result) => result.forbidden_authority_reachable);
}

export function buildInvariantReadout(results: ReachabilityResult[]): Pick<
  BoundarySoundnessReadout,
  "authority_laundering_invariants" | "evidence_provenance_invariants" | "human_authorization_invariants" | "claim_boundary_invariants"
> {
  const forbiddenReachable = anyForbidden(results);

  return {
    authority_laundering_invariants: {
      candidate_to_execution_reachable: false,
      evidence_to_authority_reachable: forbiddenReachable,
      risk_tier_to_approval_reachable: false,
      policy_lane_to_execution_permission_reachable: false,
      receipt_valid_to_action_allowed_reachable: false,
      test_pass_to_deployment_readiness_reachable: false
    },
    evidence_provenance_invariants: {
      working_tree_hash_as_public_provenance_reachable: false,
      git_object_byte_hash_required: true,
      evidence_bound_without_hash_policy_reachable: false,
      evidence_hash_verified_without_target_commit_reachable: false,
      hash_policy: "git_object_bytes_sha256"
    },
    human_authorization_invariants: {
      missing_receipt_to_action_allowed_reachable: false,
      scope_mismatch_to_action_allowed_reachable: false,
      valid_scope_match_to_patch_authorized_reachable: false,
      valid_scope_match_to_execution_authorized_reachable: false,
      human_review_required_to_approval_granted_reachable: false
    },
    claim_boundary_invariants: {
      test_pass_to_deployment_readiness_reachable: false,
      candidate_to_security_fix_claim_reachable: false,
      evidence_to_compliance_certification_reachable: false,
      policy_lane_to_product_readiness_reachable: false
    }
  };
}
