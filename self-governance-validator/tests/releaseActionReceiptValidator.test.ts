import { describe, expect, it } from "vitest";

import { validateReleaseActionReceipt } from "../src/releaseActionReceiptValidator.js";
import type { ReleaseActionPlan, ReleaseActionReceipt, ValidationReadout } from "../src/types.js";

export const validPlan: ReleaseActionPlan = {
  plan_id: "public-v0-9-1-release-action-plan",
  release_tag: "v0.9.1-public-release-action-receipt-validator-harness",
  planned_actions: ["commit", "push", "tag", "release"],
  planned_file_paths: [
    "README.md",
    "self-governance-validator/README.md",
    "external-critique/SELF_GOVERNANCE_STATUS.md",
    "red-team/response-001.md"
  ],
  planned_claims: {
    product_readiness_claimed: false,
    deployment_readiness_claimed: false,
    security_fix_claimed: false,
    autonomous_refactoring_claimed: false,
    compliance_certification_claimed: false,
    runtime_authority_claimed: false
  }
};

export const validReceipt: ReleaseActionReceipt = {
  receipt_id: "public-v0-9-1-release-action-receipt",
  receipt_type: "release_action_authorization_receipt",
  release_tag: "v0.9.1-public-release-action-receipt-validator-harness",
  allowed_scope: "public_validator_harness_release_only",
  allowed_actions: ["commit", "push", "tag", "release"],
  allowed_file_paths: ["README.md", "self-governance-validator/**", "external-critique/**", "red-team/**"],
  forbidden_actions: ["merge", "deploy", "install_hook", "install_wrapper"],
  forbidden_claims: [
    "product_readiness",
    "deployment_readiness",
    "security_fix",
    "autonomous_refactoring",
    "compliance_certification",
    "runtime_authority"
  ],
  product_readiness_claim_allowed: false,
  deployment_readiness_claim_allowed: false,
  security_fix_claim_allowed: false,
  autonomous_refactoring_claim_allowed: false,
  compliance_certification_claim_allowed: false,
  runtime_authority_claim_allowed: false
};

describe("release action receipt validator", () => {
  it("valid plan and receipt produce valid non-authorizing readout", () => {
    const readout = validateReleaseActionReceipt(validPlan, validReceipt);

    expect(readout.valid).toBe(true);
    expect(readout.validation_result).toBe("valid_scope_match_readout_only");
    expectNonAuthorizing(readout);
  });

  it("missing receipt is invalid", () => {
    const readout = validateReleaseActionReceipt(validPlan, undefined);

    expect(readout.valid).toBe(false);
    expect(readout.validation_result).toBe("missing_receipt");
    expectNonAuthorizing(readout);
  });

  it("planned action not allowed is invalid", () => {
    const readout = validateReleaseActionReceipt(
      { ...validPlan, planned_actions: ["commit", "push", "release", "unexpected_action"] },
      validReceipt
    );

    expect(readout.valid).toBe(false);
    expect(readout.validation_result).toBe("planned_action_not_allowed");
  });

  it("empty allowlist with planned files is invalid", () => {
    const readout = validateReleaseActionReceipt(validPlan, { ...validReceipt, allowed_file_paths: [] });

    expect(readout.valid).toBe(false);
    expect(readout.validation_result).toBe("file_outside_allowlist");
  });

  it("deployment readiness claim is invalid", () => {
    expectForbiddenClaim("deployment_readiness_claimed");
  });

  it("security fix claim is invalid", () => {
    expectForbiddenClaim("security_fix_claimed");
  });

  it("compliance certification claim is invalid", () => {
    expectForbiddenClaim("compliance_certification_claimed");
  });

  it("valid readout remains non-authorizing", () => {
    expectNonAuthorizing(validateReleaseActionReceipt(validPlan, validReceipt));
  });
});

export function expectNonAuthorizing(readout: ValidationReadout): void {
  expect(readout.non_authorizing).toBe(true);
  expect(readout.authorizes_git_commit).toBe(false);
  expect(readout.authorizes_git_tag).toBe(false);
  expect(readout.authorizes_gh_release).toBe(false);
  expect(readout.validator_mandatory_for_git).toBe(false);
  expect(readout.validator_mandatory_for_gh).toBe(false);
  expect(readout.hooks_installed).toBe(false);
  expect(readout.wrappers_installed).toBe(false);
  expect(readout.codex_runtime_tool_enforcement_claimed).toBe(false);
}

function expectForbiddenClaim(claim: keyof ReleaseActionPlan["planned_claims"]): void {
  const readout = validateReleaseActionReceipt(
    {
      ...validPlan,
      planned_claims: { ...validPlan.planned_claims, [claim]: true }
    },
    validReceipt
  );

  expect(readout.valid).toBe(false);
  expect(readout.validation_result).toBe("forbidden_claim_present");
  expect(readout.forbidden_claims_present).toBe(true);
}
