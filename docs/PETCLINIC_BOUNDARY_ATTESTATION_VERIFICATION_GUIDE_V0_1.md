# PetClinic Boundary Attestation Verification Guide v0.1

Status: public-safe verification guide, non-authorizing.

## Artifact Path

`artifacts/boundary-receipts/PETCLINIC_PR281_BOUNDARY_ATTESTATION_V0_1.json`

## Expected SHA-256

Artifact file SHA-256:

```text
a8045b21bc9fa54dc5f8d0e67d88eb159a044e186846592580563c0bd4dba881
```

Deterministic payload SHA-256:

```text
f19e7bce9a04b657d95d208af5c65e16bea9f94c475eb29d3c88cfed8f36eb9e
```

## Manual Verification Steps

1. Recompute the artifact file SHA-256.
2. Compare it with the expected artifact file SHA-256 above.
3. Open the artifact and confirm `schema_version` is `boundary_attestation_public_case_v0.1`.
4. Confirm `case_id` is `petclinic_pr281_boundary_attestation_v0_1`.
5. Confirm `status` is `public_safe_non_authorizing_readout`.
6. Confirm required `source_refs` are present.
7. Confirm every `authority_flags` value is `false`.
8. Confirm `petclinic_upstream_mutation_performed` and `pr281_action_performed` are `false`.
9. Confirm explicit non-claims are present.
10. Confirm the signature placeholder is explicit and unsigned.

## Verifier Command

```bash
node scripts/verify-boundary-attestation.mjs artifacts/boundary-receipts/PETCLINIC_PR281_BOUNDARY_ATTESTATION_V0_1.json a8045b21bc9fa54dc5f8d0e67d88eb159a044e186846592580563c0bd4dba881
```

## Expected Output Fields

- `valid`
- `artifactPath`
- `fileSha256`
- `deterministicPayloadSha256`
- `requiredSourceRefsPresent`
- `fixedFieldsPresent`
- `authorityFlagsFalse`
- `explicitNonClaimsPresent`
- `petclinicMutationActionFlagsFalse`
- `signaturePlaceholderAccepted`
- `nonAuthorizing`

## Failure Conditions

Verification fails if:

- the artifact file hash differs from the expected hash
- required source refs are missing
- fixed fields differ from the expected public-safe values
- deterministic payload hash differs from the embedded payload hash
- any authority flag is not `false`
- PetClinic mutation or PR action flags are not `false`
- required non-claims are missing
- the signature placeholder claims a real signature

## Non-Claims

- Verification Guide != PetClinic Refactor Success
- Verification Guide != Security Fix
- Verification Guide != Correctness Guarantee
- Verification Guide != Compliance Certification
- Verification Guide != Production Readiness
- Verification Guide != Deployment Readiness
- Verification Guide != Runtime Authority
- Verification Guide != Maintainer Approval
- Verification Guide != Merge Authorization
- Verification Guide != PR Approval
- Verification Guide != Active Blocking Enforcement
- Verification Guide != Hook Installation
- Verification Guide != CI Enforcement
- Verification Guide != Branch Protection
