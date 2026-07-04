import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { afterEach, describe, expect, it } from "vitest";
import { hashGitObjectEvidence } from "../src/hashGitObjectEvidence";

const tempRoots: string[] = [];

function git(repo: string, args: string[]): Buffer {
  return execFileSync("git", ["-C", repo, ...args], {
    encoding: "buffer",
    stdio: ["ignore", "pipe", "pipe"]
  });
}

function createLineEndingRepo(): { repo: string; commit: string; path: string; gitBytes: Buffer; crlfWorkingTreeBytes: Buffer } {
  const repo = mkdtempSync(join(tmpdir(), "threshold-git-hash-"));
  tempRoots.push(repo);

  git(repo, ["init"]);
  git(repo, ["config", "user.email", "test@example.invalid"]);
  git(repo, ["config", "user.name", "Threshold Test"]);
  mkdirSync(join(repo, "src"), { recursive: true });
  const path = "src/example.txt";
  writeFileSync(join(repo, path), "alpha\nbeta\n", "utf8");
  git(repo, ["add", path]);
  git(repo, ["commit", "-m", "add lf fixture"]);
  const commit = git(repo, ["rev-parse", "HEAD"]).toString("utf8").trim();
  const gitBytes = git(repo, ["show", `${commit}:${path}`]);
  const crlfWorkingTreeBytes = Buffer.from("alpha\r\nbeta\r\n", "utf8");

  return { repo, commit, path, gitBytes, crlfWorkingTreeBytes };
}

afterEach(() => {
  for (const root of tempRoots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

describe("git object hash evidence", () => {
  it("computes SHA-256 over exact bytes from git show", () => {
    const fixture = createLineEndingRepo();
    const expected = createHash("sha256").update(fixture.gitBytes).digest("hex");

    expect(hashGitObjectEvidence(fixture.repo, fixture.commit, fixture.path)).toBe(expected);
  });

  it("does not use working-tree line endings for public hash provenance", () => {
    const fixture = createLineEndingRepo();
    const gitByteHash = hashGitObjectEvidence(fixture.repo, fixture.commit, fixture.path);
    const crlfHash = createHash("sha256").update(fixture.crlfWorkingTreeBytes).digest("hex");

    expect(gitByteHash).not.toBe(crlfHash);
  });

  it("fails closed when an expected hash is mismatched", () => {
    const fixture = createLineEndingRepo();
    const actual = hashGitObjectEvidence(fixture.repo, fixture.commit, fixture.path);
    const expected = "0".repeat(64);

    expect(actual === expected).toBe(false);
  });
});
