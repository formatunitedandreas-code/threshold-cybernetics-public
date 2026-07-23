[CmdletBinding()]
param([string] $Root = "")

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($Root)) {
    $Root = (Resolve-Path (Join-Path $PSScriptRoot "..\..\..")).Path
}
$tracked = @(git -C $Root ls-files "README.md" "SECURITY.md" "CONTRIBUTING.md" ".github/ISSUE_TEMPLATE/*" ".github/PULL_REQUEST_TEMPLATE.md" "case-studies/petclinic-pr185/*")
if ($tracked.Count -eq 0) { throw "No tracked public case-study files found." }

$forbidden = @(
    @{ name = "windows_user_path"; pattern = "C:\\Users\\" },
    @{ name = "appdata"; pattern = "AppData" },
    @{ name = "userprofile"; pattern = "USERPROFILE" },
    @{ name = "authorization_header"; pattern = "Authorization:" },
    @{ name = "bearer"; pattern = "Bearer " },
    @{ name = "gh_token"; pattern = "GH_TOKEN" },
    @{ name = "github_token"; pattern = "GITHUB_TOKEN" },
    @{ name = "gh_auth_token"; pattern = "gh auth token" },
    @{ name = "github_pat"; pattern = "github_pat_" },
    @{ name = "ghp"; pattern = "ghp_" },
    @{ name = "gho"; pattern = "gho_" },
    @{ name = "ghu"; pattern = "ghu_" },
    @{ name = "ghs"; pattern = "ghs_" },
    @{ name = "ghr"; pattern = "ghr_" },
    @{ name = "x_access_token"; pattern = "x-access-token" },
    @{ name = "private_key"; pattern = "BEGIN PRIVATE KEY" },
    @{ name = "rsa_private_key"; pattern = "BEGIN RSA PRIVATE KEY" },
    @{ name = "openssh_private_key"; pattern = "BEGIN OPENSSH PRIVATE KEY" },
    @{ name = "private_runtime_path"; pattern = "threshold/runtime/governance-publication" }
)

$documentationExceptionFiles = @(
    "case-studies/petclinic-pr185/PUBLIC_DISCLOSURE_POLICY.md",
    "case-studies/petclinic-pr185/docs/PUBLIC_REDACTION_MANIFEST.md",
    "case-studies/petclinic-pr185/scripts/validate-public-disclosure.ps1",
    "SECURITY.md",
    "CONTRIBUTING.md",
    ".github/PULL_REQUEST_TEMPLATE.md"
)

$findings = New-Object System.Collections.Generic.List[string]
foreach ($path in $tracked) {
    $normalizedPath = $path -replace "\\", "/"
    $isException = $documentationExceptionFiles -contains $normalizedPath
    $full = Join-Path $Root $path
    if (-not (Test-Path $full)) { continue }
    $text = Get-Content $full -Raw
    foreach ($rule in $forbidden) {
        if ($text.Contains($rule.pattern) -and -not $isException) {
            $findings.Add("$path contains forbidden pattern $($rule.name)")
        }
    }
    if (-not $isException) {
        if ($text -match 'active\s*[:=]\s*true') { $findings.Add("$path may contain active authority") }
        if ($text -match 'remainingUses\s*[:=]\s*[1-9]') { $findings.Add("$path may contain reusable authority") }
        if ($text -match 'mergeAuthorized\s*[:=]\s*true') { $findings.Add("$path may claim active merge authority") }
        if ($text -match 'releaseAuthorized\s*[:=]\s*true') { $findings.Add("$path may claim release authority") }
        if ($text -match 'deployAuthorized\s*[:=]\s*true') { $findings.Add("$path may claim deploy authority") }
    }
}

if ($findings.Count -gt 0) {
    $findings | ForEach-Object { Write-Error $_ }
    throw "Public disclosure validation failed."
}

Write-Host "publicDisclosureValidation=passed"
