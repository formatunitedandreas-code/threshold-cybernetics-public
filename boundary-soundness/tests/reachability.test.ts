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

  it("enforces candidate-specific terminal expectations", () => {
    const results = evaluateBoundaryNet(petclinicBoundaryNet, forbiddenAuthorityMarkings);
    for (const result of results) {
      expect(result.terminal_expectations_satisfied).toBe(true);
      expect(result.missing_expected_terminal_states).toEqual([]);
      expect(result.unexpected_terminal_states).toEqual([]);
    }
  });

  it("models the human-authorized DEP-001 draft PR path as an allowed readout terminal", () => {
    const [dep001] = evaluateBoundaryNet(petclinicBoundaryNet, forbiddenAuthorityMarkings).filter((result) => result.candidate_id === "DEP-001");
    expect(dep001.reachable_states).toContain("DEP-001:draft_pr_created_with_human_authorized_fork_scope");
    expect(dep001.reachable_terminal_states).toContain("authorized_draft_pr_created_readout_only");
    expect(dep001.reachable_forbidden_markings).not.toContain("unauthorized_pr_created");
  });
});
