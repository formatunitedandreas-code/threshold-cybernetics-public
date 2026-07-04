import type { PolicyMappingOutput } from "./types";
import { assertNoAuthority } from "./noAuthorityInvariants";

export function decisionEnvelope(outputs: PolicyMappingOutput[]) {
  outputs.forEach(assertNoAuthority);
  return {
    authorization_granted: false,
    action_allowed: false,
    patch_authorized: false,
    execution_authorized: false,
    pr_created: false,
    merge_authorized: false,
    outputs
  };
}
