import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { decisionEnvelope } from "../src/decisionEnvelope";
import { loadRiskGradation } from "../src/loadRiskGradation";
import { mapCandidatesToPolicy } from "../src/policyMapping";
import { loadAuthorizationTierPolicy } from "../src/policyRules";

interface Args {
  riskGradation?: string;
  out?: string;
}

function parseArgs(argv: string[]): Args {
  const args: Args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    const value = argv[index + 1];
    if (key === "--risk-gradation") {
      args.riskGradation = value;
      index += 1;
    } else if (key === "--out") {
      args.out = value;
      index += 1;
    }
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));
if (!args.riskGradation || !args.out) {
  throw new Error("Usage: npm run produce-policy-mapping -- --risk-gradation <json> --out <json>");
}

const riskGradation = loadRiskGradation(args.riskGradation);
const policy = loadAuthorizationTierPolicy();
const outputs = mapCandidatesToPolicy(riskGradation.outputs, policy);
const result = {
  run_id: "spring-framework-petclinic-policy-mapping-v0-6",
  target_repo: riskGradation.target_repo,
  target_commit: riskGradation.target_commit,
  input_risk_gradation_release: "v0.5.0-risk-hint-gradation-harness",
  input_hash_policy: riskGradation.input_hash_policy,
  policy_mapping_model: "authorization_tier_policy_mapping_v0_1",
  policy_mode: policy.policy_mode,
  policy_mapping_authorizes_execution: false,
  policy_mapping_authorizes_patch: false,
  policy_mapping_authorizes_pr: false,
  policy_mapping_authorizes_merge: false,
  ...decisionEnvelope(outputs)
};

mkdirSync(dirname(args.out), { recursive: true });
writeFileSync(args.out, `${JSON.stringify(result, null, 2)}\n`);
console.log(`produced policy mapping for ${outputs.length} candidates`);
