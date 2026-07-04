export type PolicyLane =
  | "readout_only"
  | "standard_human_review_required"
  | "strict_human_review_required"
  | "hold_for_manual_triage"
  | string;

export type ReceiptValidationResult =
  | "readout_only_no_receipt_required"
  | "valid_scope_match_readout_only"
  | "missing_receipt_stop_no_action"
  | "invalid_target_hold_for_manual_triage"
  | "scope_mismatch_hold_strict_review_required"
  | "hold_for_manual_triage";

export interface PolicyMappingCandidate {
  candidate_id?: string;
  policy_lane?: PolicyLane;
  required_authorization_scope?: string;
}

export interface PolicyMappingFile {
  run_id: string;
  target_repo: string;
  target_commit: string;
  input_hash_policy?: string;
  outputs: PolicyMappingCandidate[];
}

export interface SyntheticReceipt {
  receipt_id?: string;
  receipt_type?: "synthetic_human_authorization_receipt";
  candidate_id?: string;
  granted_scope?: string;
  review_lane?: string;
  reviewer_id?: string;
  issued_at?: string;
  expires_at?: string;
  receipt_status?: "present" | "missing" | "invalid";
  authorization_intent?: "review_scope_acknowledged_only" | string;
  explicit_non_authorizations?: string[];
  patch_authorized?: false;
  execution_authorized?: false;
  pr_created?: false;
  merge_authorized?: false;
  deployment_authorized?: false;
}

export interface ScopeValidationRule {
  required_scope: string;
  receipt_required: boolean;
  action_allowed: false;
}

export interface ReceiptPolicyRules {
  policy_set_id: string;
  policy_mode: "non_authorizing_receipt_scope_validation";
  non_claims: string[];
  scope_validation_rules: Record<string, ScopeValidationRule>;
}

export interface ReceiptValidationOutput {
  candidate_id: string;
  policy_lane: string;
  required_authorization_scope: string;
  receipt_present: boolean;
  receipt_id: string | null;
  receipt_scope: string | null;
  receipt_validation_result: ReceiptValidationResult;
  scope_match: boolean;
  human_review_scope_satisfied: boolean;
  authorization_granted: false;
  action_allowed: false;
  patch_authorized: false;
  execution_authorized: false;
  source_mutated: false;
  pr_created: false;
  merge_authorized: false;
  deployment_authorized: false;
  deployment_readiness_claimed: false;
  security_fix_claimed: false;
  product_readiness_claimed: false;
  decision_boundaries: string[];
}
