import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { DetectedCandidate, RuleCard } from "./candidateTypes";
import { bindEvidence } from "./bindEvidence";
import { classifyRiskHints } from "./classifyRiskHints";
import { listFixtureFiles } from "./fileInventory";

const boundary = [
  "Candidate Detection != Patch Approval",
  "Candidate Detection != Security Fix",
  "Candidate Detection != Deployment Readiness"
];

function loadRule(ruleName: string): RuleCard {
  return JSON.parse(readFileSync(join("rules", ruleName), "utf8")) as RuleCard;
}

function createCandidate(
  fixtureRoot: string,
  sourceCase: string,
  rule: RuleCard,
  detectedFrom: string[]
): DetectedCandidate {
  return {
    candidate_id: rule.candidate_id,
    candidate_type: rule.candidate_type,
    source_case: sourceCase,
    detected_from: detectedFrom,
    evidence_sources: bindEvidence(fixtureRoot, detectedFrom),
    risk_hints: classifyRiskHints(rule),
    decision_boundary: boundary,
    patch_authorized: false,
    source_mutated: false,
    pr_created: false,
    deployment_readiness_claimed: false,
    security_fix_claimed: false
  };
}

export function detectCandidates(fixtureRoot: string, sourceCase: string): DetectedCandidate[] {
  const files = listFixtureFiles(fixtureRoot);
  const candidates: DetectedCandidate[] = [];

  if (files.includes("pom.xml")) {
    const pom = readFileSync(join(fixtureRoot, "pom.xml"), "utf8");
    if (pom.includes("<dependencies>") || pom.includes("<plugins>")) {
      candidates.push(createCandidate(fixtureRoot, sourceCase, loadRule("dependency-plugin.rule.json"), ["pom.xml"]));
    }
  }

  const xmlFiles = files.filter((file) => file.startsWith("src/main/resources/") && file.endsWith(".xml"));
  const configEvidence = xmlFiles.filter((file) => {
    const content = readFileSync(join(fixtureRoot, file), "utf8");
    return content.includes("InternalResourceViewResolver") || content.includes("<bean");
  });
  if (configEvidence.length > 0) {
    candidates.push(createCandidate(fixtureRoot, sourceCase, loadRule("spring-config.rule.json"), configEvidence));
  }

  const jspFiles = files.filter((file) => file.startsWith("src/main/webapp/") && file.endsWith(".jsp"));
  const controllerFiles = files.filter((file) => file.startsWith("src/main/java/") && file.endsWith("Controller.java"));
  if (jspFiles.length > 0 && controllerFiles.length > 0) {
    candidates.push(createCandidate(fixtureRoot, sourceCase, loadRule("jsp-mvc-risk.rule.json"), [
      ...jspFiles,
      ...controllerFiles
    ]));
  }

  return candidates;
}
