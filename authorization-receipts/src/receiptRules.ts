import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { ReceiptPolicyRules, ScopeValidationRule } from "./types";

const currentDir = dirname(fileURLToPath(import.meta.url));
const defaultRulesPath = join(currentDir, "..", "rules", "scoped-human-authorization-receipt-policy.v0.1.json");

export function loadReceiptPolicyRules(path = defaultRulesPath): ReceiptPolicyRules {
  return JSON.parse(readFileSync(path, "utf8")) as ReceiptPolicyRules;
}

export function ruleForPolicyLane(rules: ReceiptPolicyRules, lane: string | undefined): ScopeValidationRule {
  return (
    rules.scope_validation_rules[lane ?? "hold_for_manual_triage"] ??
    rules.scope_validation_rules.hold_for_manual_triage
  );
}
