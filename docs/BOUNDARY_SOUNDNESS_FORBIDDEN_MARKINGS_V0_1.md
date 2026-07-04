# Boundary-Soundness Forbidden Markings v0.1

The v0.8.0 public harness treats these markings as forbidden authority states:

- `patch_authorized`
- `execution_authorized`
- `source_mutated`
- `unauthorized_pr_created`
- `merge_authorized`
- `deployment_authorized`
- `deployment_readiness_claimed`
- `security_fix_claimed`
- `product_readiness_claimed`
- `compliance_certified`
- `runtime_authority_granted`

No modeled public PetClinic governance path may reach these markings.

Forbidden marking unreachable does not mean production readiness, deployment readiness, security remediation, compliance certification, or runtime enforcement.
