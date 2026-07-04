# Threshold Cybernetics v0.4.1 - Public Hash Provenance Repair

v0.4.1 repairs the v0.4.0 evidence hash provenance by replacing line-ending-sensitive working-tree hashes with Git-object-byte SHA-256 hashes and adding a public verification script and CI workflow.

## What Changed

- v0.4.0 candidate detection against the target repo remains reproducible.
- v0.4.0 published hashes are superseded for provenance verification.
- v0.4.1 publishes corrected Git-byte hashes.
- v0.4.1 adds a public verification script that recomputes hashes through `git show <target_commit>:<path>`.
- v0.4.1 adds a CI workflow for hash provenance verification.
- v0.4.1 does not publish source contents.
- v0.4.1 does not claim semantic validation or risk scoring.

## Non-Claims

This release does not claim product readiness.
This release does not claim deployment readiness.
This release does not claim security remediation.
This release does not claim autonomous refactoring.
This release does not claim semantic breaking-change detection.
This release does not claim mature risk scoring.
This release does not claim enterprise-grade candidate detection.
This release does not claim compliance certification.
This release does not claim runtime authority.
