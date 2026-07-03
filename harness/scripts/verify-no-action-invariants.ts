import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createDecisionEnvelope } from "../src/decisionEnvelope";
import type { CandidateInput } from "../src/types";

const fixtureDir = "fixtures";
const noAuthorizationFixtures = readdirSync(fixtureDir).filter((name) =>
  name.endsWith(".no-authorization.input.json")
);

for (const name of noAuthorizationFixtures) {
  const input = JSON.parse(readFileSync(join(fixtureDir, name), "utf8")) as CandidateInput;
  const envelope = createDecisionEnvelope(input);

  const forbidden = [
    ["patch_authorized", envelope.patch_authorized],
    ["source_mutated", envelope.source_mutated],
    ["pr_created", envelope.pr_created],
    ["deployment_readiness_claimed", envelope.deployment_readiness_claimed],
    ["security_fix_claimed", envelope.security_fix_claimed]
  ] as const;

  for (const [field, value] of forbidden) {
    if (value === true) {
      throw new Error(`${name} produced forbidden true invariant: ${field}`);
    }
  }
}

console.log(`verified no-action invariants for ${noAuthorizationFixtures.length} fixtures`);
