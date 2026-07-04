import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { readGitObjectBytes } from "../src/hashGitObjectEvidence";

interface Args {
  targetRepo?: string;
  targetCommit?: string;
  v040Index?: string;
  v041Index?: string;
  out?: string;
}

interface EvidenceItem {
  path: string;
  file_type: string;
  sha256: string;
  candidate_links: string[];
}

interface EvidenceIndex {
  evidence_items: EvidenceItem[];
}

function parseArgs(argv: string[]): Args {
  const args: Args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    const value = argv[index + 1];

    if (key === "--target-repo") {
      args.targetRepo = value;
      index += 1;
    } else if (key === "--target-commit") {
      args.targetCommit = value;
      index += 1;
    } else if (key === "--v0-4-index") {
      args.v040Index = value;
      index += 1;
    } else if (key === "--v0-4-1-index") {
      args.v041Index = value;
      index += 1;
    } else if (key === "--out") {
      args.out = value;
      index += 1;
    }
  }

  return args;
}

function sha256(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function normalizeToCrlf(bytes: Buffer): Buffer {
  const text = bytes.toString("utf8").replace(/\r\n/g, "\n").replace(/\n/g, "\r\n");
  return Buffer.from(text, "utf8");
}

function classifyLineEndings(bytes: Buffer): "lf" | "crlf" | "mixed" | "none" | "unknown" {
  const text = bytes.toString("utf8");
  const crlfCount = (text.match(/\r\n/g) ?? []).length;
  const lfCount = (text.replace(/\r\n/g, "").match(/\n/g) ?? []).length;

  if (crlfCount === 0 && lfCount === 0) {
    return "none";
  }

  if (crlfCount > 0 && lfCount > 0) {
    return "mixed";
  }

  if (crlfCount > 0) {
    return "crlf";
  }

  if (lfCount > 0) {
    return "lf";
  }

  return "unknown";
}

const args = parseArgs(process.argv.slice(2));

if (!args.targetRepo || !args.targetCommit || !args.v040Index || !args.v041Index || !args.out) {
  throw new Error(
    "Usage: npm run analyze-v0-4-hash-root-cause -- --target-repo <repo> --target-commit <sha> --v0-4-index <json> --v0-4-1-index <json> --out <json>"
  );
}

const v040 = JSON.parse(readFileSync(args.v040Index, "utf8")) as EvidenceIndex;
const v041 = JSON.parse(readFileSync(args.v041Index, "utf8")) as EvidenceIndex;
const v041ByPath = new Map(v041.evidence_items.map((item) => [item.path, item]));

const items = v040.evidence_items.map((item) => {
  const gitBytes = readGitObjectBytes(args.targetRepo!, args.targetCommit!, item.path);
  const gitObjectByteSha256 = sha256(gitBytes);
  const crlfNormalizedGitByteSha256 = sha256(normalizeToCrlf(gitBytes));
  const workingTreeSha256 = sha256(readFileSync(join(args.targetRepo!, item.path)));
  const v041Item = v041ByPath.get(item.path);

  return {
    path: item.path,
    file_type: item.file_type,
    candidate_links: item.candidate_links,
    line_ending_class_from_git_bytes: classifyLineEndings(gitBytes),
    v0_4_0_published_hash: item.sha256,
    git_object_byte_sha256: gitObjectByteSha256,
    crlf_normalized_git_byte_sha256: crlfNormalizedGitByteSha256,
    working_tree_sha256: workingTreeSha256,
    v0_4_1_corrected_hash: v041Item?.sha256 ?? null,
    matches_git_object_bytes: item.sha256 === gitObjectByteSha256,
    matches_crlf_normalized_git_bytes: item.sha256 === crlfNormalizedGitByteSha256,
    matches_working_tree_bytes: item.sha256 === workingTreeSha256,
    matches_v0_4_1_corrected_hash: v041Item?.sha256 === gitObjectByteSha256
  };
});

const v040GitByteMatches = items.filter((item) => item.matches_git_object_bytes).length;
const crlfMatches = items.filter((item) => item.matches_crlf_normalized_git_bytes).length;
const v041GitByteMatches = items.filter((item) => item.matches_v0_4_1_corrected_hash).length;
const mismatches = items.length - v040GitByteMatches;
const crlfFileExplainsOriginalMatch = items.some(
  (item) => item.matches_git_object_bytes && item.line_ending_class_from_git_bytes === "crlf"
);

const rootCauseClassification =
  mismatches > 0 &&
  crlfMatches === items.length &&
  v041GitByteMatches === items.length &&
  crlfFileExplainsOriginalMatch
    ? "confirmed_line_ending_normalization"
    : crlfMatches >= Math.max(1, Math.floor(items.length * 0.75)) && v041GitByteMatches === items.length
      ? "likely_line_ending_normalization"
      : "inconclusive";

const output = {
  analysis_id: "v0_4_0_hash_provenance_root_cause_v0_1",
  target_repo: "spring-petclinic/spring-framework-petclinic",
  target_commit: args.targetCommit,
  root_cause_classification: rootCauseClassification,
  summary: {
    evidence_items_analyzed: items.length,
    v0_4_0_git_byte_matches: v040GitByteMatches,
    v0_4_0_git_byte_mismatches: mismatches,
    crlf_normalized_matches: crlfMatches,
    working_tree_matches: items.filter((item) => item.matches_working_tree_bytes).length,
    v0_4_1_git_byte_matches: v041GitByteMatches,
    crlf_file_explains_original_match: crlfFileExplainsOriginalMatch
  },
  non_claims: {
    root_cause_analysis_is_not_new_repair: true,
    hash_cause_finding_is_not_semantic_validation: true,
    hash_match_is_not_evidence_sufficiency: true,
    path_hash_evidence_is_not_source_publication: true
  },
  items
};

writeFileSync(args.out, `${JSON.stringify(output, null, 2)}\n`);

console.log(
  `classification=${rootCauseClassification} analyzed=${items.length} git_byte_matches=${v040GitByteMatches} crlf_matches=${crlfMatches} v0_4_1_git_byte_matches=${v041GitByteMatches}`
);
