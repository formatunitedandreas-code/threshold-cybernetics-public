import { describe, expect, it } from "vitest";
import { assertNoForbiddenEdges } from "../src/boundaryNet";
import { forbiddenAuthorityMarkings } from "../src/forbiddenMarkings";
import { petclinicBoundaryNet } from "../src/petclinicBoundaryNet.fixture";

describe("no authority promotion", () => {
  it("has no transition edge into a forbidden authority marking", () => {
    expect(() => assertNoForbiddenEdges(petclinicBoundaryNet, forbiddenAuthorityMarkings)).not.toThrow();
  });
});
