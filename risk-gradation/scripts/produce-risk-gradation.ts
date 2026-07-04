import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { loadCandidateSummary } from "../src/loadCandidateSummary";
import { loadEvidenceIndex } from "../src/loadEvidenceIndex";
import { gradeCandidates } from "../src/riskHintGradation";
import { loadRiskTierRules } from "../src/riskTierRules";

interface Args {
  candidateSummary?: string;
  evidenceIndex?: string;
  out?: string;
}

function parseArgs(argv: string[]): Args {
  const args: Args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    const value = argv[index + 1];
    if (key === "--candidate-summary") {
      args.candidateSummary = value;
      index += 1;
    } else if (key === "--evidence-index") {
      args.evidenceIndex = value;
      index += 1;
    } else if (key === "--out") {
      args.out = value;
      index += 1;
    }
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));
if (!args.candidateSummary || !args.evidenceIndex || !args.out) {
  throw new Error("Usage: npm run produce-risk-gradation -- --candidate-summary <json> --evidence-index <json> --out <json>");
}

const candidateSummary = loadCandidateSummary(args.candidateSummary);
const evidenceIndex = loadEvidenceIndex(args.evidenceIndex);
const rules = loadRiskTierRules();

if (evidenceIndex.hash_policy !== "git_object_bytes_sha256") {
  throw new Error("v0.5 requires v0.4.1 Git-object-byte verified evidence input");
}

const outputs = gradeCandidates(candidateSummary.detected_candidates, evidenceIndex, rules);
const result = {
  run_id: "spring-framework-petclinic-risk-hint-gradation-v0-5",
  target_repo: candidateSummary.target_repo,
  target_commit: candidateSummary.target_commit,
  input_hash_policy: evidenceIndex.hash_policy,
  risk_gradation_model: "bounded_rule_based_risk_hint_tiers_v0_1",
  risk_tier_authorizes_execution: false,
  risk_tier_authorizes_patch: false,
  outputs
};

mkdirSync(dirname(args.out), { recursive: true });
writeFileSync(args.out, `${JSON.stringify(result, null, 2)}\n`);
console.log(`produced risk gradation for ${outputs.length} candidates`);
