import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createDecisionEnvelope } from "../src/decisionEnvelope";
import type { CandidateInput } from "../src/types";

const outputDir = "../runs/2026-07-public-evidence-harness/produced-decision-envelopes";
mkdirSync(outputDir, { recursive: true });

const fixtures = [
  ["DEP-001", "dep-001.no-authorization.input.json"],
  ["CFG-001", "cfg-001.no-authorization.input.json"],
  ["JSP-001", "jsp-001.no-authorization.input.json"]
] as const;

for (const [candidateId, fixtureName] of fixtures) {
  const input = JSON.parse(readFileSync(join("fixtures", fixtureName), "utf8")) as CandidateInput;
  const envelope = createDecisionEnvelope(input);
  writeFileSync(join(outputDir, `${candidateId}.json`), `${JSON.stringify(envelope, null, 2)}\n`);
}

console.log(`produced ${fixtures.length} decision envelopes`);
