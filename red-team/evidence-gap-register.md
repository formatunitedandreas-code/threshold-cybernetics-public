# Evidence Gap Register

Open gaps:

- external independent review
- enterprise repo performance
- semantic breaking-change detection
- real OpenRewrite integration
- GitHub Actions production integration
- policy-as-code escalation
- risk scoring
- real enterprise candidate detection
- semantic breaking-change detection
- private core validation
- performance on large repositories
- false-positive reduction
- risk scoring maturity
- enterprise-scale candidate detection
- external independent review beyond hash verification

v0.4 addresses the criticism that candidate detection had only been tested on synthetic fixtures by adding a read-only run against a real open-source repository checkout.

v0.4.0 published SHA-256 hashes were not externally reproducible against Git object bytes for 19 of 20 evidence items due to line-ending normalization.

v0.4.1 repairs this by using Git-object-byte hashing and CI verification.

Accepted: v0.4.0 hash provenance was not externally reproducible against Git object bytes for 19/20 evidence items.

Response: v0.4.1 repaired the hash policy and this RCA investigates the cause.

Remaining: future evidence runs must keep Git-object-byte hash verification in CI before any risk-gradation claims.

v0.5 addresses the criticism that previous risk hints were static by adding bounded rule-based risk-hint tiers over Git-byte-verified candidate/evidence summaries.

Remaining after v0.5:

- semantic breaking-change detection
- mature risk scoring
- false-positive reduction
- enterprise-scale validation
- real OpenRewrite integration
- external independent review beyond reproducibility checks
- private core validation

These gaps are not failures of the harness. They are explicit boundaries for future evidence work.
