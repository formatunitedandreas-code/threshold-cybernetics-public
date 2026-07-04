import { expect, it } from "vitest";

import { validateReleaseActionReceipt } from "../src/releaseActionReceiptValidator.js";
import { validPlan, validReceipt } from "./releaseActionReceiptValidator.test.js";

it("product readiness claim is rejected", () => {
  const readout = validateReleaseActionReceipt(
    { ...validPlan, planned_claims: { ...validPlan.planned_claims, product_readiness_claimed: true } },
    validReceipt
  );

  expect(readout.valid).toBe(false);
  expect(readout.validation_result).toBe("forbidden_claim_present");
});

it("runtime authority claim is rejected", () => {
  const readout = validateReleaseActionReceipt(
    { ...validPlan, planned_claims: { ...validPlan.planned_claims, runtime_authority_claimed: true } },
    validReceipt
  );

  expect(readout.valid).toBe(false);
  expect(readout.validation_result).toBe("forbidden_claim_present");
});
