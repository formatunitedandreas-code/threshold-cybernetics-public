[CmdletBinding()]
param([string] $Root = "")

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($Root)) {
    $Root = (Resolve-Path (Join-Path $PSScriptRoot "..\..\..")).Path
}
$files = @(Get-ChildItem (Join-Path $Root "case-studies/petclinic-pr185") -Recurse -File -Include *.md)
$bad = New-Object System.Collections.Generic.List[string]
foreach ($file in $files) {
    $text = Get-Content $file.FullName -Raw
    if ($text -match 'file://') { $bad.Add("$($file.FullName) contains file:// link") }
    if ($text -match '[A-Za-z]:/') { $bad.Add("$($file.FullName) contains absolute Windows-style path") }
    $matches = [regex]::Matches($text, '\[[^\]]+\]\(([^)]+)\)')
    foreach ($m in $matches) {
        $target = $m.Groups[1].Value
        if ($target -match '^(https?|mailto):') { continue }
        if ($target.StartsWith('#')) { continue }
        $clean = ($target -split '#')[0]
        if ([string]::IsNullOrWhiteSpace($clean)) { continue }
        $resolved = Join-Path $file.DirectoryName $clean
        if (-not (Test-Path $resolved)) { $bad.Add("Broken relative link in $($file.FullName): $target") }
    }
}
foreach ($svg in Get-ChildItem (Join-Path $Root "case-studies/petclinic-pr185/docs/media") -Filter *.svg) {
    [xml](Get-Content $svg.FullName -Raw) | Out-Null
    $svgText = Get-Content $svg.FullName -Raw
    $nonNamespaceRemote = [regex]::IsMatch($svgText, '(?<!xmlns=")https?://')
    if ($svgText -match '<script' -or $nonNamespaceRemote -or $svgText -match 'base64') { $bad.Add("Unsafe SVG content: $($svg.Name)") }
}
foreach ($json in Get-ChildItem (Join-Path $Root "case-studies/petclinic-pr185") -Recurse -File -Filter *.json) {
    Get-Content $json.FullName -Raw | ConvertFrom-Json | Out-Null
}
if ($bad.Count -gt 0) { $bad | ForEach-Object { Write-Error $_ }; throw "Relative link validation failed" }
Write-Host "relativeLinksAndStructuredFiles=passed"
