import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";

export function readGitObjectBytes(repoRoot: string, commit: string, path: string): Buffer {
  return execFileSync("git", ["-C", repoRoot, "show", `${commit}:${path}`], {
    encoding: "buffer",
    maxBuffer: 1024 * 1024 * 20,
    stdio: ["ignore", "pipe", "pipe"]
  });
}

export function hashGitObjectEvidence(repoRoot: string, commit: string, path: string): string {
  return createHash("sha256").update(readGitObjectBytes(repoRoot, commit, path)).digest("hex");
}
