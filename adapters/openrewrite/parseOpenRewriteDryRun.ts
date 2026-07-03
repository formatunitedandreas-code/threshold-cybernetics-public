export interface OpenRewriteDryRunEvidence {
  changesGenerated: number;
  patchApproval: false;
}

export function parseOpenRewriteDryRun(output: string): OpenRewriteDryRunEvidence {
  const match = output.match(/Changes generated:\s*(\d+)/i);
  return {
    changesGenerated: match ? Number(match[1]) : 0,
    patchApproval: false
  };
}
