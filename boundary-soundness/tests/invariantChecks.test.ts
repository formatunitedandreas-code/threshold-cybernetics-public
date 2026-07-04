import { describe, expect, it } from "vitest";
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
});
