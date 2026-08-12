import os
import re

files = [
    'index.html', 'profil.html', 'informatika.html', 
    'bahasa.html', 'games.html', 'playlist.html', 'stats.html'
]

css_link = '<link rel="stylesheet" href="assets/css/player.css">'

new_player_html = """
            <!-- SPOTIFY PLAYLIST DRAWER (SLIDE UP) -->
            <div id="spotify-playlist-drawer" class="fixed bottom-24 md:bottom-28 right-4 md:right-8 w-[calc(100%-2rem)] sm:w-[400px] h-[500px] flex flex-col p-4 hidden-drawer">
              <!-- Drawer Header -->
              <div class="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 class="font-display font-bold text-white text-base">Spotify Playlist & Queue</h3>
                <button id="close-drawer" class="text-slate-400 hover:text-white transition-colors">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
              
              <!-- Search & Filter -->
              <div class="mt-3 space-y-3">
                <div class="relative">
                  <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
                    <i class="fa-solid fa-magnifying-glass text-xs"></i>
                  </span>
                  <input type="text" id="drawer-search" placeholder="Cari lagu atau artis..." 
                    class="w-full pl-9 pr-4 py-1.5 rounded-lg text-xs bg-slate-950/60 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-[#1DB954] focus:ring-1 focus:ring-[#1DB954] transition-all">
                </div>
                
                <!-- Filter Tabs -->
                <div class="flex gap-1 overflow-x-auto pb-1 text-[11px] font-medium border-b border-slate-800/40">
                  <button id="tab-all" class="px-2.5 py-1 rounded bg-slate-800 text-white transition-colors shrink-0">Semua</button>
                  <button id="tab-favorite" class="px-2.5 py-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0">Favorit</button>
                  <button id="tab-recent" class="px-2.5 py-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0">Baru Diputar</button>
                  <button id="tab-queue" class="px-2.5 py-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0">Antrean</button>
                </div>
              </div>
              
              <!-- Scrollable Track List -->
              <div id="drawer-playlist-container" class="playlist-scroll overflow-y-auto flex-grow space-y-1.5 mt-3 pr-1">
                <!-- Dynamically populated by JS -->
              </div>
            </div>

            <!-- SPOTIFY PERSISTENT BOTTOM PLAYER BAR -->
            <div id="spotify-player-bar" class="fixed bottom-0 left-0 right-0 h-20 md:h-24 z-50 flex items-center justify-between px-4 md:px-8 select-none">
              <!-- Left: Song details -->
              <div class="flex items-center gap-3 w-1/3 min-w-0">
                <div class="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-slate-850 overflow-hidden shrink-0 shadow-md relative group">
                  <img id="player-cover" src="https://picsum.photos/seed/song1/200/200" alt="Cover" class="w-full h-full object-cover">
                  <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" id="player-cover-action">
                    <i class="fa-solid fa-chevron-up text-white text-xs"></i>
                  </div>
                </div>
                <div class="min-w-0">
                  <h4 id="player-title" class="text-white font-bold text-xs md:text-sm truncate w-24 sm:w-40 md:w-48 leading-normal" title="No Song">No Song Playing</h4>
                  <p id="player-artist" class="text-slate-400 text-[10px] md:text-xs truncate w-24 sm:w-40 md:w-48 leading-normal">Select a track</p>
                </div>
                <button id="player-like-btn" class="btn-spotify text-xs md:text-sm p-1 ml-1 hover:scale-110 transition-transform">
                  <i class="fa-regular fa-heart"></i>
                </button>
                <div class="relative shrink-0">
                  <button id="player-more-btn" class="btn-spotify text-xs md:text-sm p-1 hover:scale-110 transition-transform">
                    <i class="fa-solid fa-ellipsis"></i>
                  </button>
                  <!-- More Dropdown Menu -->
                  <div id="player-more-menu" class="hidden absolute bottom-10 left-0 w-44 bg-slate-900 border border-slate-800 rounded-lg shadow-xl py-1 z-50 text-xs">
                    <button id="menu-add-queue" class="w-full text-left px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2">
                      <i class="fa-solid fa-list-ul"></i> Tambah ke Antrean
                    </button>
                    <button id="menu-share" class="w-full text-left px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2">
                      <i class="fa-solid fa-share-nodes"></i> Bagikan Lagu
                    </button>
                  </div>
                </div>
              </div>

              <!-- Center: Controls & Seekbar -->
              <div class="flex flex-col items-center w-1/3 max-w-[500px]">
                <div class="flex items-center gap-4 md:gap-6 justify-center mb-1.5 md:mb-2">
                  <button id="player-shuffle" class="btn-spotify text-[11px] md:text-xs" title="Shuffle">
                    <i class="fa-solid fa-shuffle"></i>
                  </button>
                  <button id="player-prev" class="btn-spotify text-[11px] md:text-xs" title="Previous">
                    <i class="fa-solid fa-backward-step"></i>
                  </button>
                  <button id="player-play-pause" class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#1DB954] text-white flex items-center justify-center hover:scale-105 hover:bg-[#1ed760] transition-all duration-200 shadow-md" title="Play">
                    <i class="fa-solid fa-play text-sm text-black ml-0.5" id="play-pause-icon"></i>
                  </button>
                  <button id="player-next" class="btn-spotify text-[11px] md:text-xs" title="Next">
                    <i class="fa-solid fa-forward-step"></i>
                  </button>
                  <button id="player-repeat" class="btn-spotify text-[11px] md:text-xs" title="Repeat">
                    <i class="fa-solid fa-repeat"></i>
                  </button>
                </div>
                
                <!-- Seek Bar -->
                <div class="flex items-center gap-2.5 text-[10px] md:text-xs text-slate-400 w-full select-none">
                  <span id="player-current-time" class="font-mono">0:00</span>
                  <div class="relative flex-grow flex items-center h-4 group">
                    <input type="range" id="player-progress" min="0" max="100" value="0" class="spotify-slider filled w-full" style="--fill-percent: 0%;">
                  </div>
                  <span id="player-duration" class="font-mono">0:00</span>
                </div>
              </div>

              <!-- Right: Volume & Extras -->
              <div class="flex items-center justify-end gap-3 md:gap-4 w-1/3">
                <!-- Playlist toggle -->
                <button id="player-drawer-toggle" class="btn-spotify text-xs md:text-sm p-1.5" title="Buka Playlist">
                  <i class="fa-solid fa-list-ul"></i>
                </button>
                
                <!-- Volume slider -->
                <div class="flex items-center gap-2">
                  <button id="player-volume-btn" class="btn-spotify text-xs md:text-sm" title="Mute">
                    <i class="fa-solid fa-volume-high" id="volume-icon"></i>
                  </button>
                  <input type="range" id="player-volume" min="0" max="100" value="70" class="spotify-slider filled w-16 md:w-20" style="--fill-percent: 70%;">
                </div>

                <!-- Collapse player -->
                <button id="player-minimize-btn" class="btn-spotify text-xs p-1 hover:text-red-400" title="Collapse Player">
                  <i class="fa-solid fa-chevron-down"></i>
                </button>
              </div>
            </div>
            
            <!-- FLOATING MAXIMIZE PLAYER TRIGGER -->
            <button id="maximize-player" class="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-white shadow-xl shadow-[#1DB954]/30 flex items-center justify-center transition-all duration-300 transform scale-0 opacity-0 pointer-events-none cursor-pointer" title="Expand Player">
              <i class="fa-solid fa-music text-xl text-black"></i>
            </button>
"""

