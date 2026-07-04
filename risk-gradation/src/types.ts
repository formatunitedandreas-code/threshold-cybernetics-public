export type RiskHintTier = "inventory_only" | "low" | "medium" | "high" | "unknown";

export interface CandidateSummary {
  candidate_id?: string;
  candidate_type?: string;
  risk_hints?: string[];
  evidence_paths?: string[];
  evidence_hashes_present?: boolean;
}

export interface CandidateSummaryFile {
  target_repo: string;
  target_commit: string;
  hash_policy?: string;
  detected_candidates: CandidateSummary[];
}

export interface EvidenceItem {
  path: string;
  file_type: string;
  sha256: string;
  content_published: false;
  candidate_links: string[];
}

export interface EvidenceIndex {
  hash_policy: "git_object_bytes_sha256";
  target_repo: string;
  target_commit: string;
  evidence_items: EvidenceItem[];
}

export interface RiskTierRule {
  candidate_type: string;
  base_tier: RiskHintTier;
  signals: string[];
  review_recommendation: string;
}

export interface RiskTierRules {
  rule_set_id: string;
  non_claims: string[];
  rules: RiskTierRule[];
}

export interface RiskGradationOutput {
  candidate_id: string;
  candidate_type: string;
  risk_hint_tier: RiskHintTier;
  risk_hint_basis: string[];
  evidence_paths_count: number;
  evidence_hashes_present: boolean;
  review_recommendation: string;
  human_review_required: boolean;
  authorization_granted: false;
  patch_authorized: false;
  source_mutated: false;
  pr_created: false;
  deployment_readiness_claimed: false;
  security_fix_claimed: false;
  semantic_breaking_change_detection_claimed: false;
  mature_risk_scoring_claimed: false;
  decision_boundaries: string[];
}
