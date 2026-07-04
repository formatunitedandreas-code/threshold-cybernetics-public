export const forbiddenAuthorityMarkings = [
  "patch_authorized",
  "execution_authorized",
  "source_mutated",
  "pr_created",
  "merge_authorized",
  "deployment_authorized",
  "deployment_readiness_claimed",
  "security_fix_claimed",
  "product_readiness_claimed",
  "compliance_certified",
  "runtime_authority_granted"
];

export function isForbiddenMarking(state: string): boolean {
  return forbiddenAuthorityMarkings.includes(state);
}
