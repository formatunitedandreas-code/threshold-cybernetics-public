# Case Study: PetClinic PR #185

## Chronology

1. Initial governance PR: PR #185 proposed public-safe governance validation for PR metadata envelopes.
2. Metadata binding problem: early review found that metadata digests were calculated but not bound tightly enough to immutable receipts.
3. Governance remediation: the implementation bound expected metadata digest through receipt classification and made H1-B metadata receipt-driven.
4. Ready transition: PR #185 moved from Draft to Ready only after a separate one-shot human decision.
5. Post-Ready review finding: a review comment identified that PR-body availability was required before candidate-class classification.
6. Local remediation: the validator was changed so known non-H1-B product receipts can validate without PR event body, while H1-B still fails closed when body metadata is required.
7. Exact publication: the remediation commit was pushed only after a compare-and-push authorization.
8. Fresh checks: required workflow contexts completed successfully on the new head.
9. Review supersession: the original inline finding became outdated on the new head.
10. Review resolution: a reply documented the fix and the review thread was resolved under a separate authority.
11. Final rereview: all known findings were reassessed as resolved.
12. Merge readiness: PR state, checks, review state, and exact digests were bound for a later merge decision.
13. Failed GitHub CLI merge resolution: a first merge request failed before mutation because the CLI could not resolve the PR.
14. Failed unauthenticated REST merge: a second REST request failed with an authentication error and did not mutate the repository.
15. Authentication admission: a later run verified the existing GitHub principal and repository permissions without publishing secrets.
16. Successful exact REST squash merge: the exact head was squash-merged through the REST endpoint.
17. Main reconciliation: remote main was observed at the returned merge result SHA.
18. Authority budget reduced to zero: the merge permit was consumed and no finite batch grant was activated.

## Why failures matter

Failure did not expand authority. Failure did not authorize a fallback. Failure did not permit a second request. Failure required a new human decision.

