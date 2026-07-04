# False Positive / Noise Register

This v0.4 run uses simple pattern-based candidate detection.

## Known limitations

- Pattern detection is not semantic analysis.
- A Spring XML `<bean>` marker may produce broad CFG candidates.
- JSP + Controller co-presence does not prove a concrete UI migration risk.
- Dependency/plugin surfaces do not imply a vulnerability or required update.
- Risk hints are static category hints, not risk scores.

## What this run demonstrates

- The public harness can read a real open-source repository checkout.
- Candidate summaries can be produced without mutating the target repo.
- Evidence can be bound by path and SHA-256 without publishing source contents.

## What this run does not demonstrate

- mature risk scoring
- semantic breaking-change detection
- enterprise-scale candidate detection
- autonomous refactoring
- security remediation
- deployment readiness
