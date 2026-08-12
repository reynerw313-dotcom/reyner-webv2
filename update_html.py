import os
import re

files = ['index.html', 'profil.html', 'informatika.html', 'bahasa.html']

desktop_nav_addition = """          <a href="playlist.html" id="nav-playlist" class="nav-link px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-slate-400 hover:text-slate-200 hover:bg-slate-900/30">
            <i class="fa-solid fa-music mr-1.5 text-xs"></i> Playlist
          </a>
          <a href="games.html" id="nav-games" class="nav-link px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-slate-400 hover:text-slate-200 hover:bg-slate-900/30">
            <i class="fa-solid fa-gamepad mr-1.5 text-xs"></i> Games
          </a>
          <a href="stats.html" id="nav-stats" class="nav-link px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-slate-400 hover:text-slate-200 hover:bg-slate-900/30">
            <i class="fa-solid fa-chart-pie mr-1.5 text-xs"></i> Stats
          </a>"""

mobile_nav_addition = """        <a href="playlist.html" class="mobile-nav-link block w-full text-left px-4 py-2.5 rounded-lg text-base font-medium text-slate-400 hover:text-white hover:bg-slate-900/40">
          <i class="fa-solid fa-music mr-2"></i> Playlist
        </a>
        <a href="games.html" class="mobile-nav-link block w-full text-left px-4 py-2.5 rounded-lg text-base font-medium text-slate-400 hover:text-white hover:bg-slate-900/40">
          <i class="fa-solid fa-gamepad mr-2"></i> Games
        </a>
        <a href="stats.html" class="mobile-nav-link block w-full text-left px-4 py-2.5 rounded-lg text-base font-medium text-slate-400 hover:text-white hover:bg-slate-900/40">
          <i class="fa-solid fa-chart-pie mr-2"></i> Stats
        </a>"""

player_and_scripts = """  <!-- NATIVE FLOATING MUSIC PLAYER -->
  <div id="music-player-container" class="fixed bottom-4 right-4 z-50 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/50 shadow-2xl shadow-blue-900/20 overflow-hidden transition-all duration-300 flex items-center p-2 gap-3">
    <audio id="bg-music" loop>
      <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">
    </audio>
    <button id="music-toggle" class="h-10 w-10 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-md">
      <i class="fa-solid fa-play" id="music-icon"></i>
    </button>
    <div class="hidden md:flex flex-col pr-3">
      <span class="text-xs font-semibold text-white">Lagu Latar</span>
      <span class="text-[10px] text-slate-400">Terus Berjalan</span>
    </div>
  </div>

  <!-- TOAST CONTAINER FOR ACHIEVEMENTS -->
  <div id="toast-container" class="fixed top-20 right-4 z-50 flex flex-col gap-2 pointer-events-none"></div>

  <!-- Scripts -->
  <script src="assets/js/storage.js"></script>
  <script src="assets/js/theme.js"></script>
  <script src="assets/js/sounds.js"></script>
  <script src="assets/js/player.js"></script>
  <script src="assets/js/router.js"></script>
  """

for filename in files:
    if not os.path.exists(filename):
        print(f"Skipping {filename}")
        continue
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Inject Desktop Nav
    if 'id="nav-playlist"' not in content:
        content = re.sub(
            r'(<a href="bahasa\.html"[^>]*>[\s\S]*?</a>)',
            r'\1\n' + desktop_nav_addition,
            content, count=1
        )
    
    # Inject Mobile Nav
    if 'href="playlist.html" class="mobile-nav-link' not in content:
        content = re.sub(
            r'(<a href="bahasa\.html"[^>]*class="mobile-nav-link[^>]*>[\s\S]*?</a>)',
            r'\1\n' + mobile_nav_addition,
            content, count=1
        )
    
    # Inject Scripts & Player
    if 'id="music-player-container"' not in content:
        # First remove old spotify player if it exists
        if 'id="spotify-player"' in content:
            content = re.sub(r'<!-- FLOATING SPOTIFY PLAYER -->.*?</div>\s*</div>', '', content, flags=re.DOTALL)
            
        # insert before <script src="app.js"></script> if exists, else before </body>
        if '<script src="app.js"></script>' in content:
            content = content.replace('<script src="app.js"></script>', player_and_scripts + '<script src="app.js"></script>')
        else:
            content = content.replace('</body>', player_and_scripts + '\n</body>')
            
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Updated HTML files.")
