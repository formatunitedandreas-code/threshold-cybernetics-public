# Response 001

v0.2.0 does not publish the private core.

v0.2.0 adds a minimal public harness.

v0.2.0 adds sample decision envelopes.

v0.2.0 adds CI checks.

v0.2.0 still does not claim product readiness.

v0.3.0 addresses the criticism that candidates were previously labels only by adding a minimal public candidate-detection harness over synthetic open fixtures.

v0.4.0 addresses the criticism that candidate detection had only been tested on synthetic fixtures by adding a read-only run against a real open-source repository checkout.

v0.4.1 repairs the v0.4.0 hash provenance issue by using Git-object-byte hashing and CI verification.

The v0.4.0 hash provenance RCA classifies the cause as confirmed line-ending normalization: all v0.4.0 published hashes matched CRLF-normalized Git bytes, while v0.4.1 hashes matched Git object bytes.

v0.5 addresses the criticism that previous risk hints were static by adding bounded rule-based risk-hint tiers over Git-byte-verified candidate/evidence summaries.

v0.6 addresses the question of how bounded risk tiers translate into review requirements by adding a non-authorizing policy-as-code mapping layer.

The response is intentionally bounded: public evidence improves reproducibility, but it does not establish enterprise validation, full toolchain integration, security remediation, compliance certification, deployment readiness, autonomous refactoring capability, or runtime authority.
