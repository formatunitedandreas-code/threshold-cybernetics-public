# Risk Gradation Summary

Input:

- candidate summary: `real-repo-runs/spring-framework-petclinic-v0-4-1/detected-candidates.summary.json`
- evidence index: `real-repo-runs/spring-framework-petclinic-v0-4-1/evidence-index.git-byte-hashes.public-safe.json`
- hash policy: `git_object_bytes_sha256`

Mapping decisions:

- `DEP-001` maps to `medium` because dependency/plugin surfaces require human review before any patch branch.
- `CFG-001` maps to `medium` because configuration behavior surfaces require human review before any configuration change.
- `JSP-001` maps to `high` because JSP/MVC UI-routing/form-binding-adjacent surfaces require stricter human review.

This is a bounded rule-based gradation over public-safe evidence categories. It is not semantic breaking-change detection, mature risk scoring, patch approval, execution authorization, security remediation, deployment readiness, product readiness, compliance certification, autonomous refactoring, or runtime authority.
