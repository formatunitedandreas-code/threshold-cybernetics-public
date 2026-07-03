import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export function hashEvidence(fixtureRoot: string, relativePath: string): string {
  const content = readFileSync(join(fixtureRoot, relativePath));
  return createHash("sha256").update(content).digest("hex");
}
