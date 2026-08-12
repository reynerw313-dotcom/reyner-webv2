/**
 * ThemeManager — Dark/Light mode switcher
 * Reads from localStorage, applies to <html class="dark">,
 * and binds ALL theme toggle buttons (desktop + mobile).
 */
const ThemeManager = {
    init() {
        this.applyTheme(this.getTheme());
        this.bindButtons();
        this.setupOSListener();
    },

    getTheme() {
        return localStorage.getItem('portfolio_theme') || 'dark';
    },

    setTheme(theme) {
        localStorage.setItem('portfolio_theme', theme);
        this.applyTheme(theme);
    },

    toggleTheme() {
        const current = this.getTheme();
        this.setTheme(current === 'dark' ? 'light' : 'dark');
    },

    applyTheme(theme) {
        const html = document.documentElement;
        if (theme === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
        // Sync all toggle button icons
        this.updateToggleIcons(theme);
    },

    updateToggleIcons(theme) {
        // Desktop: moon icon shown in light mode (to switch to dark), sun shown in dark mode
        const desktopMoon = document.querySelector('#theme-toggle-desktop .fa-moon');
        const desktopSun  = document.querySelector('#theme-toggle-desktop .fa-sun');
        const mobileMoon  = document.querySelector('#theme-toggle-mobile .fa-moon');
        const mobileSun   = document.querySelector('#theme-toggle-mobile .fa-sun');

        if (theme === 'dark') {
            // Currently dark → show sun (click = go light)
            desktopMoon?.classList.add('hidden');
            desktopSun?.classList.remove('hidden');
            mobileMoon?.classList.add('hidden');
            mobileSun?.classList.remove('hidden');
        } else {
            // Currently light → show moon (click = go dark)
            desktopMoon?.classList.remove('hidden');
            desktopSun?.classList.add('hidden');
            mobileMoon?.classList.remove('hidden');
            mobileSun?.classList.add('hidden');
        }
    },

    bindButtons() {
        // Bind/rebind all theme toggle buttons (called after every page swap too)
        ['theme-toggle-desktop', 'theme-toggle-mobile'].forEach(id => {
            const btn = document.getElementById(id);
            if (btn && !btn._themeBound) {
                btn.addEventListener('click', () => this.toggleTheme());
                btn._themeBound = true;
            }
        });
    },

    setupOSListener() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            // Only auto-switch if user hasn't chosen a preference yet
            if (!localStorage.getItem('portfolio_theme')) {
                this.applyTheme('dark');
            }
        });
    }
};

// On initial load
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    window.ThemeManager = ThemeManager;
});

// Re-bind buttons after every SPA page swap (buttons re-render inside <main> or <header>)
window.addEventListener('pageChanged', () => {
    ThemeManager.applyTheme(ThemeManager.getTheme());
    ThemeManager.bindButtons();
});
