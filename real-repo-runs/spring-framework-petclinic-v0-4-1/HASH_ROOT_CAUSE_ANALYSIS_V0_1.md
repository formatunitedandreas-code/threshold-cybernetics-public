# v0.4.0 Hash Provenance Root Cause Analysis

## Summary

v0.4.0 candidate detection against the target repository remains reproducible.

The v0.4.0 published evidence hashes were not externally reproducible against Git object bytes for most evidence items.

v0.4.1 repaired this by switching to Git-object-byte SHA-256 hashing and public verification.

## Root Cause Classification

`confirmed_line_ending_normalization`

## Evidence

Public-safe matrix:

- `hash-root-cause-matrix.public-safe.json`

Counts:

- evidence items analyzed: 20
- v0.4.0 Git-object-byte matches: 1
- v0.4.0 Git-object-byte mismatches: 19
- v0.4.0 CRLF-normalized Git-byte matches: 20
- v0.4.0 working-tree byte matches in the current checkout: 20
- v0.4.1 corrected Git-object-byte matches: 20

Current target checkout observations:

- target commit: `bdbaa5e671dfd9acb5c5814f5ac6d2408107e39a`
- current target worktree status: clean
- current visible `core.autocrlf`: `true`
- current `core.autocrlf` is documented as present-state context only, not as proof of the exact historical operator step.

Relevant public scripts and functions:

- v0.4.0: `candidate-detection/src/hashEvidence.ts`
- v0.4.0: `hashEvidence(fixtureRoot, relativePath)`
- v0.4.0: `candidate-detection/scripts/detect-repo.ts`
- v0.4.1: `candidate-detection/src/hashGitObjectEvidence.ts`
- v0.4.1: `hashGitObjectEvidence(repoRoot, commit, path)`
- v0.4.1: `candidate-detection/scripts/verify-real-repo-hashes.ts`

## Findings

- v0.4.0 published hashes matched CRLF-normalized bytes for all 20 evidence items.
- v0.4.0 published hashes did not match Git object bytes for 19 LF-class evidence files.
- the one originally matching file was `src/main/resources/spring/datasource-config.xml`, which was already CRLF in Git object bytes.
- v0.4.1 corrected hashes match Git object bytes for all 20 evidence items.
- the responsible public code path in v0.4.0 used working-tree file reads through `hashEvidence(fixtureRoot, relativePath)`.
- the likely operational failure mode was publishing hashes generated from a platform-normalized working-tree representation instead of Git object bytes.
- the cause is classified as confirmed because the published v0.4.0 hashes match the CRLF-normalized representation for every evidence item, while v0.4.1 matches Git object bytes for every evidence item.

## Impact

- Candidate detection remains reproducible.
- Evidence paths remain valid.
- v0.4.0 is superseded for hash provenance.
- v0.4.1 is the valid provenance source.

## Preventive Controls

- Hash real-repo evidence via `git show <commit>:<path>`.
- CI must verify published hashes against Git object bytes.
- Working-tree hashes must not be used for public provenance.
- Any future evidence hash policy must state byte source explicitly.
- v0.5 risk gradation remains blocked unless v0.4.1 hash verification remains passing.

## Non-Claims

This RCA does not claim:

- semantic breaking-change detection
- mature risk scoring
- product readiness
- deployment readiness
- security remediation
- autonomous refactoring
- compliance certification
- runtime authority
