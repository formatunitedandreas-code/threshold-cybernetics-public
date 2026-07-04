import { expect, it } from "vitest";

import { validateReleaseActionReceipt } from "../src/releaseActionReceiptValidator.js";
import { validPlan, validReceipt } from "./releaseActionReceiptValidator.test.js";

it("broad unrelated scope is rejected", () => {
  const readout = validateReleaseActionReceipt(validPlan, { ...validReceipt, allowed_scope: "*" });

  expect(readout.valid).toBe(false);
  expect(readout.validation_result).toBe("broad_scope_rejected");
});
