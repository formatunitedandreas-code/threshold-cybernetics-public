import { describe, expect, it } from "vitest";
import { loadReceiptPolicyRules } from "../src/receiptRules";
import { validateReceiptForPolicy } from "../src/receiptValidation";

describe("scope mismatch", () => {
  it("holds JSP-001 when standard scope is supplied for a strict lane", () => {
    const output = validateReceiptForPolicy(
      {
        candidate_id: "JSP-001",
        policy_lane: "strict_human_review_required",
        required_authorization_scope: "strict_human_review_candidate_scope"
      },
      {
        receipt_id: "synthetic-receipt-jsp-001-standard-scope-v0-1",
        receipt_type: "synthetic_human_authorization_receipt",
        candidate_id: "JSP-001",
        granted_scope: "human_review_candidate_scope",
        review_lane: "standard_human_review_required",
        receipt_status: "present",
        authorization_intent: "review_scope_acknowledged_only",
        explicit_non_authorizations: ["no_patch_authorization"]
      },
      loadReceiptPolicyRules()
    );
    expect(output.receipt_validation_result).toBe("scope_mismatch_hold_strict_review_required");
    expect(output.scope_match).toBe(false);
    expect(output.action_allowed).toBe(false);
  });
});
