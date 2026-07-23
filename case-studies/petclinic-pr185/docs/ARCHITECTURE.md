# Architecture

## Terms

- Capability: what the agent and tools can technically do.
- Evidence: observations, checks, public metadata, and sanitized receipts used to evaluate a state.
- Human Decision: explicit authorization from a person for a bounded next step.
- Grant: a bounded authority envelope.
- Permit: a one-shot allowance for a specific effect.
- Effect: a mutation or remote action, such as Ready, reply, push, or merge.
- Receipt: a record of what was observed and what happened.
- Reconciliation: post-effect observation that the remote state matches the intended result.
- Terminal State: the state where the current authority ends.

## Admission rule

```text
Capability
AND Context
AND Grant
AND Effect Profile
AND Budget
AND Preconditions
-> Admission
```

## Boundaries

- Capability != Authority
- Green CI != Merge Authority
- Receipt != Grant
- Ready != Merge
- Windows privilege != GitHub permission
- One-shot success != batch authority

## Lanes

Product Lane: product source and product tests.

Governance Lane: workflow rules, metadata envelope validation, and public-safe governance controls.

GitHub Effect Boundary: PR state, review threads, checks, and merge endpoint.

Windows Execution Boundary: local process identity and access to an existing GitHub CLI authentication context.

Human Authority Boundary: each effect required explicit human authorization.
