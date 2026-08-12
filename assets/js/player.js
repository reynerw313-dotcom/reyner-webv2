// ============================================================
// GLOBAL persistent MUSIC PLAYER – SINGLE INSTANCE
// ============================================================

const PlayerManager = {
    audio: null,
    currentTrack: null,
    isPlaying: false,
    isMuted: false,
    lastVolume: 70,
    isShuffle: false,
    isRepeat: 'all', // 'all' | 'one' | 'none'
    isMinimized: false,
    queue: [],
    recentTracks: [],
    favorites: [],
    _initialized: false,
    _eventsBound: false,
    _audioEventsBound: false,

    async init() {
        if (this._initialized) {
            this.syncUI();
            this.renderDrawerPlaylist();
            return;
        }

        console.log('[PlayerManager] Initializing Global Music Player...');

        // Initialize Audio object once on window to survive SPA swaps
        if (!window.__globalMusicAudio) {
            window.__globalMusicAudio = new Audio();
        }
        this.audio = window.__globalMusicAudio;

        // Initialize DB and load custom tracks
        if (window.MusicDB) {
            try {
                await window.MusicDB.open();
                await this.loadCustomTracksFromDB();
            } catch (err) {
                console.error('[PlayerManager] IndexedDB init error:', err);
            }
        }

        this.loadState();
        
        // Setup initial volume
        this.audio.volume = this.isMuted ? 0 : (this.lastVolume / 100);

        this.setupUI();
        this.ensureDragHandle();
        this.restorePosition();
        this.ensureEventsBound();
        this.bindAudioEvents();
        this.renderDrawerPlaylist();

        // Autoplay/Restore playback state across navigations/reloads
        const wasPlaying = localStorage.getItem('portfolio_player_playing') === 'true';
        if (wasPlaying && this.currentTrack) {
            this.ensureAudioSource(this.currentTrack);
            const savedTime = parseFloat(localStorage.getItem('portfolio_player_current_time') || '0');
            if (savedTime > 0) {
                this.audio.currentTime = savedTime;
            }
            
            this.audio.play().then(() => {
                this.isPlaying = true;
                this.syncPlayPauseUI(true);
            }).catch(err => {
                console.log('[PlayerManager] Autoplay blocked, waiting for user click to resume...');
                // Wait for any click on the page to resume playback (bypasses browser autoplay policy)
                const resumePlayback = () => {
                    if (this.currentTrack) {
                        this.audio.play().then(() => {
                            this.isPlaying = true;
                            this.syncPlayPauseUI(true);
                        }).catch(e => console.error('[PlayerManager] Resume click play error:', e));
                    }
                    document.removeEventListener('click', resumePlayback);
                };
                document.addEventListener('click', resumePlayback);
            });
        } else if (this.currentTrack) {
            this.isPlaying = false;
            this.syncPlayPauseUI(false);
        }

        this._initialized = true;

        // Notify page playlist manager to render
        if (window.PlaylistManager) {
            window.PlaylistManager.init();
        }
    },

    async loadCustomTracksFromDB() {
        if (!window.MusicDB) return;
        try {
            const savedSongs = await window.MusicDB.getAll();
            window.customTracks = [];
            for (const song of savedSongs) {
                const url = URL.createObjectURL(song.blob);
                window.customTracks.push({
                    id: song.id,
                    type: 'local',
                    name: song.title,
                    artist: song.artist || 'Unknown Artist',
                    url: url,
                    img: 'https://picsum.photos/seed/songdefault/150/150', // default cover image
                    duration: song.duration,
                    dateAdded: song.dateAdded,
                    isCustom: true
                });
            }
            console.log('[PlayerManager] Loaded custom tracks from IndexedDB:', window.customTracks.length);
        } catch (e) {
            console.error('[PlayerManager] Failed to load custom tracks:', e);
        }
    },

    getTracks() {
        if (window.PlaylistData) return window.PlaylistData.getLocalTracks();
        if (typeof LOCAL_TRACKS !== 'undefined') {
            const custom = window.customTracks || [];
            return [...LOCAL_TRACKS, ...custom];
        }
        return [];
    },

    loadState() {
        // Load configurations
        this.lastVolume = parseInt(localStorage.getItem('portfolio_player_volume') || '70');
        this.isMuted = localStorage.getItem('portfolio_player_muted') === 'true';
        this.isShuffle = localStorage.getItem('portfolio_player_shuffle') === 'true';
        this.isRepeat = localStorage.getItem('portfolio_player_repeat') || 'all';
        this.isMinimized = localStorage.getItem('portfolio_player_minimized') === 'true';
        
        try {
            this.favorites = JSON.parse(localStorage.getItem('portfolio_player_favorites')) || [];
            this.recentTracks = JSON.parse(localStorage.getItem('portfolio_player_recent')) || [];
            this.queue = JSON.parse(localStorage.getItem('portfolio_player_queue')) || [];
        } catch (e) {
            this.favorites = [];
            this.recentTracks = [];
            this.queue = [];
        }

        // Restore current track
        const savedTrackId = localStorage.getItem('portfolio_player_current_track');
        if (savedTrackId) {
            const track = this.getTracks().find(t => t.id === savedTrackId);
            if (track) {
                this.currentTrack = track;
                
                // If it is the active URL in the audio element, sync seek time
                if (this.audio && this.audio.src === track.url) {
                    // Audio already playing
                } else {
                    this.ensureAudioSource(track);
                    const savedTime = parseFloat(localStorage.getItem('portfolio_player_current_time') || '0');
                    if (savedTime > 0) {
                        this.audio.currentTime = savedTime;
                    }
                }
            }
        }
    },

    saveState() {
        localStorage.setItem('portfolio_player_volume', this.lastVolume);
        localStorage.setItem('portfolio_player_muted', this.isMuted);
        localStorage.setItem('portfolio_player_shuffle', this.isShuffle);
        localStorage.setItem('portfolio_player_repeat', this.isRepeat);
        localStorage.setItem('portfolio_player_minimized', this.isMinimized);
        localStorage.setItem('portfolio_player_favorites', JSON.stringify(this.favorites));
        localStorage.setItem('portfolio_player_recent', JSON.stringify(this.recentTracks));
        localStorage.setItem('portfolio_player_queue', JSON.stringify(this.queue));
        localStorage.setItem('portfolio_player_playing', this.isPlaying);
        
        if (this.currentTrack) {
            localStorage.setItem('portfolio_player_current_track', this.currentTrack.id);
            if (this.audio) {
                localStorage.setItem('portfolio_player_current_time', this.audio.currentTime);
            }
        }
    },

    setupUI() {
        // Sync layout controls
        const volumeSlider = document.getElementById('player-volume');
        if (volumeSlider) {
            volumeSlider.value = this.isMuted ? 0 : this.lastVolume;
            volumeSlider.style.setProperty('--fill-percent', `${this.isMuted ? 0 : this.lastVolume}%`);
        }

        this.updatePlayerMetadata();
        this.updateVolumeIcon();
        this.setMinimized(this.isMinimized);
        
        // Show player bar if there is an active track
        const playerBar = document.getElementById('spotify-player-bar');
        if (playerBar) {
            if (this.currentTrack) {
                playerBar.classList.remove('hidden-player');
            } else {
                playerBar.classList.add('hidden-player');
            }
        }
    },

    updatePlayerMetadata() {
        const titleEl = document.getElementById('player-title');
        const artistEl = document.getElementById('player-artist');
        const coverEl = document.getElementById('player-cover');
        const durationEl = document.getElementById('player-duration');

        const miniTitleEl = document.getElementById('player-mini-title');
        const discIcon = document.getElementById('player-disc-icon');
        const miniDiscIcon = document.getElementById('player-mini-disc-icon');

        if (this.currentTrack) {
            const titleText = this.currentTrack.name || 'Unknown Track';
            const artistText = this.currentTrack.artist || 'Unknown Artist';
            const coverSrc = this.currentTrack.img || 'https://picsum.photos/seed/songdefault/150/150';

            if (titleEl) {
                titleEl.textContent = titleText;
                titleEl.title = titleText;
            }
            if (artistEl) {
                artistEl.textContent = artistText;
                artistEl.title = artistText;
            }
            if (coverEl) coverEl.src = coverSrc;
            if (durationEl) durationEl.textContent = this.currentTrack.duration || '0:00';

            if (miniTitleEl) {
                miniTitleEl.textContent = `${titleText} - ${artistText}`;
                miniTitleEl.title = `${titleText} - ${artistText}`;
            }

            // Manage disc rotating animation
            if (this.isPlaying) {
                discIcon?.classList.add('animate-spin');
                miniDiscIcon?.classList.add('animate-spin');
            } else {
                discIcon?.classList.remove('animate-spin');
                miniDiscIcon?.classList.remove('animate-spin');
            }
        } else {
            if (titleEl) titleEl.textContent = 'No Song Playing';
            if (artistEl) artistEl.textContent = 'Select a track';
            if (coverEl) coverEl.src = 'https://picsum.photos/seed/songdefault/150/150';
            if (durationEl) durationEl.textContent = '0:00';
            if (miniTitleEl) miniTitleEl.textContent = 'No Song';

            discIcon?.classList.remove('animate-spin');
            miniDiscIcon?.classList.remove('animate-spin');
        }
    },

    syncUI() {
        if (!this._initialized) return;

        // Restore volume values
        if (this.audio) {
            this.isPlaying = !this.audio.paused && this.audio.src !== '';
        }

        this.setupUI();
        this.syncPlayPauseUI(this.isPlaying);

        const progressInput = document.getElementById('player-progress');
        if (progressInput && this.audio && this.audio.duration && !isNaN(this.audio.duration)) {
            const progress = (this.audio.currentTime / this.audio.duration) * 100;
            progressInput.value = progress;
            progressInput.style.setProperty('--fill-percent', `${progress}%`);
            
            const currentTimeEl = document.getElementById('player-current-time');
            if (currentTimeEl) currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
            const durationEl = document.getElementById('player-duration');
            if (durationEl) durationEl.textContent = this.formatTime(this.audio.duration);
        }
    },

    setMinimized(minimized) {
        this.isMinimized = minimized;
        localStorage.setItem('portfolio_player_minimized', minimized);

        const normalContainer = document.getElementById('player-normal-container');
        const miniContainer = document.getElementById('player-minimized-container');
        const playerBar = document.getElementById('spotify-player-bar');

        if (playerBar) {
            if (minimized) {
                if (normalContainer) normalContainer.classList.add('hidden');
                if (miniContainer) miniContainer.classList.remove('hidden');
                playerBar.style.width = '240px';
                playerBar.classList.add('player-minimized-view');
            } else {
                if (normalContainer) normalContainer.classList.remove('hidden');
                if (miniContainer) miniContainer.classList.add('hidden');
                playerBar.style.width = '280px';
                playerBar.classList.remove('player-minimized-view');
            }

            // Bounds check after size adjustment
            const rect = playerBar.getBoundingClientRect();
            const validated = this.validateBounds(rect.left, rect.top);
            playerBar.style.left = validated.x + 'px';
            playerBar.style.top = validated.y + 'px';
        }
    },

    ensureAudioSource(track) {
        if (!this.audio || !track) return;
        if (this.audio.src !== track.url) {
            this.audio.src = track.url;
            this.audio.load();
        }
    },

    playTrack(trackId) {
        console.log('[PlayerManager] playTrack called — ID:', trackId);

        const track = this.getTracks().find(t => t.id === trackId);
        if (!track) {
            console.warn('[PlayerManager] Track not found — ID:', trackId);
            return;
        }

        const playerBar = document.getElementById('spotify-player-bar');
        if (playerBar) playerBar.classList.remove('hidden-player');

        this.isPlaying = false;
        this.currentTrack = track;
        this.ensureAudioSource(track);
        
        this.audio.play().then(() => {
            this.isPlaying = true;
            this.syncPlayPauseUI(true);
            this.addToRecent(trackId);
            this.saveState();
            this.updatePlayerMetadata();
            this.showToast('Memutar: ' + track.name);
        }).catch(err => {
            console.error('[PlayerManager] Play error:', err);
            this.showToast('Gagal memutar audio. Coba lagi.');
        });
    },

    stopPlayback() {
        if (this.audio) {
            this.audio.pause();
            this.audio.src = '';
        }
        this.isPlaying = false;
        this.currentTrack = null;
        this.syncPlayPauseUI(false);
        this.updatePlayerMetadata();
        this.saveState();

        const playerBar = document.getElementById('spotify-player-bar');
        if (playerBar) playerBar.classList.add('hidden-player');
        
        const drawer = document.getElementById('spotify-playlist-drawer');
        if (drawer) drawer.classList.add('hidden-drawer');
    },

    togglePlay() {
        if (!this.currentTrack) return;

        if (this.isPlaying) {
            this.audio.pause();
            this.isPlaying = false;
            this.syncPlayPauseUI(false);
            this.showToast('Dijeda');
        } else {
            this.audio.play().then(() => {
                this.isPlaying = true;
                this.syncPlayPauseUI(true);
                this.showToast('Memutar');
            }).catch(e => {
                console.error('[PlayerManager] Resume error:', e);
                this.showToast('Gagal melanjutkan playback.');
            });
        }
        this.saveState();
        this.updatePlayerMetadata();
    },

    syncPlayPauseUI(playing) {
        const icon = document.getElementById('play-pause-icon');
        const miniIcon = document.getElementById('mini-play-pause-icon');
        
        if (icon) {
            icon.className = playing ? 'fa-solid fa-pause text-[10px] text-black' : 'fa-solid fa-play text-[10px] ml-0.5 text-black';
        }
        if (miniIcon) {
            miniIcon.className = playing ? 'fa-solid fa-pause text-xs text-white' : 'fa-solid fa-play text-xs text-white';
        }
        
        const discIcon = document.getElementById('player-disc-icon');
        const miniDiscIcon = document.getElementById('player-mini-disc-icon');
        if (playing) {
            discIcon?.classList.add('animate-spin');
            miniDiscIcon?.classList.add('animate-spin');
        } else {
            discIcon?.classList.remove('animate-spin');
            miniDiscIcon?.classList.remove('animate-spin');
        }
    },

    playNext() {
        // Queue handles first
        if (this.queue.length > 0) {
            const nextTrackId = this.queue.shift();
            this.saveState();
            this.playTrack(nextTrackId);
            this.showToast('Memutar dari Antrean');
            return;
        }

        const tracks = this.getTracks();
        if (tracks.length === 0) return;

        if (this.isShuffle) {
            const randomIndex = Math.floor(Math.random() * tracks.length);
            this.playTrack(tracks[randomIndex].id);
            return;
        }

        if (this.currentTrack) {
            const currentIndex = tracks.findIndex(t => t.id === this.currentTrack.id);
            const nextIndex = (currentIndex + 1) % tracks.length;
            this.playTrack(tracks[nextIndex].id);
        } else {
            this.playTrack(tracks[0].id);
        }
    },

    playPrevious() {
        if (this.audio && this.audio.currentTime > 5) {
            this.audio.currentTime = 0;
            return;
        }

        const tracks = this.getTracks();
        if (tracks.length === 0) return;

        if (this.currentTrack) {
            const currentIndex = tracks.findIndex(t => t.id === this.currentTrack.id);
            const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
            this.playTrack(tracks[prevIndex].id);
        } else {
            this.playTrack(tracks[0].id);
        }
    },

    handlePlaybackEnd() {
        if (this.isRepeat === 'one') {
            if (this.audio) {
                this.audio.currentTime = 0;
                this.audio.play();
            }
        } else {
            this.playNext();
        }
    },

    addToRecent(trackId) {
        this.recentTracks = this.recentTracks.filter(id => id !== trackId);
        this.recentTracks.unshift(trackId);
        if (this.recentTracks.length > 20) this.recentTracks.pop();
        this.saveState();
    },

    // ============================================================
    // DRAWER PLAYLIST VIEW CODE
    // ============================================================
    currentTab: 'all',
    searchQuery: '',

    renderDrawerPlaylist() {
        const container = document.getElementById('drawer-playlist-container');
        if (!container) return;

        container.innerHTML = '';
        let listToRender = [];

        if (this.currentTab === 'all') {
            listToRender = this.getTracks();
        } else if (this.currentTab === 'favorite') {
            listToRender = this.getTracks().filter(t => this.favorites.includes(t.id));
        } else if (this.currentTab === 'recent') {
            listToRender = this.recentTracks.map(id => this.getTracks().find(t => t.id === id)).filter(Boolean);
        } else if (this.currentTab === 'queue') {
            listToRender = this.queue.map(id => this.getTracks().find(t => t.id === id)).filter(Boolean);
        }

        // Filter Search
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            listToRender = listToRender.filter(t => 
                t.name.toLowerCase().includes(query) || 
                t.artist.toLowerCase().includes(query)
            );
        }

        if (listToRender.length === 0) {
            container.innerHTML = '<div class="text-center text-slate-500 text-xs py-8">Tidak ada lagu ditemukan.</div>';
            return;
        }

        listToRender.forEach((track, idx) => {
            const isActive = this.currentTrack && (this.currentTrack.id === track.id);
            const isFav = this.favorites.includes(track.id);

            const el = document.createElement('div');
            el.className = `flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/60 transition-all cursor-pointer ${isActive ? 'song-item-active' : ''}`;
            
            el.innerHTML = `
                <div class="flex items-center gap-3 min-w-0 pointer-events-none">
                    <span class="text-slate-500 text-[10px] w-4 text-right">${idx + 1}</span>
                    <div class="w-8 h-8 rounded overflow-hidden shrink-0 bg-slate-800 relative group">
                        <img src="${track.img}" alt="cover" class="w-full h-full object-cover">
                        <div class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <i class="fa-solid fa-play text-white text-[10px]"></i>
                        </div>
                    </div>
                    <div class="min-w-0">
                        <h4 class="text-[11px] font-semibold truncate text-slate-200 ${isActive ? 'text-[#1DB954]' : ''}">${track.name}</h4>
                        <p class="text-[9px] text-slate-500 truncate mt-0.5">${track.artist}</p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <button class="like-btn text-xs text-slate-500 hover:text-[#1DB954] p-1">
                        <i class="${isFav ? 'fa-solid text-[#1DB954]' : 'fa-regular'} fa-heart"></i>
                    </button>
                    <span class="text-[9px] text-slate-500 font-mono pr-1">${track.duration}</span>
                </div>
            `;

            // Click element to play
            el.addEventListener('click', (e) => {
                const likeBtn = e.target.closest('.like-btn');
                if (likeBtn) {
                    e.stopPropagation();
                    const index = this.favorites.indexOf(track.id);
                    if (index > -1) {
                        this.favorites.splice(index, 1);
                        this.showToast('Dihapus dari Favorit');
                    } else {
                        this.favorites.push(track.id);
                        this.showToast('Ditambahkan ke Favorit');
                    }
                    this.saveState();
                    this.updatePlayerMetadata();
                    this.renderDrawerPlaylist();
                } else {
                    this.playTrack(track.id);
                }
            });

            container.appendChild(el);
        });
    },

    // ============================================================
    // EVENTS BINDINGS
    // ============================================================

    bindAudioEvents() {
        if (this._audioEventsBound || !this.audio) return;
        this._audioEventsBound = true;

        this.audio.addEventListener('timeupdate', () => {
            const progressInput = document.getElementById('player-progress');
            if (progressInput && this.audio.duration && !isNaN(this.audio.duration)) {
                const progress = (this.audio.currentTime / this.audio.duration) * 100;
                progressInput.value = progress;
                progressInput.style.setProperty('--fill-percent', `${progress}%`);
                
                const currentTimeEl = document.getElementById('player-current-time');
                if (currentTimeEl) currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
            }
            
            // Real-time progress saving for page reloads / file:// fallback transitions
            if (this.currentTrack && this.audio && !this.audio.paused) {
                localStorage.setItem('portfolio_player_current_time', this.audio.currentTime);
            }
        });

        this.audio.addEventListener('loadedmetadata', () => {
            const durationEl = document.getElementById('player-duration');
            if (durationEl && this.audio.duration) {
                durationEl.textContent = this.formatTime(this.audio.duration);
            }
        });

        this.audio.addEventListener('ended', () => {
            this.handlePlaybackEnd();
        });
    },

    ensureEventsBound() {
        if (this._eventsBound) return;
        this._eventsBound = true;

        // Play/Pause Button normal
        document.getElementById('player-play-pause')?.addEventListener('click', () => this.togglePlay());
        
        // Play/Pause Button minimized
        document.getElementById('player-mini-play-pause')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.togglePlay();
        });

        // Prev & Next Buttons
        document.getElementById('player-prev')?.addEventListener('click', () => this.playPrevious());
        document.getElementById('player-next')?.addEventListener('click', () => this.playNext());

        // Volume Mute toggle
        document.getElementById('player-volume-btn')?.addEventListener('click', () => {
            this.isMuted = !this.isMuted;
            if (this.audio) {
                this.audio.volume = this.isMuted ? 0 : (this.lastVolume / 100);
            }
            const volumeSlider = document.getElementById('player-volume');
            if (volumeSlider) {
                volumeSlider.value = this.isMuted ? 0 : this.lastVolume;
                volumeSlider.style.setProperty('--fill-percent', `${this.isMuted ? 0 : this.lastVolume}%`);
            }
            this.updateVolumeIcon();
            this.saveState();
        });

        // Volume range input
        const volumeSlider = document.getElementById('player-volume');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                const val = parseInt(e.target.value);
                this.lastVolume = val;
                this.isMuted = (val === 0);
                if (this.audio) {
                    this.audio.volume = this.isMuted ? 0 : (val / 100);
                }
                volumeSlider.style.setProperty('--fill-percent', `${val}%`);
                this.updateVolumeIcon();
                this.saveState();
            });
        }

        // Progress seek input
        const progressInput = document.getElementById('player-progress');
        if (progressInput) {
            progressInput.addEventListener('input', (e) => {
                if (this.audio && this.audio.duration) {
                    const percent = parseFloat(e.target.value);
                    const newTime = (percent / 100) * this.audio.duration;
                    this.audio.currentTime = newTime;
                    progressInput.style.setProperty('--fill-percent', `${percent}%`);
                }
            });
        }

        // Drawer toggle
        document.getElementById('player-drawer-toggle')?.addEventListener('click', () => {
            const drawer = document.getElementById('spotify-playlist-drawer');
            if (drawer) {
                const isHidden = drawer.classList.contains('hidden-drawer');
                if (isHidden) {
                    this.renderDrawerPlaylist();
                    drawer.classList.remove('hidden-drawer');
                } else {
                    drawer.classList.add('hidden-drawer');
                }
            }
        });

        // Close drawer in drawer view
        document.getElementById('close-drawer')?.addEventListener('click', () => {
            document.getElementById('spotify-playlist-drawer')?.classList.add('hidden-drawer');
        });

        // Search in drawer
        document.getElementById('drawer-search')?.addEventListener('input', (e) => {
            this.searchQuery = e.target.value;
            this.renderDrawerPlaylist();
        });

        // Tabs in drawer
        ['all', 'favorite', 'recent', 'queue'].forEach(tabName => {
            const tabBtn = document.getElementById(`tab-${tabName}`);
            if (tabBtn) {
                tabBtn.addEventListener('click', () => {
                    // Update active button state
                    ['all', 'favorite', 'recent', 'queue'].forEach(t => {
                        const btn = document.getElementById(`tab-${t}`);
                        if (btn) {
                            btn.classList.remove('bg-slate-800', 'text-white');
                            btn.classList.add('text-slate-400', 'hover:text-white');
                        }
                    });
                    tabBtn.classList.remove('text-slate-400', 'hover:text-white');
                    tabBtn.classList.add('bg-slate-800', 'text-white');

                    this.currentTab = tabName;
                    this.renderDrawerPlaylist();
                });
            }
        });

        // Minimize & Expand buttons
        document.getElementById('player-minimize-btn')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.setMinimized(true);
        });

        document.getElementById('player-minimized-container')?.addEventListener('click', (e) => {
            if (!e.target.closest('#player-mini-play-pause')) {
                this.setMinimized(false);
            }
        });
        document.getElementById('player-expand-btn')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.setMinimized(false);
        });

        // Close on background window unload
        window.addEventListener('beforeunload', () => {
            this.saveState();
        });
    },

    updateVolumeIcon() {
        const icon = document.getElementById('volume-icon');
        if (!icon) return;

        if (this.isMuted || this.lastVolume === 0) {
            icon.className = 'fa-solid fa-volume-xmark text-red-500';
        } else if (this.lastVolume < 30) {
            icon.className = 'fa-solid fa-volume-off';
        } else if (this.lastVolume < 75) {
            icon.className = 'fa-solid fa-volume-low';
        } else {
            icon.className = 'fa-solid fa-volume-high';
        }
    },

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    },

    showToast(message) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'bg-slate-900 border border-slate-800 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 transform translate-y-10 opacity-0 transition-all duration-300 text-xs font-semibold';
        toast.innerHTML = `<i class="fa-solid fa-info text-[#1DB954]"></i> <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.remove('translate-y-10', 'opacity-0');
        }, 10);

        setTimeout(() => {
            toast.classList.add('translate-y-10', 'opacity-0');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    // ============================================================
    // DRAGGABLE MUSIC PLAYER ENGINE
    // ============================================================
    
    makeDraggable(element) {
        const handleNormal = document.getElementById('player-drag-handle');
        const handleMini = document.getElementById('player-minimized-container');

        const bindEventsToHandle = (handle) => {
            if (!handle) return;
            
            let startX = 0, startY = 0, startLeft = 0, startTop = 0;
            let isDragging = false;
            
            const handlePointerDown = (e) => {
                // Ignore button and slider clicks
                if (e.target.closest('button') || e.target.closest('input') || e.target.closest('a')) {
                    return;
                }
                
                e.preventDefault();
                isDragging = true;
                handle.setPointerCapture(e.pointerId);
                
                const rect = element.getBoundingClientRect();
                startLeft = rect.left;
                startTop = rect.top;
                startX = e.clientX;
                startY = e.clientY;
                
                // Set inline CSS styles override
                element.style.left = startLeft + 'px';
                element.style.top = startTop + 'px';
                element.style.right = 'auto';
                element.style.bottom = 'auto';
                element.style.cursor = 'grabbing';
            };

            const handlePointerMove = (e) => {
                if (!isDragging) return;
                e.preventDefault();
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                const newX = startLeft + dx;
                const newY = startTop + dy;
                
                const validated = this.validateBounds(newX, newY);
                element.style.left = validated.x + 'px';
                element.style.top = validated.y + 'px';
            };

            const handlePointerUp = (e) => {
                if (!isDragging) return;
                isDragging = false;
                element.style.cursor = '';
                
                const x = parseFloat(element.style.left);
                const y = parseFloat(element.style.top);
                if (!isNaN(x) && !isNaN(y)) {
                    localStorage.setItem('spotify_player_position', JSON.stringify({ x, y }));
                }
            };

            const handlePointerCancel = () => {
                isDragging = false;
                element.style.cursor = '';
            };

            // Remove if duplicate exists
            handle.removeEventListener('pointerdown', handlePointerDown);
            handle.removeEventListener('pointermove', handlePointerMove);
            handle.removeEventListener('pointerup', handlePointerUp);
            handle.removeEventListener('pointercancel', handlePointerCancel);

            // Re-bind
            handle.addEventListener('pointerdown', handlePointerDown);
            handle.addEventListener('pointermove', handlePointerMove);
            handle.addEventListener('pointerup', handlePointerUp);
            handle.addEventListener('pointercancel', handlePointerCancel);
        };

        bindEventsToHandle(handleNormal);
        bindEventsToHandle(handleMini);
    },

    validateBounds(x, y) {
        const playerBar = document.getElementById('spotify-player-bar');
        if (!playerBar) return { x, y };
        
        const rect = playerBar.getBoundingClientRect();
        const width = rect.width || 280;
        const height = rect.height || 180;
        const maxX = window.innerWidth - width;
        const maxY = window.innerHeight - height;
        
        return {
            x: Math.max(0, Math.min(x, maxX)),
            y: Math.max(0, Math.min(y, maxY))
        };
    },

    restorePosition() {
        const playerBar = document.getElementById('spotify-player-bar');
        if (!playerBar) return;
        
        const savedPos = localStorage.getItem('spotify_player_position');
        if (savedPos) {
            try {
                const { x, y } = JSON.parse(savedPos);
                const validated = this.validateBounds(x, y);
                playerBar.style.left = validated.x + 'px';
                playerBar.style.top = validated.y + 'px';
                playerBar.style.bottom = 'auto';
                playerBar.style.right = 'auto';
            } catch (e) {
                console.error('Failed to restore player position:', e);
            }
        } else {
            // Default bottom right
            playerBar.style.left = 'auto';
            playerBar.style.right = '20px';
            playerBar.style.bottom = '20px';
            playerBar.style.top = 'auto';
        }
    },

    ensureDragHandle() {
        const playerBar = document.getElementById('spotify-player-bar');
        if (!playerBar) return;
        this.makeDraggable(playerBar);
    }
};

window.GlobalPlayer = PlayerManager;

// BOOT init once DOM is ready, sync on SPA changeChanged event
document.addEventListener('DOMContentLoaded', () => {
    PlayerManager.init();
});

window.addEventListener('pageChanged', () => {
    if (window.GlobalPlayer && window.GlobalPlayer._initialized) {
        window.GlobalPlayer.ensureDragHandle();
        window.GlobalPlayer.ensureEventsBound();
        window.GlobalPlayer.syncUI();
        window.GlobalPlayer.renderDrawerPlaylist();
        
        // Make sure the active page playlist manager re-populates if needed
        if (window.PlaylistManager) {
            window.PlaylistManager.init();
        }
    } else {
        PlayerManager.init();
    }
});
