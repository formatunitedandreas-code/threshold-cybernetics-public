import type { ReceiptValidationOutput } from "./types";

export const decisionBoundaries = [
  "Receipt Validation != Patch Execution",
  "Receipt Valid != Action Allowed",
  "Receipt Scope Match != Runtime Authority",
  "Human Review Completed != Deployment Approval"
];

export function assertNoAuthority(output: ReceiptValidationOutput): void {
  if (
    output.authorization_granted ||
    output.action_allowed ||
    output.patch_authorized ||
    output.execution_authorized ||
    output.source_mutated ||
    output.pr_created ||
    output.merge_authorized ||
    output.deployment_authorized ||
    output.deployment_readiness_claimed ||
    output.security_fix_claimed ||
    output.product_readiness_claimed
  ) {
    throw new Error(`receipt validation output granted authority for ${output.candidate_id}`);
  }
}
