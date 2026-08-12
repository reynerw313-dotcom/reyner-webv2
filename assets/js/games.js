const GAMES_LIST = [
    { id: 'snake', name: 'Snake', icon: 'fa-staff-snake', color: 'text-green-500' },
    { id: 'flappy', name: 'Flappy Bird', icon: 'fa-crow', color: 'text-yellow-500' },
    { id: '2048', name: '2048', icon: 'fa-grip', color: 'text-orange-500' },
    { id: 'tictactoe', name: 'Tic Tac Toe', icon: 'fa-xmarks-lines', color: 'text-blue-500' },
    { id: 'memory', name: 'Memory Card', icon: 'fa-clone', color: 'text-purple-500' },
    { id: 'guess', name: 'Tebak Angka', icon: 'fa-clipboard-question', color: 'text-pink-500' },
    { id: 'rps', name: 'Batu Gunting', icon: 'fa-hand-scissors', color: 'text-red-500' },
    { id: 'breakout', name: 'Breakout', icon: 'fa-cubes-stacked', color: 'text-indigo-500' },
    { id: 'whack', name: 'Whack A Mole', icon: 'fa-hammer', color: 'text-amber-500' },
    { id: 'typing', name: 'Typing Test', icon: 'fa-keyboard', color: 'text-cyan-500' }
];

const GamesManager = {
    currentGame: null,
    
    init() {
        const container = document.getElementById('games-container');
        if (!container) return; // not on games page
        
        container.innerHTML = '';
        GAMES_LIST.forEach(game => {
            const el = document.createElement('div');
            el.className = 'bg-slate-900/60 p-4 rounded-xl border border-slate-800 hover:border-blue-500/50 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center gap-2 hover:-translate-y-1';
            el.innerHTML = `
                <div class="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center ${game.color} text-2xl mb-2">
                    <i class="fa-solid ${game.icon}"></i>
                </div>
                <h3 class="text-slate-200 font-bold text-sm leading-tight">${game.name}</h3>
            `;
            el.addEventListener('click', () => this.launchGame(game.id));
            container.appendChild(el);
        });
    },

    launchGame(id) {
        if (window.SoundManager) window.SoundManager.playClick();
        if (window.AchievementManager) window.AchievementManager.trackPlay(id);

        const arena = document.getElementById('game-arena');
        arena.classList.remove('hidden');
        arena.innerHTML = `
            <div class="absolute inset-0 flex items-center justify-center bg-slate-950/80 z-10 backdrop-blur-sm" id="game-loader">
                <i class="fa-solid fa-spinner fa-spin text-blue-500 text-3xl"></i>
            </div>
            <div id="game-ui-header" class="w-full flex justify-between items-center mb-4 text-white font-bold relative z-20">
                <span>Skor: <span id="game-score" class="text-blue-400">0</span></span>
                <button id="game-restart-btn" class="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-xs transition-colors">Restart</button>
            </div>
            <div id="game-content" class="w-full flex-grow relative flex justify-center items-center"></div>
        `;

        // Load script dynamically
        const scriptId = 'script-' + id;
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = `games/${id}.js`;
            script.onload = () => this.startGameLogic(id);
            document.body.appendChild(script);
        } else {
            this.startGameLogic(id);
        }
    },

    startGameLogic(id) {
        document.getElementById('game-loader').classList.add('hidden');
        if (this.currentGame && typeof this.currentGame.cleanup === 'function') {
            this.currentGame.cleanup();
        }
        
        // Assume each game module exposes a global init function like initSnake()
        const initFnName = 'init' + id.charAt(0).toUpperCase() + id.slice(1);
        if (typeof window[initFnName] === 'function') {
            this.currentGame = window[initFnName]();
        } else {
            document.getElementById('game-content').innerHTML = '<p class="text-red-400">Game module not found!</p>';
        }
    }
};

document.addEventListener('DOMContentLoaded', () => GamesManager.init());
window.addEventListener('pageChanged', () => GamesManager.init());
