import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { decisionEnvelope } from "../src/decisionEnvelope";
import { loadPolicyMapping } from "../src/loadPolicyMapping";
import { loadReceiptPolicyRules } from "../src/receiptRules";
import { loadReceipts, validatePolicyMappings } from "../src/receiptValidation";

interface Args {
  policyMapping?: string;
  receipts?: string;
  out?: string;
}

function parseArgs(argv: string[]): Args {
  const args: Args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    const value = argv[index + 1];
    if (key === "--policy-mapping") {
      args.policyMapping = value;
      index += 1;
    } else if (key === "--receipts") {
      args.receipts = value;
      index += 1;
    } else if (key === "--out") {
      args.out = value;
      index += 1;
    }
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));
if (!args.policyMapping || !args.receipts || !args.out) {
  throw new Error("Usage: npm run produce-receipt-validation -- --policy-mapping <json> --receipts <dir> --out <json>");
}

const policyMapping = loadPolicyMapping(args.policyMapping);
const receipts = loadReceipts(args.receipts);
const rules = loadReceiptPolicyRules();
const outputs = validatePolicyMappings(policyMapping.outputs, receipts, rules);
const result = {
  run_id: "spring-framework-petclinic-scoped-human-authorization-receipt-validation-v0-7",
  target_repo: policyMapping.target_repo,
  target_commit: policyMapping.target_commit,
  input_policy_mapping_release: "v0.6.0-policy-as-code-authorization-tier-mapping",
  input_risk_gradation_release: "v0.5.0-risk-hint-gradation-harness",
  input_hash_policy: policyMapping.input_hash_policy,
  receipt_policy_mode: rules.policy_mode,
  synthetic_receipts_used: true,
  real_personal_data_used: false,
  receipt_validation_authorizes_execution: false,
  receipt_validation_authorizes_patch: false,
  receipt_validation_authorizes_pr: false,
  receipt_validation_authorizes_merge: false,
  receipt_validation_authorizes_deployment: false,
  ...decisionEnvelope(outputs)
};

mkdirSync(dirname(args.out), { recursive: true });
writeFileSync(args.out, `${JSON.stringify(result, null, 2)}\n`);
console.log(`produced receipt validation for ${outputs.length} candidates`);
