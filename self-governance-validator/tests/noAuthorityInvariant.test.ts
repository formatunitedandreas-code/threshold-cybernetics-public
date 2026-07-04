import { expect, it } from "vitest";

import { validateReleaseActionReceipt } from "../src/releaseActionReceiptValidator.js";
import { expectNonAuthorizing, validPlan, validReceipt } from "./releaseActionReceiptValidator.test.js";

it("no output authority flags are positive for valid readout", () => {
  const readout = validateReleaseActionReceipt(validPlan, validReceipt);

  expect(readout.valid).toBe(true);
  expectNonAuthorizing(readout);
});

it("no output authority flags are positive for invalid readout", () => {
  const readout = validateReleaseActionReceipt(validPlan, undefined);

  expect(readout.valid).toBe(false);
  expectNonAuthorizing(readout);
});
