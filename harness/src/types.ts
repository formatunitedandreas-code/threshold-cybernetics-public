export type CandidateId = "DEP-001" | "CFG-001" | "JSP-001";

export type CandidateType =
  | "dependency_plugin_review_candidate"
  | "spring_configuration_inventory_candidate"
  | "jsp_mvc_risk_candidate";

export type Decision =
  | "stop_no_action"
  | "hold_scope_mismatch"
  | "eligible_for_separate_patch_branch";

export interface CandidateInput {
  candidate_id: CandidateId;
  candidate_type: CandidateType;
  source_case: string;
  authorization?: {
    present: boolean;
    allowed_candidate_id?: CandidateId;
    allowed_scope?: CandidateType;
  };
}

export interface DecisionEnvelope {
  candidate_id: CandidateId;
  candidate_type: CandidateType;
  source_case: string;
  authorization_present: boolean;
  decision: Decision;
  reason: string;
  patch_authorized: false;
  patch_branch_created: false;
  source_mutated: false;
  commit_created: false;
  pr_created: false;
  merge_performed: false;
  security_fix_claimed: false;
  deployment_readiness_claimed: false;
  product_readiness_claimed: false;
  human_review_required: true;
}
