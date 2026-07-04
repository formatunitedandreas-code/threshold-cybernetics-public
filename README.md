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
