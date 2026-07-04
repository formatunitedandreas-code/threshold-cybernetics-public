import { decisionBoundaries } from "./noAuthorityInvariants";
import { laneForTier } from "./policyRules";
import type { AuthorizationTierPolicy, PolicyMappingOutput, RiskGradationCandidate } from "./types";

export function mapCandidateToPolicy(candidate: RiskGradationCandidate, policy: AuthorizationTierPolicy): PolicyMappingOutput {
  const tier = candidate.risk_hint_tier ?? "unknown";
  const policyLane = laneForTier(policy, candidate.risk_hint_tier);
  const laneRule = policy.policy_lanes[policyLane];

  return {
    candidate_id: candidate.candidate_id ?? "UNKNOWN",
    candidate_type: candidate.candidate_type ?? "unknown",
    risk_hint_tier: tier,
    policy_lane: policyLane,
    required_authorization_scope: laneRule.required_authorization_scope,
    human_review_required: laneRule.human_review_required,
    authorization_granted: false,
    action_allowed: false,
    patch_authorized: false,
    execution_authorized: false,
    source_mutated: false,
    pr_created: false,
    merge_authorized: false,
    deployment_readiness_claimed: false,
    security_fix_claimed: false,
    product_readiness_claimed: false,
    decision_boundaries: decisionBoundaries
  };
}

export function mapCandidatesToPolicy(candidates: RiskGradationCandidate[], policy: AuthorizationTierPolicy): PolicyMappingOutput[] {
  return candidates.map((candidate) => mapCandidateToPolicy(candidate, policy));
}
