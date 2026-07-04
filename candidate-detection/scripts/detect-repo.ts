import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { detectCandidates } from "../src/detectCandidates";
import type { DetectedCandidate } from "../src/candidateTypes";

interface Args {
  repo?: string;
  caseName?: string;
  outDir?: string;
  targetCommit?: string;
}

function parseArgs(argv: string[]): Args {
  const args: Args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    const value = argv[index + 1];

    if (key === "--repo") {
      args.repo = value;
      index += 1;
    } else if (key === "--case") {
      args.caseName = value;
      index += 1;
    } else if (key === "--out-dir") {
      args.outDir = value;
      index += 1;
    } else if (key === "--target-commit") {
      args.targetCommit = value;
      index += 1;
    } else if (key === "--commit") {
      args.targetCommit = value;
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

function summarizeCandidates(candidates: DetectedCandidate[], targetRepo: string, targetCommit: string): object {
  return {
    target_repo: "spring-petclinic/spring-framework-petclinic",
    target_commit: targetCommit,
    detected_candidates: candidates.map((candidate) => ({
      candidate_id: candidate.candidate_id,
      candidate_type: candidate.candidate_type,
      detected: true,
      evidence_paths: candidate.detected_from,
      evidence_hashes_present: candidate.evidence_sources.every((source) => source.sha256.length === 64),
      risk_hints: candidate.risk_hints,
      non_claims: [
        "candidate detection is not patch approval",
        "candidate detection is not security fix",
        "candidate detection is not deployment readiness"
      ]
    })),
    aggregate_counts: {
      candidate_count: candidates.length,
      evidence_item_count: candidates.reduce((total, candidate) => total + candidate.evidence_sources.length, 0)
    },
    run_input_path_recorded_as: targetRepo,
    patches_created: 0,
    prs_created: 0,
    source_mutated: false
  };
}

function evidenceIndex(candidates: DetectedCandidate[], targetCommit: string): object {
  const evidence = new Map<string, { path: string; file_type: string; sha256: string; content_published: false; candidate_links: string[] }>();

  for (const candidate of candidates) {
    for (const source of candidate.evidence_sources) {
      const existing = evidence.get(source.path);
      if (existing) {
        existing.candidate_links.push(candidate.candidate_id);
      } else {
        evidence.set(source.path, {
          path: source.path,
          file_type: fileType(source.path),
          sha256: source.sha256,
          content_published: false,
          candidate_links: [candidate.candidate_id]
        });
      }
    }
  }

  return {
    target_commit: targetCommit,
    evidence_items: [...evidence.values()].sort((left, right) => left.path.localeCompare(right.path))
  };
}

const args = parseArgs(process.argv.slice(2));

if (!args.repo || !args.caseName) {
  throw new Error("Usage: npm run detect -- --repo <external_repo_path> --case <case_name> [--out-dir <dir>] [--commit <sha>]");
}

if (!existsSync(args.repo)) {
  throw new Error(`Repository path does not exist: ${args.repo}`);
}

const outDir = args.outDir ?? join("..", "real-repo-runs", args.caseName);
const targetCommit = args.targetCommit ?? "unknown";
const candidates = detectCandidates(args.repo, args.caseName);
mkdirSync(outDir, { recursive: true });

writeFileSync(
  join(outDir, "detected-candidates.summary.json"),
  `${JSON.stringify(summarizeCandidates(candidates, relative(process.cwd(), args.repo).replaceAll("\\", "/"), targetCommit), null, 2)}\n`
);
writeFileSync(join(outDir, "evidence-index.public-safe.json"), `${JSON.stringify(evidenceIndex(candidates, targetCommit), null, 2)}\n`);

console.log(`detected ${candidates.length} candidate classes for ${args.caseName}`);
