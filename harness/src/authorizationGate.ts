import type { CandidateInput, Decision } from "./types";
import { candidateExists } from "./classifyCandidate";

export function authorizeCandidate(input: CandidateInput): Decision {
  if (!candidateExists(input)) {
    return "stop_no_action";
  }

  if (!input.authorization?.present) {
    return "stop_no_action";
  }

  const scopeMatches =
    input.authorization.allowed_candidate_id === input.candidate_id &&
    input.authorization.allowed_scope === input.candidate_type;

  if (!scopeMatches) {
    return "hold_scope_mismatch";
  }

  return "eligible_for_separate_patch_branch";
}
