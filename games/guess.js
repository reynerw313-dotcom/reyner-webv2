window.initGuess = function() {
    const arena = document.getElementById('game-content');
    arena.innerHTML = `
        <div class="flex flex-col items-center bg-slate-900 p-8 rounded-xl border border-slate-800 w-full max-w-sm text-center">
            <i class="fa-solid fa-clipboard-question text-5xl text-pink-500 mb-4"></i>
            <h2 class="text-white font-bold text-xl mb-2">Tebak Angka (1-100)</h2>
            <p id="guess-hint" class="text-slate-400 text-sm mb-6">Masukkan tebakanmu!</p>
            <div class="flex gap-2 w-full">
                <input type="number" id="guess-input" class="flex-grow bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-pink-500" min="1" max="100">
                <button id="guess-btn" class="bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded-lg font-bold transition-colors">Tebak</button>
            </div>
        </div>
    `;
    
    let target = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    let gameActive = true;
    
    document.getElementById('game-score').innerText = '0 attempts';
    
    const input = document.getElementById('guess-input');
    const btn = document.getElementById('guess-btn');
    const hint = document.getElementById('guess-hint');

    const handleGuess = () => {
        if (!gameActive) return;
        const val = parseInt(input.value);
        if (isNaN(val)) return;
        
        attempts++;
        document.getElementById('game-score').innerText = attempts + ' attempts';
        
        if (window.SoundManager) window.SoundManager.playClick();

        if (val === target) {
            hint.innerHTML = `<span class="text-emerald-400 font-bold">Benar! Angkanya ${target}. Total: ${attempts} tebakan.</span>`;
            gameActive = false;
            if (window.SoundManager) window.SoundManager.playWin();
            if (window.AchievementManager) window.AchievementManager.trackWin('guess');
        } else if (val < target) {
            hint.innerHTML = `<span class="text-yellow-400">Terlalu kecil!</span>`;
        } else {
            hint.innerHTML = `<span class="text-red-400">Terlalu besar!</span>`;
        }
        input.value = '';
        input.focus();
    };

    btn.onclick = handleGuess;
    input.onkeypress = (e) => { if(e.key === 'Enter') handleGuess(); };

    document.getElementById('game-restart-btn').onclick = () => window.initGuess();

    return { cleanup: () => {} };
};
