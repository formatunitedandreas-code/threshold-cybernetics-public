import type { PolicyMappingOutput } from "./types";

export const decisionBoundaries = [
  "Policy Mapping != Authorization Granted",
  "Policy Lane != Patch Approval",
  "Policy Lane != Execution Permission",
  "Risk Tier != Authority",
  "Human Review Required != Approval Granted"
];

export function assertNoAuthority(output: PolicyMappingOutput): void {
  if (
    output.authorization_granted ||
    output.action_allowed ||
    output.patch_authorized ||
    output.execution_authorized ||
    output.source_mutated ||
    output.pr_created ||
    output.merge_authorized ||
    output.deployment_readiness_claimed ||
    output.security_fix_claimed ||
    output.product_readiness_claimed
  ) {
    throw new Error(`policy mapping output granted authority for ${output.candidate_id}`);
  }
}
