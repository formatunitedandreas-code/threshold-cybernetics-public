# Spring Framework PetClinic v0.6 Policy Mapping Run

This directory contains the public-safe v0.6.0 policy-as-code authorization tier mapping run.

Input:

- `../spring-framework-petclinic-v0-5/risk-gradation.public-safe.json`

The run maps bounded risk-hint tiers to required review lanes only. It does not grant authorization, create patches, mutate source, create PRs, merge, deploy, claim security remediation, claim mature risk scoring, claim semantic breaking-change detection, or claim runtime authority.
