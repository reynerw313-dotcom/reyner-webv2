$files = @(
    "index.html", "profil.html", "informatika.html", 
    "bahasa.html", "games.html", "playlist.html", "stats.html"
)

$desktopNav = '        <!-- Theme & Sound Toggles -->
        <div class="hidden md:flex items-center gap-2 border-r border-slate-800 pr-3 mr-3">
          <button id="theme-toggle-desktop" class="p-2 text-slate-400 hover:text-amber-400 bg-slate-900/50 hover:bg-slate-800/60 rounded-full border border-slate-800 transition-all duration-300" title="Toggle Theme">
            <i class="fa-solid fa-moon text-lg dark:hidden"></i>
            <i class="fa-solid fa-sun text-lg hidden dark:block"></i>
          </button>
          <button id="sound-toggle-desktop" class="p-2 text-slate-400 hover:text-blue-400 bg-slate-900/50 hover:bg-slate-800/60 rounded-full border border-slate-800 transition-all duration-300" title="Toggle Sound">
            <i class="fa-solid fa-volume-high text-lg" id="sound-icon-desktop"></i>
          </button>
        </div>

        <!-- Social Media Shortcuts (Header Right) -->'

$mobileNav = '        <!-- Theme & Sound Toggles Mobile -->
        <div class="pt-4 pb-2 border-t border-slate-800 flex justify-around">
          <button id="theme-toggle-mobile" class="p-2 text-slate-400 hover:text-amber-400 transition-colors">
            <i class="fa-solid fa-moon text-xl dark:hidden"></i>
            <i class="fa-solid fa-sun text-xl hidden dark:block"></i>
          </button>
          <button id="sound-toggle-mobile" class="p-2 text-slate-400 hover:text-blue-400 transition-colors">
            <i class="fa-solid fa-volume-high text-xl" id="sound-icon-mobile"></i>
          </button>
        </div>

        <!-- Social Media Icons in Mobile Menu -->'

$spotifyPlayer = '            <!-- FLOATING SPOTIFY PLAYER -->
            <div id="spotify-player-container" class="fixed bottom-4 right-4 z-50 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/50 shadow-2xl shadow-blue-900/20 transition-all duration-300 transform translate-y-0" style="width: 300px; height: 152px;">
              <div id="embed-iframe" class="w-full h-full"></div>
              <!-- Custom overlay button to minimize since iframe steals clicks -->
              <button id="minimize-player" class="absolute top-1 right-1 text-slate-300 hover:text-white transition-colors z-10 bg-black/60 rounded-full w-6 h-6 flex items-center justify-center shadow-lg" title="Minimize">
                <i class="fa-solid fa-chevron-down text-[10px]"></i>
              </button>
            </div>
            
            <!-- MINIMIZED PLAYER TOGGLE -->
            <button id="maximize-player" class="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-white shadow-xl shadow-[#1DB954]/30 flex items-center justify-center transition-all duration-300 transform scale-0 opacity-0 pointer-events-none cursor-pointer" title="Expand Spotify">
              <i class="fa-brands fa-spotify text-3xl"></i>
            </button>'

foreach ($f in $files) {
    if (Test-Path $f) {
        $content = Get-Content $f -Raw -Encoding UTF8

        # Replace Desktop Nav
        if ($content -notmatch 'id="theme-toggle-desktop"') {
            $content = $content -replace '        <!-- Social Media Shortcuts \(Header Right\) -->', $desktopNav
        }
        
        # Replace Mobile Nav
        if ($content -notmatch 'id="theme-toggle-mobile"') {
            $content = $content -replace '        <!-- Social Media Icons in Mobile Menu -->', $mobileNav
        }
        
        # Replace Player
        if ($content -notmatch '<!-- FLOATING SPOTIFY PLAYER -->') {
            $content = $content -replace '(?s)            <!-- NATIVE FLOATING MUSIC PLAYER -->.*?</div>\s*</div>', $spotifyPlayer
        }

        Set-Content $f -Value $content -Encoding UTF8
    }
}
Write-Output "Done"
