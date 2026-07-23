[CmdletBinding()]
param()

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..\..")).Path
$ValidatorPath = Join-Path $PSScriptRoot "validate-public-disclosure.ps1"
$ManifestTestPath = Join-Path $PSScriptRoot "test-public-evidence-manifest.ps1"

function New-FixtureRepo {
    $root = Join-Path ([System.IO.Path]::GetTempPath()) ("public-disclosure-validator-fixture-" + [guid]::NewGuid().ToString("N"))
    New-Item -ItemType Directory -Force -Path $root | Out-Null
    git -C $root init | Out-Null
    git -C $root config user.email "fixture@example.invalid"
    git -C $root config user.name "fixture"
    New-Item -ItemType Directory -Force -Path (Join-Path $root "case-studies/petclinic-pr185/docs") | Out-Null
    New-Item -ItemType Directory -Force -Path (Join-Path $root "case-studies/petclinic-pr185/examples") | Out-Null
    Set-Content -LiteralPath (Join-Path $root "README.md") -Value "# fixture" -Encoding utf8
    return $root
}

function Add-FixtureFile {
    param(
        [Parameter(Mandatory = $true)] [string] $Root,
        [Parameter(Mandatory = $true)] [string] $RelativePath,
        [Parameter(Mandatory = $true)] [string] $Content
    )

    $path = Join-Path $Root $RelativePath
    New-Item -ItemType Directory -Force -Path (Split-Path -Parent $path) | Out-Null
    Set-Content -LiteralPath $path -Value $Content -Encoding utf8
    git -C $Root add $RelativePath
}

function Complete-FixtureRepo {
    param([Parameter(Mandatory = $true)] [string] $Root)
    git -C $Root add README.md | Out-Null
    git -C $Root commit -m fixture | Out-Null
}

function Invoke-ValidatorOnContent {
    param(
        [Parameter(Mandatory = $true)] [string] $RelativePath,
        [Parameter(Mandatory = $true)] [string] $Content
    )

    $root = New-FixtureRepo
    try {
        Add-FixtureFile -Root $root -RelativePath $RelativePath -Content $Content
        Complete-FixtureRepo -Root $root
        $oldErrorActionPreference = $ErrorActionPreference
        $ErrorActionPreference = "Continue"
        & powershell -NoProfile -ExecutionPolicy Bypass -File $ValidatorPath -Root $root *> $null
        $exitCode = $LASTEXITCODE
        $ErrorActionPreference = $oldErrorActionPreference
        return ($exitCode -eq 0)
    }
    finally {
        if (Test-Path $root) { Remove-Item -LiteralPath $root -Recurse -Force }
    }
}

function Assert-ValidatorFails {
    param(
        [Parameter(Mandatory = $true)] [string] $Name,
        [Parameter(Mandatory = $true)] [string] $RelativePath,
        [Parameter(Mandatory = $true)] [string] $Content
    )

    if (Invoke-ValidatorOnContent -RelativePath $RelativePath -Content $Content) {
        throw "Expected validator failure: $Name"
    }
}

function Assert-ValidatorPasses {
    param(
        [Parameter(Mandatory = $true)] [string] $Name,
        [Parameter(Mandatory = $true)] [string] $RelativePath,
        [Parameter(Mandatory = $true)] [string] $Content
    )

    if (-not (Invoke-ValidatorOnContent -RelativePath $RelativePath -Content $Content)) {
        throw "Expected validator pass: $Name"
    }
}

function New-ManifestJson {
    param([Parameter(Mandatory = $true)] [hashtable] $PublicLinks)

    $manifest = [ordered]@{
        schemaVersion = "threshold.public-case-study.v0.1"
        caseStudyId = "petclinic-pr185"
        historical = $true
        nonAuthorizing = $true
        authorityCurrentlyActive = $false
        repository = "formatunitedandreas-code/spring-framework-petclinic"
        pullRequest = 185
        baseSha = "6ba33e24ddbdbd2c4dcaa8cc5a74b9b585a3f255"
        finalHeadSha = "b4dbcb6d59d93aed160e1d412192914feeea0fd7"
        mergeSha = "1c4423dcd75fcde12daae445c7e147a972ccbd57"
        mergeMethod = "squash"
        outcome = "merged_and_reconciled"
        failClosedEvents = @("cli_auth_failed")
        checks = @(@{ name = "threshold-governance"; conclusion = "success" })
        openBlockingFindings = 0
        remainingMergeAuthority = 0
        finiteGrantActive = $false
        releaseAuthorized = $false
        deployAuthorized = $false
        redactions = @("raw receipts")
        nonClaims = @("no production readiness")
        publicLinks = $PublicLinks
    }

    return ($manifest | ConvertTo-Json -Depth 20)
}

function Invoke-ManifestTestOnLinks {
    param([Parameter(Mandatory = $true)] [hashtable] $PublicLinks)

    $path = Join-Path ([System.IO.Path]::GetTempPath()) ("public-evidence-manifest-" + [guid]::NewGuid().ToString("N") + ".json")
    try {
        Set-Content -LiteralPath $path -Value (New-ManifestJson -PublicLinks $PublicLinks) -Encoding utf8
        $oldErrorActionPreference = $ErrorActionPreference
        $ErrorActionPreference = "Continue"
        & powershell -NoProfile -ExecutionPolicy Bypass -File $ManifestTestPath -ManifestPath $path *> $null
        $exitCode = $LASTEXITCODE
        $ErrorActionPreference = $oldErrorActionPreference
        return ($exitCode -eq 0)
    }
    finally {
        if (Test-Path $path) { Remove-Item -LiteralPath $path -Force }
    }
}

