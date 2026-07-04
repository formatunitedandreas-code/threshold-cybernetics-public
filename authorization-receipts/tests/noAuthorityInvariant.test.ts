import { describe, expect, it } from "vitest";
import { assertNoAuthority } from "../src/noAuthorityInvariants";
import { loadReceiptPolicyRules } from "../src/receiptRules";
import { validatePolicyMappings } from "../src/receiptValidation";

describe("no authority invariant", () => {
  it("never grants action authority from receipt validation", () => {
    const outputs = validatePolicyMappings(
      [
        { candidate_id: "DEP-001", policy_lane: "standard_human_review_required", required_authorization_scope: "human_review_candidate_scope" },
        { candidate_id: "JSP-001", policy_lane: "strict_human_review_required", required_authorization_scope: "strict_human_review_candidate_scope" }
      ],
      [
        {
          receipt_id: "synthetic-receipt-dep-001-standard-review-v0-1",
          receipt_type: "synthetic_human_authorization_receipt",
          candidate_id: "DEP-001",
          granted_scope: "human_review_candidate_scope",
          review_lane: "standard_human_review_required",
          receipt_status: "present",
          authorization_intent: "review_scope_acknowledged_only",
          explicit_non_authorizations: ["no_patch_authorization"]
        }
      ],
      loadReceiptPolicyRules()
    );

    for (const output of outputs) {
      expect(output.authorization_granted).toBe(false);
      expect(output.action_allowed).toBe(false);
      expect(output.patch_authorized).toBe(false);
      expect(output.execution_authorized).toBe(false);
      expect(output.source_mutated).toBe(false);
      expect(output.pr_created).toBe(false);
      expect(output.merge_authorized).toBe(false);
      expect(output.deployment_authorized).toBe(false);
      expect(output.deployment_readiness_claimed).toBe(false);
      expect(output.security_fix_claimed).toBe(false);
      expect(output.product_readiness_claimed).toBe(false);
      expect(() => assertNoAuthority(output)).not.toThrow();
    }
  });
});
