import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

import { validateReleaseActionReceipt } from "../src/releaseActionReceiptValidator.js";
import type { ReleaseActionPlan, ReleaseActionReceipt } from "../src/types.js";

const args = parseArgs(process.argv.slice(2));

if (!args.plan || !args.receipt || !args.out) {
  throw new Error("Usage: --plan <plan.json> --receipt <receipt.json> --out <out.json>");
}

const plan = JSON.parse(await readFile(args.plan, "utf8")) as ReleaseActionPlan;
const receipt = JSON.parse(await readFile(args.receipt, "utf8")) as ReleaseActionReceipt;
const readout = validateReleaseActionReceipt(plan, receipt);

await mkdir(dirname(args.out), { recursive: true });
await writeFile(args.out, `${JSON.stringify(readout, null, 2)}\n`, "utf8");

function parseArgs(rawArgs: string[]): Record<string, string> {
  const parsed: Record<string, string> = {};
  for (let index = 0; index < rawArgs.length; index += 2) {
    const key = rawArgs[index]?.replace(/^--/, "");
    const value = rawArgs[index + 1];
    if (key && value) {
      parsed[key] = value;
    }
  }
  return parsed;
}
