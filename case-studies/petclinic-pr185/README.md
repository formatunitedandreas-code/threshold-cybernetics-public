# Governed Agent Merge - PetClinic PR #185

A historical owned-repository case study in which a coding agent received permission to merge exactly one SHA-bound pull request.

**Outcome:** merged and reconciled
**Current merge authority:** none
**Finite batch grant:** inactive
**Status:** engineering case study, not production-ready

## Problem

Agent-assisted repository work can blur the line between capability and authority. This case study documents a governance PR where the agent could inspect evidence and request effects, but each repository mutation required a separate human decision and exact precondition checks.

## What happened

PetClinic PR #185 introduced public-safe governance support for PR metadata envelopes and receipt-bound validation. The PR went through publication, review remediation, Ready transition, review-thread resolution, final rereview, two fail-closed merge attempts, and one successful authenticated REST squash merge.

## Public evidence

Publicly checkable evidence includes PR #185, the base commit, the final head commit, the squash merge commit, changed paths, workflow names and conclusions, review discussion metadata, and the final merge result.

See [PUBLIC_EVIDENCE_MANIFEST.json](docs/PUBLIC_EVIDENCE_MANIFEST.json).

## Architecture

The case separates capability, evidence, human decision, grant, permit, effect, receipt, reconciliation, and terminal state. See [ARCHITECTURE.md](docs/ARCHITECTURE.md) and [STATE_MACHINE.md](docs/STATE_MACHINE.md).

## Fail-closed events

Two merge attempts failed without repository mutation: a GitHub CLI PR-resolution failure and an unauthenticated REST request. Each failure consumed the relevant one-shot authority and required a new human decision. See [FAILURE_TIMELINE.md](docs/FAILURE_TIMELINE.md).

## What this demonstrates

A specific owned-repository governance workflow can bind a merge to an exact PR, head SHA, base SHA, required-check state, review state, merge method, and post-merge reconciliation.

## What this does not demonstrate

This does not prove general AI safety, production readiness, formal verification, upstream authority, release authority, deploy authority, or autonomous multibatch execution.

## Reproduction boundary

The public reproduction boundary is historical and evidence-based. It does not include private runtime receipts, active permits, credentials, local operator context, or replayable authority.

## Security and responsible disclosure

Do not publish tokens, authentication traces, local operator details, or raw receipt bundles. See [PUBLIC_DISCLOSURE_POLICY.md](PUBLIC_DISCLOSURE_POLICY.md) and [THREAT_MODEL.md](docs/THREAT_MODEL.md).

## Upstream and provenance

The source evidence comes from the owned PetClinic repository PR #185. This case study is a public summary, not an upstream endorsement or certification. See [UPSTREAM_AND_PROVENANCE.md](docs/UPSTREAM_AND_PROVENANCE.md).

## Follow-on experiment

A follow-on experiment examines whether the same capability/authority separation
can govern a bounded, multi-commit architectural refactoring.

The current public package documents only the pre-execution commitment:
candidate selection, quality criteria, scope boundaries and the planned
three-batch sequence were fixed before product code was changed.

No refactoring result is claimed at this stage.
