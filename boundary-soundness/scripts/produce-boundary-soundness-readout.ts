import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { assertNoForbiddenEdges } from "../src/boundaryNet";
import { evaluateBoundaryNet } from "../src/evaluateReachability";
import { forbiddenAuthorityMarkings } from "../src/forbiddenMarkings";
import { buildInvariantReadout } from "../src/invariantChecks";
import { petclinicBoundaryNet } from "../src/petclinicBoundaryNet.fixture";

interface Args {
  out?: string;
  matrixOut?: string;
  traceOut?: string;
}

function parseArgs(argv: string[]): Args {
  const args: Args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    const value = argv[index + 1];
    if (key === "--out") {
      args.out = value;
      index += 1;
    } else if (key === "--matrix-out") {
      args.matrixOut = value;
      index += 1;
    } else if (key === "--trace-out") {
      args.traceOut = value;
      index += 1;
    }
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));
if (!args.out) {
  throw new Error("Usage: npm run produce-boundary-soundness-readout -- --out <json> [--matrix-out <json>] [--trace-out <json>]");
}

assertNoForbiddenEdges(petclinicBoundaryNet, forbiddenAuthorityMarkings);
const candidateResults = evaluateBoundaryNet(petclinicBoundaryNet, forbiddenAuthorityMarkings);
const invariantReadout = buildInvariantReadout(candidateResults);
const failed = candidateResults.some((result) => result.forbidden_authority_reachable);
const readout = {
  soundness_readout_id: "petclinic_boundary_soundness_v0_8_0",
  mode: "readout_only_reachability_invariant_check",
  target_repo: "spring-petclinic/spring-framework-petclinic",
  target_commit: "bdbaa5e671dfd9acb5c5814f5ac6d2408107e39a",
  input_chain: [
    "v0.4.1_git_byte_hash_provenance",
    "v0.5_risk_hint_gradation",
    "v0.6_policy_mapping",
    "v0.7_scoped_receipt_validation"
  ],
  candidates: petclinicBoundaryNet.candidates.map((candidate) => candidate.candidate_id),
  forbidden_markings_checked: forbiddenAuthorityMarkings,
  candidate_results: candidateResults,
  ...invariantReadout,
  soundness_status: failed ? "fail_forbidden_authority_reachable" : "pass_bounded_public_reachability_scope",
  non_claims: {
    bpmn_engine: false,
    dmn_engine: false,
    runtime_enforcement: false,
    compliance_proof: false,
    deployment_readiness: false,
    autonomous_refactoring: false
  }
};

mkdirSync(dirname(args.out), { recursive: true });
writeFileSync(args.out, `${JSON.stringify(readout, null, 2)}\n`);

if (args.matrixOut) {
  writeFileSync(args.matrixOut, `${JSON.stringify({ forbidden_authority_markings: forbiddenAuthorityMarkings }, null, 2)}\n`);
}

if (args.traceOut) {
  writeFileSync(args.traceOut, `${JSON.stringify({ candidate_results: candidateResults }, null, 2)}\n`);
}

console.log(`produced boundary soundness readout at ${join(process.cwd(), args.out)}`);
