import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { DetectedCandidate } from "../src/candidateTypes";
import { detectCandidates } from "../src/detectCandidates";
import { hashGitObjectEvidence } from "../src/hashGitObjectEvidence";

interface Args {
  repo?: string;
  commit?: string;
  outDir?: string;
}

function parseArgs(argv: string[]): Args {
  const args: Args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    const value = argv[index + 1];

    if (key === "--repo") {
      args.repo = value;
      index += 1;
    } else if (key === "--commit") {
      args.commit = value;
      index += 1;
    } else if (key === "--out-dir") {
      args.outDir = value;
      index += 1;
    }
  }

  return args;
}

function fileType(path: string): string {
  if (path === "pom.xml") {
    return "maven_pom";
  }

  if (path.endsWith(".jsp")) {
    return "jsp";
  }

  if (path.endsWith(".java")) {
    return "java_controller";
  }

  if (path.endsWith(".xml")) {
    return "spring_xml";
  }

  return "other";
}

function correctedEvidenceIndex(repoRoot: string, commit: string, candidates: DetectedCandidate[]): object {
  const evidence = new Map<
    string,
    {
      path: string;
      file_type: string;
      sha256: string;
      hash_command_equivalent: string;
      content_published: false;
      candidate_links: string[];
    }
  >();

  for (const candidate of candidates) {
    for (const path of candidate.detected_from) {
      const existing = evidence.get(path);
      if (existing) {
        existing.candidate_links.push(candidate.candidate_id);
      } else {
        evidence.set(path, {
          path,
          file_type: fileType(path),
          sha256: hashGitObjectEvidence(repoRoot, commit, path),
          hash_command_equivalent: "git show <target_commit>:<path> | sha256sum",
          content_published: false,
          candidate_links: [candidate.candidate_id]
        });
      }
    }
  }

  return {
    hash_policy: "git_object_bytes_sha256",
    target_repo: "spring-petclinic/spring-framework-petclinic",
    target_commit: commit,
    evidence_items: [...evidence.values()].sort((left, right) => left.path.localeCompare(right.path))
  };
}

function correctedCandidateSummary(commit: string, candidates: DetectedCandidate[]): object {
  return {
    target_repo: "spring-petclinic/spring-framework-petclinic",
    target_commit: commit,
    hash_policy: "git_object_bytes_sha256",
    detected_candidates: candidates.map((candidate) => ({
      candidate_id: candidate.candidate_id,
      candidate_type: candidate.candidate_type,
      detected: true,
      evidence_paths: candidate.detected_from,
      evidence_hashes_present: true,
      risk_hints: candidate.risk_hints,
      non_claims: [
        "candidate detection is not patch approval",
        "git byte hash match is not evidence sufficiency",
        "candidate detection is not security fix",
        "candidate detection is not deployment readiness"
      ]
    })),
    aggregate_counts: {
      candidate_count: candidates.length,
      evidence_item_count: candidates.reduce((total, candidate) => total + candidate.detected_from.length, 0)
    },
    patches_created: 0,
    prs_created: 0,
    source_mutated: false
  };
}

const args = parseArgs(process.argv.slice(2));

if (!args.repo || !args.commit) {
  throw new Error("Usage: npm run produce-real-repo-evidence-index -- --repo <external_repo_path> --commit <sha> [--out-dir <dir>]");
}

if (!existsSync(args.repo)) {
  throw new Error(`Repository path does not exist: ${args.repo}`);
}

const outDir = args.outDir ?? join("..", "real-repo-runs", "spring-framework-petclinic-v0-4-1");
const candidates = detectCandidates(args.repo, "spring-framework-petclinic");
mkdirSync(outDir, { recursive: true });
writeFileSync(
  join(outDir, "evidence-index.git-byte-hashes.public-safe.json"),
  `${JSON.stringify(correctedEvidenceIndex(args.repo, args.commit, candidates), null, 2)}\n`
);
writeFileSync(join(outDir, "detected-candidates.summary.json"), `${JSON.stringify(correctedCandidateSummary(args.commit, candidates), null, 2)}\n`);

console.log(`produced git-object-byte evidence index for ${candidates.length} candidate classes`);
