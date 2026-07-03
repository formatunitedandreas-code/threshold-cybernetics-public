import { describe, expect, it } from "vitest";
import { detectCandidates } from "../src/detectCandidates";

describe("no execution invariants", () => {
  it("no detected candidate authorizes patch, mutation, PR, deployment, or security claims", () => {
    const candidates = detectCandidates("fixtures/minispring-legacy", "minispring-legacy");
    for (const candidate of candidates) {
      expect(candidate.patch_authorized).toBe(false);
      expect(candidate.source_mutated).toBe(false);
      expect(candidate.pr_created).toBe(false);
      expect(candidate.deployment_readiness_claimed).toBe(false);
      expect(candidate.security_fix_claimed).toBe(false);
    }
  });
});
