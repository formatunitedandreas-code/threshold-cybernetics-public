# Threshold Cybernetics v0.4.0 - Open-Source Repo Candidate Detection Run

v0.4.0 runs the public candidate-detection harness against the real open-source spring-framework-petclinic repository in read-only mode and publishes only bounded path/hash candidate summaries, false-positive notes and non-claims.

## What Changed

- Added a read-only public candidate-detection run against `spring-petclinic/spring-framework-petclinic`.
- Published public-safe candidate summaries for `DEP-001`, `CFG-001`, and `JSP-001`.
- Bound evidence using file paths, file categories, SHA-256 hashes, and candidate links.
- Added false-positive/noise notes for the real-repo run.
- Added a `detect` CLI for external repository path input.
- Extended the public candidate-detection GitHub Actions gate with a temporary open-source repo checkout.

## Non-Claims

This release does not publish PetClinic source code.
This release does not publish the private core.
This release does not claim enterprise-grade candidate detection.
This release does not claim semantic breaking-change detection.
This release does not claim mature risk scoring.
This release does not claim product readiness.
This release does not claim deployment readiness.
This release does not claim security remediation.
This release does not claim autonomous refactoring.
This release does not claim compliance certification.
This release does not claim runtime authority.
