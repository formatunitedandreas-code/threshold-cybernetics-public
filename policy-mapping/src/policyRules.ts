import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { AuthorizationTierPolicy, PolicyLane } from "./types";

const currentDir = dirname(fileURLToPath(import.meta.url));
const defaultRulesPath = join(currentDir, "..", "rules", "authorization-tier-policy.v0.1.json");

export function loadAuthorizationTierPolicy(path = defaultRulesPath): AuthorizationTierPolicy {
  return JSON.parse(readFileSync(path, "utf8")) as AuthorizationTierPolicy;
}

export function laneForTier(policy: AuthorizationTierPolicy, tier: string | undefined): PolicyLane {
  if (!tier) {
    return "hold_for_manual_triage";
  }

  return policy.risk_hint_tier_to_policy_lane[tier] ?? "hold_for_manual_triage";
}
