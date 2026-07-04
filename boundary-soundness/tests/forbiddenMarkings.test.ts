import { describe, expect, it } from "vitest";
import { forbiddenAuthorityMarkings, isForbiddenMarking } from "../src/forbiddenMarkings";

describe("forbidden markings", () => {
  it("contains core forbidden authority states", () => {
    expect(forbiddenAuthorityMarkings).toContain("patch_authorized");
    expect(forbiddenAuthorityMarkings).toContain("execution_authorized");
    expect(forbiddenAuthorityMarkings).toContain("pr_created");
    expect(forbiddenAuthorityMarkings).toContain("runtime_authority_granted");
    expect(isForbiddenMarking("readout_only_no_action")).toBe(false);
  });
});
