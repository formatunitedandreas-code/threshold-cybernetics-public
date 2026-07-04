import { readFileSync } from "node:fs";
import type { RiskTierRule, RiskTierRules } from "./types";

export function loadRiskTierRules(path = "rules/risk-tier-rules.v0.1.json"): RiskTierRules {
  return JSON.parse(readFileSync(path, "utf8")) as RiskTierRules;
}

export function findRuleForCandidateType(rules: RiskTierRules, candidateType: string | undefined): RiskTierRule {
  return (
    rules.rules.find((rule) => rule.candidate_type === candidateType) ??
    rules.rules.find((rule) => rule.candidate_type === "unknown")!
  );
}
