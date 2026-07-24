# Reddit Pre-Execution Review Post

Title: I selected an architectural refactor for an AI coding agent—but froze the plan before letting it touch product code. What would you attack first?

Disclosure: this is a public, non-authorizing pre-execution package. No Product code has been changed, no Product tests have been changed, no Product refactoring PR has been opened, and no result is known. A separate public documentation PR (#3) records this pre-execution state.

Earlier I documented PR #185 as a one-shot, SHA-bound merge-governance case. That was useful, but it left a fair criticism: a correctly enforced gate is not enough if the agent can manipulate the evidence that the gate consumes.

The next boundary adds evidence-producer integrity and a bounded multibatch plan. The candidate, architecture baseline, quality profile, behavioral invariants, scope boundaries and exact three-batch plan were fixed before product execution.

Selected candidate: `owner-web-flow-responsibility-split-v0-1`

Score: 34. Lead over runner-up: 7.

Planned shape:

1. Batch 1: characterization and safety net.
2. Batch 2: responsibility split.
3. Batch 3: migration closure and quality review.

The quality profile asks about problem framing, alternatives, tradeoffs, architecture boundary reasoning, failure modes, migration sequencing, tests, rollback, scope discipline and final diff review. None of the final predicates have been evaluated yet.

Current state:
- product source changed: no
- product tests changed: no
- execution started: no
- result known: no

Five review questions:

1. Is the selected candidate actually architectural, or is it process dressing around a small cleanup?
2. Are the behavioral invariants strong enough before structural change?
3. Is the three-batch boundary too narrow, too broad, or sequenced poorly?
4. What evidence-producer manipulation path would you attack first?
5. What would invalidate this plan before execution starts?

Feedback does not create authority. A blocker would keep Part 2 blocked or require a new plan digest, counterfactual review and human decision.

Canonical public case-study link: not yet published
