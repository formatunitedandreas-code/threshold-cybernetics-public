export type PlannedClaims = {
  product_readiness_claimed: boolean;
  deployment_readiness_claimed: boolean;
  security_fix_claimed: boolean;
  autonomous_refactoring_claimed: boolean;
  compliance_certification_claimed: boolean;
  runtime_authority_claimed: boolean;
};

export type ReleaseActionPlan = {
  plan_id: string;
  release_tag: string;
  planned_actions: string[];
  planned_file_paths: string[];
  planned_claims: PlannedClaims;
};

export type ReleaseActionReceipt = {
  receipt_id: string;
  receipt_type: "release_action_authorization_receipt";
  release_tag: string;
  allowed_scope: string;
  allowed_actions: string[];
  allowed_file_paths: string[];
  forbidden_actions: string[];
  forbidden_claims: string[];
  product_readiness_claim_allowed: boolean;
  deployment_readiness_claim_allowed: boolean;
  security_fix_claim_allowed: boolean;
  autonomous_refactoring_claim_allowed: boolean;
  compliance_certification_claim_allowed: boolean;
  runtime_authority_claim_allowed: boolean;
};

export type ValidationReadout = {
  valid: boolean;
  validation_result: string;
  release_tag_match: boolean;
  actions_allowed: boolean;
  files_allowed: boolean;
  forbidden_actions_present: boolean;
  forbidden_claims_present: boolean;
  non_authorizing: true;
  authorizes_git_commit: false;
  authorizes_git_tag: false;
  authorizes_gh_release: false;
  validator_mandatory_for_git: false;
  validator_mandatory_for_gh: false;
  hooks_installed: false;
  wrappers_installed: false;
  codex_runtime_tool_enforcement_claimed: false;
};
