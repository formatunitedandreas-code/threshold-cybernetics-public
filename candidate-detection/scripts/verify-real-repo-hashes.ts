import { readFileSync } from "node:fs";
import { hashGitObjectEvidence } from "../src/hashGitObjectEvidence";

interface EvidenceItem {
  path: string;
  sha256: string;
}

interface EvidenceIndex {
  target_commit: string;
  evidence_items: EvidenceItem[];
}

interface Args {
  repo?: string;
  commit?: string;
  index?: string;
}

export interface VerificationResult {
  path: string;
  expected: string;
  actual: string;
  match: boolean;
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
    } else if (key === "--index") {
      args.index = value;
      index += 1;
    }
  }

  return args;
}

export function verifyEvidenceIndex(repoRoot: string, commit: string, indexPath: string): VerificationResult[] {
  const index = JSON.parse(readFileSync(indexPath, "utf8")) as EvidenceIndex;
  const effectiveCommit = commit || index.target_commit;

  return index.evidence_items.map((item) => {
    const actual = hashGitObjectEvidence(repoRoot, effectiveCommit, item.path);
    return {
      path: item.path,
      expected: item.sha256,
      actual,
      match: actual === item.sha256
    };
  });
}

if (process.argv[1]?.replaceAll("\\", "/").endsWith("verify-real-repo-hashes.ts")) {
  const args = parseArgs(process.argv.slice(2));

  if (!args.repo || !args.commit || !args.index) {
    throw new Error("Usage: npm run verify-real-repo-hashes -- --repo <external_repo_path> --commit <sha> --index <evidence-index>");
  }

  const results = verifyEvidenceIndex(args.repo, args.commit, args.index);
  for (const result of results) {
    console.log(`${result.path}\texpected=${result.expected}\tactual=${result.actual}\tmatch=${result.match}`);
  }

  if (results.some((result) => !result.match)) {
    process.exitCode = 1;
  }
}
