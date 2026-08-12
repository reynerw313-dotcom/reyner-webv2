document.addEventListener('DOMContentLoaded', () => {
  // Setup SPA navigation
  function setupSPA() {
    document.body.addEventListener('click', async (e) => {
      // Find closest anchor tag
      const link = e.target.closest('a');
      
      // If not a link, or doesn't have href, or opens in new tab, ignore
      if (!link || !link.href || link.target === '_blank') return;
      
      // If it's a mailto, tel, or external link, ignore
      const url = new URL(link.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // Same page (maybe hash link)
      
      // We only handle .html files or root
      if (!url.pathname.endsWith('.html') && url.pathname !== '/') return;

      e.preventDefault();
      
      await navigateTo(url.href);
      
      // Update browser history
      window.history.pushState({ url: url.href }, '', url.href);
    });

    // Handle back/forward buttons
    window.addEventListener('popstate', async (e) => {
      if (e.state && e.state.url) {
        await navigateTo(e.state.url, false);
      } else {
        await navigateTo(window.location.href, false);
      }
    });
  }

  async function navigateTo(url, updateActiveNav = true) {
    try {
      // Fetch new HTML
      const response = await fetch(url);
      if (!response.ok) throw new Error('Page not found');
      
      const htmlText = await response.text();
      
      // Parse HTML
      const parser = new DOMParser();
      const newDocument = parser.parseFromString(htmlText, 'text/html');
      
      // Extract <main> content
      const newMain = newDocument.querySelector('main');
      const currentMain = document.querySelector('main');
      
      if (newMain && currentMain) {
        // Replace content with transition
        currentMain.style.opacity = '0';
        currentMain.style.transition = 'opacity 0.2s ease-out';
        
        setTimeout(() => {
          currentMain.innerHTML = newMain.innerHTML;
          currentMain.style.opacity = '1';
          
          // Re-initialize app scripts
          if (typeof window.initApp === 'function') {
            window.initApp();
          }
          
          // Update title
          document.title = newDocument.title;
          
          // Scroll to top
          window.scrollTo(0, 0);
          
          // Update active nav links
          updateNavLinks(url);
        }, 200);
      }
      
    } catch (error) {
      console.error('SPA Navigation Error:', error);
      // Fallback to normal navigation
      window.location.href = url;
    }
  }

  function updateNavLinks(url) {
    const path = new URL(url).pathname.split('/').pop() || 'index.html';
    
    // Desktop Nav
    document.querySelectorAll('header nav.hidden a').forEach(link => {
      if (link.getAttribute('href') === path) {
        link.className = 'nav-link px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-blue-400 bg-slate-900/50 border border-blue-900/40';
      } else {
        link.className = 'nav-link px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-slate-400 hover:text-slate-200 hover:bg-slate-900/30';
      }
    });

    // Mobile Nav
    document.querySelectorAll('#mobile-menu a.mobile-nav-link').forEach(link => {
      if (link.getAttribute('href') === path) {
        link.className = 'mobile-nav-link block w-full text-left px-4 py-2.5 rounded-lg text-base font-medium text-blue-400 bg-slate-900/60';
      } else {
        link.className = 'mobile-nav-link block w-full text-left px-4 py-2.5 rounded-lg text-base font-medium text-slate-400 hover:text-white hover:bg-slate-900/40';
      }
    });
  }

  setupSPA();
  
  // Set initial state
  window.history.replaceState({ url: window.location.href }, '', window.location.href);
});
