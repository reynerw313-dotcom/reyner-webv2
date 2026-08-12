$content = Get-Content -Path "playlist.html" -Raw
$pattern = '(?s)<main[^>]*>.*?(?=<!-- FOOTER -->)'
$newContent = '<main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10 relative">
    <section class="fade-in space-y-8">
      <div class="rounded-2xl bg-navy-900/40 p-6 md:p-8 border border-blue-900/20 shadow-xl shadow-blue-950/10">
        <h1 class="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
          Playlist <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Favorit</span>
        </h1>
        <p class="text-slate-400 max-w-xl text-sm md:text-base mb-6">Pilih playlist untuk diputar di music player.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="playlist-container">
            <!-- Playlists injected by JS -->
        </div>
      </div>
    </section>
'
$content = $content -replace $pattern, $newContent
Set-Content -Path "playlist.html" -Value $content

$content = Get-Content -Path "games.html" -Raw
$newContent = '<main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10 relative">
    <section class="fade-in space-y-8">
      <div class="rounded-2xl bg-navy-900/40 p-6 md:p-8 border border-blue-900/20 shadow-xl shadow-blue-950/10">
        <h1 class="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
          Mini <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Games</span>
        </h1>
        <p class="text-slate-400 max-w-xl text-sm md:text-base mb-6">Mainkan 10 mini game ringan langsung di browser.</p>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" id="games-container">
            <!-- Games injected by JS -->
        </div>
        
        <div id="game-arena" class="hidden mt-8 w-full max-w-2xl mx-auto bg-slate-950 border border-slate-800 rounded-xl p-4 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
             <!-- Active game will be mounted here -->
        </div>
      </div>
    </section>
'
$content = $content -replace $pattern, $newContent
Set-Content -Path "games.html" -Value $content

$content = Get-Content -Path "stats.html" -Raw
$newContent = '<main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10 relative">
    <section class="fade-in space-y-8">
      <div class="rounded-2xl bg-navy-900/40 p-6 md:p-8 border border-blue-900/20 shadow-xl shadow-blue-950/10">
        <h1 class="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
          Statistik <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Bermain</span>
        </h1>
        <p class="text-slate-400 max-w-xl text-sm md:text-base mb-6">Riwayat dan pencapaian Anda selama di website ini.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <canvas id="statsChart"></canvas>
            </div>
            <div class="space-y-4">
                <div class="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                    <h3 class="font-bold text-white mb-2">Ringkasan</h3>
                    <ul class="text-slate-400 text-sm space-y-2">
                        <li class="flex justify-between"><span>Total Main:</span> <span id="stat-played" class="text-white font-mono">0</span></li>
                        <li class="flex justify-between"><span>Kemenangan:</span> <span id="stat-wins" class="text-emerald-400 font-mono">0</span></li>
                        <li class="flex justify-between"><span>Kekalahan:</span> <span id="stat-losses" class="text-red-400 font-mono">0</span></li>
                        <li class="flex justify-between"><span>Login Beruntun:</span> <span id="stat-login" class="text-blue-400 font-mono">0 Hari</span></li>
                    </ul>
                </div>
                <div class="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                    <h3 class="font-bold text-white mb-2">Pencapaian</h3>
                    <div id="achievements-list" class="grid grid-cols-5 gap-2">
                        <!-- Achievements -->
                    </div>
                </div>
                <div class="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                    <h3 class="font-bold text-white mb-2">Daily Challenges</h3>
                    <div id="challenges-list" class="space-y-3">
                        <!-- Challenges -->
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
'
$content = $content -replace $pattern, $newContent
Set-Content -Path "stats.html" -Value $content

Write-Output "Pages updated"
