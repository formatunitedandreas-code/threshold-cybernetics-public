import { describe, expect, it } from "vitest";
import { detectCandidates } from "../src/detectCandidates";

describe("candidate detection", () => {
  it("minispring-legacy produces DEP-001, CFG-001, and JSP-001", () => {
    const candidates = detectCandidates("fixtures/minispring-legacy", "minispring-legacy");
    expect(candidates.map((candidate) => candidate.candidate_id)).toEqual(["DEP-001", "CFG-001", "JSP-001"]);
  });

  it("clean-no-candidates produces no candidates", () => {
    expect(detectCandidates("fixtures/clean-no-candidates", "clean-no-candidates")).toEqual([]);
  });
});
