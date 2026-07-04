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
- v0.6 adds a public non-authorizing mapping from risk tiers to required review lanes, but it does not validate actual human authorization receipts or scope matching.
- v0.7 adds synthetic receipt scope validation, but it does not implement a real human authorization workflow, cryptographic signatures, expiry validation, revocation, audit trails, or patch branch proposal authority.
- v0.8 adds bounded Boundary-Soundness reachability checks, but it does not provide BPMN/DMN engine soundness, formal verification beyond the public graph, runtime enforcement, or compliance proof.
- Remaining gaps include formal verification beyond the bounded public graph, BPMN/DMN integration, runtime enforcement, real human authorization workflow, cryptographic receipt signatures, authorization expiry validation, authorization revocation, authorization audit trail, actual patch branch proposal after scoped validation, semantic breaking-change detection, risk scoring maturity, enterprise-scale candidate detection, false-positive reduction, real OpenRewrite integration, external independent review, and private core validation.

- v0.8.0 initially modeled `pr_created` too broadly as a forbidden marking, even though the full PetClinic history includes a human-authorized draft PR path for DEP-001.
- v0.8.0 initially had risk of false-pass because several invariants were not sufficiently derived from graph reachability.
- v0.8.0 initially defined candidate-specific terminal expectations more strongly than it evaluated them.
- v0.8.0 initially described an input chain that was not sufficiently coupled to v0.5/v0.6/v0.7 artifacts.
