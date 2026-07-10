# Threshold Cybernetics

**Governance before action.**

Threshold Cybernetics is an experimental governance architecture for AI-assisted software workflows.

Threshold Cybernetics makes AI-assisted software change auditable before it becomes executable. It separates generated suggestions, tool output, evidence, review, and execution authority, so an AI-assisted repository workflow can be reviewed before it becomes code, release, runtime, or deployment action.

## Proof-of-Architecture

This is a proof-of-architecture release.

It documents a governed legacy-refactoring demo based on an open-source Spring Framework PetClinic-style case. The strongest result of the demo is not that AI changed code. The strongest result is that it did not act without authorization.

The demo selected three plausible refactoring candidates and stopped all three because no valid explicit human authorization was present.

## What This Shows

- Model/tool output does not automatically become action.
- Candidate selection does not become patch approval.
- Test pass does not become deployment readiness.
- Missing human authorization leads to Stop/No-Action.
- Readout artifacts must not block target repository worktrees.

## What This Does Not Claim

This is a proof-of-architecture release.
It does not claim autonomous refactoring, production readiness, deployment readiness, security remediation, compliance certification, or runtime authority.

This public mirror contains only bounded public-safe summary material. It does not contain private source code, PetClinic source code, raw logs, scanner reports, private benchmark outputs, or runtime artifacts.

## External Critique Invitation

This project invites technical critique of the public Boundary Soundness and Self-Governance evidence chain.

Please see:

- `external-critique/REVIEWER_BRIEF.md`
- `external-critique/REVIEW_CHECKLIST.md`
- `external-critique/SELF_GOVERNANCE_STATUS.md`

This is an invitation for critique, not a certification claim.

## v0.9.1 - Public Release Action Receipt Validator Harness

v0.9.1 repairs a public evidence gap from v0.9.0.

The external critique pack stated that a Release Action Receipt Validator existed, but the validator was not publicly reproducible in this repository.

v0.9.1 adds a minimal public validator harness with schemas, fixtures, tests, adversarial cases and run artifacts.

It validates:

- release tag
- allowed actions
- file allowlist
- forbidden actions
- forbidden claims

It does not install git/gh wrappers, hooks or runtime tool interception.
It does not make the validator mandatory for Codex actions.

## v0.10.0 Release Candidate - PetClinic Owned Sandbox Baseline Readout

v0.10.0 is prepared as a release candidate only.

It adds a public-safe readout candidate for the PetClinic owned-refactor Slice 01 local sandbox baseline. The candidate records only summary-level public information: local sandbox commit hashes, changed-file path summary, diff stat, aggregate test counts and explicit non-claims.

It does not publish PetClinic source code, raw logs, private benchmark outputs, scanner reports or private repository contents.

It does not create a tag, publish a GitHub Release, push to PetClinic, act on PR #281, claim autonomous refactoring, claim product readiness, claim deployment readiness, claim security remediation, claim compliance certification or claim runtime authority.

## v0.10.1 - PetClinic Slice 04/05 Public-Safe Readout Update

v0.10.1 adds a public-safe summary for later owned-sandbox PetClinic governance events.

It records only summary-level evidence for Slice 04 and Slice 05:

- Slice 04 baseline build/test fixture: `mvn test` and `mvn verify` each reported 75 tests, 0 failures, 0 errors, 0 skipped.
- Slice 05 route/JSP smoke-checklist fixture: existing web-controller tests reported 25 tests, 0 failures, 0 errors, 0 skipped.
- No tracked PetClinic diff remained after either fixture.
- No PetClinic local commit was made for Slice 04 or Slice 05.
- No browser verification was claimed.

Read:

