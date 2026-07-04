# How to Reproduce

Run the public harnesses from the repository root.

```bash
cd boundary-soundness
npm ci
npm test
```

```bash
cd authorization-receipts
npm ci
npm test
```

```bash
cd policy-mapping
npm ci
npm test
```

```bash
cd risk-gradation
npm ci
npm test
```

The release-action receipt validator v0.1 currently lives in the private repository and is disclosed here as self-governance status. It is available as a validator but is not mandatory for git, gh, hooks, CI, tags, releases, or Codex runtime tool calls.
