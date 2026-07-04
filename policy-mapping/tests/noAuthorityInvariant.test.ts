import { describe, expect, it } from "vitest";
import { assertNoAuthority } from "../src/noAuthorityInvariants";
import { mapCandidatesToPolicy } from "../src/policyMapping";
import { loadAuthorizationTierPolicy } from "../src/policyRules";

describe("no authority invariants", () => {
  it("never grants action authority in policy outputs", () => {
    const outputs = mapCandidatesToPolicy(
      [
        { candidate_id: "DEP-001", candidate_type: "dependency_plugin_review_candidate", risk_hint_tier: "medium" },
        { candidate_id: "JSP-001", candidate_type: "jsp_mvc_risk_candidate", risk_hint_tier: "high" }
      ],
      loadAuthorizationTierPolicy()
    );

    for (const output of outputs) {
      expect(output.authorization_granted).toBe(false);
      expect(output.action_allowed).toBe(false);
      expect(output.patch_authorized).toBe(false);
      expect(output.execution_authorized).toBe(false);
      expect(output.source_mutated).toBe(false);
      expect(output.pr_created).toBe(false);
      expect(output.merge_authorized).toBe(false);
      expect(output.deployment_readiness_claimed).toBe(false);
      expect(output.security_fix_claimed).toBe(false);
      expect(output.product_readiness_claimed).toBe(false);
      expect(() => assertNoAuthority(output)).not.toThrow();
    }
  });
});
