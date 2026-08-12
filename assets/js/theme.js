const ThemeManager = {
    init() {
        this.applyTheme(this.getTheme());
        this.setupListeners();
    },

    getTheme() {
        return window.AppStorage ? window.AppStorage.get('theme', 'dark') : localStorage.getItem('theme') || 'dark';
    },

    setTheme(theme) {
        if(window.AppStorage) window.AppStorage.set('theme', theme);
        else localStorage.setItem('theme', theme);
        
        this.applyTheme(theme);
    },

    applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else if (theme === 'light') {
            document.documentElement.classList.remove('dark');
        } else if (theme === 'auto') {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    },

    setupListeners() {
        // Will be called when a theme switcher is added to the UI
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (this.getTheme() === 'auto') {
                this.applyTheme('auto');
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => ThemeManager.init());
window.addEventListener('pageChanged', () => ThemeManager.init());
