[CmdletBinding()]
param([string] $ManifestPath = "")

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($ManifestPath)) {
    $ManifestPath = Join-Path $PSScriptRoot "..\docs\PUBLIC_EVIDENCE_MANIFEST.json"
}
$manifest = Get-Content $ManifestPath -Raw | ConvertFrom-Json
$allowed = @("schemaVersion","caseStudyId","historical","nonAuthorizing","authorityCurrentlyActive","repository","pullRequest","baseSha","finalHeadSha","mergeSha","mergeMethod","outcome","failClosedEvents","checks","openBlockingFindings","remainingMergeAuthority","finiteGrantActive","releaseAuthorized","deployAuthorized","redactions","nonClaims","publicLinks")
$actual = @($manifest.PSObject.Properties.Name)
foreach ($name in $actual) { if ($allowed -notcontains $name) { throw "Unknown manifest property: $name" } }
foreach ($name in $allowed) { if ($actual -notcontains $name) { throw "Missing manifest property: $name" } }
if ($manifest.schemaVersion -ne "threshold.public-case-study.v0.1") { throw "Bad schemaVersion" }
if ($manifest.caseStudyId -ne "petclinic-pr185") { throw "Bad caseStudyId" }
if ($manifest.historical -ne $true) { throw "historical must be true" }
if ($manifest.nonAuthorizing -ne $true) { throw "nonAuthorizing must be true" }
if ($manifest.authorityCurrentlyActive -ne $false) { throw "authorityCurrentlyActive must be false" }
if ($manifest.pullRequest -ne 185) { throw "PR number must be 185" }
if ($manifest.outcome -ne "merged_and_reconciled") { throw "Bad outcome" }
foreach ($sha in @($manifest.baseSha,$manifest.finalHeadSha,$manifest.mergeSha)) { if ($sha -notmatch '^[0-9a-f]{40}$') { throw "Invalid SHA: $sha" } }
if ($manifest.remainingMergeAuthority -ne 0) { throw "remainingMergeAuthority must be 0" }
if ($manifest.finiteGrantActive -ne $false) { throw "finiteGrantActive must be false" }
if ($manifest.releaseAuthorized -ne $false) { throw "releaseAuthorized must be false" }
if ($manifest.deployAuthorized -ne $false) { throw "deployAuthorized must be false" }
foreach ($link in $manifest.publicLinks.PSObject.Properties.Value) { if ([string]::IsNullOrWhiteSpace([string]$link)) { throw "Empty public link" } }
Write-Host "publicEvidenceManifest=passed"
