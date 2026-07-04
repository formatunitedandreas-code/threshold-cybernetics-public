# External Critique Brief

Threshold Cybernetics Public is looking for technical critique, not endorsement.

Please review:

1. v0.8.1 Boundary Soundness Correction Closeout
2. forbidden marking taxonomy
3. authorized vs unauthorized PR distinction
4. candidate-specific terminal expectations
5. graph-derived reachability invariants
6. v0.5/v0.6/v0.7 input-chain coupling
7. Codex/Threshold self-enforcement gap
8. Release Action Receipt Validator v0.1

Known boundary:

Before v0.9.1, the release-action receipt validator was reported from the private repo but was not publicly reproducible.

v0.9.1 adds a public reproducible Release Action Receipt Validator harness. It validates release tag, allowed actions, file allowlist, forbidden actions and forbidden claims.

The validator is still not mandatory for git/gh execution. There are no mandatory git/gh wrappers and no observed Codex runtime tool interception by Threshold policy.
