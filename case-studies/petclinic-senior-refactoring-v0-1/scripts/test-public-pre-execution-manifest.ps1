Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$Root = Split-Path $PSScriptRoot -Parent
function Assert-True { param([string] $Name, [bool] $Condition) if (-not $Condition) { throw "manifest_test_failed=$Name" }; Write-Host "ok $Name" }
function Convert-ToPortablePath([string] $Path) { return (($Path -replace '\\', '/') -replace '/+', '/') }
function Test-IsUnderPath { param([string] $Path, [string] $Parent)
    $portablePath = (Convert-ToPortablePath $Path).TrimEnd('/')
    $portableParent = (Convert-ToPortablePath $Parent).TrimEnd('/')
    return ($portablePath -eq $portableParent -or $portablePath.StartsWith($portableParent + '/', [System.StringComparison]::OrdinalIgnoreCase))
}
function Test-IsPublicScanFile { param([string] $Path, [string] $ScriptsPath)
    if (Test-IsUnderPath -Path $Path -Parent $ScriptsPath) { return $false }
    if ($Path -match 'PUBLIC_NON_CLAIMS.md$') { return $false }
    if ($Path -match 'PUBLIC_DISCLOSURE_POLICY.md$') { return $false }
    return $true
}
function Copy-JsonObject($Value) { return ($Value | ConvertTo-Json -Depth 20 | ConvertFrom-Json) }
function Test-NoActionState($ObservedState) {
    return (
        $ObservedState.part2Executed -eq $false -and
        $ObservedState.pushExecuted -eq $false -and
        $ObservedState.pullRequestCreated -eq $false -and
        $ObservedState.mergeExecuted -eq $false -and
        $ObservedState.redditPostCreated -eq $false
    )
}
function Get-ObjectPropertyNames($Object) { return @($Object.PSObject.Properties | ForEach-Object { $_.Name }) }
function Test-PublicPreExecutionCommitmentShape($Doc) {
    $requiredTop = @('schemaVersion', 'caseStudyId', 'runId', 'historical', 'nonAuthorizing', 'phase', 'candidate', 'boundBeforeProductExecution', 'observedState', 'validation', 'commitments', 'authority', 'claims')
    foreach ($name in $requiredTop) { if (-not ($Doc.PSObject.Properties.Name -contains $name)) { return $false } }
    if ($Doc.schemaVersion -ne 'threshold.public-pre-execution-commitment.v0.1') { return $false }
    if ($Doc.caseStudyId -ne 'petclinic-senior-refactoring-v0-1') { return $false }
    if ($Doc.runId -ne 'SRR-PETCLINIC-001') { return $false }
    if ($Doc.historical -ne $true -or $Doc.nonAuthorizing -ne $true -or $Doc.phase -ne 'pre_execution') { return $false }

    $boundRequired = @('candidateIdentity', 'candidateScope', 'architectureBaseline', 'behavioralInvariants', 'qualityProfile', 'threeBatchPlan', 'counterfactualPlanReview')
    if (@(Get-ObjectPropertyNames $Doc.boundBeforeProductExecution).Count -ne $boundRequired.Count) { return $false }
    foreach ($name in $boundRequired) { if ($Doc.boundBeforeProductExecution.$name -ne $true) { return $false } }

    $validationRequired = @('thresholdContractsTestsPassed', 'refactoringGovernorTestsPassed', 'petClinicCandidateDiscoveryTest', 'petClinicPlanTest')
    if (@(Get-ObjectPropertyNames $Doc.validation).Count -ne $validationRequired.Count) { return $false }
    if ($Doc.validation.thresholdContractsTestsPassed -ne 110) { return $false }
    if ($Doc.validation.refactoringGovernorTestsPassed -ne 405) { return $false }
    if ($Doc.validation.petClinicCandidateDiscoveryTest -ne 'passed') { return $false }
    if ($Doc.validation.petClinicPlanTest -ne 'passed') { return $false }
    return $true
}
$doc = Get-Content (Join-Path $Root "PUBLIC_PRE_EXECUTION_COMMITMENT.json") -Raw | ConvertFrom-Json
Assert-True "run id" ($doc.runId -eq "SRR-PETCLINIC-001")
Assert-True "candidate id" ($doc.candidate.candidateId -eq "owner-web-flow-responsibility-split-v0-1")
Assert-True "score" ($doc.candidate.score -eq 34)
Assert-True "lead" ($doc.candidate.leadOverRunnerUp -eq 7)
Assert-True "bound fields" ($doc.boundBeforeProductExecution.candidateIdentity -and $doc.boundBeforeProductExecution.architectureBaseline -and $doc.boundBeforeProductExecution.behavioralInvariants -and $doc.boundBeforeProductExecution.qualityProfile -and $doc.boundBeforeProductExecution.threeBatchPlan -and $doc.boundBeforeProductExecution.counterfactualPlanReview)
Assert-True "no execution claims" (-not $doc.claims.refactoringExecuted -and -not $doc.claims.qualityAssessmentPassed -and -not $doc.claims.architectureImproved)
Assert-True "no authority" (-not $doc.authority.executionAuthorized -and -not $doc.authority.publicationAuthorized -and -not $doc.authority.mergeAuthorized -and -not $doc.authority.releaseAuthorized)
Assert-True "all no-action false fixture" (Test-NoActionState $doc.observedState)
foreach ($flag in @('part2Executed', 'pushExecuted', 'pullRequestCreated', 'mergeExecuted', 'redditPostCreated')) {
    $fixture = Copy-JsonObject $doc
    $fixture.observedState.$flag = $true
    Assert-True "each no-action true fixture blocked $flag" (-not (Test-NoActionState $fixture.observedState))
}
$windowsPath = 'C:\repo\case-studies\petclinic-senior-refactoring-v0-1\scripts\validate-public-pre-execution.ps1'
$unixPath = '/repo/case-studies/petclinic-senior-refactoring-v0-1/scripts/validate-public-pre-execution.ps1'
Assert-True "Windows-style path fixture" (-not (Test-IsPublicScanFile -Path $windowsPath -ScriptsPath 'C:\repo\case-studies\petclinic-senior-refactoring-v0-1\scripts'))
Assert-True "Unix-style path fixture" (-not (Test-IsPublicScanFile -Path $unixPath -ScriptsPath '/repo/case-studies/petclinic-senior-refactoring-v0-1/scripts'))
$schema = Get-Content (Join-Path $Root "schemas/public-pre-execution-commitment-v0.1.schema.json") -Raw | ConvertFrom-Json
Assert-True "schema defines bound object" ($schema.properties.boundBeforeProductExecution.type -eq 'object' -and $schema.properties.boundBeforeProductExecution.additionalProperties -eq $false)
Assert-True "schema defines validation object" ($schema.properties.validation.type -eq 'object' -and $schema.properties.validation.additionalProperties -eq $false)
Assert-True "empty commitment objects blocked" (-not (Test-PublicPreExecutionCommitmentShape ([pscustomobject]@{ schemaVersion=$doc.schemaVersion; caseStudyId=$doc.caseStudyId; runId=$doc.runId; historical=$true; nonAuthorizing=$true; phase='pre_execution'; candidate=$doc.candidate; boundBeforeProductExecution=[pscustomobject]@{}; observedState=$doc.observedState; validation=[pscustomobject]@{}; commitments=$doc.commitments; authority=$doc.authority; claims=$doc.claims })))
Assert-True "valid commitment manifest passed" (Test-PublicPreExecutionCommitmentShape $doc)
Write-Host "publicPreExecutionManifestTests=passed"
