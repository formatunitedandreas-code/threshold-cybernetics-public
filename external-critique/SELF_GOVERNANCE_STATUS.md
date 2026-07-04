# Self-Governance Status

Current status:

- v0.9.1 adds a public reproducible Release Action Receipt Validator harness.
- Before v0.9.1, the validator was reported from the private repo but was not publicly reproducible.
- The public v0.9.1 harness validates release tag, allowed actions, file allowlist, forbidden actions and forbidden claims.
- It is not yet a mandatory git wrapper.
- It is not yet a mandatory gh wrapper.
- It is not yet a pre-commit/pre-push hook.
- It is not Codex runtime tool interception.
- Current maturity: L2 validator available, not mandatory.

Next intended steps:

1. staged file allowlist validator
2. claim scan validator
3. CI required check
4. git/gh wrapper or local hooks
5. only later: runtime/tool-level enforcement exploration
