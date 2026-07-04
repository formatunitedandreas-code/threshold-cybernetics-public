import { forbiddenClaimsPresent, hasUnknownClaimKeys } from "./forbiddenClaimPolicy.js";
import { pathsAllowed } from "./pathAllowlist.js";
import type { ReleaseActionPlan, ReleaseActionReceipt, ValidationReadout } from "./types.js";

export function validateReleaseActionReceipt(
  plan: ReleaseActionPlan,
  receipt: ReleaseActionReceipt | null | undefined
): ValidationReadout {
  if (!receipt) {
    return readout(false, "missing_receipt", false, false, false, false, false);
  }

  if (receipt.receipt_type !== "release_action_authorization_receipt") {
    return readout(false, "invalid_receipt_type", false, false, false, false, false);
  }

  const releaseTagMatch = plan.release_tag === receipt.release_tag;
  const actionsAllowed = plan.planned_actions.every((action) => receipt.allowed_actions.includes(action));
  const forbiddenActionsPresent = plan.planned_actions.some((action) => receipt.forbidden_actions.includes(action));
  const filesAllowed = pathsAllowed(plan.planned_file_paths, receipt.allowed_file_paths);
  const forbiddenClaims = hasUnknownClaimKeys(plan.planned_claims as Record<string, unknown>)
    || forbiddenClaimsPresent(plan.planned_claims, receipt);
  const broadScope = receipt.allowed_scope.trim().length === 0 || receipt.allowed_scope === "*";

  const valid = releaseTagMatch
    && actionsAllowed
    && !forbiddenActionsPresent
    && filesAllowed
    && !forbiddenClaims
    && !broadScope;

  return readout(
    valid,
    valid ? "valid_scope_match_readout_only" : failureReason({
      releaseTagMatch,
      actionsAllowed,
      forbiddenActionsPresent,
      filesAllowed,
      forbiddenClaims,
      broadScope
    }),
    releaseTagMatch,
    actionsAllowed,
    filesAllowed,
    forbiddenActionsPresent,
    forbiddenClaims
  );
}

function failureReason(checks: {
  releaseTagMatch: boolean;
  actionsAllowed: boolean;
  forbiddenActionsPresent: boolean;
  filesAllowed: boolean;
  forbiddenClaims: boolean;
  broadScope: boolean;
}): string {
  if (!checks.releaseTagMatch) return "release_tag_mismatch";
  if (checks.broadScope) return "broad_scope_rejected";
  if (!checks.actionsAllowed) return "planned_action_not_allowed";
  if (checks.forbiddenActionsPresent) return "forbidden_action_present";
  if (!checks.filesAllowed) return "file_outside_allowlist";
  if (checks.forbiddenClaims) return "forbidden_claim_present";
  return "invalid_fail_closed";
}

function readout(
  valid: boolean,
  validationResult: string,
  releaseTagMatch: boolean,
  actionsAllowed: boolean,
  filesAllowed: boolean,
  forbiddenActionsPresent: boolean,
  forbiddenClaimsPresentValue: boolean
): ValidationReadout {
  return {
    valid,
    validation_result: validationResult,
    release_tag_match: releaseTagMatch,
    actions_allowed: actionsAllowed,
    files_allowed: filesAllowed,
    forbidden_actions_present: forbiddenActionsPresent,
    forbidden_claims_present: forbiddenClaimsPresentValue,
    non_authorizing: true,
    authorizes_git_commit: false,
    authorizes_git_tag: false,
    authorizes_gh_release: false,
    validator_mandatory_for_git: false,
    validator_mandatory_for_gh: false,
    hooks_installed: false,
    wrappers_installed: false,
    codex_runtime_tool_enforcement_claimed: false
  };
}
