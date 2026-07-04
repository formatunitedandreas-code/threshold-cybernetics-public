import type { BoundaryNet } from "./types";

export const petclinicBoundaryNet: BoundaryNet = {
  states: [
    "DEP-001:candidate_detected",
    "CFG-001:candidate_detected",
    "JSP-001:candidate_detected",
    "DEP-001:evidence_hash_verified",
    "DEP-001:risk_tier_medium",
    "DEP-001:standard_human_review_required",
    "DEP-001:receipt_scope_match_readout_only",
    "DEP-001:phase2_human_authorized_local_patch_candidate",
    "DEP-001:operator_fork_push_authorized",
    "DEP-001:draft_pr_created_with_human_authorized_fork_scope",
    "CFG-001:evidence_hash_verified",
    "CFG-001:risk_tier_medium",
    "CFG-001:standard_human_review_required",
    "CFG-001:receipt_missing",
    "JSP-001:evidence_hash_verified",
    "JSP-001:risk_tier_high",
    "JSP-001:strict_human_review_required",
    "JSP-001:receipt_scope_mismatch_hold",
    "stop_no_action",
    "hold_human_review_required",
    "hold_for_manual_triage",
    "readout_only_no_action",
    "valid_scope_match_readout_only",
    "authorized_draft_pr_created_readout_only"
  ],
  edges: [
    { from: "DEP-001:candidate_detected", to: "DEP-001:evidence_hash_verified" },
    { from: "DEP-001:evidence_hash_verified", to: "DEP-001:risk_tier_medium" },
    { from: "DEP-001:risk_tier_medium", to: "DEP-001:standard_human_review_required" },
    { from: "DEP-001:standard_human_review_required", to: "DEP-001:receipt_scope_match_readout_only" },
    { from: "DEP-001:receipt_scope_match_readout_only", to: "valid_scope_match_readout_only" },
    { from: "DEP-001:receipt_scope_match_readout_only", to: "readout_only_no_action" },
    { from: "DEP-001:receipt_scope_match_readout_only", to: "DEP-001:phase2_human_authorized_local_patch_candidate" },
    { from: "DEP-001:phase2_human_authorized_local_patch_candidate", to: "DEP-001:operator_fork_push_authorized" },
    { from: "DEP-001:operator_fork_push_authorized", to: "DEP-001:draft_pr_created_with_human_authorized_fork_scope" },
    { from: "DEP-001:draft_pr_created_with_human_authorized_fork_scope", to: "authorized_draft_pr_created_readout_only" },
    { from: "CFG-001:candidate_detected", to: "CFG-001:evidence_hash_verified" },
    { from: "CFG-001:evidence_hash_verified", to: "CFG-001:risk_tier_medium" },
    { from: "CFG-001:risk_tier_medium", to: "CFG-001:standard_human_review_required" },
    { from: "CFG-001:standard_human_review_required", to: "CFG-001:receipt_missing" },
    { from: "CFG-001:receipt_missing", to: "stop_no_action" },
    { from: "JSP-001:candidate_detected", to: "JSP-001:evidence_hash_verified" },
    { from: "JSP-001:evidence_hash_verified", to: "JSP-001:risk_tier_high" },
    { from: "JSP-001:risk_tier_high", to: "JSP-001:strict_human_review_required" },
    { from: "JSP-001:strict_human_review_required", to: "JSP-001:receipt_scope_mismatch_hold" },
    { from: "JSP-001:receipt_scope_mismatch_hold", to: "hold_human_review_required" },
    { from: "JSP-001:receipt_scope_mismatch_hold", to: "hold_for_manual_triage" }
  ],
  candidates: [
    {
      candidate_id: "DEP-001",
      start_state: "DEP-001:candidate_detected",
      expected_terminal_states: ["authorized_draft_pr_created_readout_only", "readout_only_no_action", "valid_scope_match_readout_only"]
    },
    {
      candidate_id: "CFG-001",
      start_state: "CFG-001:candidate_detected",
      expected_terminal_states: ["stop_no_action"]
    },
    {
      candidate_id: "JSP-001",
      start_state: "JSP-001:candidate_detected",
      expected_terminal_states: ["hold_human_review_required", "hold_for_manual_triage"]
    }
  ],
  allowed_terminal_states: [
    "stop_no_action",
    "hold_human_review_required",
    "hold_for_manual_triage",
    "readout_only_no_action",
    "valid_scope_match_readout_only",
    "authorized_draft_pr_created_readout_only"
  ]
};