for filename in files:
    if not os.path.exists(filename):
        continue
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Inject player.css link in <head>
    if 'assets/css/player.css' not in content:
        if 'style.css' in content:
            content = content.replace('<link rel="stylesheet" href="style.css">', f'<link rel="stylesheet" href="style.css">\n  {css_link}')
        else:
            content = content.replace('</head>', f'  {css_link}\n</head>')

    # 2. Replace old player with new player
    # Locate FLOATING SPOTIFY PLAYER and MINIMIZED PLAYER TOGGLE
    # Or just replace old structure
    pattern = r'<!-- FLOATING SPOTIFY PLAYER -->[\s\S]*?<!-- MINIMIZED PLAYER TOGGLE -->\s*<button id="maximize-player"[\s\S]*?</button>'
    if re.search(pattern, content):
        content = re.sub(pattern, new_player_html.strip(), content)
    else:
        # Fallback if comment is missing, replace using id="spotify-player-container"
        pattern2 = r'<div id="spotify-player-container"[\s\S]*?<button id="maximize-player"[\s\S]*?</button>'
        if re.search(pattern2, content):
            content = re.sub(pattern2, new_player_html.strip(), content)
        else:
            # If not found, inject before toast-container
            if '<!-- TOAST CONTAINER FOR ACHIEVEMENTS -->' in content:
                content = content.replace('<!-- TOAST CONTAINER FOR ACHIEVEMENTS -->', new_player_html + '\n            <!-- TOAST CONTAINER FOR ACHIEVEMENTS -->')

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("All HTML files updated successfully with new Spotify player layout and CSS link.")
