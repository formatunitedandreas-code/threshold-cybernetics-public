# Accepted Criticism

- Public material did not yet include reproducible code.
- Receipts were described but not visible.
- No third-party verification exists.
- Private core remains private.
- Risk engine maturity is not proven.
- Toolchain integration is only partially demonstrated.
- Candidate identifiers were previously visible mostly as labels, not as outputs derived from public fixture surfaces.
- v0.4 reduces, but does not eliminate, the criticism that candidate detection had only been tested on synthetic fixtures.
- v0.4.0 published SHA-256 hashes were not externally reproducible against Git object bytes for 19 of 20 evidence items due to line-ending normalization.
- The v0.4.0 RCA confirms that working-tree hash provenance was line-ending sensitive and should not be used for public provenance.
- Previous risk hints were static per rule and did not provide a reproducible review-priority gradation.
- Remaining gaps include semantic breaking-change detection, risk scoring maturity, enterprise-scale candidate detection, false-positive reduction, real OpenRewrite integration, external independent review, and private core validation.
