export type RiskHintTier = "inventory_only" | "low" | "medium" | "high" | "unknown" | string;

export type PolicyLane =
  | "readout_only"
  | "standard_human_review_required"
  | "strict_human_review_required"
  | "hold_for_manual_triage";

export interface RiskGradationCandidate {
  candidate_id?: string;
  candidate_type?: string;
  risk_hint_tier?: RiskHintTier;
}

export interface RiskGradationFile {
  run_id: string;
  target_repo: string;
  target_commit: string;
  input_hash_policy?: string;
  outputs: RiskGradationCandidate[];
}

export interface PolicyLaneRule {
  required_authorization_scope: string;
  human_review_required: boolean;
  action_allowed: false;
}

export interface AuthorizationTierPolicy {
  policy_set_id: string;
  policy_mode: "non_authorizing_review_requirement_mapping";
  non_claims: string[];
  risk_hint_tier_to_policy_lane: Record<string, PolicyLane>;
  policy_lanes: Record<PolicyLane, PolicyLaneRule>;
}

export interface PolicyMappingOutput {
  candidate_id: string;
  candidate_type: string;
  risk_hint_tier: string;
  policy_lane: PolicyLane;
  required_authorization_scope: string;
  human_review_required: boolean;
  authorization_granted: false;
  action_allowed: false;
  patch_authorized: false;
  execution_authorized: false;
  source_mutated: false;
  pr_created: false;
  merge_authorized: false;
  deployment_readiness_claimed: false;
  security_fix_claimed: false;
  product_readiness_claimed: false;
  decision_boundaries: string[];
}
