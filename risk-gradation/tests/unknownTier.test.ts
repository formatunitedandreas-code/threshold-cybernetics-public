import { describe, expect, it } from "vitest";
import { gradeCandidate } from "../src/riskHintGradation";
import { loadRiskTierRules } from "../src/riskTierRules";
import type { EvidenceIndex } from "../src/types";

const evidenceIndex: EvidenceIndex = {
  hash_policy: "git_object_bytes_sha256",
  target_repo: "spring-petclinic/spring-framework-petclinic",
  target_commit: "example",
  evidence_items: [
    { path: "pom.xml", file_type: "maven_pom", sha256: "a".repeat(64), content_published: false, candidate_links: ["UNK-001"] }
  ]
};

describe("unknown tier handling", () => {
  it("unknown candidate type becomes unknown", () => {
    const output = gradeCandidate(
      {
        candidate_id: "UNK-001",
        candidate_type: "not_a_known_candidate_type",
        risk_hints: [],
        evidence_paths: ["pom.xml"],
        evidence_hashes_present: true
      },
      evidenceIndex,
      loadRiskTierRules()
    );

    expect(output.risk_hint_tier).toBe("unknown");
  });

  it("missing evidence hashes become unknown", () => {
    const output = gradeCandidate(
      {
        candidate_id: "UNK-001",
        candidate_type: "dependency_plugin_review_candidate",
        risk_hints: ["dependency_version_surface"],
        evidence_paths: ["pom.xml"],
        evidence_hashes_present: false
      },
      evidenceIndex,
      loadRiskTierRules()
    );

    expect(output.risk_hint_tier).toBe("unknown");
  });
});
