# State Machine

```mermaid
stateDiagram-v2
    [*] --> Observed
    Observed --> LocallyValidated: evidence collected
    LocallyValidated --> Published: publication authorized and executed
    Published --> Reviewed: review observed
    Reviewed --> RemediationRequired: finding opened
    RemediationRequired --> LocallyValidated: code remediation
    Reviewed --> ReadyEligible: checks and review evidence pass
    ReadyEligible --> Ready: ready permit executed
    Ready --> MergeBlocked: review blocker observed
    MergeBlocked --> RemediationRequired: remediation decision
    Ready --> MergeEligible: thread resolved and checks green
    MergeEligible --> MergeAttempted: merge permit claimed
    MergeAttempted --> Stopped: request failed without mutation
    Stopped --> MergeEligible: new human decision and revalidation
    MergeAttempted --> Merged: exact squash merge
    Merged --> Reconciled: main head matches merge result
    Reconciled --> [*]
```

Observed, eligible, authorized, executed, reconciled, and stopped are distinct states. Eligibility did not execute an effect, and an executed failed request did not authorize a fallback.