- `real-repo-runs/petclinic-owned-refactor-slices-04-05-checklist-fixtures-v0-10-1/README.md`
- `real-repo-runs/petclinic-owned-refactor-slices-04-05-checklist-fixtures-v0-10-1/non-claims.md`
- `real-repo-runs/petclinic-owned-refactor-slices-04-05-checklist-fixtures-v0-10-1/validator-readout.public-safe.json`
- `real-repo-runs/petclinic-owned-refactor-slices-04-05-checklist-fixtures-v0-10-1/SHA256SUMS.txt`
- `RELEASE_NOTES_V0_10_1.md`

This update does not publish PetClinic source code, raw logs, private benchmark outputs, scanner reports, private repository contents, runtime artifacts, or browser traces.

It does not create a tag, publish a GitHub Release, push to PetClinic, act on PR #281, claim autonomous refactoring, claim browser verification, claim product readiness, claim deployment readiness, claim security remediation, claim compliance certification, claim maintainer approval, or claim runtime authority.

## PetClinic Boundary-Attestation Case

This repository includes a public-safe Boundary-Attestation case for PetClinic PR #281 as a quiet reference case only. The case demonstrates Decision-before-action: source refs, authority flags, hashes and explicit non-claims are verified before any action could be considered.

The case does not claim PetClinic was refactored, fixed, secured, approved, merged, deployed or maintainer-endorsed. It does not install hooks, mutate CI, enable branch protection, or activate blocking enforcement.

Read:

- `docs/PETCLINIC_BOUNDARY_CASE_PUBLIC_READOUT_V0_1.md`
- `docs/PETCLINIC_BOUNDARY_ATTESTATION_VERIFICATION_GUIDE_V0_1.md`
- `docs/PUBLIC_NON_CLAIMS_V0_1.md`
- `artifacts/boundary-receipts/PETCLINIC_PR281_BOUNDARY_ATTESTATION_V0_1.json`

## Public Evidence Harness

v0.2.0 adds a minimal reproducible public harness.

You can run:

```bash
cd harness
npm install
npm test
```

The harness demonstrates that selected candidate fixtures without explicit authorization deterministically produce Stop/No-Action decision envelopes.

This does not publish the private core and does not claim product readiness, deployment readiness, security remediation, autonomous refactoring, compliance certification, or runtime authority.

## Public Candidate Detection Harness

v0.3.0 adds a minimal public candidate-detection harness.

It demonstrates how three candidate classes can be derived from synthetic, open fixture surfaces:

- `DEP-001` from dependency/plugin surfaces in `pom.xml`
- `CFG-001` from Spring XML configuration surfaces
- `JSP-001` from JSP + Controller surfaces

Run it locally:

```bash
cd candidate-detection
npm install
npm test
npm run produce-candidate-ledger
```

This does not publish the private core and does not claim enterprise-grade risk scoring, semantic breaking-change detection, product readiness, deployment readiness, security remediation, autonomous refactoring, compliance certification, or runtime authority.

## v0.4.0 - Open-Source Repo Candidate Detection Run

v0.4.0 adds a bounded read-only candidate-detection run against the real open-source `spring-framework-petclinic` repository.

The run publishes only public-safe summaries:

- target commit
- detected candidate classes
- evidence paths
- SHA-256 evidence hashes
- aggregate counts
- false-positive/noise notes
- non-claims

It does not copy or publish PetClinic source files, private core code, private logs, scanner reports, or raw traces.

This run demonstrates that the public candidate-detection harness can operate on a real open-source repository checkout without mutating the target repo.

It does not claim semantic breaking-change detection, mature risk scoring, enterprise-grade detection, product readiness, deployment readiness, security remediation, autonomous refactoring, compliance certification, or runtime authority.

## v0.4.1 - Hash Provenance Repair

v0.4.1 repairs the evidence hash provenance of the v0.4.0 open-source repository run.

An external verification found that the v0.4.0 candidate detection run was reproducible, but 19 of 20 published SHA-256 hashes were not reproducible against the public Git source bytes because the hashes were generated over a line-ending-normalized representation.

v0.4.1 corrects this by publishing Git-object-byte SHA-256 hashes and adding a verification script/CI workflow that recomputes hashes via:

