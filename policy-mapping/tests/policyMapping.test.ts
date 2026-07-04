import { describe, expect, it } from "vitest";
import { mapCandidatesToPolicy } from "../src/policyMapping";
import { loadAuthorizationTierPolicy } from "../src/policyRules";
import type { RiskGradationCandidate } from "../src/types";

const candidates: RiskGradationCandidate[] = [
  { candidate_id: "DEP-001", candidate_type: "dependency_plugin_review_candidate", risk_hint_tier: "medium" },
  { candidate_id: "CFG-001", candidate_type: "spring_config_inventory_candidate", risk_hint_tier: "medium" },
  { candidate_id: "JSP-001", candidate_type: "jsp_mvc_risk_candidate", risk_hint_tier: "high" },
  { candidate_id: "INV-001", candidate_type: "inventory_candidate", risk_hint_tier: "inventory_only" },
  { candidate_id: "LOW-001", candidate_type: "low_signal_candidate", risk_hint_tier: "low" }
];

describe("policy mapping", () => {
  it("maps bounded risk tiers to non-authorizing review lanes", () => {
    const outputs = mapCandidatesToPolicy(candidates, loadAuthorizationTierPolicy());
    expect(outputs.find((output) => output.candidate_id === "DEP-001")?.policy_lane).toBe("standard_human_review_required");
    expect(outputs.find((output) => output.candidate_id === "CFG-001")?.policy_lane).toBe("standard_human_review_required");
    expect(outputs.find((output) => output.candidate_id === "JSP-001")?.policy_lane).toBe("strict_human_review_required");
    expect(outputs.find((output) => output.candidate_id === "INV-001")?.policy_lane).toBe("readout_only");
    expect(outputs.find((output) => output.candidate_id === "LOW-001")?.policy_lane).toBe("standard_human_review_required");
  });
});
