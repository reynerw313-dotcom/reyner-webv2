const DAILY_CHALLENGES = [
    { id: 'play_3', title: 'Mainkan 3 Game', target: 3, current: 0, reward: '100 XP' },
    { id: 'score_200', title: 'Dapat Skor 200', target: 200, current: 0, reward: '200 XP' },
    { id: 'win_5', title: 'Menang 5 Kali', target: 5, current: 0, reward: '150 XP' }
];

const ChallengeManager = {
    challenges: [],
    lastDate: '',

    init() {
        const stored = window.AppStorage ? window.AppStorage.get('daily_challenges', null) : null;
        const today = new Date().toDateString();
        
        if (stored && stored.date === today) {
            this.challenges = stored.challenges;
        } else {
            // Reset for new day
            this.challenges = JSON.parse(JSON.stringify(DAILY_CHALLENGES));
            this.save();
        }
    },

    save() {
        if(window.AppStorage) {
            window.AppStorage.set('daily_challenges', {
                date: new Date().toDateString(),
                challenges: this.challenges
            });
        }
    },

    updateProgress(id) {
        const ch = this.challenges.find(c => c.id === id);
        if (ch && ch.current < ch.target) {
            ch.current += 1;
            this.save();
            this.checkComplete(ch);
        }
    },

    updateScore(score) {
        const ch = this.challenges.find(c => c.id === 'score_200');
        if (ch && ch.current < ch.target) {
            if(score > ch.current) {
                ch.current = score;
                if(ch.current > ch.target) ch.current = ch.target;
                this.save();
                this.checkComplete(ch);
            }
        }
    },

    checkComplete(ch) {
        if (ch.current >= ch.target && !ch.notified) {
            ch.notified = true;
            this.save();
            if (window.AchievementManager) {
                window.AchievementManager.showToast(
                    'Tantangan Selesai!',
                    `${ch.title} - Hadiah: ${ch.reward}`,
                    'fa-star'
                );
            }
            if (window.SoundManager) window.SoundManager.playAchievement();
        }
    },
    
    getChallenges() {
        return this.challenges;
    }
};

document.addEventListener('DOMContentLoaded', () => ChallengeManager.init());
window.ChallengeManager = ChallengeManager;
