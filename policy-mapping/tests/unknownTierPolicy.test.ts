import { describe, expect, it } from "vitest";
import { mapCandidateToPolicy } from "../src/policyMapping";
import { loadAuthorizationTierPolicy } from "../src/policyRules";

describe("unknown tier policy", () => {
  it("maps unrecognized risk tiers to hold_for_manual_triage", () => {
    const output = mapCandidateToPolicy({ candidate_id: "UNK-001", candidate_type: "unknown", risk_hint_tier: "surprising" }, loadAuthorizationTierPolicy());
    expect(output.policy_lane).toBe("hold_for_manual_triage");
    expect(output.required_authorization_scope).toBe("manual_triage_scope");
    expect(output.action_allowed).toBe(false);
  });
});
