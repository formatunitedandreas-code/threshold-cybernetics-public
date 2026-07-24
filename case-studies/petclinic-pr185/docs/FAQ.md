# FAQ

## Is this just over-engineering for four files?

It is intentionally high-control because the case study is about authority boundaries, not file count.

## Why did the system require multiple human decisions?

Publication, Ready transition, review resolution, and merge are different effects. Each needed its own bounded authority.

## Why are failed merge attempts considered useful evidence?

They show that failure did not expand authority or trigger an automatic fallback.

## Did Windows elevation grant GitHub permission?

No. Windows elevation only changed local execution context. GitHub permission still depended on the authenticated GitHub principal.

## Could the agent access credentials?

This public case does not publish credentials or credential traces. The allowed admission checked identity and permissions without printing secrets.

## Could the agent retry automatically?

No. Each failed merge attempt consumed its one-shot authority and required a new human decision.

## Is this production-ready?

No. It is an engineering case study.

## Can this run multiple product cycles?

No finite batch grant was activated in this case.

## What evidence is public?

Public PR metadata, commit SHAs, changed paths, workflow conclusions, review metadata, merge method, and merge result SHA.

## Why are the raw receipts private?

Raw receipts can contain local context, decision details, and operational structure that should not become public authority material.
