import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createDecisionEnvelope } from "../src/decisionEnvelope";
import type { CandidateInput } from "../src/types";

function fixture(name: string): CandidateInput {
  return JSON.parse(readFileSync(join("fixtures", name), "utf8"));
}

describe("authorization gate harness", () => {
  it("DEP-001 without authorization => stop_no_action", () => {
    const envelope = createDecisionEnvelope(fixture("dep-001.no-authorization.input.json"));
    expect(envelope.decision).toBe("stop_no_action");
  });

  it("CFG-001 without authorization => stop_no_action", () => {
    const envelope = createDecisionEnvelope(fixture("cfg-001.no-authorization.input.json"));
    expect(envelope.decision).toBe("stop_no_action");
  });

  it("JSP-001 without authorization => stop_no_action", () => {
    const envelope = createDecisionEnvelope(fixture("jsp-001.no-authorization.input.json"));
    expect(envelope.decision).toBe("stop_no_action");
  });

  it("DEP-001 with matching authorization => eligible_for_separate_patch_branch", () => {
    const envelope = createDecisionEnvelope(fixture("dep-001.authorized.input.json"));
    expect(envelope.decision).toBe("eligible_for_separate_patch_branch");
    expect(envelope.patch_authorized).toBe(false);
  });

  it("scope mismatch => hold_scope_mismatch", () => {
    const input = fixture("dep-001.authorized.input.json");
    input.authorization = {
      present: true,
      allowed_candidate_id: "DEP-001",
      allowed_scope: "spring_configuration_inventory_candidate"
    };
    const envelope = createDecisionEnvelope(input);
    expect(envelope.decision).toBe("hold_scope_mismatch");
  });

  it("no fixture may produce mutation, PR, security, or deployment claims", () => {
    const names = [
      "dep-001.no-authorization.input.json",
      "cfg-001.no-authorization.input.json",
      "jsp-001.no-authorization.input.json",
      "dep-001.authorized.input.json"
    ];

    for (const name of names) {
      const envelope = createDecisionEnvelope(fixture(name));
      expect(envelope.patch_authorized).toBe(false);
      expect(envelope.source_mutated).toBe(false);
      expect(envelope.pr_created).toBe(false);
      expect(envelope.deployment_readiness_claimed).toBe(false);
      expect(envelope.security_fix_claimed).toBe(false);
    }
  });
});
