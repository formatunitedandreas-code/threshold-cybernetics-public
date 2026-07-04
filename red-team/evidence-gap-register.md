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

v0.6 addresses the question of how bounded risk tiers translate into review requirements by adding a non-authorizing policy-as-code mapping layer.

Remaining after v0.6:

- actual human authorization receipt validation
- authorization scope matching
- semantic breaking-change detection
- mature risk scoring
- false-positive reduction
- enterprise-scale validation
- real OpenRewrite integration
- external independent review beyond reproducibility checks
- private core validation

v0.7 addresses the question of how policy-lane requirements can be checked against scoped human authorization receipts by adding a non-authorizing synthetic receipt validation harness.

Remaining after v0.7:

- real human authorization workflow
- cryptographic receipt signatures
- authorization expiry validation
- authorization revocation
- authorization audit trail
- actual patch branch proposal after scoped validation
- semantic breaking-change detection
- mature risk scoring
- enterprise-scale validation
- real OpenRewrite integration
- external independent review beyond reproducibility checks
- private core validation

v0.8 addresses the question of whether forbidden authority promotions are reachable across the bounded public PetClinic governance path by adding a readout-only Boundary-Soundness reachability harness.

Remaining after v0.8:

- formal verification beyond the bounded public graph
- BPMN/DMN engine integration
- runtime enforcement
- real human authorization workflow
- cryptographic receipt signatures
- authorization expiry validation
- authorization revocation
- authorization audit trail
- actual patch branch proposal after scoped validation
- semantic breaking-change detection
- mature risk scoring
- enterprise-scale validation
- real OpenRewrite integration
- external independent review beyond reproducibility checks
- private core validation

These gaps are not failures of the harness. They are explicit boundaries for future evidence work.

v0.8.1 records the correction of v0.8 review findings: unauthorized PR creation is forbidden, authorized draft PR readout-only is modeled separately, invariants are derived from reachable states, candidate-specific terminals are evaluated, and v0.5/v0.6/v0.7 inputs are loaded and verified.

Remaining after v0.8.1:

- external critique of boundary-soundness model
- formal model review
- allowed terminal taxonomy review
- authorized-vs-unauthorized action taxonomy review
- semantic breaking-change detection
- mature risk scoring
- runtime enforcement
- private core validation
