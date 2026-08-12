const ACHIEVEMENTS = [
    { id: 'first_play', title: 'Pemain Baru', desc: 'Memainkan game untuk pertama kali.', icon: 'fa-gamepad' },
    { id: 'win_10', title: 'Veteran', desc: 'Menang 10 kali di game apapun.', icon: 'fa-trophy' },
    { id: 'snake_100', title: 'Raja Ular', desc: 'Mendapat skor 100 di Snake.', icon: 'fa-staff-snake' },
    { id: 'play_all', title: 'Penjelajah', desc: 'Memainkan semua 10 game.', icon: 'fa-compass' },
    { id: 'login_7', title: 'Setia', desc: 'Bermain selama 7 hari berturut-turut.', icon: 'fa-calendar-check' }
];

const AchievementManager = {
    unlocked: [],
    stats: {},
    
    init() {
        this.unlocked = window.AppStorage ? window.AppStorage.get('achievements', []) : [];
        this.stats = window.AppStorage ? window.AppStorage.get('stats', {
            gamesPlayed: 0,
            wins: 0,
            losses: 0,
            playedGamesList: [],
            loginDays: 1,
            lastLogin: new Date().toDateString()
        }) : {};

        this.checkLoginSequence();
    },

    saveStats() {
        if(window.AppStorage) {
            window.AppStorage.set('stats', this.stats);
            window.AppStorage.set('achievements', this.unlocked);
        }
    },

    checkLoginSequence() {
        const today = new Date().toDateString();
        if (this.stats.lastLogin !== today) {
            const lastDate = new Date(this.stats.lastLogin);
            const currentDate = new Date(today);
            const diffTime = Math.abs(currentDate - lastDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            
            if (diffDays === 1) {
                this.stats.loginDays += 1;
            } else {
                this.stats.loginDays = 1; // Reset
            }
            this.stats.lastLogin = today;
            this.saveStats();
            
            if (this.stats.loginDays >= 7) {
                this.unlock('login_7');
            }
        }
    },

    trackPlay(gameId) {
        this.stats.gamesPlayed += 1;
        if (!this.stats.playedGamesList.includes(gameId)) {
            this.stats.playedGamesList.push(gameId);
        }
        this.saveStats();
        
        if (this.stats.gamesPlayed === 1) this.unlock('first_play');
        if (this.stats.playedGamesList.length === 10) this.unlock('play_all');
        
        if (window.ChallengeManager) window.ChallengeManager.updateProgress('play_3');
    },

    trackWin(gameId) {
        this.stats.wins += 1;
        this.saveStats();
        if (this.stats.wins === 10) this.unlock('win_10');
        
        if (window.ChallengeManager) window.ChallengeManager.updateProgress('win_5');
    },

    trackLoss(gameId) {
        this.stats.losses += 1;
        this.saveStats();
    },

    trackScore(gameId, score) {
        if (gameId === 'snake' && score >= 100) this.unlock('snake_100');
        if (window.ChallengeManager) window.ChallengeManager.updateScore(score);
    },

    unlock(id) {
        if (this.unlocked.includes(id)) return; // Already unlocked
        
        this.unlocked.push(id);
        this.saveStats();
        
        const ach = ACHIEVEMENTS.find(a => a.id === id);
        if (ach) {
            this.showToast(`Pencapaian Terbuka: ${ach.title}`, ach.desc, ach.icon);
            if (window.SoundManager) window.SoundManager.playAchievement();
        }
    },

    showToast(title, message, iconStr) {
        const container = document.getElementById('toast-container');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = 'bg-slate-900 border border-emerald-500/50 shadow-lg shadow-emerald-900/20 rounded-xl p-4 flex items-center gap-4 transform transition-all duration-500 translate-x-full opacity-0 max-w-sm';
        
        toast.innerHTML = `
            <div class="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <i class="fa-solid ${iconStr} text-xl"></i>
            </div>
            <div>
                <h4 class="text-sm font-bold text-white">${title}</h4>
                <p class="text-xs text-slate-400 mt-0.5">${message}</p>
            </div>
        `;
        
        container.appendChild(toast);
        
        // Animate in
        requestAnimationFrame(() => {
            toast.classList.remove('translate-x-full', 'opacity-0');
        });
        
        // Remove after 4s
        setTimeout(() => {
            toast.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }
};

document.addEventListener('DOMContentLoaded', () => AchievementManager.init());
window.addEventListener('pageChanged', () => { /* no-op for now */ });
window.AchievementManager = AchievementManager;
