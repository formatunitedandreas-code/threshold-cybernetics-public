# Hash Provenance Policy

v0.4.1 computes evidence SHA-256 hashes from Git object bytes for the target commit.

Target repository:

- `spring-petclinic/spring-framework-petclinic`
- commit: `bdbaa5e671dfd9acb5c5814f5ac6d2408107e39a`

Hash source of truth:

```bash
git -C <target_repo> show <target_commit>:<path> | sha256sum
```

This avoids platform-dependent working-tree line-ending conversion such as CRLF normalization on Windows checkouts.

The published hashes are intended to be reproducible against the public Git source bytes, not against an unspecified local working-tree representation.

No source file contents are published in this repository.
