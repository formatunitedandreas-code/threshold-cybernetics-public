import { describe, expect, it } from "vitest";
import { gradeCandidates } from "../src/riskHintGradation";
import { loadRiskTierRules } from "../src/riskTierRules";
import type { CandidateSummary, EvidenceIndex } from "../src/types";

const candidates: CandidateSummary[] = [
  {
    candidate_id: "DEP-001",
    candidate_type: "dependency_plugin_review_candidate",
    risk_hints: ["dependency_version_surface", "plugin_version_surface", "transitive_dependency_possible"],
    evidence_paths: ["pom.xml"],
    evidence_hashes_present: true
  },
  {
    candidate_id: "CFG-001",
    candidate_type: "spring_config_inventory_candidate",
    risk_hints: ["configuration_behavior_surface", "view_resolution_surface", "migration_requires_human_review"],
    evidence_paths: ["src/main/resources/spring/mvc-core-config.xml"],
    evidence_hashes_present: true
  },
  {
    candidate_id: "JSP-001",
    candidate_type: "jsp_mvc_risk_candidate",
    risk_hints: ["form_binding_surface", "routing_surface", "view_rendering_surface", "ui_behavior_requires_human_review"],
    evidence_paths: ["src/main/webapp/WEB-INF/jsp/welcome.jsp", "src/main/java/org/example/web/OwnerController.java"],
    evidence_hashes_present: true
  }
];

const evidenceIndex: EvidenceIndex = {
  hash_policy: "git_object_bytes_sha256",
  target_repo: "spring-petclinic/spring-framework-petclinic",
  target_commit: "example",
  evidence_items: [
    { path: "pom.xml", file_type: "maven_pom", sha256: "a".repeat(64), content_published: false, candidate_links: ["DEP-001"] },
    {
      path: "src/main/resources/spring/mvc-core-config.xml",
      file_type: "spring_xml",
      sha256: "b".repeat(64),
      content_published: false,
      candidate_links: ["CFG-001"]
    },
    {
      path: "src/main/webapp/WEB-INF/jsp/welcome.jsp",
      file_type: "jsp",
      sha256: "c".repeat(64),
      content_published: false,
      candidate_links: ["JSP-001"]
    },
    {
      path: "src/main/java/org/example/web/OwnerController.java",
      file_type: "java_controller",
      sha256: "d".repeat(64),
      content_published: false,
      candidate_links: ["JSP-001"]
    }
  ]
};

describe("risk hint gradation", () => {
  it("assigns expected bounded tiers", () => {
    const outputs = gradeCandidates(candidates, evidenceIndex, loadRiskTierRules());
    expect(outputs.find((output) => output.candidate_id === "DEP-001")?.risk_hint_tier).toBe("medium");
    expect(outputs.find((output) => output.candidate_id === "CFG-001")?.risk_hint_tier).toBe("medium");
    expect(outputs.find((output) => output.candidate_id === "JSP-001")?.risk_hint_tier).toBe("high");
  });
});
