import { readFileSync } from "node:fs";
import type { PolicyMappingFile } from "./types";

export function loadPolicyMapping(path: string): PolicyMappingFile {
  const parsed = JSON.parse(readFileSync(path, "utf8")) as PolicyMappingFile;
  if (!Array.isArray(parsed.outputs)) {
    throw new Error("policy mapping input must include outputs[]");
  }
  return parsed;
}
