import { readFileSync } from "node:fs";
import type { EvidenceIndex } from "./types";

export function loadEvidenceIndex(path: string): EvidenceIndex {
  return JSON.parse(readFileSync(path, "utf8")) as EvidenceIndex;
}
