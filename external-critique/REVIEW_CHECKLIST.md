# Review Checklist

Please do not only run the provided fixtures.

Try to break:

- forbidden marking reachability
- authorized vs unauthorized PR distinction
- candidate-specific terminal expectations
- receipt scope validation
- policy lane mapping
- static false invariant risks
- file allowlist validation
- forbidden claim validation
- release-action receipt validation

Suggested adversarial tests:

- add a path to `patch_authorized`
- add `unauthorized_pr_created`
- create a receipt with wrong tag
- create a plan with a file outside allowlist
- create a forbidden product-readiness claim
- create a broad task-level authorization and check whether it is rejected