```bash
git show <target_commit>:<path> | sha256sum
```

v0.4.0 remains useful for candidate path detection but is superseded for hash provenance by v0.4.1.

This release does not publish PetClinic source code, private core code, private logs, scanner reports, or raw traces.

A root-cause analysis for the v0.4.0 hash mismatch is available under:

`real-repo-runs/spring-framework-petclinic-v0-4-1/HASH_ROOT_CAUSE_ANALYSIS_V0_1.md`

The RCA records the v0.4.0 line-ending-sensitive hash provenance failure and the v0.4.1 Git-object-byte repair.

## v0.5.0 - Risk Hint Gradation Harness

v0.5.0 adds a bounded public risk-hint gradation harness.

It takes the v0.4.1 Git-byte-verified candidate/evidence summaries and assigns non-authorizing review-priority tiers:

- `medium` for dependency/plugin review surfaces
- `medium` for Spring configuration inventory surfaces
- `high` for JSP/MVC UI-routing/form-binding-adjacent surfaces
- `unknown` for missing or insufficient evidence

This is not mature risk scoring and not semantic breaking-change detection.

Risk tiers do not authorize patches, PRs, execution, deployment, security remediation, or production use.

## v0.6.0 - Policy-as-Code Authorization Tier Mapping

v0.6.0 adds a bounded public policy-as-code mapping layer.

It maps non-authorizing risk-hint tiers from v0.5 into required review lanes:

- `medium` -> `standard_human_review_required`
- `high` -> `strict_human_review_required`
- `unknown` -> `hold_for_manual_triage`

The mapping defines what kind of human review would be required before any action could even be considered.

It does not grant authorization.

- Policy Mapping != Authorization Granted
- Policy Lane != Patch Approval
- Policy Lane != Execution Permission
- Risk Tier != Authority
- Human Review Required != Approval Granted

## v0.7.0 - Scoped Human Authorization Receipt Validation

v0.7.0 adds a bounded public receipt-validation harness.

It checks whether a synthetic human authorization receipt matches the required review scope from the v0.6 policy mapping.

Example outcomes:

- valid standard review scope -> `valid_scope_match_readout_only`
- missing receipt -> `missing_receipt_stop_no_action`
- lower scope for strict lane -> `scope_mismatch_hold_strict_review_required`

- Receipt Validation != Patch Execution
- Receipt Valid != Action Allowed
- Receipt Scope Match != Runtime Authority
- Human Review Required != Approval Granted

This release does not authorize patches, PRs, merge, deployment, security remediation, production use, or runtime action.

## v0.8.0 - Boundary-Soundness Reachability Readout

v0.8.0 adds a bounded public Boundary-Soundness readout.

It models the public PetClinic governance path:

```text
Candidate -> Evidence -> Risk -> Policy -> Receipt -> Stop / Hold / Readout
```

Then it checks whether forbidden authority promotions are reachable:

- patch authorization
- execution authorization
- PR creation
- merge authorization
- deployment authorization
- security-fix claims
- product-readiness claims
- runtime authority

The result is a public-safe reachability readout, not runtime enforcement.

- Boundary Soundness != BPMN engine soundness
- Boundary Soundness != DMN compliance
- Boundary Soundness != formal verification of all workflows
- Boundary Soundness != compliance proof
- Boundary Soundness != deployment readiness
- Boundary Soundness != autonomous refactoring

## v0.8.1 - Boundary Soundness Correction Closeout

v0.8.1 records the correction of review findings after v0.8.0.

The corrected model distinguishes `unauthorized_pr_created` from an explicitly human-authorized, readout-only draft PR terminal state for DEP-001.

It also verifies that candidate-specific terminal expectations are evaluated, v0.5/v0.6/v0.7 public inputs are loaded, and invariants are derived from reachable states rather than static false values.

This remains a bounded public reachability readout, not formal verification, runtime enforcement, product readiness, deployment readiness or compliance proof.
