import { expect, it } from "vitest";

import { validateReleaseActionReceipt } from "../src/releaseActionReceiptValidator.js";
import { validPlan, validReceipt } from "./releaseActionReceiptValidator.test.js";

it("forbidden action present is rejected", () => {
  const readout = validateReleaseActionReceipt({ ...validPlan, planned_actions: ["commit", "deploy"] }, validReceipt);

  expect(readout.valid).toBe(false);
  expect(readout.validation_result).toBe("planned_action_not_allowed");
  expect(readout.forbidden_actions_present).toBe(true);
});
