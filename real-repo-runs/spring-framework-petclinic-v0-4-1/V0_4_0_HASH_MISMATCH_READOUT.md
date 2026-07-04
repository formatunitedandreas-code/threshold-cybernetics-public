# v0.4.0 Hash Mismatch Readout

An external verification reproduced the v0.4.0 candidate detection run but found that 19 of 20 published SHA-256 evidence hashes did not match the public Git source bytes at the target commit.

Observed cause:

- published v0.4.0 hashes matched a CRLF-normalized representation for most files
- public Git source bytes use LF for most files
- one file matched because it already used CRLF line endings

Impact:

- candidate path detection remains reproducible
- target commit and evidence paths remain valid
- v0.4.0 hash provenance is not externally reproducible against Git object bytes
- v0.4.0 is superseded for hash provenance by v0.4.1

This readout does not claim bad faith. It records an environment/provenance bug and repairs the hash policy.
