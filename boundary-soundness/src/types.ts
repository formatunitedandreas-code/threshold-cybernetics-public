export interface Edge {
  from: string;
  to: string;
}

export interface CandidatePath {
  candidate_id: string;
  start_state: string;
  expected_terminal_states: string[];
}

export interface BoundaryNet {
  states: string[];
  edges: Edge[];
  candidates: CandidatePath[];
  allowed_terminal_states: string[];
}

export interface ReachabilityResult {
  candidate_id: string;
  reachable_states: string[];
  reachable_terminal_states: string[];
  reachable_forbidden_markings: string[];
  forbidden_authority_reachable: boolean;
}

export interface InvariantResult {
  invariant_id: string;
  reachable: boolean;
}

export interface BoundarySoundnessReadout {
  soundness_readout_id: string;
  mode: "readout_only_reachability_invariant_check";
  target_repo: string;
  target_commit: string;
  input_chain: string[];
  candidates: string[];
  forbidden_markings_checked: string[];
  candidate_results: ReachabilityResult[];
  authority_laundering_invariants: Record<string, boolean>;
  evidence_provenance_invariants: Record<string, boolean | string>;
  human_authorization_invariants: Record<string, boolean>;
  claim_boundary_invariants: Record<string, boolean>;
  soundness_status: "pass_bounded_public_reachability_scope" | "fail_forbidden_authority_reachable";
  non_claims: Record<string, false>;
}
