import type { CandidateInput } from "./types";

export function candidateExists(input: CandidateInput): boolean {
  return Boolean(input.candidate_id && input.candidate_type && input.source_case);
}
