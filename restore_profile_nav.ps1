$files = @("index.html", "profil.html", "informatika.html", "bahasa.html", "playlist.html", "games.html", "stats.html")

foreach ($file in $files) {
    $filePath = Join-Path (Get-Location) $file
    $content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

    # ── Restore desktop nav link ──────────────────────────────────────────
    # Before: <a data-pin-nav="profil.html" id="nav-profil" class="nav-link ...">
    # After:  <a href="profil.html" id="nav-profil" class="nav-link ...">
    $content = $content.Replace(
        '<a data-pin-nav="profil.html" id="nav-profil"',
        '<a href="profil.html" id="nav-profil"'
    )

    # ── Restore mobile nav link ───────────────────────────────────────────
    # Before: <a data-pin-nav="profil.html" class="mobile-nav-link ...">
    # After:  <a href="profil.html" class="mobile-nav-link ...">
    $content = $content.Replace(
        '<a data-pin-nav="profil.html" class="mobile-nav-link',
        '<a href="profil.html" class="mobile-nav-link'
    )

    # ── Remove style="cursor:pointer;" that was added by old script ───────
    $content = $content.Replace(
        ' style="cursor:pointer;"',
        ''
    )

    # ── Remove profile-pin.js script tag ─────────────────────────────────
    $content = $content.Replace(
        '<script src="assets/js/profile-pin.js"></script>' + [System.Environment]::NewLine,
        ''
    )
    $content = $content.Replace(
        '<script src="assets/js/profile-pin.js"></script>',
        ''
    )

    [System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
    Write-Output "Restored: $file"
}

Write-Output "Done. All nav links restored."
