export interface CheckRunEvidence {
  conclusion: string;
  deploymentReadinessClaimed: false;
}

export function parseCheckRun(input: { conclusion?: string }): CheckRunEvidence {
  return {
    conclusion: input.conclusion ?? "unknown",
    deploymentReadinessClaimed: false
  };
}
