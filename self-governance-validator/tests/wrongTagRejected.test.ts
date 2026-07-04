import { expect, it } from "vitest";

import { validateReleaseActionReceipt } from "../src/releaseActionReceiptValidator.js";
import { validPlan, validReceipt } from "./releaseActionReceiptValidator.test.js";

it("wrong release tag is rejected", () => {
  const readout = validateReleaseActionReceipt(validPlan, { ...validReceipt, release_tag: "v0.0.0-wrong" });

  expect(readout.valid).toBe(false);
  expect(readout.validation_result).toBe("release_tag_mismatch");
  expect(readout.release_tag_match).toBe(false);
});
