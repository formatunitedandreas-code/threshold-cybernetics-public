import { describe, expect, it } from "vitest";
import { mapCandidateToPolicy } from "../src/policyMapping";
import { loadAuthorizationTierPolicy } from "../src/policyRules";

describe("missing authorization scope", () => {
  it("maps missing risk tier to manual triage without authority", () => {
    const output = mapCandidateToPolicy({ candidate_id: "MISS-001", candidate_type: "missing_tier_candidate" }, loadAuthorizationTierPolicy());
    expect(output.risk_hint_tier).toBe("unknown");
    expect(output.policy_lane).toBe("hold_for_manual_triage");
    expect(output.required_authorization_scope).toBe("manual_triage_scope");
    expect(output.authorization_granted).toBe(false);
    expect(output.action_allowed).toBe(false);
  });
});
