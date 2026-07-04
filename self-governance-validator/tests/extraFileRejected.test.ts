import { expect, it } from "vitest";

import { validateReleaseActionReceipt } from "../src/releaseActionReceiptValidator.js";
import { validPlan, validReceipt } from "./releaseActionReceiptValidator.test.js";

it("file outside allowlist is rejected", () => {
  const readout = validateReleaseActionReceipt(
    { ...validPlan, planned_file_paths: ["private-core/source.ts"] },
    validReceipt
  );

  expect(readout.valid).toBe(false);
  expect(readout.validation_result).toBe("file_outside_allowlist");
  expect(readout.files_allowed).toBe(false);
});
