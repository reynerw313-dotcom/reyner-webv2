window.init2048 = function() {
    const arena = document.getElementById('game-content');
    arena.innerHTML = `
        <div id="grid-2048" class="grid grid-cols-4 gap-2 bg-slate-800 p-2 rounded-xl w-[300px] h-[300px]"></div>
    `;
    const grid = document.getElementById('grid-2048');
    let board = Array(16).fill(0);
    let score = 0;

    const colors = {
        0: 'bg-slate-700 text-transparent',
        2: 'bg-slate-600 text-slate-200',
        4: 'bg-slate-500 text-white',
        8: 'bg-orange-400 text-white',
        16: 'bg-orange-500 text-white',
        32: 'bg-red-400 text-white',
        64: 'bg-red-500 text-white',
        128: 'bg-yellow-400 text-white',
        256: 'bg-yellow-500 text-white drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]',
        512: 'bg-yellow-600 text-white',
        1024: 'bg-emerald-400 text-white drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]',
        2048: 'bg-emerald-500 text-white drop-shadow-[0_0_15px_rgba(16,185,129,0.9)]'
    };

    function addTile() {
        let empty = board.map((v, i) => v === 0 ? i : -1).filter(v => v !== -1);
        if (empty.length > 0) {
            let idx = empty[Math.floor(Math.random() * empty.length)];
            board[idx] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    function render() {
        grid.innerHTML = '';
        board.forEach(v => {
            const cell = document.createElement('div');
            const col = colors[v] || 'bg-black text-white';
            cell.className = `flex items-center justify-center font-bold text-2xl rounded-lg ${col}`;
            cell.innerText = v;
            grid.appendChild(cell);
        });
        document.getElementById('game-score').innerText = score;
    }

    function slide(row) {
        let arr = row.filter(val => val);
        let missing = 4 - arr.length;
        let zeros = Array(missing).fill(0);
        return arr.concat(zeros);
    }

    function combine(row) {
        for (let i = 0; i < 3; i++) {
            if (row[i] !== 0 && row[i] === row[i + 1]) {
                row[i] *= 2;
                score += row[i];
                row[i + 1] = 0;
            }
        }
        return row;
    }

    function operate(row) {
        row = slide(row);
        row = combine(row);
        row = slide(row);
        return row;
    }

    function moveLeft() {
        let changed = false;
        for (let i = 0; i < 16; i += 4) {
            let row = [board[i], board[i+1], board[i+2], board[i+3]];
            let newRow = operate(row);
            for(let j=0; j<4; j++) {
                if(board[i+j] !== newRow[j]) changed = true;
                board[i+j] = newRow[j];
            }
        }
        return changed;
    }

    function moveRight() {
        let changed = false;
        for (let i = 0; i < 16; i += 4) {
            let row = [board[i], board[i+1], board[i+2], board[i+3]];
            row.reverse();
            let newRow = operate(row);
            newRow.reverse();
            for(let j=0; j<4; j++) {
                if(board[i+j] !== newRow[j]) changed = true;
                board[i+j] = newRow[j];
            }
        }
        return changed;
    }

    function moveUp() {
        let changed = false;
        for (let i = 0; i < 4; i++) {
            let col = [board[i], board[i+4], board[i+8], board[i+12]];
            let newCol = operate(col);
            for(let j=0; j<4; j++) {
                if(board[i + j*4] !== newCol[j]) changed = true;
                board[i + j*4] = newCol[j];
            }
        }
        return changed;
    }

    function moveDown() {
        let changed = false;
        for (let i = 0; i < 4; i++) {
            let col = [board[i], board[i+4], board[i+8], board[i+12]];
            col.reverse();
            let newCol = operate(col);
            newCol.reverse();
            for(let j=0; j<4; j++) {
                if(board[i + j*4] !== newCol[j]) changed = true;
                board[i + j*4] = newCol[j];
            }
        }
        return changed;
    }

    const handleKey = (e) => {
        let changed = false;
        if (e.key === 'ArrowLeft') changed = moveLeft();
        else if (e.key === 'ArrowRight') changed = moveRight();
        else if (e.key === 'ArrowUp') changed = moveUp();
        else if (e.key === 'ArrowDown') changed = moveDown();
        
        if (changed) {
            if(window.SoundManager) window.SoundManager.playClick();
            addTile();
            render();
            if (window.AchievementManager) window.AchievementManager.trackScore('2048', score);
            checkGameOver();
        }
    };
    
    function checkGameOver() {
        if (!board.includes(0)) {
            // Check if any moves possible
            let canMove = false;
            for(let i=0; i<16; i++) {
                if(i%4 < 3 && board[i] === board[i+1]) canMove = true;
                if(i < 12 && board[i] === board[i+4]) canMove = true;
            }
            if(!canMove) {
                if (window.SoundManager) window.SoundManager.playLose();
                if (window.AchievementManager) window.AchievementManager.trackLoss('2048');
                alert('Game Over! Skor: ' + score);
            }
        }
    }

    document.addEventListener('keydown', handleKey);
    document.getElementById('game-restart-btn').onclick = () => {
        window.init2048();
    };

    addTile();
    addTile();
    render();

    return {
        cleanup: () => {
            document.removeEventListener('keydown', handleKey);
        }
    };
};
