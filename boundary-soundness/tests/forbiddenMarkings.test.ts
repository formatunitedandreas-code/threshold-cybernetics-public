import { describe, expect, it } from "vitest";
import { forbiddenAuthorityMarkings, isForbiddenMarking } from "../src/forbiddenMarkings";

describe("forbidden markings", () => {
  it("contains core forbidden authority states", () => {
    expect(forbiddenAuthorityMarkings).toContain("patch_authorized");
    expect(forbiddenAuthorityMarkings).toContain("execution_authorized");
    expect(forbiddenAuthorityMarkings).toContain("unauthorized_pr_created");
    expect(forbiddenAuthorityMarkings).toContain("action_allowed");
    expect(forbiddenAuthorityMarkings).toContain("runtime_authority_granted");
    expect(isForbiddenMarking("authorized_draft_pr_created_readout_only")).toBe(false);
  });
});
