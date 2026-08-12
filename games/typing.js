window.initTyping = function() {
    const arena = document.getElementById('game-content');
    arena.innerHTML = `
        <div class="flex flex-col items-center w-full max-w-lg p-6 bg-slate-900 border border-slate-700 rounded-xl">
            <h2 class="text-white font-bold text-xl mb-4">Tes Kecepatan Ketik</h2>
            <div id="type-word" class="text-4xl font-mono font-bold text-cyan-400 mb-6 tracking-widest text-center select-none"></div>
            <input type="text" id="type-input" class="w-full bg-slate-950 border-2 border-slate-700 focus:border-cyan-500 rounded-lg p-4 text-xl text-center text-white outline-none font-mono" placeholder="Ketik kata di atas..." autocomplete="off">
            <div class="flex justify-between w-full mt-4 text-sm font-bold">
                <span class="text-slate-400">Waktu: <span id="type-time" class="text-white">60</span>s</span>
                <span class="text-slate-400">WPM: <span id="type-wpm" class="text-emerald-400">0</span></span>
            </div>
        </div>
    `;
    
    const words = ['javascript', 'indonesia', 'programmer', 'website', 'portofolio', 'animasi', 'teknologi', 'komputer', 'internet', 'database', 'frontend', 'backend', 'fullstack', 'framework', 'aplikasi', 'mobile', 'responsif', 'optimasi', 'performa', 'keamanan'];
    
    let currentWord = '';
    let score = 0;
    let time = 60;
    let playing = false;
    let timeLoop;
    let totalChars = 0;
    
    const wordEl = document.getElementById('type-word');
    const inputEl = document.getElementById('type-input');
    const timeEl = document.getElementById('type-time');
    const wpmEl = document.getElementById('type-wpm');
    
    document.getElementById('game-score').innerText = score;

    function newWord() {
        currentWord = words[Math.floor(Math.random() * words.length)];
        wordEl.innerText = currentWord;
        inputEl.value = '';
    }

    function tick() {
        if (!playing) return;
        time--;
        timeEl.innerText = time;
        
        let wpm = Math.floor((totalChars / 5) / ((60 - time) / 60));
        if(isNaN(wpm) || wpm === Infinity) wpm = 0;
        wpmEl.innerText = wpm;

        if (time <= 0) {
            playing = false;
            clearInterval(timeLoop);
            inputEl.disabled = true;
            if (window.SoundManager) window.SoundManager.playLose();
            if (window.AchievementManager) window.AchievementManager.trackScore('typing', wpm);
            if (wpm > 50 && window.AchievementManager) window.AchievementManager.trackWin('typing');
            alert('Waktu Habis! WPM Anda: ' + wpm);
        }
    }

    inputEl.addEventListener('input', () => {
        if (!playing && time === 60 && inputEl.value.length > 0) {
            playing = true;
            timeLoop = setInterval(tick, 1000);
        }
        
        if (inputEl.value.trim().toLowerCase() === currentWord) {
            score++;
            totalChars += currentWord.length + 1; // +1 for space
            document.getElementById('game-score').innerText = score;
            if (window.SoundManager) window.SoundManager.playClick();
            newWord();
        }
    });

    document.getElementById('game-restart-btn').onclick = () => {
        clearInterval(timeLoop);
        window.initTyping();
    };

    newWord();
    inputEl.focus();

    return {
        cleanup: () => {
            clearInterval(timeLoop);
        }
    };
};
