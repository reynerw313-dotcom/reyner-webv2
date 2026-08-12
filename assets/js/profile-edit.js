/**
 * ProfileEditManager
 * ─────────────────────────────────────────────────────────────────────────────
 * PIN-protected "Ganti Profile" feature — ONLY active on profil.html.
 * Flow: click "Ganti Profile" → PIN modal → if 030510 → edit form.
 * Saves to localStorage. Reads on page load to populate profile display.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const ProfileEditManager = {
    CORRECT_PIN: '030510',
    STORAGE_KEY: 'portfolio_profile_data',

    // Default profile values (used if nothing is saved yet)
    DEFAULTS: {
        name:       'Reyner',
        title:      'Siswa & Tech Enthusiast',
        location:   'Indonesia',
        bio:        '"Fokus pada pembelajaran teknologi informasi, pemrograman web, dan pengembangan keterampilan menulis bahasa Indonesia."',
        about1:     'Halo! Saya adalah Reyner saya adalah seorang pelajar yang memiliki ketertarikan tinggi di dunia pengembangan web (Web Development) dan teknologi informasi. Saya senang mempelajari logika pemecahan masalah dengan kode serta menuangkan gagasan orisinal melalui tulisan.',
        about2:     'Website ini dibuat menggunakan teknologi HTML5, Tailwind CSS, dan JavaScript Vanilla. Tujuan utamanya adalah untuk mendokumentasikan hasil belajar sekolah secara dinamis dan menjadikannya portofolio yang terorganisir untuk masa depan.',
        github:     'https://github.com',
        instagram:  'https://www.instagram.com/renyer.mi/',
        linkedin:   'https://linkedin.com',
        email:      'mailto:contact@email.com',
        avatarSrc:  'assets/reyner.jpeg',
    },

    // ── INIT ──────────────────────────────────────────────────────────────
    init() {
        // Only run on profil.html (check by current page or section existence)
        if (!this.isProfilePage()) return;

        this.loadAndRenderProfile();
        this.injectUI();
    },

    isProfilePage() {
        return !!document.getElementById('tab-profil') ||
               window.location.pathname.includes('profil');
    },

    // ── LOAD & RENDER ─────────────────────────────────────────────────────
    getData() {
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            return raw ? { ...this.DEFAULTS, ...JSON.parse(raw) } : { ...this.DEFAULTS };
        } catch {
            return { ...this.DEFAULTS };
        }
    },

    saveData(data) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error('[ProfileEdit] Save error:', e);
        }
    },

    loadAndRenderProfile() {
        const d = this.getData();

        // Avatar
        const avatarImg = document.querySelector('#tab-profil img[alt="reyner"]') ||
                          document.querySelector('#tab-profil .rounded-full img');
        if (avatarImg && d.avatarSrc) avatarImg.src = d.avatarSrc;

        // Name
        const nameEl = document.querySelector('#tab-profil h3.font-display');
        if (nameEl) nameEl.textContent = d.name;

        // Title / Role
        const titleEl = document.querySelector('#tab-profil p.text-blue-400.font-medium');
        if (titleEl) titleEl.textContent = d.title;

        // Location
        const locEl = document.querySelector('#tab-profil p.text-xs.text-slate-400.flex');
        if (locEl) {
            locEl.innerHTML = `<i class="fa-solid fa-location-dot text-slate-500"></i> ${d.location}`;
        }

        // Bio (short)
        const bioEl = document.querySelector('#tab-profil p.text-xs.text-slate-300');
        if (bioEl) bioEl.textContent = d.bio;

        // About paragraphs
        const aboutParas = document.querySelectorAll('#tab-profil .text-sm.text-slate-350 p');
        if (aboutParas[0]) aboutParas[0].textContent = d.about1;
        if (aboutParas[1]) aboutParas[1].innerHTML = d.about2;

        // Social links
        const links = document.querySelectorAll('#tab-profil a[title]');
        links.forEach(a => {
            const t = a.getAttribute('title');
            if (t === 'GitHub'    && d.github)    a.href = d.github;
            if (t === 'Instagram' && d.instagram) a.href = d.instagram;
            if (t === 'LinkedIn'  && d.linkedin)  a.href = d.linkedin;
            if (t === 'Email'     && d.email)     a.href = d.email;
        });
    },

    // ── INJECT BUTTON + MODALS ────────────────────────────────────────────
    injectUI() {
        // Remove any stale injected elements
        document.getElementById('profile-edit-btn-wrap')?.remove();
        document.getElementById('profile-pin-modal')?.remove();
        document.getElementById('profile-edit-modal')?.remove();

        // ── "Ganti Profile" button near avatar card ──────────────────────
        const avatarCard = document.querySelector('#tab-profil .rounded-2xl.bg-slate-900\\/60.p-6');
        if (avatarCard) {
            const btnWrap = document.createElement('div');
            btnWrap.id = 'profile-edit-btn-wrap';
            btnWrap.style.cssText = 'margin-top:16px; text-align:center;';
            btnWrap.innerHTML = `
              <button id="open-ganti-profile-btn" style="
                display:inline-flex; align-items:center; gap:8px;
                padding:8px 18px; border-radius:10px;
                background: linear-gradient(135deg,#2563eb,#4f46e5);
                border:none; color:#fff; font-size:0.8rem; font-weight:700;
                cursor:pointer; transition:all 0.2s;
                box-shadow: 0 4px 14px rgba(37,99,235,0.35);
                font-family: inherit;
              ">
                <i class="fa-solid fa-user-pen"></i> Ganti Profile
              </button>`;
            avatarCard.appendChild(btnWrap);

            document.getElementById('open-ganti-profile-btn').addEventListener('click', () => {
                this.openPinModal();
            });
        }

        // ── PIN Modal ────────────────────────────────────────────────────
        const pinModal = document.createElement('div');
        pinModal.id = 'profile-pin-modal';
        pinModal.style.cssText = 'display:none; position:fixed; inset:0; z-index:99999; align-items:center; justify-content:center; background:rgba(0,0,0,0.65); backdrop-filter:blur(4px);';
        pinModal.innerHTML = `
          <div style="
            background: linear-gradient(135deg,#0f172a 0%,#1e293b 100%);
            border:1px solid rgba(59,130,246,0.25); border-radius:20px;
            padding:32px 28px 28px; width:100%; max-width:360px; margin:16px;
            box-shadow:0 25px 60px rgba(0,0,0,0.7);
            animation: profilePinIn 0.25s cubic-bezier(0.16,1,0.3,1) both;
          ">
            <div style="display:flex;justify-content:center;margin-bottom:20px;">
              <div style="width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,#2563eb,#4f46e5);display:flex;align-items:center;justify-content:center;box-shadow:0 8px 20px rgba(37,99,235,0.4);">
                <i class="fa-solid fa-lock" style="color:#fff;font-size:20px;"></i>
              </div>
            </div>
            <h2 style="text-align:center;color:#f1f5f9;font-family:'Plus Jakarta Sans',sans-serif;font-size:1.1rem;font-weight:700;margin:0 0 5px;">Verifikasi PIN</h2>
            <p style="text-align:center;color:#64748b;font-size:0.78rem;margin:0 0 20px;">Masukkan PIN untuk mengakses fitur Ganti Profile</p>

            <div style="position:relative;margin-bottom:8px;">
              <input id="ganti-profile-pin-input" type="password" inputmode="numeric"
                maxlength="6" placeholder="••••••" autocomplete="off"
                style="width:100%;box-sizing:border-box;background:rgba(255,255,255,0.05);border:1.5px solid rgba(255,255,255,0.1);border-radius:12px;color:#f1f5f9;font-size:1.4rem;letter-spacing:0.4em;text-align:center;padding:12px 44px 12px 16px;outline:none;transition:border-color 0.2s,box-shadow 0.2s;font-family:inherit;"
              >
              <button id="ganti-pin-eye" tabindex="-1" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#64748b;padding:4px;font-size:14px;">
                <i class="fa-solid fa-eye" id="ganti-pin-eye-icon"></i>
              </button>
            </div>

            <p id="ganti-pin-error" style="color:#ef4444;font-size:0.75rem;text-align:center;min-height:18px;margin:0 0 14px;display:flex;align-items:center;justify-content:center;gap:5px;"></p>

            <div style="display:flex;gap:10px;">
              <button id="ganti-pin-cancel" style="flex:1;padding:11px;border-radius:12px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);color:#94a3b8;font-size:0.85rem;font-weight:600;cursor:pointer;transition:all 0.2s;font-family:inherit;">Batal</button>
              <button id="ganti-pin-confirm" style="flex:2;padding:11px;border-radius:12px;background:linear-gradient(135deg,#2563eb,#4f46e5);border:none;color:#fff;font-size:0.85rem;font-weight:700;cursor:pointer;transition:all 0.2s;box-shadow:0 4px 14px rgba(37,99,235,0.4);font-family:inherit;">
                <i class="fa-solid fa-unlock-keyhole" style="margin-right:6px;"></i>Verifikasi
              </button>
            </div>
          </div>
          <style>
            @keyframes profilePinIn { from{opacity:0;transform:scale(0.9) translateY(10px);}to{opacity:1;transform:scale(1) translateY(0);} }
            #ganti-profile-pin-input:focus{border-color:rgba(59,130,246,0.6)!important;box-shadow:0 0 0 3px rgba(59,130,246,0.2)!important;}
            #ganti-profile-pin-input.pin-shake{animation:gpShake 0.35s ease;}
            @keyframes gpShake{0%,100%{transform:translateX(0);}20%{transform:translateX(-6px);}40%{transform:translateX(6px);}60%{transform:translateX(-4px);}80%{transform:translateX(4px);}};
            #ganti-pin-cancel:hover{background:rgba(255,255,255,0.12)!important;color:#f1f5f9!important;}
            #ganti-pin-confirm:hover{filter:brightness(1.12);transform:translateY(-1px);}
            html:not(.dark) #profile-pin-modal > div{background:linear-gradient(135deg,#f8fafc,#e2e8f0)!important;border-color:rgba(37,99,235,0.2)!important;}
            html:not(.dark) #ganti-profile-pin-input{background:#fff!important;border-color:rgba(148,163,184,0.5)!important;color:#1e293b!important;}
          </style>
        `;
        document.body.appendChild(pinModal);

        // ── Edit Modal ───────────────────────────────────────────────────
        this.buildEditModal();
        this.bindPinEvents();
    },

    buildEditModal() {
        const d = this.getData();
        const editModal = document.createElement('div');
        editModal.id = 'profile-edit-modal';
        editModal.style.cssText = 'display:none; position:fixed; inset:0; z-index:99999; align-items:flex-start; justify-content:center; background:rgba(0,0,0,0.65); backdrop-filter:blur(4px); overflow-y:auto; padding:24px 16px;';

        editModal.innerHTML = `
          <div id="profile-edit-box" style="
            background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);
            border:1px solid rgba(59,130,246,0.2); border-radius:20px;
            padding:28px; width:100%; max-width:480px; margin:auto;
            box-shadow:0 25px 60px rgba(0,0,0,0.7);
            animation:profileEditIn 0.3s cubic-bezier(0.16,1,0.3,1) both;
          ">
            <!-- Header -->
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:22px;">
              <div style="display:flex;align-items:center;gap:12px;">
                <div style="width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,#2563eb,#4f46e5);display:flex;align-items:center;justify-content:center;">
                  <i class="fa-solid fa-user-pen" style="color:#fff;font-size:16px;"></i>
                </div>
                <div>
                  <h2 style="color:#f1f5f9;font-family:'Plus Jakarta Sans',sans-serif;font-size:1rem;font-weight:700;margin:0;">Ganti Profile</h2>
                  <p style="color:#64748b;font-size:0.72rem;margin:2px 0 0;">Perubahan disimpan otomatis</p>
                </div>
              </div>
              <button id="profile-edit-close" style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#94a3b8;width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:14px;transition:all 0.2s;">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <!-- Avatar Preview + Upload -->
            <div style="text-align:center;margin-bottom:22px;">
              <div style="position:relative;display:inline-block;">
                <img id="edit-avatar-preview" src="${d.avatarSrc || 'assets/reyner.jpeg'}" alt="Avatar Preview"
                  style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:3px solid rgba(59,130,246,0.4);">
                <label for="edit-avatar-file" style="position:absolute;bottom:0;right:0;width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#2563eb,#4f46e5);display:flex;align-items:center;justify-content:center;cursor:pointer;border:2px solid #0f172a;" title="Ganti Foto">
                  <i class="fa-solid fa-camera" style="color:#fff;font-size:11px;"></i>
                </label>
                <input id="edit-avatar-file" type="file" accept="image/*" style="display:none;">
              </div>
              <p style="color:#64748b;font-size:0.72rem;margin-top:8px;">Klik ikon kamera untuk ganti foto</p>
            </div>

            <!-- Form Fields -->
            <div style="display:flex;flex-direction:column;gap:14px;">

              <div>
                <label style="display:block;color:#94a3b8;font-size:0.75rem;font-weight:600;margin-bottom:5px;text-transform:uppercase;letter-spacing:0.05em;">Nama</label>
                <input id="edit-name" type="text" value="${this.esc(d.name)}" maxlength="50"
                  style="width:100%;box-sizing:border-box;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#f1f5f9;font-size:0.88rem;padding:10px 12px;outline:none;transition:border-color 0.2s;font-family:inherit;">
              </div>

              <div>
                <label style="display:block;color:#94a3b8;font-size:0.75rem;font-weight:600;margin-bottom:5px;text-transform:uppercase;letter-spacing:0.05em;">Judul / Peran</label>
                <input id="edit-title" type="text" value="${this.esc(d.title)}" maxlength="60"
                  style="width:100%;box-sizing:border-box;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#f1f5f9;font-size:0.88rem;padding:10px 12px;outline:none;transition:border-color 0.2s;font-family:inherit;">
              </div>

              <div>
                <label style="display:block;color:#94a3b8;font-size:0.75rem;font-weight:600;margin-bottom:5px;text-transform:uppercase;letter-spacing:0.05em;">Lokasi</label>
                <input id="edit-location" type="text" value="${this.esc(d.location)}" maxlength="50"
                  style="width:100%;box-sizing:border-box;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#f1f5f9;font-size:0.88rem;padding:10px 12px;outline:none;transition:border-color 0.2s;font-family:inherit;">
              </div>

              <div>
                <label style="display:block;color:#94a3b8;font-size:0.75rem;font-weight:600;margin-bottom:5px;text-transform:uppercase;letter-spacing:0.05em;">Bio Singkat</label>
                <input id="edit-bio" type="text" value="${this.esc(d.bio)}" maxlength="200"
                  style="width:100%;box-sizing:border-box;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#f1f5f9;font-size:0.88rem;padding:10px 12px;outline:none;transition:border-color 0.2s;font-family:inherit;">
              </div>

              <div>
                <label style="display:block;color:#94a3b8;font-size:0.75rem;font-weight:600;margin-bottom:5px;text-transform:uppercase;letter-spacing:0.05em;">Tentang Saya (Paragraf 1)</label>
                <textarea id="edit-about1" rows="3" maxlength="500"
                  style="width:100%;box-sizing:border-box;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#f1f5f9;font-size:0.85rem;padding:10px 12px;outline:none;resize:vertical;transition:border-color 0.2s;font-family:inherit;">${this.esc(d.about1)}</textarea>
              </div>

              <div>
                <label style="display:block;color:#94a3b8;font-size:0.75rem;font-weight:600;margin-bottom:5px;text-transform:uppercase;letter-spacing:0.05em;">Tentang Saya (Paragraf 2)</label>
                <textarea id="edit-about2" rows="3" maxlength="500"
                  style="width:100%;box-sizing:border-box;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#f1f5f9;font-size:0.85rem;padding:10px 12px;outline:none;resize:vertical;transition:border-color 0.2s;font-family:inherit;">${this.esc(d.about2)}</textarea>
              </div>

              <!-- Social Links -->
              <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;">
                <p style="color:#94a3b8;font-size:0.75rem;font-weight:600;margin:0 0 10px;text-transform:uppercase;letter-spacing:0.05em;">Tautan Sosial</p>
                <div style="display:flex;flex-direction:column;gap:10px;">
                  <div style="display:flex;align-items:center;gap:10px;">
                    <i class="fa-brands fa-github" style="color:#94a3b8;width:18px;text-align:center;"></i>
                    <input id="edit-github" type="url" value="${this.esc(d.github)}" placeholder="https://github.com/username"
                      style="flex:1;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#f1f5f9;font-size:0.82rem;padding:8px 10px;outline:none;transition:border-color 0.2s;font-family:inherit;">
                  </div>
                  <div style="display:flex;align-items:center;gap:10px;">
                    <i class="fa-brands fa-instagram" style="color:#ec4899;width:18px;text-align:center;"></i>
                    <input id="edit-instagram" type="url" value="${this.esc(d.instagram)}" placeholder="https://instagram.com/username"
                      style="flex:1;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#f1f5f9;font-size:0.82rem;padding:8px 10px;outline:none;transition:border-color 0.2s;font-family:inherit;">
                  </div>
                  <div style="display:flex;align-items:center;gap:10px;">
                    <i class="fa-brands fa-linkedin-in" style="color:#3b82f6;width:18px;text-align:center;"></i>
                    <input id="edit-linkedin" type="url" value="${this.esc(d.linkedin)}" placeholder="https://linkedin.com/in/username"
                      style="flex:1;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#f1f5f9;font-size:0.82rem;padding:8px 10px;outline:none;transition:border-color 0.2s;font-family:inherit;">
                  </div>
                  <div style="display:flex;align-items:center;gap:10px;">
                    <i class="fa-solid fa-envelope" style="color:#60a5fa;width:18px;text-align:center;"></i>
                    <input id="edit-email" type="text" value="${this.esc(d.email)}" placeholder="mailto:your@email.com"
                      style="flex:1;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#f1f5f9;font-size:0.82rem;padding:8px 10px;outline:none;transition:border-color 0.2s;font-family:inherit;">
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div style="display:flex;gap:10px;margin-top:22px;">
              <button id="profile-edit-cancel-btn" style="flex:1;padding:12px;border-radius:12px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);color:#94a3b8;font-size:0.85rem;font-weight:600;cursor:pointer;transition:all 0.2s;font-family:inherit;">Batal</button>
              <button id="profile-edit-save-btn" style="flex:2;padding:12px;border-radius:12px;background:linear-gradient(135deg,#059669,#10b981);border:none;color:#fff;font-size:0.85rem;font-weight:700;cursor:pointer;transition:all 0.2s;box-shadow:0 4px 14px rgba(16,185,129,0.35);font-family:inherit;">
                <i class="fa-solid fa-floppy-disk" style="margin-right:6px;"></i>Simpan Perubahan
              </button>
            </div>
          </div>
          <style>
            @keyframes profileEditIn{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
            #profile-edit-box input:focus, #profile-edit-box textarea:focus {
              border-color:rgba(59,130,246,0.5)!important;
              box-shadow:0 0 0 2px rgba(59,130,246,0.15)!important;
            }
            #profile-edit-cancel-btn:hover{background:rgba(255,255,255,0.12)!important;color:#f1f5f9!important;}
            #profile-edit-save-btn:hover{filter:brightness(1.1);transform:translateY(-1px);}
            #profile-edit-close:hover{background:rgba(239,68,68,0.15)!important;color:#f87171!important;border-color:rgba(239,68,68,0.3)!important;}
            html:not(.dark) #profile-edit-box{background:linear-gradient(135deg,#f8fafc,#e2e8f0)!important;border-color:rgba(37,99,235,0.2)!important;}
            html:not(.dark) #profile-edit-box h2{color:#0f172a!important;}
            html:not(.dark) #profile-edit-box input,
            html:not(.dark) #profile-edit-box textarea{background:#fff!important;border-color:rgba(148,163,184,0.5)!important;color:#1e293b!important;}
            html:not(.dark) #profile-edit-box label{color:#475569!important;}
          </style>
        `;
        document.body.appendChild(editModal);
        this.bindEditEvents();
    },

    // ── PIN MODAL EVENTS ──────────────────────────────────────────────────
    bindPinEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('#ganti-pin-confirm')) this.verifyPin();
            if (e.target.closest('#ganti-pin-cancel'))  this.closePinModal();
            if (e.target.closest('#ganti-pin-eye')) {
                const inp = document.getElementById('ganti-profile-pin-input');
                const ico = document.getElementById('ganti-pin-eye-icon');
                if (!inp) return;
                inp.type = inp.type === 'password' ? 'text' : 'password';
                if (ico) ico.className = inp.type === 'password' ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash';
            }
            // Backdrop close
            const pm = document.getElementById('profile-pin-modal');
            if (pm && e.target === pm) this.closePinModal();
        });

        document.addEventListener('keydown', (e) => {
            const pm = document.getElementById('profile-pin-modal');
            if (!pm || pm.style.display === 'none') return;
            if (e.key === 'Enter') this.verifyPin();
            if (e.key === 'Escape') this.closePinModal();
        });
    },

    openPinModal() {
        const modal = document.getElementById('profile-pin-modal');
        if (!modal) return;
        modal.style.display = 'flex';
        const inp = document.getElementById('ganti-profile-pin-input');
        if (inp) { inp.value = ''; inp.classList.remove('pin-shake'); inp.focus(); }
        const err = document.getElementById('ganti-pin-error');
        if (err) err.innerHTML = '';
    },

    closePinModal() {
        const modal = document.getElementById('profile-pin-modal');
        if (modal) modal.style.display = 'none';
    },

    verifyPin() {
        const inp = document.getElementById('ganti-profile-pin-input');
        const err = document.getElementById('ganti-pin-error');
        if (!inp) return;

        if (inp.value.trim() === this.CORRECT_PIN) {
            this.closePinModal();
            this.openEditModal();
        } else {
            inp.classList.remove('pin-shake');
            void inp.offsetWidth;
            inp.classList.add('pin-shake');
            inp.value = '';
            if (err) err.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> PIN salah, silakan coba lagi.';
            inp.focus();
        }
    },

    // ── EDIT MODAL EVENTS ─────────────────────────────────────────────────
    bindEditEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('#profile-edit-save-btn'))   this.saveEdits();
            if (e.target.closest('#profile-edit-cancel-btn')) this.closeEditModal();
            if (e.target.closest('#profile-edit-close'))      this.closeEditModal();
            const em = document.getElementById('profile-edit-modal');
            if (em && e.target === em) this.closeEditModal();
        });

        document.addEventListener('keydown', (e) => {
            const em = document.getElementById('profile-edit-modal');
            if (!em || em.style.display === 'none') return;
            if (e.key === 'Escape') this.closeEditModal();
        });

        // Avatar file input
        document.addEventListener('change', (e) => {
            if (e.target.id === 'edit-avatar-file') {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (ev) => {
                    const preview = document.getElementById('edit-avatar-preview');
                    if (preview) preview.src = ev.target.result;
                    this._pendingAvatar = ev.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    },

    openEditModal() {
        // Refresh form with latest saved data
        const d = this.getData();
        const set = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.tagName === 'TEXTAREA' ? el.value = val : el.value = val;
        };
        set('edit-name',      d.name);
        set('edit-title',     d.title);
        set('edit-location',  d.location);
        set('edit-bio',       d.bio);
        set('edit-about1',    d.about1);
        set('edit-about2',    d.about2);
        set('edit-github',    d.github);
        set('edit-instagram', d.instagram);
        set('edit-linkedin',  d.linkedin);
        set('edit-email',     d.email);

        const preview = document.getElementById('edit-avatar-preview');
        if (preview) preview.src = d.avatarSrc || 'assets/reyner.jpeg';
        this._pendingAvatar = null;

        const modal = document.getElementById('profile-edit-modal');
        if (modal) modal.style.display = 'flex';
    },

    closeEditModal() {
        const modal = document.getElementById('profile-edit-modal');
        if (modal) modal.style.display = 'none';
        this._pendingAvatar = null;
    },

    saveEdits() {
        const get = (id) => {
            const el = document.getElementById(id);
            return el ? el.value.trim() : '';
        };

        const newData = {
            name:      get('edit-name')      || this.DEFAULTS.name,
            title:     get('edit-title')     || this.DEFAULTS.title,
            location:  get('edit-location')  || this.DEFAULTS.location,
            bio:       get('edit-bio')       || this.DEFAULTS.bio,
            about1:    get('edit-about1')    || this.DEFAULTS.about1,
            about2:    get('edit-about2')    || this.DEFAULTS.about2,
            github:    get('edit-github')    || this.DEFAULTS.github,
            instagram: get('edit-instagram') || this.DEFAULTS.instagram,
            linkedin:  get('edit-linkedin')  || this.DEFAULTS.linkedin,
            email:     get('edit-email')     || this.DEFAULTS.email,
            avatarSrc: this._pendingAvatar || this.getData().avatarSrc || this.DEFAULTS.avatarSrc,
        };

        this.saveData(newData);
        this.closeEditModal();
        this.loadAndRenderProfile();

        // Show success toast
        this.showToast('Profile berhasil diperbarui!', 'success');
    },

    // ── HELPERS ───────────────────────────────────────────────────────────
    esc(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g,'&amp;')
            .replace(/"/g,'&quot;')
            .replace(/</g,'&lt;')
            .replace(/>/g,'&gt;');
    },

    showToast(msg, type = 'info') {
        const colors = type === 'success'
            ? { bg:'#064e3b', border:'#10b981', icon:'fa-circle-check', iconColor:'#34d399' }
            : { bg:'#1e293b', border:'#3b82f6', icon:'fa-info',         iconColor:'#60a5fa' };

        const toast = document.createElement('div');
        toast.style.cssText = `
            position:fixed; bottom:100px; right:24px; z-index:99998;
            background:${colors.bg}; border:1px solid ${colors.border};
            color:#f1f5f9; padding:12px 16px; border-radius:12px;
            box-shadow:0 8px 24px rgba(0,0,0,0.4);
            display:flex; align-items:center; gap:10px;
            font-size:0.82rem; font-weight:600; font-family:inherit;
            transform:translateY(20px); opacity:0;
            transition:all 0.3s cubic-bezier(0.16,1,0.3,1);
        `;
        toast.innerHTML = `<i class="fa-solid ${colors.icon}" style="color:${colors.iconColor};"></i> ${msg}`;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        });

        setTimeout(() => {
            toast.style.transform = 'translateY(20px)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

// ── BOOT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    ProfileEditManager.init();
    window.ProfileEditManager = ProfileEditManager;
});

// Re-init after SPA page swap (when profil.html content loads into <main>)
window.addEventListener('pageChanged', () => {
    if (window.ProfileEditManager) {
        // Wait a tick for DOM to settle
        setTimeout(() => {
            window.ProfileEditManager.init();
        }, 50);
    }
});
