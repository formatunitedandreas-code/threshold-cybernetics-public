Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$Root = Split-Path $PSScriptRoot -Parent
function Assert-True { param([string] $Name, [bool] $Condition) if (-not $Condition) { throw "validation_failed=$Name" }; Write-Host "ok $Name" }
function Read-Json($Path) { Get-Content $Path -Raw | ConvertFrom-Json }
$commitmentPath = Join-Path $Root "PUBLIC_PRE_EXECUTION_COMMITMENT.json"
$commitment = Read-Json $commitmentPath
Assert-True "phase pre_execution" ($commitment.phase -eq "pre_execution")
Assert-True "historical true" ($commitment.historical -eq $true)
Assert-True "nonAuthorizing true" ($commitment.nonAuthorizing -eq $true)
Assert-True "product source unchanged" ($commitment.observedState.productSourceChanged -eq $false)
Assert-True "product tests unchanged" ($commitment.observedState.productTestsChanged -eq $false)
Assert-True "part2 not executed" ($commitment.observedState.part2Executed -eq $false)
Assert-True "authority false" ($commitment.authority.executionAuthorized -eq $false -and $commitment.authority.publicationAuthorized -eq $false -and $commitment.authority.mergeAuthorized -eq $false -and $commitment.authority.releaseAuthorized -eq $false)
Assert-True "claims false" ($commitment.claims.refactoringExecuted -eq $false -and $commitment.claims.qualityAssessmentPassed -eq $false -and $commitment.claims.architectureImproved -eq $false -and $commitment.claims.humanSeniorEquivalent -eq $false -and $commitment.claims.formalVerificationClaim -eq $false -and $commitment.claims.independentObserver -eq $false)
foreach ($digest in @($commitment.commitments.part1HandoffDigest, $commitment.commitments.executionDecisionPacketDigest)) { Assert-True "digest pattern $digest" ($digest -match '^sha256:[0-9a-f]{64}$') }
Get-Content (Join-Path $Root "schemas/public-pre-execution-commitment-v0.1.schema.json") -Raw | ConvertFrom-Json | Out-Null
Assert-True "schema json parses" $true
$files = @(Get-ChildItem $Root -Recurse -File)
$scanFiles = @($files | Where-Object { $_.FullName -notlike '*\scripts\*' -and $_.FullName -notmatch 'PUBLIC_NON_CLAIMS.md$' -and $_.FullName -notmatch 'PUBLIC_DISCLOSURE_POLICY.md$' })
$forbidden = @('USERPROFILE', 'AppData', 'authorization header', 'private key', 'BEGIN RSA PRIVATE KEY', 'BEGIN OPENSSH PRIVATE KEY', 'remainingUses":\s*[1-9]', 'executionAuthorized":\s*true', 'publicationAuthorized":\s*true', 'mergeAuthorized":\s*true', 'releaseAuthorized":\s*true', 'refactoringExecuted":\s*true', 'qualityAssessmentPassed":\s*true', 'architectureImproved":\s*true', 'humanSeniorEquivalent":\s*true', 'formalVerificationClaim":\s*true', 'independentObserver":\s*true', 'part2Executed":\s*true')
foreach ($file in $scanFiles) {
    $text = Get-Content $file.FullName -Raw
    foreach ($pattern in $forbidden) {
        if ($text -match $pattern) { throw "forbidden_pattern=$pattern file=$($file.FullName)" }
    }
}
Assert-True "forbidden patterns absent" $true
$resultPhrases = @('completed the refactoring', 'successfully improved the architecture', 'passed the final quality assessment', 'executed all three batches', 'proved senior-level autonomy')
foreach ($file in $scanFiles) {
    $text = Get-Content $file.FullName -Raw
    foreach ($phrase in $resultPhrases) {
        if ($text -match [regex]::Escape($phrase)) { throw "unsupported_result_phrase=$phrase file=$($file.FullName)" }
    }
}
Assert-True "unsupported result phrases absent" $true
foreach ($json in @($files | Where-Object { $_.Extension -eq '.json' })) { Get-Content $json.FullName -Raw | ConvertFrom-Json | Out-Null }
Assert-True "all json parses" $true
foreach ($svg in @($files | Where-Object { $_.Extension -eq '.svg' })) { [xml](Get-Content $svg.FullName -Raw) | Out-Null }
Assert-True "all svg parses" $true
$mdFiles = @($files | Where-Object { $_.Extension -eq '.md' })
foreach ($md in $mdFiles) {
    $text = Get-Content $md.FullName -Raw
    foreach ($match in [regex]::Matches($text, '\[[^\]]+\]\(([^)]+)\)')) {
        $target = $match.Groups[1].Value
        if ($target -match '^(https?:|mailto:|#)') { continue }
        $pathOnly = ($target -split '#')[0]
        if ([string]::IsNullOrWhiteSpace($pathOnly)) { continue }
        $resolved = Join-Path $md.DirectoryName $pathOnly
        Assert-True "relative link $target" (Test-Path $resolved)
    }
}
Assert-True "relative links resolve" $true
if (Get-Command gitleaks -ErrorAction SilentlyContinue) { gitleaks detect --no-git --source $Root | Out-Host; if ($LASTEXITCODE -ne 0) { throw "gitleaks_failed" }; Write-Host "gitleaks=passed" } else { Write-Host "gitleaks=unavailable_not_installed" }
Write-Host "publicPreExecutionValidation=passed"
