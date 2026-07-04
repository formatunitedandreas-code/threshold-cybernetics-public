import type { BoundaryNet, Edge } from "./types";

export function outgoingEdges(net: BoundaryNet, state: string): Edge[] {
  return net.edges.filter((edge) => edge.from === state);
}

export function assertNoForbiddenEdges(net: BoundaryNet, forbiddenStates: string[]): void {
  const forbidden = new Set(forbiddenStates);
  const badEdges = net.edges.filter((edge) => forbidden.has(edge.to));
  if (badEdges.length > 0) {
    throw new Error(`boundary net contains forbidden authority edge(s): ${badEdges.map((edge) => `${edge.from}->${edge.to}`).join(", ")}`);
  }
}
