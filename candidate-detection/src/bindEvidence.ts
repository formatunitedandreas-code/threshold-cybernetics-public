import type { EvidenceSource } from "./candidateTypes";
import { hashEvidence } from "./hashEvidence";

export function bindEvidence(fixtureRoot: string, detectedFrom: string[]): EvidenceSource[] {
  return detectedFrom.map((path) => ({
    path,
    sha256: hashEvidence(fixtureRoot, path)
  }));
}
