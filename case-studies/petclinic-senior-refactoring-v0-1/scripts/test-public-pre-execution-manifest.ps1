Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$Root = Split-Path $PSScriptRoot -Parent
function Assert-True { param([string] $Name, [bool] $Condition) if (-not $Condition) { throw "manifest_test_failed=$Name" }; Write-Host "ok $Name" }
$doc = Get-Content (Join-Path $Root "PUBLIC_PRE_EXECUTION_COMMITMENT.json") -Raw | ConvertFrom-Json
Assert-True "run id" ($doc.runId -eq "SRR-PETCLINIC-001")
Assert-True "candidate id" ($doc.candidate.candidateId -eq "owner-web-flow-responsibility-split-v0-1")
Assert-True "score" ($doc.candidate.score -eq 34)
Assert-True "lead" ($doc.candidate.leadOverRunnerUp -eq 7)
Assert-True "bound fields" ($doc.boundBeforeProductExecution.candidateIdentity -and $doc.boundBeforeProductExecution.architectureBaseline -and $doc.boundBeforeProductExecution.behavioralInvariants -and $doc.boundBeforeProductExecution.qualityProfile -and $doc.boundBeforeProductExecution.threeBatchPlan -and $doc.boundBeforeProductExecution.counterfactualPlanReview)
Assert-True "no execution claims" (-not $doc.claims.refactoringExecuted -and -not $doc.claims.qualityAssessmentPassed -and -not $doc.claims.architectureImproved)
Assert-True "no authority" (-not $doc.authority.executionAuthorized -and -not $doc.authority.publicationAuthorized -and -not $doc.authority.mergeAuthorized -and -not $doc.authority.releaseAuthorized)
Write-Host "publicPreExecutionManifestTests=passed"
