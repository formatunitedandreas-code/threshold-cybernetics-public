[CmdletBinding()]
param([string] $Root = "")

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($Root)) {
    $Root = (Resolve-Path (Join-Path $PSScriptRoot "..\..\..")).Path
}

$tracked = @(git -C $Root ls-files "README.md" "SECURITY.md" "CONTRIBUTING.md" ".github/ISSUE_TEMPLATE/*" ".github/PULL_REQUEST_TEMPLATE.md" "case-studies/petclinic-pr185/*")
if ($tracked.Count -eq 0) { throw "No tracked public case-study files found." }

$forbiddenLiteralRules = @(
    @{ name = "appdata"; value = "AppData" },
    @{ name = "userprofile"; value = "USERPROFILE" },
    @{ name = "authorization_header"; value = "Authorization:" },
    @{ name = "bearer"; value = "Bearer " },
    @{ name = "gh_token"; value = "GH_TOKEN" },
    @{ name = "github_token"; value = "GITHUB_TOKEN" },
    @{ name = "gh_auth_token"; value = "gh auth token" },
    @{ name = "github_pat"; value = "github_pat_" },
    @{ name = "ghp"; value = "ghp_" },
    @{ name = "gho"; value = "gho_" },
    @{ name = "ghu"; value = "ghu_" },
    @{ name = "ghs"; value = "ghs_" },
    @{ name = "ghr"; value = "ghr_" },
    @{ name = "x_access_token"; value = "x-access-token" },
    @{ name = "private_key"; value = "BEGIN PRIVATE KEY" },
    @{ name = "rsa_private_key"; value = "BEGIN RSA PRIVATE KEY" },
    @{ name = "openssh_private_key"; value = "BEGIN OPENSSH PRIVATE KEY" },
    @{ name = "private_runtime_path"; value = "threshold/runtime/governance-publication" }
)

$forbiddenRegexRules = @(
    @{ name = "windows_user_path"; pattern = '(?i)(?<![a-z0-9])[a-z]:\\Users\\' },
    @{ name = "active_true_text"; pattern = '(?i)(?:"|\b)active(?:"|\b)\s*[:=]\s*true\b' },
    @{ name = "authority_currently_active_true_text"; pattern = '(?i)(?:"|\b)authorityCurrentlyActive(?:"|\b)\s*[:=]\s*true\b' },
    @{ name = "finite_grant_active_true_text"; pattern = '(?i)(?:"|\b)finiteGrantActive(?:"|\b)\s*[:=]\s*true\b' },
    @{ name = "ready_transition_authorized_true_text"; pattern = '(?i)(?:"|\b)readyTransitionAuthorized(?:"|\b)\s*[:=]\s*true\b' },
    @{ name = "product_execution_authorized_true_text"; pattern = '(?i)(?:"|\b)productExecutionAuthorized(?:"|\b)\s*[:=]\s*true\b' },
    @{ name = "remaining_uses_positive_text"; pattern = '(?i)(?:"|\b)remainingUses(?:"|\b)\s*[:=]\s*[1-9][0-9]*\b' },
    @{ name = "merge_authorized_true_text"; pattern = '(?i)(?:"|\b)mergeAuthorized(?:"|\b)\s*[:=]\s*true\b' },
    @{ name = "release_authorized_true_text"; pattern = '(?i)(?:"|\b)releaseAuthorized(?:"|\b)\s*[:=]\s*true\b' },
    @{ name = "deploy_authorized_true_text"; pattern = '(?i)(?:"|\b)deployAuthorized(?:"|\b)\s*[:=]\s*true\b' }
)

$allowedDocumentationRulesByPath = @{
    "case-studies/petclinic-pr185/PUBLIC_DISCLOSURE_POLICY.md" = @(
        "authorization_header",
        "gh_token",
        "private_runtime_path"
    )
    "case-studies/petclinic-pr185/docs/PUBLIC_REDACTION_MANIFEST.md" = @(
        "authorization_header",
        "gh_token",
        "private_runtime_path"
    )
    "case-studies/petclinic-pr185/scripts/validate-public-disclosure.ps1" = @(
        "appdata",
        "userprofile",
        "authorization_header",
        "bearer",
        "gh_token",
        "github_token",
        "gh_auth_token",
        "github_pat",
        "ghp",
        "gho",
        "ghu",
        "ghs",
        "ghr",
        "x_access_token",
        "private_key",
        "rsa_private_key",
        "openssh_private_key",
        "private_runtime_path"
    )
    "SECURITY.md" = @(
        "authorization_header"
    )
    "CONTRIBUTING.md" = @(
        "gh_token"
    )
    ".github/PULL_REQUEST_TEMPLATE.md" = @(
        "gh_token"
    )
}

