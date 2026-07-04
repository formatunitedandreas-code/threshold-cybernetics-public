import { readFileSync } from "node:fs";
import type { CandidateSummaryFile } from "./types";

export function loadCandidateSummary(path: string): CandidateSummaryFile {
  return JSON.parse(readFileSync(path, "utf8")) as CandidateSummaryFile;
}
