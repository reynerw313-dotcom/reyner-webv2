window.initWhack = function() {
    const arena = document.getElementById('game-content');
    arena.innerHTML = `
        <div class="flex flex-col items-center">
            <div class="mb-4 text-white font-bold">Waktu: <span id="whack-time" class="text-pink-400">30</span>s</div>
            <div id="whack-board" class="grid grid-cols-3 gap-4 bg-amber-900 p-6 rounded-xl border-4 border-amber-800 relative cursor-crosshair"></div>
        </div>
    `;
    const board = document.getElementById('whack-board');
    let holes = [];
    let score = 0;
    let time = 30;
    let activeHole = -1;
    let gameLoop, timeLoop;
    
    document.getElementById('game-score').innerText = score;

    for (let i = 0; i < 9; i++) {
        const hole = document.createElement('div');
        hole.className = 'w-20 h-20 bg-black/40 rounded-full flex justify-center items-end overflow-hidden relative shadow-inner';
        const mole = document.createElement('div');
        mole.className = 'w-16 h-20 bg-amber-700 rounded-t-full transition-transform duration-200 transform translate-y-full flex items-center justify-center';
        mole.innerHTML = '<div class="w-8 h-4 bg-pink-300 rounded-full mb-8"></div>'; // simple snout
        
        mole.onmousedown = (e) => {
            if (time <= 0) return;
            score++;
            document.getElementById('game-score').innerText = score;
            if (window.SoundManager) window.SoundManager.playClick();
            if (window.AchievementManager) window.AchievementManager.trackScore('whack', score);
            mole.classList.add('translate-y-full');
            activeHole = -1;
            
            // show +1 effect
            const p = document.createElement('span');
            p.innerText = '+1';
            p.className = 'absolute text-yellow-400 font-bold text-xl animate-ping';
            hole.appendChild(p);
            setTimeout(() => p.remove(), 500);
        };
        
        hole.appendChild(mole);
        board.appendChild(hole);
        holes.push(mole);
    }

    function pop() {
        if (time <= 0) return;
        if (activeHole !== -1) holes[activeHole].classList.add('translate-y-full');
        
        activeHole = Math.floor(Math.random() * 9);
        holes[activeHole].classList.remove('translate-y-full');
        
        let waitTime = Math.random() * 800 + 400;
        gameLoop = setTimeout(pop, waitTime);
    }

    function tick() {
        time--;
        document.getElementById('whack-time').innerText = time;
        if (time <= 0) {
            clearTimeout(gameLoop);
            clearInterval(timeLoop);
            if (activeHole !== -1) holes[activeHole].classList.add('translate-y-full');
            if (window.SoundManager) window.SoundManager.playLose(); // Actually just game over sound
            if (score > 15 && window.AchievementManager) window.AchievementManager.trackWin('whack');
            alert('Waktu Habis! Skor: ' + score);
        }
    }

    document.getElementById('game-restart-btn').onclick = () => {
        clearTimeout(gameLoop);
        clearInterval(timeLoop);
        window.initWhack();
    };

    pop();
    timeLoop = setInterval(tick, 1000);

    return {
        cleanup: () => {
            clearTimeout(gameLoop);
            clearInterval(timeLoop);
        }
    };
};
