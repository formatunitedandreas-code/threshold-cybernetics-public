# Risk Hint Gradation Harness

This public harness assigns bounded, non-authorizing review-priority tiers to candidate summaries generated from v0.4.1 Git-object-byte verified evidence.

It does not implement mature risk scoring, semantic breaking-change detection, security review, patch approval, PR approval, deployment readiness, product readiness, autonomous refactoring, compliance certification, or runtime authority.

## Run

```bash
npm ci
npm test
npm run produce-risk-gradation -- --candidate-summary ../real-repo-runs/spring-framework-petclinic-v0-4-1/detected-candidates.summary.json --evidence-index ../real-repo-runs/spring-framework-petclinic-v0-4-1/evidence-index.git-byte-hashes.public-safe.json --out ../real-repo-runs/spring-framework-petclinic-v0-5/risk-gradation.public-safe.json
```

## Boundary

Risk Hint Gradation != Mature Risk Scoring
Risk Tier != Semantic Breaking-Change Detection
Risk Tier != Execution Authorization
Risk Tier != Patch Approval
Risk Tier != Security Finding
Risk Tier != Deployment Readiness
