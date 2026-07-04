import { outgoingEdges } from "./boundaryNet";
import type { BoundaryNet, CandidatePath, ReachabilityResult } from "./types";

export function reachableStates(net: BoundaryNet, start: string): string[] {
  const visited = new Set<string>();
  const queue = [start];

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current || visited.has(current)) {
      continue;
    }
    visited.add(current);
    for (const edge of outgoingEdges(net, current)) {
      if (!visited.has(edge.to)) {
        queue.push(edge.to);
      }
    }
  }

  return [...visited].sort();
}

export function evaluateCandidate(net: BoundaryNet, candidate: CandidatePath, forbiddenStates: string[]): ReachabilityResult {
  const reachable = reachableStates(net, candidate.start_state);
  const forbidden = reachable.filter((state) => forbiddenStates.includes(state)).sort();
  const terminal = reachable.filter((state) => net.allowed_terminal_states.includes(state)).sort();

  return {
    candidate_id: candidate.candidate_id,
    reachable_states: reachable,
    reachable_terminal_states: terminal,
    reachable_forbidden_markings: forbidden,
    forbidden_authority_reachable: forbidden.length > 0
  };
}

export function evaluateBoundaryNet(net: BoundaryNet, forbiddenStates: string[]): ReachabilityResult[] {
  return net.candidates.map((candidate) => evaluateCandidate(net, candidate, forbiddenStates));
}
