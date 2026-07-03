export interface SarifEvidence {
  findingCount: number;
  securityFixClaimed: false;
}

export function parseSarifFinding(input: { runs?: Array<{ results?: unknown[] }> }): SarifEvidence {
  const findingCount = input.runs?.reduce((sum, run) => sum + (run.results?.length ?? 0), 0) ?? 0;
  return {
    findingCount,
    securityFixClaimed: false
  };
}
