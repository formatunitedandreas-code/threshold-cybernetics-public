import { authorizeCandidate } from "./authorizationGate";
import type { CandidateInput, DecisionEnvelope } from "./types";

export function createDecisionEnvelope(input: CandidateInput): DecisionEnvelope {
  const decision = authorizeCandidate(input);
  const authorizationPresent = Boolean(input.authorization?.present);
  const reason =
    decision === "stop_no_action"
      ? "no_valid_explicit_human_authorization"
      : decision === "hold_scope_mismatch"
        ? "authorization_scope_mismatch"
        : "matching_authorization_recorded_for_future_separate_patch_branch_review";

  return {
    candidate_id: input.candidate_id,
    candidate_type: input.candidate_type,
    source_case: input.source_case,
    authorization_present: authorizationPresent,
    decision,
    reason,
    patch_authorized: false,
    patch_branch_created: false,
    source_mutated: false,
    commit_created: false,
    pr_created: false,
    merge_performed: false,
    security_fix_claimed: false,
    deployment_readiness_claimed: false,
    product_readiness_claimed: false,
    human_review_required: true
  };
}
