$files = @("index.html", "profil.html", "informatika.html", "bahasa.html", "playlist.html", "games.html", "stats.html")
$oldTag = '<script src="assets/js/router.js"></script>'
$newTags = '<script src="assets/js/router.js"></script>' + [System.Environment]::NewLine + '            <script src="assets/js/profile-pin.js"></script>'

foreach ($file in $files) {
    $filePath = Join-Path (Get-Location) $file
    $content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

    if ($content -notlike '*profile-pin.js*') {
        $content = $content.Replace($oldTag, $newTags)
        [System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
        Write-Output "Injected script: $file"
    } else {
        Write-Output "Already has script: $file"
    }
}
Write-Output "Done."
