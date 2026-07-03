import { describe, expect, it } from "vitest";
import { detectCandidates } from "../src/detectCandidates";

describe("evidence binding", () => {
  const candidates = detectCandidates("fixtures/minispring-legacy", "minispring-legacy");

  it("DEP-001 includes pom.xml evidence hash", () => {
    const dep = candidates.find((candidate) => candidate.candidate_id === "DEP-001");
    expect(dep?.evidence_sources).toEqual([
      expect.objectContaining({ path: "pom.xml", sha256: expect.stringMatching(/^[a-f0-9]{64}$/) })
    ]);
  });

  it("CFG-001 includes XML config evidence hash", () => {
    const cfg = candidates.find((candidate) => candidate.candidate_id === "CFG-001");
    expect(cfg?.evidence_sources).toEqual([
      expect.objectContaining({
        path: "src/main/resources/spring/mvc-core-config.xml",
        sha256: expect.stringMatching(/^[a-f0-9]{64}$/)
      })
    ]);
  });

  it("JSP-001 includes JSP and Controller evidence hashes", () => {
    const jsp = candidates.find((candidate) => candidate.candidate_id === "JSP-001");
    expect(jsp?.evidence_sources.map((source) => source.path)).toEqual([
      "src/main/webapp/WEB-INF/jsp/owners.jsp",
      "src/main/java/org/example/web/OwnerController.java"
    ]);
    for (const source of jsp?.evidence_sources ?? []) {
      expect(source.sha256).toMatch(/^[a-f0-9]{64}$/);
    }
  });
});
