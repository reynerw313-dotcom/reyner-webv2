class Router {
    constructor() {
        this.init();
        window.addEventListener('popstate', (e) => this.handlePopState(e));
    }

    init() {
        // Remove old listener if exists to prevent duplicates
        if (this._clickHandler) {
            document.body.removeEventListener('click', this._clickHandler);
        }

        this._clickHandler = (e) => {
            const link = e.target.closest('a');
            if (!link) return;
            
            // Only intercept internal links that don't have target attribute and aren't hash links
            if (link.host === window.location.host && !link.hasAttribute('target') && !link.href.includes('#')) {
                // Ignore links to non-html files unless it's root
                const urlPath = new URL(link.href).pathname;
                if (!urlPath.endsWith('.html') && urlPath !== '/' && urlPath !== '') return;
                
                // If it's the exact same page, just scroll to top smoothly
                if (link.href === window.location.href) {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }

                e.preventDefault();
                this.navigate(link.href);
            }
        };

        // Attach event delegation listener to body
        document.body.addEventListener('click', this._clickHandler);
        
        // Update active states in navigation on load
        this.updateNavActiveState(window.location.pathname);
    }

    async navigate(url, updateHistory = true) {
        try {
            // Start fetch in parallel with fade-out animation for faster load times
            const fetchPromise = fetch(url);

            const mainContainer = document.querySelector('main');
            if (mainContainer) {
                mainContainer.style.transition = 'opacity 0.15s ease-out';
                mainContainer.style.opacity = '0';
            }

            // Preserve music player state before swapping page content
            if (window.GlobalPlayer && window.GlobalPlayer._initialized) {
                window.GlobalPlayer.saveState();
            }
            
            // Wait for both page fetch and fade transition
            const [response] = await Promise.all([
                fetchPromise,
                new Promise(r => setTimeout(r, 150))
            ]);

            if (!response.ok) throw new Error('Network response was not ok');
            
            const html = await response.text();
            
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const newMain = doc.querySelector('main');
            if (newMain && mainContainer) {
                mainContainer.innerHTML = newMain.innerHTML;
                document.title = doc.title || 'Reyner | Portofolio & Tugas Sekolah';
                
                if (updateHistory) {
                    window.history.pushState({ url: url }, '', url);
                }
                
                this.updateNavActiveState(window.location.pathname);
                
                // Dispatch event so other modules (like player, playlist) can re-bind/render elements
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { url: url } }));
                
                window.scrollTo({ top: 0, behavior: 'auto' });
            } else {
                // Fallback if main structure is missing
                window.location.href = url;
            }
        } catch (error) {
            console.error('SPA Navigation Error:', error);
            // Fallback to traditional navigation on network errors or file:// blocks
            window.location.href = url;
        } finally {
            const mainContainer = document.querySelector('main');
            if (mainContainer) {
                mainContainer.style.opacity = '1';
            }
        }
    }

    handlePopState(e) {
        const url = (e.state && e.state.url) ? e.state.url : window.location.href;
        this.navigate(url, false);
    }
    
    updateNavActiveState(pathName) {
        const path = pathName.split('/').pop() || 'index.html';
        
        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
            // Remove active classes
            link.classList.remove('text-blue-400', 'bg-slate-900/50', 'border', 'border-blue-900/40', 'text-white', 'bg-slate-900/60');
            link.classList.add('text-slate-400');
            
            if (link.href) {
                try {
                    const linkPath = new URL(link.href).pathname.split('/').pop() || 'index.html';
                    if (linkPath === path) {
                        link.classList.remove('text-slate-400');
                        if (link.classList.contains('mobile-nav-link')) {
                            link.classList.add('text-blue-400', 'bg-slate-900/60');
                        } else {
                            link.classList.add('text-blue-400', 'bg-slate-900/50', 'border', 'border-blue-900/40');
                        }
                    }
                } catch (e) {
                    // Ignore malformed href values like # or javascript:
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (!window.appRouter) {
        window.appRouter = new Router();
    }
});
