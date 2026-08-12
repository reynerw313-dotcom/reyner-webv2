window.initMemory = function() {
    const arena = document.getElementById('game-content');
    arena.innerHTML = '<div id="mem-board" class="grid grid-cols-4 gap-2"></div>';
    const board = document.getElementById('mem-board');
    
    const icons = ['fa-ghost', 'fa-cat', 'fa-dog', 'fa-dragon', 'fa-spider', 'fa-hippo', 'fa-frog', 'fa-fish'];
    let cards = [...icons, ...icons].sort(() => Math.random() - 0.5);
    
    let flipped = [];
    let matched = 0;
    let moves = 0;
    let locked = false;

    document.getElementById('game-score').innerText = '0 moves';

    cards.forEach((icon, i) => {
        const card = document.createElement('div');
        card.className = 'w-16 h-16 bg-slate-700 rounded-lg cursor-pointer flex items-center justify-center text-3xl transition-all duration-300 transform';
        card.dataset.icon = icon;
        card.dataset.id = i;
        card.innerHTML = `<i class="fa-solid fa-question text-slate-500"></i>`;
        
        card.onclick = () => {
            if (locked || card.classList.contains('matched') || flipped.find(f => f.id === i)) return;
            
            if (window.SoundManager) window.SoundManager.playClick();
            card.innerHTML = `<i class="fa-solid ${icon} text-white"></i>`;
            card.classList.add('bg-blue-600', 'rotate-y-180');
            
            flipped.push({ id: i, icon, el: card });
            
            if (flipped.length === 2) {
                moves++;
                document.getElementById('game-score').innerText = moves + ' moves';
                locked = true;
                
                if (flipped[0].icon === flipped[1].icon) {
                    matched++;
                    flipped.forEach(f => {
                        f.el.classList.replace('bg-blue-600', 'bg-emerald-500');
                        f.el.classList.add('matched');
                    });
                    flipped = [];
                    locked = false;
                    
                    if (matched === icons.length) {
                        if (window.SoundManager) window.SoundManager.playWin();
                        if (window.AchievementManager) window.AchievementManager.trackWin('memory');
                        setTimeout(() => alert('You win in ' + moves + ' moves!'), 500);
                    }
                } else {
                    setTimeout(() => {
                        flipped.forEach(f => {
                            f.el.innerHTML = `<i class="fa-solid fa-question text-slate-500"></i>`;
                            f.el.classList.replace('bg-blue-600', 'bg-slate-700');
                        });
                        flipped = [];
                        locked = false;
                    }, 1000);
                }
            }
        };
        board.appendChild(card);
    });

    document.getElementById('game-restart-btn').onclick = () => window.initMemory();

    return { cleanup: () => {} };
};
