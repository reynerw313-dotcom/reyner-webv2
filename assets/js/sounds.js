const SoundManager = {
    audioCtx: null,
    muted: false,

    init() {
        this.muted = window.AppStorage ? window.AppStorage.get('muted', false) : false;
        
        // Wait for first interaction to init AudioContext
        const initCtx = () => {
            if (!this.audioCtx) {
                this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            document.removeEventListener('click', initCtx);
        };
        document.addEventListener('click', initCtx);

        this.setupListeners();
    },

    toggleMute() {
        this.muted = !this.muted;
        if(window.AppStorage) window.AppStorage.set('muted', this.muted);
        return this.muted;
    },

    playTone(frequency, type, duration, vol) {
        if (this.muted || !this.audioCtx) return;

        const oscillator = this.audioCtx.createOscillator();
        const gainNode = this.audioCtx.createGain();

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);
        
        gainNode.gain.setValueAtTime(vol, this.audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + duration);

        oscillator.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);

        oscillator.start();
        oscillator.stop(this.audioCtx.currentTime + duration);
    },

    playClick() {
        this.playTone(600, 'sine', 0.1, 0.1);
    },

    playHover() {
        this.playTone(400, 'sine', 0.05, 0.05);
    },

    playWin() {
        if (this.muted || !this.audioCtx) return;
        this.playTone(400, 'triangle', 0.1, 0.2);
        setTimeout(() => this.playTone(600, 'triangle', 0.2, 0.2), 100);
        setTimeout(() => this.playTone(800, 'triangle', 0.4, 0.2), 250);
    },

    playLose() {
        if (this.muted || !this.audioCtx) return;
        this.playTone(300, 'sawtooth', 0.2, 0.2);
        setTimeout(() => this.playTone(250, 'sawtooth', 0.2, 0.2), 200);
        setTimeout(() => this.playTone(200, 'sawtooth', 0.4, 0.2), 400);
    },

    playAchievement() {
        if (this.muted || !this.audioCtx) return;
        this.playTone(523.25, 'sine', 0.1, 0.2); // C5
        setTimeout(() => this.playTone(659.25, 'sine', 0.1, 0.2), 150); // E5
        setTimeout(() => this.playTone(783.99, 'sine', 0.3, 0.2), 300); // G5
    },

    setupListeners() {
        document.querySelectorAll('a, button, .interactive').forEach(el => {
            el.addEventListener('mouseenter', () => this.playHover());
            el.addEventListener('click', () => this.playClick());
        });
    }
};

document.addEventListener('DOMContentLoaded', () => SoundManager.init());
window.addEventListener('pageChanged', () => SoundManager.setupListeners());
window.SoundManager = SoundManager;
