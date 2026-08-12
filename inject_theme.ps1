$files = @("index.html", "profil.html", "informatika.html", "bahasa.html", "playlist.html", "games.html", "stats.html")

$themeScript = @'
  <!-- Theme flash prevention: apply saved theme before render -->
  <script>
    (function() {
      var theme = localStorage.getItem('portfolio_theme') || 'dark';
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    })();
  </script>
'@

$search   = '  <!-- Tailwind CSS CDN -->'
$replace  = $themeScript + "`n  <!-- Tailwind CSS CDN -->"

foreach ($file in $files) {
    $path    = Join-Path (Get-Location) $file
    $content = Get-Content -Path $path -Raw -Encoding UTF8

    # Remove old theme script block if it was already injected (idempotent)
    $content = $content -replace '(?s)  <!-- Theme flash prevention.*?</script>\r?\n', ''

    # Inject before Tailwind CDN comment
    $content = $content -replace '  <!-- Tailwind CSS CDN -->', $replace

    Set-Content -Path $path -Value $content -Encoding UTF8 -NoNewline
    Write-Output "Patched: $file"
}

Write-Output "Done. All $($files.Count) files patched."
