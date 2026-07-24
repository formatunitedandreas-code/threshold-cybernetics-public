# Three-Batch Execution Plan

This is a planned three-batch run. No batch has been executed.

## Batch 1: behavioral characterization and safety net

Goal: bind behavioral, failure-path, endpoint, serialization and persistence invariants before structural change.

Allowed change class: Product test changes only.

Forbidden change class: production behavior changes, governance changes, workflow changes, dependency changes, public API changes and database schema changes.

Required evidence: characterization test results and invariant references.

Stop conditions: missing behavioral coverage, Product source drift, governance drift, evidence-producer drift or authority leakage.

## Batch 2: central responsibility split

Goal: perform the central responsibility split while preserving observed behavior.

Allowed change class: main structural extraction or responsibility movement inside the bound scope.

Forbidden change class: endpoint drift, persistence drift, serialization drift, dependency additions, governance mutation and scope expansion.

Required evidence: regression tests, changed-path receipt, invariant preservation and bounded diff review.

Stop conditions: behavior change, public contract drift, scope expansion, repair budget exhaustion or stale base.

## Batch 3: migration completion and quality closure

Goal: complete remaining migration, remove obsolete private compatibility code and prepare final quality review.

Allowed change class: closure changes inside the bound scope and final regression evidence.

Forbidden change class: new feature behavior, dead compatibility layers, public API drift, governance changes and budget expansion.

Required evidence: final regression tests, quality predicate readout and rollback path documentation.

Stop conditions: failed mandatory predicate, unreviewable diff, missing rollback path, adversarial closeout failure or authority leakage.
