export type CandidateId = "DEP-001" | "CFG-001" | "JSP-001";

export type CandidateType =
  | "dependency_plugin_review_candidate"
  | "spring_config_inventory_candidate"
  | "jsp_mvc_risk_candidate";

export interface EvidenceSource {
  path: string;
  sha256: string;
}

export interface DetectedCandidate {
  candidate_id: CandidateId;
  candidate_type: CandidateType;
  source_case: string;
  detected_from: string[];
  evidence_sources: EvidenceSource[];
  risk_hints: string[];
  decision_boundary: string[];
  patch_authorized: false;
  source_mutated: false;
  pr_created: false;
  deployment_readiness_claimed: false;
  security_fix_claimed: false;
}

export interface RuleCard {
  rule_id: string;
  candidate_id: CandidateId;
  candidate_type: CandidateType;
  triggers: string[];
  evidence_sources: string[];
  risk_hints: string[];
  non_claims: string[];
}