function Assert-ManifestFails {
    param(
        [Parameter(Mandatory = $true)] [string] $Name,
        [Parameter(Mandatory = $true)] [hashtable] $PublicLinks
    )

    if (Invoke-ManifestTestOnLinks -PublicLinks $PublicLinks) {
        throw "Expected manifest failure: $Name"
    }
}

function Assert-ManifestPasses {
    param(
        [Parameter(Mandatory = $true)] [string] $Name,
        [Parameter(Mandatory = $true)] [hashtable] $PublicLinks
    )

    if (-not (Invoke-ManifestTestOnLinks -PublicLinks $PublicLinks)) {
        throw "Expected manifest pass: $Name"
    }
}

$usersPath = "C:" + "\Users\"
Assert-ValidatorFails -Name "uppercase Windows user path" -RelativePath "case-studies/petclinic-pr185/docs/path.md" -Content ($usersPath + "alice\receipt.json")
Assert-ValidatorFails -Name "lowercase Windows user path" -RelativePath "case-studies/petclinic-pr185/docs/path.md" -Content ("c:" + "\users\alice\receipt.json")
Assert-ValidatorFails -Name "alternate drive Windows user path" -RelativePath "case-studies/petclinic-pr185/docs/path.md" -Content ("D:" + "\Users\bob\artifact.json")
Assert-ValidatorPasses -Name "forward slash Windows-like path remains allowed" -RelativePath "case-studies/petclinic-pr185/docs/path.md" -Content "C:/Users/alice/receipt.json"

Assert-ValidatorFails -Name "active true JSON" -RelativePath "case-studies/petclinic-pr185/examples/active.json" -Content (@{ active = $true } | ConvertTo-Json)
Assert-ValidatorFails -Name "mergeAuthorized true JSON" -RelativePath "case-studies/petclinic-pr185/examples/merge.json" -Content (@{ mergeAuthorized = $true } | ConvertTo-Json)
Assert-ValidatorFails -Name "releaseAuthorized true JSON" -RelativePath "case-studies/petclinic-pr185/examples/release.json" -Content (@{ releaseAuthorized = $true } | ConvertTo-Json)
Assert-ValidatorFails -Name "deployAuthorized true JSON" -RelativePath "case-studies/petclinic-pr185/examples/deploy.json" -Content (@{ deployAuthorized = $true } | ConvertTo-Json)
Assert-ValidatorFails -Name "remainingUses positive JSON" -RelativePath "case-studies/petclinic-pr185/examples/remaining.json" -Content (@{ remainingUses = 1 } | ConvertTo-Json)
Assert-ValidatorFails -Name "nested releaseAuthorized true JSON" -RelativePath "case-studies/petclinic-pr185/examples/nested.json" -Content (@{ nested = @{ releaseAuthorized = $true } } | ConvertTo-Json -Depth 5)
Assert-ValidatorFails -Name "array remainingUses positive JSON" -RelativePath "case-studies/petclinic-pr185/examples/array.json" -Content (@{ items = @(@{ remainingUses = 2 }) } | ConvertTo-Json -Depth 5)
Assert-ValidatorPasses -Name "inactive authority JSON" -RelativePath "case-studies/petclinic-pr185/examples/inactive.json" -Content (@{ active = $false; mergeAuthorized = $false; releaseAuthorized = $false; deployAuthorized = $false; remainingUses = 0 } | ConvertTo-Json)

Assert-ManifestFails -Name "example.com link" -PublicLinks @{ unsupported = "https://example.com/evidence" }
Assert-ManifestFails -Name "http github link" -PublicLinks @{ unsupported = "http://github.com/example/repository" }
Assert-ManifestFails -Name "javascript link" -PublicLinks @{ unsupported = "javascript:alert(1)" }
Assert-ManifestFails -Name "empty link" -PublicLinks @{ unsupported = "" }
Assert-ManifestFails -Name "whitespace link" -PublicLinks @{ unsupported = "   " }
Assert-ManifestFails -Name "non-string link" -PublicLinks @{ unsupported = 5 }
Assert-ManifestPasses -Name "PetClinic PR link" -PublicLinks @{ source = "https://github.com/formatunitedandreas-code/spring-framework-petclinic/pull/185" }
Assert-ManifestPasses -Name "public repo link" -PublicLinks @{ repo = "https://github.com/formatunitedandreas-code/threshold-cybernetics-public" }

$tokenWord = "GH" + "_TOKEN"
Assert-ValidatorPasses -Name "path-bound token documentation exception" -RelativePath "case-studies/petclinic-pr185/PUBLIC_DISCLOSURE_POLICY.md" -Content ("Documentation may name " + $tokenWord + " as a redacted token label.")
Assert-ValidatorFails -Name "documentation exception does not allow Windows path" -RelativePath "case-studies/petclinic-pr185/PUBLIC_DISCLOSURE_POLICY.md" -Content ("Documentation may name " + $tokenWord + " but not " + $usersPath + "operator\private.txt")
Assert-ValidatorFails -Name "documentation exception does not allow active JSON flag" -RelativePath "case-studies/petclinic-pr185/examples/doc.json" -Content (@{ releaseAuthorized = $true } | ConvertTo-Json)

Write-Host "publicDisclosureValidatorRegressionTests=passed"
