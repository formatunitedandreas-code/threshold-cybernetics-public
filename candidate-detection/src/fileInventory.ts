import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

export function listFixtureFiles(fixtureRoot: string): string[] {
  const files: string[] = [];

  function walk(dir: string): void {
    for (const entry of readdirSync(dir)) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (stat.isFile()) {
        files.push(relative(fixtureRoot, fullPath).replaceAll("\\", "/"));
      }
    }
  }

  walk(fixtureRoot);
  return files.sort();
}
