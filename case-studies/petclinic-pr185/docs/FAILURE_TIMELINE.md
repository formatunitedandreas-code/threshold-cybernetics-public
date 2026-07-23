# Failure Timeline

| event | trigger | authority before | effect requested | effect executed | repository mutation | fallback executed | terminal disposition | next required decision |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| metadata mismatch | byte-fragile PR metadata | publication not complete | publish canary evidence | false | false | false | stopped before remote effect | new publication package |
| review finding | inline review on governance validator | merge not authorized | none | false | false | false | remediation required | local remediation decision |
| CLI PR-resolution failure | GitHub CLI could not resolve PR for merge | one-shot merge permit | squash merge | false | false | false | stopped, permit consumed | new merge decision |
| REST HTTP 401 | REST merge request lacked effective authentication | one-shot REST merge permit | squash merge | false | false | false | stopped, permit consumed | authenticated merge decision |
| authenticated final merge | existing GitHub principal admitted | one-shot merge permit | squash merge | true | true | false | merged and reconciled | no active merge authority |

