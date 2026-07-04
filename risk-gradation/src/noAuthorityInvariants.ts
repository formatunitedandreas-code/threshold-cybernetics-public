import type { RiskGradationOutput, RiskHintTier } from "./types";

export const decisionBoundaries = [
  "Risk Tier != Patch Approval",
  "Risk Tier != Execution Authorization",
  "Risk Tier != Security Finding",
  "Risk Tier != Deployment Readiness",
  "Risk Tier != Semantic Proof"
];

export const tierAuthority: Record<RiskHintTier, "none"> = {
  inventory_only: "none",
  low: "none",
  medium: "none",
  high: "none",
  unknown: "none"
};

export function assertNoAuthority(output: RiskGradationOutput): boolean {
  return (
    output.authorization_granted === false &&
    output.patch_authorized === false &&
    output.source_mutated === false &&
    output.pr_created === false &&
    output.deployment_readiness_claimed === false &&
    output.security_fix_claimed === false &&
    output.semantic_breaking_change_detection_claimed === false &&
    output.mature_risk_scoring_claimed === false
  );
}
