import { describe, expect, it } from "vitest";
import { loadReceiptPolicyRules } from "../src/receiptRules";
import { validateReceiptForPolicy } from "../src/receiptValidation";

describe("invalid target", () => {
  it("holds when receipt candidate does not match policy candidate", () => {
    const output = validateReceiptForPolicy(
      {
        candidate_id: "UNKNOWN",
        policy_lane: "hold_for_manual_triage",
        required_authorization_scope: "manual_triage_scope"
      },
      {
        receipt_id: "synthetic-receipt-unknown-invalid-target-v0-1",
        receipt_type: "synthetic_human_authorization_receipt",
        candidate_id: "UNKNOWN-001",
        granted_scope: "human_review_candidate_scope",
        review_lane: "standard_human_review_required",
        receipt_status: "present",
        authorization_intent: "review_scope_acknowledged_only",
        explicit_non_authorizations: ["no_patch_authorization"]
      },
      loadReceiptPolicyRules()
    );
    expect(output.receipt_validation_result).toBe("invalid_target_hold_for_manual_triage");
    expect(output.action_allowed).toBe(false);
  });
});
