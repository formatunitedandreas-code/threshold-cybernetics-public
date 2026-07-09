#!/usr/bin/env node
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const artifactPath = process.argv[2] ?? "artifacts/boundary-receipts/PETCLINIC_PR281_BOUNDARY_ATTESTATION_V0_1.json";
const expectedFileSha256 = process.argv[3];

function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function sha256(text) {
  return createHash("sha256").update(text).digest("hex");
}

function fail(reason, details = {}) {
  console.log(JSON.stringify({ valid: false, reason, ...details }, null, 2));
  process.exit(1);
}

const absolutePath = resolve(artifactPath);
const raw = readFileSync(absolutePath, "utf8");
const fileSha256 = sha256(raw);
const artifact = JSON.parse(raw);
const payloadForHash = { ...artifact, artifact_payload_sha256: "TO_BE_FILLED" };
const deterministicPayloadSha256 = sha256(stableStringify(payloadForHash));

const requiredSourceRefs = [
  "README.md#petclinic-boundary-attestation-case",
  "real-repo-runs/petclinic-owned-refactor-slice-01-local-baseline-v0-10-0/README.md",
  "real-repo-runs/petclinic-owned-refactor-slice-01-local-baseline-v0-10-0/non-claims.md",
  "real-repo-runs/petclinic-owned-refactor-slice-01-local-baseline-v0-10-0/validator-readout.public-safe.json",
  "public-release-candidates/v0.10.0/RELEASE_CANDIDATE.md",
  "RELEASE_NOTES_V0_10_0.md"
];

const requiredNonClaims = [
  "Boundary Attestation != PetClinic Refactor Success",
  "Boundary Attestation != Security Fix",
  "Boundary Attestation != Correctness Guarantee",
  "Boundary Attestation != Compliance Certification",
  "Boundary Attestation != Production Readiness",
  "Boundary Attestation != Deployment Readiness",
  "Boundary Attestation != Runtime Authority",
  "Boundary Attestation != Maintainer Approval",
  "Boundary Attestation != Merge Authorization",
  "Boundary Attestation != PR Approval",
  "Boundary Attestation != Active Blocking Enforcement",
  "Boundary Attestation != Hook Installation",
  "Boundary Attestation != CI Enforcement",
  "Boundary Attestation != Branch Protection",
  "Quiet Reference Case != PR #281 Action",
  "Public Readout != PetClinic Upstream Mutation"
];

if (expectedFileSha256 && expectedFileSha256 !== fileSha256) {
  fail("artifact_file_sha256_mismatch", { expectedFileSha256, fileSha256 });
}

if (artifact.schema_version !== "boundary_attestation_public_case_v0.1") {
  fail("schema_version_mismatch", { schema_version: artifact.schema_version });
}

if (artifact.case_id !== "petclinic_pr281_boundary_attestation_v0_1") {
  fail("case_id_mismatch", { case_id: artifact.case_id });
}

if (artifact.status !== "public_safe_non_authorizing_readout") {
  fail("status_mismatch", { status: artifact.status });
}

for (const sourceRef of requiredSourceRefs) {
  if (!artifact.source_refs?.includes(sourceRef)) fail("missing_required_source_ref", { sourceRef });
}

for (const [flag, value] of Object.entries(artifact.authority_flags ?? {})) {
  if (value !== false) fail("authority_flag_not_false", { flag, value });
}

if (artifact.reference_case?.external_mutation_performed !== false) fail("external_mutation_flag_not_false");
if (artifact.reference_case?.pr_action_performed !== false) fail("pr_action_flag_not_false");
if (artifact.decision_before_action?.external_action_authorized !== false) fail("external_action_authorized_not_false");

for (const nonClaim of requiredNonClaims) {
  if (!artifact.non_claims?.includes(nonClaim)) fail("missing_required_non_claim", { nonClaim });
}

if (artifact.signature_placeholder?.signature_present !== false) fail("signature_placeholder_not_explicitly_unsigned");

if (artifact.artifact_payload_sha256 !== deterministicPayloadSha256) {
  fail("deterministic_payload_sha256_mismatch", {
    expected: artifact.artifact_payload_sha256,
    actual: deterministicPayloadSha256
  });
}

console.log(JSON.stringify({
  valid: true,
  artifactPath,
  fileSha256,
  deterministicPayloadSha256,
  requiredSourceRefsPresent: true,
  fixedFieldsPresent: true,
  authorityFlagsFalse: true,
  explicitNonClaimsPresent: true,
  petclinicMutationActionFlagsFalse: true,
  signaturePlaceholderAccepted: true,
  nonAuthorizing: true
}, null, 2));
