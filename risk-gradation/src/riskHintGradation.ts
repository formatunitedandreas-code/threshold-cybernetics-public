import type { CandidateSummary, EvidenceIndex, RiskGradationOutput, RiskHintTier, RiskTierRules } from "./types";
import { decisionBoundaries } from "./noAuthorityInvariants";
import { findRuleForCandidateType } from "./riskTierRules";

function evidencePathsForCandidate(candidate: CandidateSummary, evidenceIndex: EvidenceIndex): string[] {
  const candidateId = candidate.candidate_id ?? "";
  const paths = new Set(candidate.evidence_paths ?? []);

  for (const item of evidenceIndex.evidence_items) {
    if (item.candidate_links.includes(candidateId)) {
      paths.add(item.path);
    }
  }

  return [...paths].sort();
}

function hasAllHashes(paths: string[], evidenceIndex: EvidenceIndex): boolean {
  return paths.every((path) => evidenceIndex.evidence_items.some((item) => item.path === path && /^[a-f0-9]{64}$/.test(item.sha256)));
}

function decideTier(candidate: CandidateSummary, evidenceIndex: EvidenceIndex, rules: RiskTierRules): RiskHintTier {
  const paths = evidencePathsForCandidate(candidate, evidenceIndex);
  const hashesPresent = candidate.evidence_hashes_present === true && hasAllHashes(paths, evidenceIndex);

  if (!candidate.candidate_type || paths.length === 0 || !hashesPresent) {
    return "unknown";
  }

  const rule = findRuleForCandidateType(rules, candidate.candidate_type);
  if (rule.candidate_type === "unknown") {
    return "unknown";
  }

  if (
    candidate.candidate_type === "jsp_mvc_risk_candidate" &&
    paths.some((path) => path.endsWith(".jsp")) &&
    paths.some((path) => path.endsWith("Controller.java"))
  ) {
    return "high";
  }

  return rule.base_tier;
}

export function gradeCandidate(candidate: CandidateSummary, evidenceIndex: EvidenceIndex, rules: RiskTierRules): RiskGradationOutput {
  const paths = evidencePathsForCandidate(candidate, evidenceIndex);
  const rule = findRuleForCandidateType(rules, candidate.candidate_type);
  const tier = decideTier(candidate, evidenceIndex, rules);
  const hashesPresent = candidate.evidence_hashes_present === true && hasAllHashes(paths, evidenceIndex);

  return {
    candidate_id: candidate.candidate_id ?? "UNKNOWN",
    candidate_type: candidate.candidate_type ?? "unknown",
    risk_hint_tier: tier,
    risk_hint_basis: tier === "unknown" ? candidate.risk_hints ?? [] : rule.signals,
    evidence_paths_count: paths.length,
    evidence_hashes_present: hashesPresent,
    review_recommendation: tier === "unknown" ? "hold_for_manual_triage" : rule.review_recommendation,
    human_review_required: true,
    authorization_granted: false,
    patch_authorized: false,
    source_mutated: false,
    pr_created: false,
    deployment_readiness_claimed: false,
    security_fix_claimed: false,
    semantic_breaking_change_detection_claimed: false,
    mature_risk_scoring_claimed: false,
    decision_boundaries: decisionBoundaries
  };
}

export function gradeCandidates(candidates: CandidateSummary[], evidenceIndex: EvidenceIndex, rules: RiskTierRules): RiskGradationOutput[] {
  return candidates.map((candidate) => gradeCandidate(candidate, evidenceIndex, rules));
}
