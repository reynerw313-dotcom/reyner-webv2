const fs = require('fs');
const path = require('path');

const files = ['index.html','profil.html','informatika.html','bahasa.html','playlist.html','games.html','stats.html'];
const scriptTag = '    <script src="assets/js/profile-pin.js"></script>';

files.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    let html = fs.readFileSync(filePath, 'utf8');

    // ── 1. Desktop nav link ──────────────────────────────────────────────
    // Before: <a href="profil.html" id="nav-profil" class="nav-link ...">
    // After:  <a data-pin-nav="profil.html" id="nav-profil" class="nav-link ...">
    html = html.replace(
        /(<a)\s+href="profil\.html"\s+(id="nav-profil"\s+class="nav-link[^"]*")/g,
        '$1 data-pin-nav="profil.html" $2 style="cursor:pointer;"'
    );

    // ── 2. Mobile nav link (single-line or multi-line variants) ──────────
    // Before: <a href="profil.html"\n          class="mobile-nav-link ...">
    // After:  <a data-pin-nav="profil.html"\n          class="mobile-nav-link ...">
    html = html.replace(
        /(<a)\s+href="profil\.html"(\s*\n?\s*)(class="mobile-nav-link[^"]*")/g,
        '$1 data-pin-nav="profil.html"$2$3 style="cursor:pointer;"'
    );

    // ── 3. Inject profile-pin.js before </body> (idempotent) ─────────────
    if (!html.includes('profile-pin.js')) {
        html = html.replace('</body>', scriptTag + '\n</body>');
    }

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Patched: ${file}`);
});

console.log('Done. All files patched.');
