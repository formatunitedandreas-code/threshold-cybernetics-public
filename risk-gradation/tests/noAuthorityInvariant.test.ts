import { describe, expect, it } from "vitest";
import { assertNoAuthority, tierAuthority } from "../src/noAuthorityInvariants";
import { gradeCandidate } from "../src/riskHintGradation";
import { loadRiskTierRules } from "../src/riskTierRules";
import type { EvidenceIndex } from "../src/types";

const evidenceIndex: EvidenceIndex = {
  hash_policy: "git_object_bytes_sha256",
  target_repo: "spring-petclinic/spring-framework-petclinic",
  target_commit: "example",
  evidence_items: [
    { path: "pom.xml", file_type: "maven_pom", sha256: "a".repeat(64), content_published: false, candidate_links: ["DEP-001"] }
  ]
};

describe("no authority invariants", () => {
  it("every risk tier has authority none", () => {
    expect(Object.values(tierAuthority).every((authority) => authority === "none")).toBe(true);
  });

  it("gradation output never grants action authority", () => {
    const output = gradeCandidate(
      {
        candidate_id: "DEP-001",
        candidate_type: "dependency_plugin_review_candidate",
        risk_hints: ["dependency_version_surface"],
        evidence_paths: ["pom.xml"],
        evidence_hashes_present: true
      },
      evidenceIndex,
      loadRiskTierRules()
    );

    expect(assertNoAuthority(output)).toBe(true);
    expect(output.patch_authorized).toBe(false);
    expect(output.source_mutated).toBe(false);
    expect(output.pr_created).toBe(false);
    expect(output.deployment_readiness_claimed).toBe(false);
    expect(output.security_fix_claimed).toBe(false);
    expect(output.semantic_breaking_change_detection_claimed).toBe(false);
    expect(output.mature_risk_scoring_claimed).toBe(false);
  });
});
