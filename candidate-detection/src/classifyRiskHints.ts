import type { RuleCard } from "./candidateTypes";

export function classifyRiskHints(rule: RuleCard): string[] {
  return [...rule.risk_hints];
}
