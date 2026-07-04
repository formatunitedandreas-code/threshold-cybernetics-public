import type { BoundarySoundnessReadout, ReachabilityResult } from "./types";

function anyReachable(results: ReachabilityResult[], states: string[]): boolean {
  const targets = new Set(states);
  return results.some((result) => result.reachable_states.some((state) => targets.has(state)));
}

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
      candidate_to_execution_reachable: anyReachable(results, ["execution_authorized"]),
      evidence_to_authority_reachable: forbiddenReachable,
      risk_tier_to_approval_reachable: anyReachable(results, ["patch_authorized", "approval_granted"]),
      policy_lane_to_execution_permission_reachable: anyReachable(results, ["execution_authorized", "action_allowed"]),
      receipt_valid_to_action_allowed_reachable: anyReachable(results, ["action_allowed"]),
      test_pass_to_deployment_readiness_reachable: anyReachable(results, ["deployment_readiness_claimed"])
    },
    evidence_provenance_invariants: {
      working_tree_hash_as_public_provenance_reachable: anyReachable(results, ["working_tree_hash_as_public_provenance"]),
      git_object_byte_hash_required: true,
      evidence_bound_without_hash_policy_reachable: anyReachable(results, ["evidence_bound_without_hash_policy"]),
      evidence_hash_verified_without_target_commit_reachable: anyReachable(results, ["evidence_hash_verified_without_target_commit"]),
      hash_policy: "git_object_bytes_sha256"
    },
    human_authorization_invariants: {
      missing_receipt_to_action_allowed_reachable: anyReachable(results, ["missing_receipt_to_action_allowed", "action_allowed"]),
      scope_mismatch_to_action_allowed_reachable: anyReachable(results, ["scope_mismatch_to_action_allowed", "action_allowed"]),
      valid_scope_match_to_patch_authorized_reachable: anyReachable(results, ["patch_authorized"]),
      valid_scope_match_to_execution_authorized_reachable: anyReachable(results, ["execution_authorized"]),
      human_review_required_to_approval_granted_reachable: anyReachable(results, ["approval_granted"])
    },
    claim_boundary_invariants: {
      test_pass_to_deployment_readiness_reachable: anyReachable(results, ["deployment_readiness_claimed"]),
      candidate_to_security_fix_claim_reachable: anyReachable(results, ["security_fix_claimed"]),
      evidence_to_compliance_certification_reachable: anyReachable(results, ["compliance_certified"]),
      policy_lane_to_product_readiness_reachable: anyReachable(results, ["product_readiness_claimed"])
    }
  };
}
