import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { InputArtifactCheck } from "./types";

interface CandidateLike {
  candidate_id: string;
  risk_hint_tier?: string;
  policy_lane?: string;
  receipt_validation_result?: string;
}

function readJson(relativePath: string): unknown {
  return JSON.parse(readFileSync(resolve(process.cwd(), relativePath), "utf8"));
}

function outputs(input: unknown): CandidateLike[] {
  if (!input || typeof input !== "object" || !Array.isArray((input as { outputs?: unknown }).outputs)) {
    throw new Error("input artifact does not contain an outputs array");
  }
  return (input as { outputs: CandidateLike[] }).outputs;
}

function candidateMap(items: CandidateLike[]): Map<string, CandidateLike> {
  return new Map(items.map((item) => [item.candidate_id, item]));
}

function requireField(map: Map<string, CandidateLike>, candidateId: string, field: keyof CandidateLike, expected: string): void {
  const actual = map.get(candidateId)?.[field];
  if (actual !== expected) {
    throw new Error(candidateId + " " + String(field) + " expected " + expected + " but found " + String(actual));
  }
}

export function verifyInputArtifacts(): InputArtifactCheck[] {
  const risk = candidateMap(outputs(readJson("../real-repo-runs/spring-framework-petclinic-v0-5/risk-gradation.public-safe.json")));
  const policy = candidateMap(outputs(readJson("../real-repo-runs/spring-framework-petclinic-v0-6/policy-mapping.public-safe.json")));
  const receipts = candidateMap(outputs(readJson("../real-repo-runs/spring-framework-petclinic-v0-7/receipt-validation.public-safe.json")));

  requireField(risk, "DEP-001", "risk_hint_tier", "medium");
  requireField(risk, "CFG-001", "risk_hint_tier", "medium");
  requireField(risk, "JSP-001", "risk_hint_tier", "high");

  requireField(policy, "DEP-001", "policy_lane", "standard_human_review_required");
  requireField(policy, "CFG-001", "policy_lane", "standard_human_review_required");
  requireField(policy, "JSP-001", "policy_lane", "strict_human_review_required");

  requireField(receipts, "DEP-001", "receipt_validation_result", "valid_scope_match_readout_only");
  requireField(receipts, "CFG-001", "receipt_validation_result", "missing_receipt_stop_no_action");
  requireField(receipts, "JSP-001", "receipt_validation_result", "scope_mismatch_hold_strict_review_required");

  return [
    {
      artifact: "v0.5_risk_gradation",
      status: "verified",
      details: { DEP_001: "medium", CFG_001: "medium", JSP_001: "high" }
    },
    {
      artifact: "v0.6_policy_mapping",
      status: "verified",
      details: {
        DEP_001: "standard_human_review_required",
        CFG_001: "standard_human_review_required",
        JSP_001: "strict_human_review_required"
      }
    },
    {
      artifact: "v0.7_receipt_validation",
      status: "verified",
      details: {
        DEP_001: "valid_scope_match_readout_only",
        CFG_001: "missing_receipt_stop_no_action",
        JSP_001: "scope_mismatch_hold_strict_review_required"
      }
    }
  ];
}
