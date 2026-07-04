import { readFileSync } from "node:fs";
import type { RiskGradationFile } from "./types";

export function loadRiskGradation(path: string): RiskGradationFile {
  const parsed = JSON.parse(readFileSync(path, "utf8")) as RiskGradationFile;
  if (!Array.isArray(parsed.outputs)) {
    throw new Error("risk gradation input must include outputs[]");
  }
  return parsed;
}
