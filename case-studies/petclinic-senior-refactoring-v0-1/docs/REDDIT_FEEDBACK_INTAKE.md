# Reddit Feedback Intake

Fields:

- commentUrl
- community
- challengedClaim
- proposedFailureMode
- severity
- reproducible
- disposition
- planImpact
- newDecisionRequired
- authorityGenerated=false

Allowed dispositions:

- accepted_no_plan_change
- accepted_future_work
- plan_blocker
- plan_amendment_required
- rejected_with_evidence
- out_of_scope

Rules:

- `plan_blocker` means Part 2 remains blocked.
- `plan_amendment_required` means the old plan digest is invalid and a new counterfactual review, decision packet and human decision are required.
- `accepted_future_work` cannot expand scope in the current run.
- Feedback does not generate authority.
