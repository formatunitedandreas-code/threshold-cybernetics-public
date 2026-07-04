# Receipt Validation Summary

v0.7.0 validates synthetic receipt scopes against v0.6 policy-lane requirements:

| Candidate | Policy Lane | Receipt Result | Scope Match | Action Allowed |
|---|---|---|---:|---:|
| DEP-001 | standard_human_review_required | valid_scope_match_readout_only | true | false |
| CFG-001 | standard_human_review_required | missing_receipt_stop_no_action | false | false |
| JSP-001 | strict_human_review_required | scope_mismatch_hold_strict_review_required | false | false |

Receipt validation describes scope matching only. It does not grant authorization, patch approval, execution permission, PR creation, merge approval, deployment authorization, security remediation, product readiness, or runtime authority.
