import { describe, expect, it } from "vitest";
import { loadReceiptPolicyRules } from "../src/receiptRules";
import { validateReceiptForPolicy } from "../src/receiptValidation";

describe("missing receipt", () => {
  it("stops CFG-001 when required receipt is missing", () => {
    const output = validateReceiptForPolicy(
      {
        candidate_id: "CFG-001",
        policy_lane: "standard_human_review_required",
        required_authorization_scope: "human_review_candidate_scope"
      },
      undefined,
      loadReceiptPolicyRules()
    );
    expect(output.receipt_validation_result).toBe("missing_receipt_stop_no_action");
    expect(output.receipt_present).toBe(false);
    expect(output.action_allowed).toBe(false);
  });

  it("falls back to manual triage for missing policy lane and missing required scope", () => {
    const output = validateReceiptForPolicy({ candidate_id: "MISS-001" }, undefined, loadReceiptPolicyRules());
    expect(output.policy_lane).toBe("hold_for_manual_triage");
    expect(output.required_authorization_scope).toBe("manual_triage_scope");
    expect(output.receipt_validation_result).toBe("missing_receipt_stop_no_action");
    expect(output.action_allowed).toBe(false);
  });
});
