import { parseOpenRewriteDryRun } from "./parseOpenRewriteDryRun";

const evidence = parseOpenRewriteDryRun("Changes generated: 0");

if (evidence.patchApproval !== false) {
  throw new Error("OpenRewrite DryRun must not become patch approval");
}
