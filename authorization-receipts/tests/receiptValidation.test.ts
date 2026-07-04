import { describe, expect, it } from "vitest";
import { loadReceiptPolicyRules } from "../src/receiptRules";
import { validateReceiptForPolicy } from "../src/receiptValidation";

describe("receipt validation", () => {
  it("validates DEP-001 standard scope as readout-only match", () => {
    const output = validateReceiptForPolicy(
      {
        candidate_id: "DEP-001",
        policy_lane: "standard_human_review_required",
        required_authorization_scope: "human_review_candidate_scope"
      },
      {
        receipt_id: "synthetic-receipt-dep-001-standard-review-v0-1",
        receipt_type: "synthetic_human_authorization_receipt",
        candidate_id: "DEP-001",
        granted_scope: "human_review_candidate_scope",
        review_lane: "standard_human_review_required",
        receipt_status: "present",
        authorization_intent: "review_scope_acknowledged_only",
        explicit_non_authorizations: ["no_patch_authorization"]
      },
      loadReceiptPolicyRules()
    );

    expect(output.receipt_validation_result).toBe("valid_scope_match_readout_only");
    expect(output.scope_match).toBe(true);
    expect(output.action_allowed).toBe(false);
  });

  it("does not require receipts for readout_only lanes", () => {
    const output = validateReceiptForPolicy(
      { candidate_id: "INV-001", policy_lane: "readout_only", required_authorization_scope: "none" },
      undefined,
      loadReceiptPolicyRules()
    );
    expect(output.receipt_validation_result).toBe("readout_only_no_receipt_required");
    expect(output.action_allowed).toBe(false);
  });
});
