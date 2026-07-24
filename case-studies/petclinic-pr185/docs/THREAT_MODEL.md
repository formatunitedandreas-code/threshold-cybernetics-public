# Threat Model

| threat | status | control | remainingRisk | evidence |
| --- | --- | --- | --- | --- |
| head drift | mitigated | exact head SHA binding | concurrent mutation can still require stop | PR head checks |
| base drift | mitigated | exact base SHA binding | new main requires new decision | main reconciliation |
| check-name collision | partially_mitigated | required named contexts observed | GitHub app identity was not deeply modeled publicly | check observations |
| missing required checks | mitigated | fail closed on missing checks | branch policy may change later | required checks list |
| receipt replay | partially_mitigated | public examples are non-authorizing | raw private receipts remain private | redaction policy |
| permit replay | mitigated | one-shot decisions consumed after request | public examples could be misunderstood | non-authorizing examples |
| double merge request | mitigated | maximum request count equals one | operator could create new decision | stop receipts |
| governance self-modification | partially_mitigated | separate governance lane and review | this was a governance PR | PR #185 history |
| product/governance lane mixing | mitigated | changed path set limited to governance paths | future PRs need the same check | changed files |
| stale candidate cache | open | not exercised in this governance case | product multibatch not active | limitations |
| credential-context mismatch | mitigated | identity and permission admission before final merge | credential internals are not public | authenticated merge summary |
| Windows privilege without GitHub authority | mitigated | Windows elevation did not imply GitHub permission | local environment details remain private | REST 401 and final admission |
| GitHub authority without human grant | mitigated | human decision required before merge request | future processes need the same discipline | decision summaries |
| merge succeeds but reconciliation is interrupted | partially_mitigated | post-merge main observation | network outage could delay observation | merge reconciliation |
| concurrent operators | partially_mitigated | exact head/base checks | public case does not prove broad concurrency safety | pre-merge observation |
| PR mutation after readiness | mitigated | fresh revalidation after publication and review resolution | future mutation requires recheck | final rereview |
| public evidence tampering | partially_mitigated | public manifest and validation scripts | no signed public attestation here | manifest validation |
| sanitized example mistaken for authority | partially_mitigated | examples mark nonAuthorizing and replayable=false | readers may still misread examples | disclosure validator |