$authorityTruePropertyNames = @(
    "active",
    "authorityCurrentlyActive",
    "finiteGrantActive",
    "readyTransitionAuthorized",
    "productExecutionAuthorized",
    "mergeAuthorized",
    "releaseAuthorized",
    "deployAuthorized"
)

function Test-RuleAllowedForPath {
    param(
        [Parameter(Mandatory = $true)] [string] $Path,
        [Parameter(Mandatory = $true)] [string] $RuleName
    )

    if (-not $allowedDocumentationRulesByPath.ContainsKey($Path)) {
        return $false
    }

    return @($allowedDocumentationRulesByPath[$Path]) -contains $RuleName
}

function Add-ForbiddenAuthorityFinding {
    param(
        [System.Collections.Generic.List[string]] $Findings,
        [Parameter(Mandatory = $true)] [string] $JsonPath,
        [Parameter(Mandatory = $true)] [string] $PropertyName,
        [AllowNull()] [object] $Value
    )

    if ($authorityTruePropertyNames -contains $PropertyName) {
        if ($Value -is [bool] -and $Value -eq $true) {
            $Findings.Add("$JsonPath.$PropertyName contains active authority")
        }
        return
    }

    if ($PropertyName -eq "remainingUses") {
        if ($Value -is [byte] -or $Value -is [sbyte] -or $Value -is [int16] -or $Value -is [uint16] -or $Value -is [int] -or $Value -is [uint32] -or $Value -is [long] -or $Value -is [uint64] -or $Value -is [decimal] -or $Value -is [double] -or $Value -is [single]) {
            if ([decimal]$Value -gt 0) {
                $Findings.Add("$JsonPath.$PropertyName contains reusable authority")
            }
        }
    }
}

function Find-ForbiddenAuthorityState {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)]
        [AllowNull()]
        [object] $Value,

        [Parameter(Mandatory = $true)]
        [string] $Path
    )

    $findings = New-Object System.Collections.Generic.List[string]

    if ($null -eq $Value) {
        return @()
    }

    if ($Value -is [System.Collections.IDictionary]) {
        foreach ($key in $Value.Keys) {
            $keyText = [string] $key
            $child = $Value[$key]
            Add-ForbiddenAuthorityFinding -Findings $findings -JsonPath $Path -PropertyName $keyText -Value $child
            $childFindings = @(Find-ForbiddenAuthorityState -Value $child -Path "$Path.$keyText")
            foreach ($finding in $childFindings) { $findings.Add($finding) }
        }
    }
    elseif ($Value -is [System.Collections.IEnumerable] -and $Value -isnot [string]) {
        $index = 0
        foreach ($item in $Value) {
            $childFindings = @(Find-ForbiddenAuthorityState -Value $item -Path "$Path[$index]")
            foreach ($finding in $childFindings) { $findings.Add($finding) }
            $index += 1
        }
    }
    elseif ($Value -is [pscustomobject]) {
        foreach ($property in $Value.PSObject.Properties) {
            $child = $property.Value
            Add-ForbiddenAuthorityFinding -Findings $findings -JsonPath $Path -PropertyName $property.Name -Value $child
            $childFindings = @(Find-ForbiddenAuthorityState -Value $child -Path "$Path.$($property.Name)")
            foreach ($finding in $childFindings) { $findings.Add($finding) }
        }
    }

    return @($findings)
}

$findings = New-Object System.Collections.Generic.List[string]
foreach ($path in $tracked) {
    $normalizedPath = $path -replace "\\", "/"
    $full = Join-Path $Root $path
    if (-not (Test-Path $full)) { continue }
    $text = Get-Content $full -Raw

    foreach ($rule in $forbiddenLiteralRules) {
        if ($text.Contains($rule.value) -and -not (Test-RuleAllowedForPath -Path $normalizedPath -RuleName $rule.name)) {
            $findings.Add("$path contains forbidden literal $($rule.name)")
        }
    }

    foreach ($rule in $forbiddenRegexRules) {
        if ($text -match $rule.pattern -and -not (Test-RuleAllowedForPath -Path $normalizedPath -RuleName $rule.name)) {
            $findings.Add("$path contains forbidden pattern $($rule.name)")
        }
    }

    if ([System.IO.Path]::GetExtension($normalizedPath) -eq ".json") {
        try {
            $json = $text | ConvertFrom-Json
        }
        catch {
            $findings.Add("$path contains unparsable JSON")
            continue
        }

        $authorityFindings = @(Find-ForbiddenAuthorityState -Value $json -Path "$")
        foreach ($finding in $authorityFindings) {
            $findings.Add("$path $finding")
        }
    }
}

if ($findings.Count -gt 0) {
    $findings | ForEach-Object { Write-Error $_ }
    throw "Public disclosure validation failed."
}

Write-Host "publicDisclosureValidation=passed"
