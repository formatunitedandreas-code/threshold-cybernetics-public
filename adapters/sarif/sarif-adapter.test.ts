import { parseSarifFinding } from "./parseSarifFinding";

const evidence = parseSarifFinding({ runs: [{ results: [{}] }] });

if (evidence.securityFixClaimed !== false) {
  throw new Error("SARIF finding must not become security fix");
}
