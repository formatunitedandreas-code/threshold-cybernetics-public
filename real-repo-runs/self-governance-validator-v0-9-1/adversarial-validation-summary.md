# Adversarial Validation Summary

The v0.9.1 public validator harness includes adversarial tests for:

- missing receipt
- wrong release tag
- broad scope
- planned action not allowed
- forbidden action present
- file outside allowlist
- empty file allowlist with planned files
- product-readiness claim
- deployment-readiness claim
- security-fix claim
- compliance-certification claim
- runtime-authority claim
- non-authorizing output invariants

All adversarial cases are expected to fail closed.
