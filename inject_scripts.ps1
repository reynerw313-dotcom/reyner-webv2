$files = @("index.html", "profil.html", "informatika.html", "bahasa.html", "playlist.html", "games.html", "stats.html")

$newScripts = @"
            <script src="assets/js/playlist.js"></script>
            <script src="assets/js/games.js"></script>
            <script src="assets/js/stats.js"></script>
            <script src="app.js"></script>
"@

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content -Path $file -Raw
        if ($content -notmatch "assets/js/playlist.js") {
            $content = $content -replace '<script src="app.js"></script>', $newScripts
            Set-Content -Path $file -Value $content
        }
    }
}
Write-Output "Scripts injected"
