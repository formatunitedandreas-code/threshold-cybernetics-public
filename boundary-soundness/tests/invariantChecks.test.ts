import { describe, expect, it } from "vitest";
import type { ReachabilityResult } from "../src/types";
import { evaluateBoundaryNet } from "../src/evaluateReachability";
import { forbiddenAuthorityMarkings } from "../src/forbiddenMarkings";
import { buildInvariantReadout } from "../src/invariantChecks";
import { petclinicBoundaryNet } from "../src/petclinicBoundaryNet.fixture";

describe("invariant checks", () => {
  it("keeps authority laundering and claim boundary invariants false", () => {
    const results = evaluateBoundaryNet(petclinicBoundaryNet, forbiddenAuthorityMarkings);
    const invariants = buildInvariantReadout(results);
    expect(invariants.authority_laundering_invariants.candidate_to_execution_reachable).toBe(false);
    expect(invariants.authority_laundering_invariants.receipt_valid_to_action_allowed_reachable).toBe(false);
    expect(invariants.human_authorization_invariants.scope_mismatch_to_action_allowed_reachable).toBe(false);
    expect(invariants.claim_boundary_invariants.test_pass_to_deployment_readiness_reachable).toBe(false);
    expect(invariants.evidence_provenance_invariants.git_object_byte_hash_required).toBe(true);
  });

  it("derives action_allowed reachability from reachable states", () => {
    const synthetic: ReachabilityResult[] = [
      {
        candidate_id: "SYN-001",
        reachable_states: ["candidate_detected", "action_allowed"],
        reachable_terminal_states: [],
        expected_terminal_states: [],
        missing_expected_terminal_states: [],
        unexpected_terminal_states: [],
        terminal_expectations_satisfied: true,
        reachable_forbidden_markings: ["action_allowed"],
        forbidden_authority_reachable: true
      }
    ];
    const invariants = buildInvariantReadout(synthetic);
    expect(invariants.authority_laundering_invariants.receipt_valid_to_action_allowed_reachable).toBe(true);
    expect(invariants.authority_laundering_invariants.policy_lane_to_execution_permission_reachable).toBe(true);
  });
});
