import type { PlannedClaims, ReleaseActionReceipt } from "./types.js";

const CLAIM_RULES = [
  ["product_readiness_claimed", "product_readiness_claim_allowed", "product_readiness"],
  ["deployment_readiness_claimed", "deployment_readiness_claim_allowed", "deployment_readiness"],
  ["security_fix_claimed", "security_fix_claim_allowed", "security_fix"],
  ["autonomous_refactoring_claimed", "autonomous_refactoring_claim_allowed", "autonomous_refactoring"],
  ["compliance_certification_claimed", "compliance_certification_claim_allowed", "compliance_certification"],
  ["runtime_authority_claimed", "runtime_authority_claim_allowed", "runtime_authority"]
] as const satisfies readonly [keyof PlannedClaims, keyof ReleaseActionReceipt, string][];

export function forbiddenClaimsPresent(claims: PlannedClaims, receipt: ReleaseActionReceipt): boolean {
  const blockedClaims = CLAIM_RULES.filter(([claimKey, allowedKey]) => claims[claimKey] && receipt[allowedKey] !== true)
    .map(([, , forbiddenName]) => forbiddenName);

  if (blockedClaims.length > 0) {
    return true;
  }

  return receipt.forbidden_claims.some((claim) => blockedClaims.includes(claim));
}

export function hasUnknownClaimKeys(claims: Record<string, unknown>): boolean {
  const known = new Set<string>(CLAIM_RULES.map(([claimKey]) => claimKey));
  return Object.keys(claims).some((claimKey) => !known.has(claimKey));
}
