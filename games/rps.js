window.initRps = function() {
    const arena = document.getElementById('game-content');
    arena.innerHTML = `
        <div class="flex flex-col items-center w-full max-w-md">
            <div class="flex justify-between w-full mb-8 px-4 text-center">
                <div>
                    <h3 class="text-white font-bold">Kamu</h3>
                    <div id="rps-player" class="text-6xl text-slate-500 mt-4"><i class="fa-solid fa-circle-question"></i></div>
                </div>
                <div class="flex flex-col justify-center">
                    <span id="rps-vs" class="text-slate-600 font-black text-2xl">VS</span>
                </div>
                <div>
                    <h3 class="text-white font-bold">Komputer</h3>
                    <div id="rps-comp" class="text-6xl text-slate-500 mt-4"><i class="fa-solid fa-circle-question"></i></div>
                </div>
            </div>
            
            <div id="rps-result" class="text-2xl font-bold text-white mb-8 h-8">Pilih Senjatamu!</div>
            
            <div class="flex gap-4">
                <button class="rps-btn bg-slate-800 hover:bg-slate-700 w-20 h-20 rounded-full flex items-center justify-center text-4xl text-blue-400 transition-colors shadow-lg" data-choice="rock"><i class="fa-solid fa-hand-back-fist"></i></button>
                <button class="rps-btn bg-slate-800 hover:bg-slate-700 w-20 h-20 rounded-full flex items-center justify-center text-4xl text-green-400 transition-colors shadow-lg" data-choice="paper"><i class="fa-solid fa-hand"></i></button>
                <button class="rps-btn bg-slate-800 hover:bg-slate-700 w-20 h-20 rounded-full flex items-center justify-center text-4xl text-red-400 transition-colors shadow-lg" data-choice="scissors"><i class="fa-solid fa-hand-scissors"></i></button>
            </div>
        </div>
    `;

    const choices = ['rock', 'paper', 'scissors'];
    const icons = {
        'rock': '<i class="fa-solid fa-hand-back-fist text-blue-400"></i>',
        'paper': '<i class="fa-solid fa-hand text-green-400"></i>',
        'scissors': '<i class="fa-solid fa-hand-scissors text-red-400"></i>'
    };

    let score = 0;

    document.querySelectorAll('.rps-btn').forEach(btn => {
        btn.onclick = () => {
            const playerChoice = btn.dataset.choice;
            const compChoice = choices[Math.floor(Math.random() * choices.length)];
            
            document.getElementById('rps-player').innerHTML = icons[playerChoice];
            
            // Animation for comp
            const compEl = document.getElementById('rps-comp');
            compEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-slate-500"></i>';
            document.getElementById('rps-result').innerText = '...';
            
            setTimeout(() => {
                compEl.innerHTML = icons[compChoice];
                
                let result = '';
                if (playerChoice === compChoice) {
                    result = 'Seri!';
                    document.getElementById('rps-result').className = 'text-2xl font-bold text-yellow-400 mb-8 h-8';
                } else if (
                    (playerChoice === 'rock' && compChoice === 'scissors') ||
                    (playerChoice === 'paper' && compChoice === 'rock') ||
                    (playerChoice === 'scissors' && compChoice === 'paper')
                ) {
                    result = 'Kamu Menang!';
                    document.getElementById('rps-result').className = 'text-2xl font-bold text-emerald-400 mb-8 h-8';
                    score++;
                    document.getElementById('game-score').innerText = score;
                    if (window.SoundManager) window.SoundManager.playWin();
                    if (window.AchievementManager) window.AchievementManager.trackWin('rps');
                } else {
                    result = 'Komputer Menang!';
                    document.getElementById('rps-result').className = 'text-2xl font-bold text-red-400 mb-8 h-8';
                    if (window.SoundManager) window.SoundManager.playLose();
                    if (window.AchievementManager) window.AchievementManager.trackLoss('rps');
                }
                document.getElementById('rps-result').innerText = result;
            }, 600);
        };
    });

    document.getElementById('game-restart-btn').onclick = () => window.initRps();

    return { cleanup: () => {} };
};
