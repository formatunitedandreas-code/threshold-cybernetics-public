# v0.10.0 Public Release Candidate

Status: candidate-only, public-safe, non-authorizing.

## Candidate ID

`threshold-cybernetics-public-v0-10-0-petclinic-owned-sandbox-baseline-readout`

## Purpose

Prepare a public-safe release candidate that summarizes the Threshold Cybernetics owned PetClinic refactor governance lane after Slice 01 was committed only in the owned local sandbox and bound as a new local sandbox baseline.

## Candidate Tag

`v0.10.0-petclinic-owned-sandbox-baseline-readout`

This tag is proposed only. It has not been created by this candidate-preparation step.

## Public-Safe Summary

- Previous local sandbox baseline: `29b4fa9d5db16796c739e89ac3637d6a6df4578a`
- New local sandbox baseline: `b32e77db685fe0ec8243db66c4291f84b63a644e`
- Local sandbox branch: `threshold-governed-refactor-demo`
- Local sandbox commit subject: `Record Slice 01 sandbox marker`
- Public changed-file path summary: `src/test/java/org/springframework/samples/petclinic/model/OwnerTests.java`
- Public diff summary: `1 file changed, 2 insertions(+)`
- Targeted test summary: `OwnerTests`, 4 tests, 0 failures, 0 errors, 0 skipped
- Full test summary: `mvn test`, 75 tests, 0 failures, 0 errors, 0 skipped

## Included Candidate Files

- `RELEASE_NOTES_V0_10_0.md`
- `public-release-candidates/v0.10.0/RELEASE_CANDIDATE.md`
- `real-repo-runs/petclinic-owned-refactor-slice-01-local-baseline-v0-10-0/README.md`
- `real-repo-runs/petclinic-owned-refactor-slice-01-local-baseline-v0-10-0/non-claims.md`
- `real-repo-runs/petclinic-owned-refactor-slice-01-local-baseline-v0-10-0/validator-readout.public-safe.json`
- `self-governance-validator/fixtures/valid/v0.10.0-release-candidate.plan.public-safe.json`
- `self-governance-validator/fixtures/valid/v0.10.0-release-candidate.receipt.public-safe.json`

## Explicitly Excluded

- PetClinic source code
- raw PetClinic logs
- private benchmark outputs
- scanner reports
- private repository contents
- upstream PetClinic mutation
- PR #281 action
- tag creation
- GitHub Release creation
- deployment or runtime action

## Non-Claims

Release Candidate != Release Published
Release Candidate != Tag Created
Release Candidate != PetClinic Upstream Mutation
Release Candidate != PR #281 Action
Release Candidate != Maintainer Approval
Release Candidate != Merge Readiness
Release Candidate != Deployment Readiness
Release Candidate != Production Readiness
Release Candidate != Security Fix
Release Candidate != Correctness Guarantee
Release Candidate != Compliance Certification
Release Candidate != Runtime Authority
