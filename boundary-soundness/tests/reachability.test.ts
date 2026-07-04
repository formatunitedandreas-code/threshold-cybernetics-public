import { describe, expect, it } from "vitest";
import { evaluateBoundaryNet } from "../src/evaluateReachability";
import { forbiddenAuthorityMarkings } from "../src/forbiddenMarkings";
import { petclinicBoundaryNet } from "../src/petclinicBoundaryNet.fixture";

describe("reachability", () => {
  it("does not reach forbidden authority markings for PetClinic candidates", () => {
    const results = evaluateBoundaryNet(petclinicBoundaryNet, forbiddenAuthorityMarkings);
    expect(results).toHaveLength(3);
    for (const result of results) {
      expect(result.forbidden_authority_reachable).toBe(false);
      expect(result.reachable_forbidden_markings).toEqual([]);
    }
  });
});
