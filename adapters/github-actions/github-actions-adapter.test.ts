import { parseCheckRun } from "./parseCheckRun";

const evidence = parseCheckRun({ conclusion: "success" });

if (evidence.deploymentReadinessClaimed !== false) {
  throw new Error("GitHub Actions pass must not become deployment readiness");
}
