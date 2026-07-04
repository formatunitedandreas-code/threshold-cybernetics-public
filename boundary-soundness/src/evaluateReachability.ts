import { outgoingEdges } from "./boundaryNet";
import type { BoundaryNet, CandidatePath, ReachabilityResult } from "./types";

function sorted(values: string[]): string[] {
  return [...values].sort();
}

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

  return sorted([...visited]);
}

export function evaluateCandidate(net: BoundaryNet, candidate: CandidatePath, forbiddenStates: string[]): ReachabilityResult {
  const reachable = reachableStates(net, candidate.start_state);
  const forbidden = reachable.filter((state) => forbiddenStates.includes(state));
  const terminal = reachable.filter((state) => net.allowed_terminal_states.includes(state));
  const missingExpected = candidate.expected_terminal_states.filter((state) => !terminal.includes(state));
  const unexpectedTerminal = terminal.filter((state) => !candidate.expected_terminal_states.includes(state));

  return {
    candidate_id: candidate.candidate_id,
    reachable_states: sorted(reachable),
    reachable_terminal_states: sorted(terminal),
    expected_terminal_states: sorted(candidate.expected_terminal_states),
    missing_expected_terminal_states: sorted(missingExpected),
    unexpected_terminal_states: sorted(unexpectedTerminal),
    terminal_expectations_satisfied: missingExpected.length === 0 && unexpectedTerminal.length === 0,
    reachable_forbidden_markings: sorted(forbidden),
    forbidden_authority_reachable: forbidden.length > 0
  };
}

export function evaluateBoundaryNet(net: BoundaryNet, forbiddenStates: string[]): ReachabilityResult[] {
  return net.candidates.map((candidate) => evaluateCandidate(net, candidate, forbiddenStates));
}
