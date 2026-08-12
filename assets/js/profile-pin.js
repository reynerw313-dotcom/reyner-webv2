/**
 * ProfilePinManager
 * Intercepts all "profil.html" nav clicks, shows PIN modal,
 * navigates only when PIN 030510 is correct.
 * Works across SPA page swaps — modal lives in <header>, never in <main>.
 */
const ProfilePinManager = {
    CORRECT_PIN: '030510',

    init() {
        this.injectModal();
        this.bindNavLinks();
        this.bindModalEvents();
    },

    // Inject PIN modal into <body> once (outside <main> so it's never wiped by SPA swap)
    injectModal() {
        if (document.getElementById('profile-pin-modal')) return;

        const modal = document.createElement('div');
        modal.id = 'profile-pin-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'pin-modal-title');
        modal.style.cssText = 'display:none; position:fixed; inset:0; z-index:99999; align-items:center; justify-content:center; background:rgba(0,0,0,0.65); backdrop-filter:blur(4px); -webkit-backdrop-filter:blur(4px);';

        modal.innerHTML = `
          <div id="profile-pin-box" style="
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            border: 1px solid rgba(59,130,246,0.25);
            border-radius: 20px;
            padding: 32px 28px 28px;
            width: 100%;
            max-width: 360px;
            margin: 16px;
            box-shadow: 0 25px 60px rgba(0,0,0,0.7);
            position: relative;
            animation: pinModalIn 0.25s cubic-bezier(0.16,1,0.3,1) both;
          ">
            <!-- Icon -->
            <div style="display:flex; justify-content:center; margin-bottom:20px;">
              <div style="
                width:56px; height:56px; border-radius:16px;
                background: linear-gradient(135deg,#2563eb,#4f46e5);
                display:flex; align-items:center; justify-content:center;
                box-shadow: 0 8px 20px rgba(37,99,235,0.4);
              ">
                <i class="fa-solid fa-user-shield" style="color:#fff; font-size:22px;"></i>
              </div>
            </div>

            <!-- Title -->
            <h2 id="pin-modal-title" style="text-align:center; color:#f1f5f9; font-family:'Plus Jakarta Sans',sans-serif; font-size:1.15rem; font-weight:700; margin:0 0 6px;">
              Verifikasi Profile
            </h2>
            <p style="text-align:center; color:#64748b; font-size:0.8rem; margin:0 0 22px;">
              Masukkan PIN untuk mengakses halaman Profil
            </p>

            <!-- PIN Input -->
            <div style="position:relative; margin-bottom:10px;">
              <input
                id="profile-pin-input"
                type="password"
                inputmode="numeric"
                maxlength="6"
                placeholder="••••••"
                autocomplete="off"
                style="
                  width:100%; box-sizing:border-box;
                  background:rgba(255,255,255,0.05);
                  border:1.5px solid rgba(255,255,255,0.1);
                  border-radius:12px;
                  color:#f1f5f9;
                  font-size:1.4rem;
                  letter-spacing:0.4em;
                  text-align:center;
                  padding:12px 44px 12px 16px;
                  outline:none;
                  transition: border-color 0.2s, box-shadow 0.2s;
                "
              >
              <!-- Toggle visibility -->
              <button id="pin-toggle-visibility" tabindex="-1" title="Tampilkan/Sembunyikan PIN" style="
                position:absolute; right:12px; top:50%; transform:translateY(-50%);
                background:none; border:none; cursor:pointer;
                color:#64748b; padding:4px; font-size:14px;
              ">
                <i class="fa-solid fa-eye" id="pin-eye-icon"></i>
              </button>
            </div>

            <!-- Error message -->
            <p id="pin-error-msg" style="
              color:#ef4444; font-size:0.75rem; text-align:center;
              min-height:18px; margin:0 0 14px;
              display:flex; align-items:center; justify-content:center; gap:5px;
            "></p>

            <!-- Buttons -->
            <div style="display:flex; gap:10px;">
              <button id="profile-pin-cancel" style="
                flex:1; padding:11px; border-radius:12px;
                background:rgba(255,255,255,0.07);
                border:1px solid rgba(255,255,255,0.1);
                color:#94a3b8; font-size:0.85rem; font-weight:600;
                cursor:pointer; transition:all 0.2s;
              ">Batal</button>
              <button id="profile-pin-confirm" style="
                flex:2; padding:11px; border-radius:12px;
                background:linear-gradient(135deg,#2563eb,#4f46e5);
                border:none; color:#fff; font-size:0.85rem; font-weight:700;
                cursor:pointer; transition:all 0.2s;
                box-shadow: 0 4px 14px rgba(37,99,235,0.4);
              ">
                <i class="fa-solid fa-unlock-keyhole mr-1.5"></i> Masuk
              </button>
            </div>
          </div>

          <style>
            @keyframes pinModalIn {
              from { opacity:0; transform:scale(0.9) translateY(10px); }
              to   { opacity:1; transform:scale(1) translateY(0); }
            }
            #profile-pin-input:focus {
              border-color: rgba(59,130,246,0.6) !important;
              box-shadow: 0 0 0 3px rgba(59,130,246,0.2) !important;
            }
            #profile-pin-input.pin-error {
              border-color: rgba(239,68,68,0.7) !important;
              box-shadow: 0 0 0 3px rgba(239,68,68,0.15) !important;
              animation: pinShake 0.35s ease;
            }
            @keyframes pinShake {
              0%,100% { transform: translateX(0); }
              20%     { transform: translateX(-6px); }
              40%     { transform: translateX(6px); }
              60%     { transform: translateX(-4px); }
              80%     { transform: translateX(4px); }
            }
            #profile-pin-cancel:hover {
              background: rgba(255,255,255,0.12) !important;
              color: #f1f5f9 !important;
            }
            #profile-pin-confirm:hover {
              filter: brightness(1.12);
              transform: translateY(-1px);
            }
            /* Light mode overrides */
            html:not(.dark) #profile-pin-box {
              background: linear-gradient(135deg,#f8fafc 0%,#e2e8f0 100%) !important;
              border-color: rgba(37,99,235,0.2) !important;
            }
            html:not(.dark) #profile-pin-input {
              background: #fff !important;
              border-color: rgba(148,163,184,0.5) !important;
              color: #1e293b !important;
            }
            html:not(.dark) #pin-modal-title { color: #0f172a !important; }
            html:not(.dark) #pin-toggle-visibility { color: #94a3b8 !important; }
          </style>
        `;

        document.body.appendChild(modal);
    },

    open() {
        const modal = document.getElementById('profile-pin-modal');
        if (!modal) return;
        modal.style.display = 'flex';

        const input = document.getElementById('profile-pin-input');
        if (input) {
            input.value = '';
            input.classList.remove('pin-error');
            input.focus();
        }
        const err = document.getElementById('pin-error-msg');
        if (err) err.innerHTML = '';

        // Close on backdrop click
        modal._backdropHandler = (e) => {
            if (e.target === modal) this.close();
        };
        modal.addEventListener('click', modal._backdropHandler);
    },

    close() {
        const modal = document.getElementById('profile-pin-modal');
        if (!modal) return;
        modal.style.display = 'none';
        if (modal._backdropHandler) {
            modal.removeEventListener('click', modal._backdropHandler);
        }
    },

    verify() {
        const input = document.getElementById('profile-pin-input');
        const err   = document.getElementById('pin-error-msg');
        if (!input) return;

        const entered = input.value.trim();

        if (entered === this.CORRECT_PIN) {
            // ✅ Correct — close modal then navigate
            this.close();
            if (window.appRouter) {
                window.appRouter.navigate('profil.html');
            } else {
                window.location.href = 'profil.html';
            }
        } else {
            // ❌ Wrong PIN
            input.classList.remove('pin-error');
            // Force reflow so animation re-triggers
            void input.offsetWidth;
            input.classList.add('pin-error');
            input.value = '';
            if (err) {
                err.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> PIN salah, silakan coba lagi.';
            }
            input.focus();
        }
    },

    bindModalEvents() {
        // Confirm button
        document.addEventListener('click', (e) => {
            if (e.target.closest('#profile-pin-confirm')) {
                this.verify();
            }
            if (e.target.closest('#profile-pin-cancel')) {
                this.close();
            }
            // Eye toggle
            if (e.target.closest('#pin-toggle-visibility')) {
                const input   = document.getElementById('profile-pin-input');
                const eyeIcon = document.getElementById('pin-eye-icon');
                if (!input) return;
                if (input.type === 'password') {
                    input.type = 'text';
                    if (eyeIcon) eyeIcon.className = 'fa-solid fa-eye-slash';
                } else {
                    input.type = 'password';
                    if (eyeIcon) eyeIcon.className = 'fa-solid fa-eye';
                }
            }
        });

        // Enter key
        document.addEventListener('keydown', (e) => {
            const modal = document.getElementById('profile-pin-modal');
            if (!modal || modal.style.display === 'none') return;
            if (e.key === 'Enter') this.verify();
            if (e.key === 'Escape') this.close();
        });
    },

    /**
     * Bind click handlers on all nav links pointing to profil.html.
     * The links have data-pin-nav="profil.html" so the router ignores them.
     * Called on init and after every SPA pageChanged event.
     */
    bindNavLinks() {
        document.querySelectorAll('[data-pin-nav="profil.html"]').forEach(el => {
            if (el._pinBound) return;
            el._pinBound = true;
            el.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }

                this.open();
            });
        });
    }
};

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    ProfilePinManager.init();
    window.ProfilePinManager = ProfilePinManager;
});

// Re-bind nav links after every SPA page swap
window.addEventListener('pageChanged', () => {
    if (window.ProfilePinManager) {
        window.ProfilePinManager.bindNavLinks();
    }
});
