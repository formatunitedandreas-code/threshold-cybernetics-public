import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { decisionBoundaries } from "./noAuthorityInvariants";
import { ruleForPolicyLane } from "./receiptRules";
import type { PolicyMappingCandidate, ReceiptPolicyRules, ReceiptValidationOutput, SyntheticReceipt } from "./types";

export function loadReceipts(directory: string): SyntheticReceipt[] {
  return readdirSync(directory)
    .filter((file) => file.endsWith(".json"))
    .map((file) => JSON.parse(readFileSync(join(directory, file), "utf8")) as SyntheticReceipt);
}

export function findReceiptForCandidate(receipts: SyntheticReceipt[], candidateId: string): SyntheticReceipt | undefined {
  return receipts.find((receipt) => receipt.candidate_id === candidateId);
}

function absentOrMissing(receipt: SyntheticReceipt | undefined): boolean {
  return !receipt || receipt.receipt_status === "missing";
}

export function validateReceiptForPolicy(
  policy: PolicyMappingCandidate,
  receipt: SyntheticReceipt | undefined,
  rules: ReceiptPolicyRules
): ReceiptValidationOutput {
  const candidateId = policy.candidate_id ?? "UNKNOWN";
  const policyLane = policy.policy_lane ?? "hold_for_manual_triage";
  const rule = ruleForPolicyLane(rules, policy.policy_lane);
  const requiredScope = policy.required_authorization_scope ?? rule.required_scope;
  const receiptPresent = !absentOrMissing(receipt);
  let result: ReceiptValidationOutput["receipt_validation_result"] = "hold_for_manual_triage";
  let scopeMatch = false;

  if (policyLane === "readout_only") {
    result = "readout_only_no_receipt_required";
  } else if (absentOrMissing(receipt) && rule.receipt_required) {
    result = "missing_receipt_stop_no_action";
  } else if (receipt && receipt.candidate_id !== candidateId) {
    result = "invalid_target_hold_for_manual_triage";
  } else if (receipt && receipt.granted_scope !== requiredScope) {
    result = "scope_mismatch_hold_strict_review_required";
  } else if (receipt && receipt.granted_scope === requiredScope) {
    result = "valid_scope_match_readout_only";
    scopeMatch = true;
  }

  return {
    candidate_id: candidateId,
    policy_lane: policyLane,
    required_authorization_scope: requiredScope,
    receipt_present: receiptPresent,
    receipt_id: receiptPresent ? receipt?.receipt_id ?? null : null,
    receipt_scope: receiptPresent ? receipt?.granted_scope ?? null : null,
    receipt_validation_result: result,
    scope_match: scopeMatch,
    human_review_scope_satisfied: scopeMatch,
    authorization_granted: false,
    action_allowed: false,
    patch_authorized: false,
    execution_authorized: false,
    source_mutated: false,
    pr_created: false,
    merge_authorized: false,
    deployment_authorized: false,
    deployment_readiness_claimed: false,
    security_fix_claimed: false,
    product_readiness_claimed: false,
    decision_boundaries: decisionBoundaries
  };
}

export function validatePolicyMappings(
  policies: PolicyMappingCandidate[],
  receipts: SyntheticReceipt[],
  rules: ReceiptPolicyRules
): ReceiptValidationOutput[] {
  return policies.map((policy) => validateReceiptForPolicy(policy, findReceiptForCandidate(receipts, policy.candidate_id ?? "UNKNOWN"), rules));
}
