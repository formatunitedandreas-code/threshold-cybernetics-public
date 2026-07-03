import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { detectCandidates } from "../src/detectCandidates";

const outputDir = "output";
mkdirSync(outputDir, { recursive: true });

const fixtures = ["minispring-legacy", "clean-no-candidates"] as const;

for (const fixture of fixtures) {
  const candidates = detectCandidates(join("fixtures", fixture), fixture);
  writeFileSync(join(outputDir, `${fixture}.detected-candidates.json`), `${JSON.stringify(candidates, null, 2)}\n`);
}

console.log("produced candidate ledgers for 2 fixtures");
