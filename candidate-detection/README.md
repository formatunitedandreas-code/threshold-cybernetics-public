# Public Candidate Detection Harness

This harness demonstrates minimal candidate derivation from synthetic, public-safe fixture surfaces.

It does not publish the private Threshold Cybernetics core. It does not execute patches, commits, pull requests, merges, dependency updates, security remediation, deployment readiness, product readiness, compliance certification, autonomous refactoring, or runtime authority.

## Run

```bash
npm install
npm test
npm run produce-candidate-ledger
```

## Read-Only External Repo Run

v0.4.0 adds a bounded external repository input path:

```bash
npm run detect -- --repo C:/dev/external-fixtures/spring-framework-petclinic --case spring-framework-petclinic
```

The command reads the target repository and writes only public-safe path/hash/category summaries. It does not copy target source files, publish source snippets, mutate the target repository, create patches, create PRs, or claim security remediation, deployment readiness, product readiness, compliance certification, autonomous refactoring, or runtime authority.

## Demonstrated Candidate Classes

- `DEP-001` from dependency/plugin surfaces in `pom.xml`
- `CFG-001` from Spring XML configuration surfaces
- `JSP-001` from JSP + Controller surfaces

Candidate Detection != Patch Approval.
Evidence Binding != Evidence Sufficiency.
Risk Hint != Risk Score.
