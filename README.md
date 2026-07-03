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
