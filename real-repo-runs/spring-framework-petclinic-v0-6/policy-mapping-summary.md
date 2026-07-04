# Policy Mapping Summary

v0.6.0 maps the v0.5 risk-hint tiers to required review lanes:

| Candidate | Risk Hint Tier | Policy Lane | Required Authorization Scope | Action Allowed |
|---|---|---|---|---|
| DEP-001 | medium | standard_human_review_required | human_review_candidate_scope | false |
| CFG-001 | medium | standard_human_review_required | human_review_candidate_scope | false |
| JSP-001 | high | strict_human_review_required | strict_human_review_candidate_scope | false |

Policy lanes describe review requirements only. They do not grant authorization, patch approval, execution permission, PR creation, merge approval, deployment readiness, security remediation, product readiness, or runtime authority.
