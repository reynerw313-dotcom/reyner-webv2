window.initTictactoe = function() {
    const arena = document.getElementById('game-content');
    arena.innerHTML = `
        <div class="flex flex-col items-center">
            <div id="ttt-status" class="text-white text-xl mb-4 font-bold">Giliran: X</div>
            <div id="ttt-board" class="grid grid-cols-3 gap-2 bg-slate-800 p-2 rounded-xl"></div>
        </div>
    `;
    const board = document.getElementById('ttt-board');
    const status = document.getElementById('ttt-status');
    let cells = Array(9).fill('');
    let currentPlayer = 'X';
    let gameActive = true;

    function render() {
        board.innerHTML = '';
        cells.forEach((val, i) => {
            const cell = document.createElement('div');
            cell.className = 'w-24 h-24 bg-slate-700 flex items-center justify-center text-5xl font-bold rounded-lg cursor-pointer hover:bg-slate-600 transition-colors';
            if (val === 'X') cell.classList.add('text-blue-400');
            if (val === 'O') cell.classList.add('text-red-400');
            cell.innerText = val;
            cell.onclick = () => handleClick(i);
            board.appendChild(cell);
        });
    }

    function checkWin() {
        const winConditions = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
        ];
        for (let cond of winConditions) {
            let [a,b,c] = cond;
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                gameActive = false;
                status.innerText = `Pemenang: ${cells[a]}`;
                if (cells[a] === 'X') {
                    if (window.SoundManager) window.SoundManager.playWin();
                    if (window.AchievementManager) window.AchievementManager.trackWin('tictactoe');
                } else {
                    if (window.SoundManager) window.SoundManager.playLose();
                    if (window.AchievementManager) window.AchievementManager.trackLoss('tictactoe');
                }
                return true;
            }
        }
        if (!cells.includes('')) {
            gameActive = false;
            status.innerText = 'Seri!';
            return true;
        }
        return false;
    }

    function computerMove() {
        if (!gameActive) return;
        let empty = cells.map((v, i) => v === '' ? i : -1).filter(v => v !== -1);
        if (empty.length > 0) {
            let idx = empty[Math.floor(Math.random() * empty.length)];
            cells[idx] = 'O';
            if (window.SoundManager) window.SoundManager.playClick();
            if (!checkWin()) {
                currentPlayer = 'X';
                status.innerText = 'Giliran: X';
            }
            render();
        }
    }

    function handleClick(i) {
        if (cells[i] !== '' || !gameActive || currentPlayer !== 'X') return;
        cells[i] = 'X';
        if (window.SoundManager) window.SoundManager.playClick();
        
        if (!checkWin()) {
            currentPlayer = 'O';
            status.innerText = 'Giliran: O (Komputer)';
            render();
            setTimeout(computerMove, 500);
        } else {
            render();
        }
    }

    document.getElementById('game-restart-btn').onclick = () => {
        window.initTictactoe();
    };

    render();

    return {
        cleanup: () => {}
    };
};
