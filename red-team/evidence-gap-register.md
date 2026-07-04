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

These gaps are not failures of the harness. They are explicit boundaries for future evidence work.
