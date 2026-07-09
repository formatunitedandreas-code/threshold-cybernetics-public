#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const scanRoots = process.argv.slice(2).length ? process.argv.slice(2) : ["README.md", "docs", "scripts", "artifacts"];

const forbiddenPatterns = [
  /production readiness/i,
  /deployment readiness/i,
  /runtime authority/i,
  /compliance certification/i,
  /security fix/i,
  /correctness guarantee/i,
  /public-safe release approval/i,
  /maintainer approval/i,
  /merge authorization/i,
  /PR approval/i,
  /active blocking enforcement/i,
  /hook installation/i,
  /CI enforcement/i,
  /branch protection/i,
  /PetClinic was refactored/i,
  /PetClinic was fixed/i,
  /PetClinic was secured/i
];

const negativeOrBoundaryPatterns = [
  /!=/,
  /\bno\b/i,
  /\bnot\b/i,
  /\bdoes not\b/i,
  /\bdo not\b/i,
  /\bwithout\b/i,
  /\bfalse\b/i,
  /non-claims?/i,
  /blocked/i,
  /forbidden/i,
  /stop/i,
  /must not/i,
  /must remain false/i
];

const contextBoundaryPatterns = [
  /forbidden authority/i,
  /forbidden markings/i,
  /forbidden claim/i,
  /non-claims?/i,
  /what this does not claim/i,
  /does not authorize/i,
  /does not claim/i,
  /not runtime enforcement/i,
  /not formal verification/i,
  /public-safe reachability readout/i
];

const textExtensions = new Set([".md", ".json", ".mjs", ".js", ".ts", ".txt", ".log"]);

function extension(path) {
  const index = path.lastIndexOf(".");
  return index >= 0 ? path.slice(index).toLowerCase() : "";
}

function filesUnder(path) {
  const stat = statSync(path);
  if (stat.isFile()) return [path];
  if (!stat.isDirectory()) return [];
  return readdirSync(path).flatMap((entry) => filesUnder(join(path, entry)));
}

const findings = [];

for (const root of scanRoots) {
  for (const file of filesUnder(root)) {
    if (!textExtensions.has(extension(file))) continue;
    const lines = readFileSync(file, "utf8").split(/\r?\n/);
    lines.forEach((line, index) => {
      if (/^\s*\/.*\/[a-z]*,?\s*$/.test(line)) return;
      if (!forbiddenPatterns.some((pattern) => pattern.test(line))) return;
      if (negativeOrBoundaryPatterns.some((pattern) => pattern.test(line))) return;
      const context = lines.slice(Math.max(0, index - 20), index + 1).join("\n");
      if (contextBoundaryPatterns.some((pattern) => pattern.test(context))) return;
      findings.push({ file, line: index + 1, text: line.trim() });
    });
  }
}

if (findings.length) {
  console.log(JSON.stringify({ valid: false, findings }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  valid: true,
  scannedRoots: scanRoots,
  positiveForbiddenClaimsFound: false
}, null, 2));
