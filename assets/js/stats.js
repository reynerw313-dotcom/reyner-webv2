const StatsManager = {
    chartInstance: null,

    init() {
        if (!document.getElementById('statsChart')) return; // Not on stats page
        
        this.renderStats();
        this.renderAchievements();
        this.renderChallenges();
        this.loadChartJs();
    },

    renderStats() {
        const stats = window.AchievementManager ? window.AchievementManager.stats : null;
        if (!stats) return;

        document.getElementById('stat-played').textContent = stats.gamesPlayed;
        document.getElementById('stat-wins').textContent = stats.wins;
        document.getElementById('stat-losses').textContent = stats.losses;
        document.getElementById('stat-login').textContent = `${stats.loginDays} Hari`;
    },

    renderAchievements() {
        const list = document.getElementById('achievements-list');
        if (!list) return;
        
        const unlocked = window.AchievementManager ? window.AchievementManager.unlocked : [];
        list.innerHTML = '';
        
        // ACHIEVEMENTS from achievements.js (we assume it's in global scope as ACHIEVEMENTS)
        if (typeof ACHIEVEMENTS === 'undefined') return;

        ACHIEVEMENTS.forEach(ach => {
            const isUnlocked = unlocked.includes(ach.id);
            const el = document.createElement('div');
            el.className = `aspect-square rounded-xl flex items-center justify-center border transition-all ${isUnlocked ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' : 'bg-slate-800/50 border-slate-700 text-slate-600 grayscale'}`;
            el.title = `${ach.title}: ${ach.desc}`;
            el.innerHTML = `<i class="fa-solid ${ach.icon} text-2xl"></i>`;
            list.appendChild(el);
        });
    },

    renderChallenges() {
        const list = document.getElementById('challenges-list');
        if (!list) return;

        const challenges = window.ChallengeManager ? window.ChallengeManager.getChallenges() : [];
        list.innerHTML = '';

        challenges.forEach(ch => {
            const pct = Math.min((ch.current / ch.target) * 100, 100);
            const el = document.createElement('div');
            el.className = 'bg-slate-950 p-3 rounded-lg border border-slate-800/50';
            el.innerHTML = `
                <div class="flex justify-between text-xs mb-1">
                    <span class="text-slate-300 font-bold">${ch.title}</span>
                    <span class="text-blue-400">${ch.current} / ${ch.target}</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div class="bg-blue-500 h-1.5 transition-all duration-500" style="width: ${pct}%"></div>
                </div>
                <p class="text-[10px] text-emerald-500 mt-1"><i class="fa-solid fa-gift mr-1"></i> ${ch.reward}</p>
            `;
            list.appendChild(el);
        });
    },

    loadChartJs() {
        if (window.Chart) {
            this.renderChart();
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = () => this.renderChart();
        document.head.appendChild(script);
    },

    renderChart() {
        const ctx = document.getElementById('statsChart');
        if (!ctx) return;
        
        if (this.chartInstance) {
            this.chartInstance.destroy();
        }

        const stats = window.AchievementManager ? window.AchievementManager.stats : { wins:0, losses:0 };
        
        this.chartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Menang', 'Kalah'],
                datasets: [{
                    data: [stats.wins, stats.losses],
                    backgroundColor: ['#10b981', '#f43f5e'],
                    borderColor: ['#064e3b', '#881337'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#94a3b8' }
                    }
                }
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => StatsManager.init());
window.addEventListener('pageChanged', () => StatsManager.init());
