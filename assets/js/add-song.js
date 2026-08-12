const ADD_SONG_PIN = '030510';

const AddSongManager = {
    modalsReady: false,
    _eventsBound: false,

    init() {
        this.injectModals();
        this.bindModalEvents();
    },

    injectModals() {
        if (document.getElementById('add-song-pin-modal')) {
            this.modalsReady = true;
            return;
        }

        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <!-- PIN Modal -->
            <div id="add-song-pin-modal"
                class="add-song-modal fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300 opacity-0 pointer-events-none">
                <div class="add-song-modal-box bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform scale-95 transition-transform duration-300">
                    <div class="p-5 border-b border-slate-800 bg-navy-950/50">
                        <h3 class="font-display text-lg font-bold text-white flex items-center gap-2">
                            <span>🔐</span> Masukkan PIN
                        </h3>
                    </div>
                    <div class="p-6 space-y-4">
                        <div class="space-y-2">
                            <label for="add-song-pin-input" class="text-xs font-semibold text-slate-400 uppercase tracking-wider">PIN</label>
                            <div class="relative">
                                <input type="password" inputmode="numeric" id="add-song-pin-input" maxlength="6"
                                    placeholder="Masukkan PIN..."
                                    class="w-full px-4 py-2.5 pr-12 rounded-lg text-sm bg-slate-950/60 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-[#1DB954] focus:ring-1 focus:ring-[#1DB954] transition-all">
                                <button type="button" id="toggle-pin-visibility"
                                    class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white transition-colors"
                                    title="Tampilkan/Sembunyikan PIN">
                                    <i class="fa-solid fa-eye" id="pin-eye-icon"></i>
                                </button>
                            </div>
                            <p id="add-song-pin-error" class="text-red-400 text-xs hidden">PIN salah! Silakan coba lagi.</p>
                        </div>
                    </div>
                    <div class="p-4 border-t border-slate-800 bg-navy-950/30 flex items-center justify-end gap-3">
                        <button type="button" id="add-song-pin-cancel"
                            class="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors">
                            Batal
                        </button>
                        <button type="button" id="add-song-pin-continue"
                            class="px-4 py-2 text-xs font-semibold text-black bg-[#1DB954] hover:bg-[#1ed760] rounded-lg transition-colors">
                            Lanjutkan
                        </button>
                    </div>
                </div>
            </div>

            <!-- Upload Music Modal -->
            <div id="add-song-modal"
                class="add-song-modal fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300 opacity-0 pointer-events-none">
                <div class="add-song-modal-box bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform scale-95 transition-transform duration-300">
                    <div class="p-5 border-b border-slate-800 bg-navy-950/50 flex justify-between items-center">
                        <h3 class="font-display text-base font-bold text-white flex items-center gap-2">
                            <span>🎵</span> Tambah Lagu Baru
                        </h3>
                        <button id="add-song-close" class="text-slate-400 hover:text-white transition-colors">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    
                    <div class="p-6 space-y-4">
                        <!-- Drag and Drop Zone -->
                        <div id="upload-drop-zone" class="border-2 border-dashed border-slate-700 hover:border-[#1DB954] rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 group">
                            <div class="text-3xl text-slate-500 group-hover:text-[#1DB954] transition-colors">
                                <i class="fa-solid fa-cloud-arrow-up"></i>
                            </div>
                            <div class="text-center">
                                <p class="text-sm font-semibold text-white">Drag & Drop file musik di sini</p>
                                <p class="text-xs text-slate-400 mt-1">atau</p>
                            </div>
                            <button type="button" id="btn-select-file" class="px-4 py-2 text-xs font-semibold text-black bg-[#1DB954] hover:bg-[#1ed760] rounded-lg transition-colors">
                                Pilih File Musik
                            </button>
                            <input type="file" id="upload-file-input" class="hidden" accept=".mp3,.wav,.ogg,.m4a,.aac,audio/*">
                        </div>
                        
                        <!-- Status Messages -->
                        <p id="upload-error-msg" class="text-red-400 text-xs text-center hidden"></p>
                        <p id="upload-success-msg" class="text-[#1DB954] text-xs text-center hidden"></p>

                        <!-- Progress Loading Bar -->
                        <div id="upload-status-container" class="hidden space-y-2 bg-slate-950/40 p-4 rounded-xl border border-slate-800/60">
                            <div class="flex items-center justify-between text-[11px] text-slate-400">
                                <span class="truncate max-w-[220px]" id="upload-file-name">filename.mp3</span>
                                <span id="upload-progress-percent">0%</span>
                            </div>
                            <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                <div id="upload-progress-bar" class="bg-[#1DB954] h-1.5 w-0 transition-all duration-300"></div>
                            </div>
                            <p id="upload-status-text" class="text-[10px] text-slate-400 italic">Memproses file audio...</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(wrapper);
        this.modalsReady = true;
    },

    bindModalEvents() {
        if (this._eventsBound) return;
        this._eventsBound = true;

        const pinModal = 'add-song-pin-modal';
        const addModal = 'add-song-modal';

        // PIN events
        document.getElementById('add-song-pin-cancel')?.addEventListener('click', () => this.closeModal(pinModal));
        document.getElementById('add-song-pin-continue')?.addEventListener('click', () => this.verifyPin());
        document.getElementById('add-song-pin-input')?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.verifyPin();
        });

        // Close upload modal
        document.getElementById('add-song-close')?.addEventListener('click', () => this.closeModal(addModal));
        document.getElementById('add-song-pin-modal')?.addEventListener('click', (e) => {
            if (e.target.id === pinModal) this.closeModal(pinModal);
        });
        document.getElementById('add-song-modal')?.addEventListener('click', (e) => {
            if (e.target.id === addModal) this.closeModal(addModal);
        });

        // PIN visibility
        document.getElementById('toggle-pin-visibility')?.addEventListener('click', () => {
            const input = document.getElementById('add-song-pin-input');
            const icon = document.getElementById('pin-eye-icon');
            if (!input || !icon) return;
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            icon.className = isPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
        });

        // Drag & Drop Area listeners
        const dropZone = document.getElementById('upload-drop-zone');
        const fileInput = document.getElementById('upload-file-input');
        const selectBtn = document.getElementById('btn-select-file');

        if (dropZone && fileInput) {
            // Drag enter / over
            ['dragenter', 'dragover'].forEach(eventName => {
                dropZone.addEventListener(eventName, (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dropZone.classList.add('border-[#1DB954]', 'bg-slate-800/30');
                }, false);
            });

            // Drag leave / drop
            ['dragleave', 'drop'].forEach(eventName => {
                dropZone.addEventListener(eventName, (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dropZone.classList.remove('border-[#1DB954]', 'bg-slate-800/30');
                }, false);
            });

            // Drop file
            dropZone.addEventListener('drop', (e) => {
                const dt = e.dataTransfer;
                const files = dt.files;
                if (files && files.length > 0) {
                    this.handleFileSelect(files[0]);
                }
            }, false);

            // Select file dialog trigger
            dropZone.addEventListener('click', (e) => {
                if (e.target !== selectBtn) {
                    fileInput.click();
                }
            });
            selectBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                fileInput.click();
            });

            // File input selection
            fileInput.addEventListener('change', (e) => {
                if (fileInput.files && fileInput.files.length > 0) {
                    this.handleFileSelect(fileInput.files[0]);
                }
            });
        }
    },

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        const box = modal.querySelector('.add-song-modal-box');
        modal.classList.remove('pointer-events-none', 'opacity-0');
        if (box) {
            box.classList.remove('scale-95');
            box.classList.add('scale-100');
        }
    },

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        const box = modal.querySelector('.add-song-modal-box');
        modal.classList.add('opacity-0', 'pointer-events-none');
        if (box) {
            box.classList.remove('scale-100');
            box.classList.add('scale-95');
        }
    },

    verifyPin() {
        const pinInput = document.getElementById('add-song-pin-input');
        const errorEl = document.getElementById('add-song-pin-error');
        if (!pinInput) return;

        if (pinInput.value === ADD_SONG_PIN) {
            if (errorEl) errorEl.classList.add('hidden');
            this.closeModal('add-song-pin-modal');
            this.openUploadModal();
        } else {
            if (errorEl) errorEl.classList.remove('hidden');
            pinInput.value = '';
            pinInput.focus();
        }
    },

    openUploadModal() {
        // Reset upload elements
        const errorEl = document.getElementById('upload-error-msg');
        const successEl = document.getElementById('upload-success-msg');
        const statusEl = document.getElementById('upload-status-container');
        const fileInput = document.getElementById('upload-file-input');

        if (errorEl) errorEl.classList.add('hidden');
        if (successEl) successEl.classList.add('hidden');
        if (statusEl) statusEl.classList.add('hidden');
        if (fileInput) fileInput.value = '';

        this.openModal('add-song-modal');
    },

    getBaseName(fileName) {
        const lastDotIndex = fileName.lastIndexOf('.');
        if (lastDotIndex === -1) return fileName;
        return fileName.substring(0, lastDotIndex);
    },

    formatTime(seconds) {
        if (isNaN(seconds) || seconds === Infinity) return '--:--';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    },

    handleFileSelect(file) {
        const errorEl = document.getElementById('upload-error-msg');
        const successEl = document.getElementById('upload-success-msg');
        if (errorEl) errorEl.classList.add('hidden');
        if (successEl) successEl.classList.add('hidden');

        if (!file) return;

        // 1. Validate File Format
        const supportedTypes = ['audio/mp3', 'audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/ogg', 'audio/ogg;codecs=opus', 'audio/m4a', 'audio/x-m4a', 'audio/aac'];
        const nameLower = file.name.toLowerCase();
        const hasValidExt = ['.mp3', '.wav', '.ogg', '.m4a', '.aac'].some(ext => nameLower.endsWith(ext));

        if (!hasValidExt && !supportedTypes.includes(file.type) && !file.type.startsWith('audio/')) {
            this.showError("File tidak didukung. Silakan pilih file musik.");
            return;
        }

        // 2. Validate Duplicate Song
        const baseTitle = this.getBaseName(file.name);
        const existingPlaylist = window.PlaylistData ? window.PlaylistData.getLocalTracks() : [];
        const isDuplicate = existingPlaylist.some(track => track.name.toLowerCase() === baseTitle.toLowerCase());
        
        if (isDuplicate) {
            this.showError("Lagu sudah ada di Local Playlist.");
            return;
        }

        // 3. Process File Upload
        this.processAudioUpload(file);
    },

    showError(msg) {
        const errorEl = document.getElementById('upload-error-msg');
        if (errorEl) {
            errorEl.textContent = msg;
            errorEl.classList.remove('hidden');
        }
    },

    showSuccess(msg) {
        const successEl = document.getElementById('upload-success-msg');
        if (successEl) {
            successEl.textContent = msg;
            successEl.classList.remove('hidden');
        }
    },

    processAudioUpload(file) {
        const progressContainer = document.getElementById('upload-status-container');
        const fileNameEl = document.getElementById('upload-file-name');
        const progressPercentEl = document.getElementById('upload-progress-percent');
        const progressBarEl = document.getElementById('upload-progress-bar');
        const statusTextEl = document.getElementById('upload-status-text');

        if (progressContainer) progressContainer.classList.remove('hidden');
        if (fileNameEl) fileNameEl.textContent = file.name;
        if (progressPercentEl) progressPercentEl.textContent = '0%';
        if (progressBarEl) progressBarEl.style.width = '0%';
        if (statusTextEl) statusTextEl.textContent = 'Membaca metadata musik...';

        // Create temporary Audio element to read track duration
        const tempAudio = new Audio();
        const fileURL = URL.createObjectURL(file);
        
        const cleanupAndFail = () => {
            URL.revokeObjectURL(fileURL);
            this.showError("Gagal menambahkan lagu. Silakan coba lagi.");
            if (progressContainer) progressContainer.classList.add('hidden');
        };

        tempAudio.addEventListener('loadedmetadata', () => {
            const durationSeconds = tempAudio.duration;
            const durationString = this.formatTime(durationSeconds);
            URL.revokeObjectURL(fileURL);

            statusTextEl.textContent = 'Menyimpan file musik ke database IndexedDB...';

            // Simulate progress load
            let percent = 0;
            const interval = setInterval(async () => {
                percent += 10;
                if (progressPercentEl) progressPercentEl.textContent = `${percent}%`;
                if (progressBarEl) progressBarEl.style.width = `${percent}%`;

                if (percent >= 100) {
                    clearInterval(interval);
                    
                    try {
                        const songId = `custom_${Date.now()}`;
                        const songData = {
                            id: songId,
                            title: this.getBaseName(file.name),
                            artist: 'Unknown Artist',
                            duration: durationString,
                            dateAdded: new Date().toLocaleDateString('id-ID'),
                            blob: file
                        };

                        // Store in IndexedDB
                        if (window.MusicDB) {
                            await window.MusicDB.save(songData);
                        } else {
                            throw new Error('MusicDB not initialized');
                        }

                        // Generate session Blob URL for playback
                        const blobURL = URL.createObjectURL(file);
                        
                        // Push to runtime tracks array
                        window.customTracks = window.customTracks || [];
                        window.customTracks.push({
                            id: songId,
                            type: 'local',
                            name: songData.title,
                            artist: songData.artist,
                            url: blobURL,
                            img: 'https://picsum.photos/seed/songdefault/150/150', // default cover image
                            duration: songData.duration,
                            dateAdded: songData.dateAdded,
                            isCustom: true
                        });

                        statusTextEl.textContent = 'Berhasil disimpan!';
                        this.showSuccess("Lagu berhasil ditambahkan ke Local Playlist!");
                        this.showToast("Lagu berhasil di-upload!");

                        // Refresh page playlist UI and drawer UI
                        if (window.PlaylistManager) {
                            window.PlaylistManager.init();
                        }
                        if (window.GlobalPlayer) {
                            window.GlobalPlayer.renderDrawerPlaylist();
                        }

                        setTimeout(() => {
                            this.closeModal('add-song-modal');
                        }, 1200);

                    } catch (err) {
                        console.error('IndexedDB save failed:', err);
                        cleanupAndFail();
                    }
                }
            }, 100);
        });

        tempAudio.addEventListener('error', () => {
            console.error('Audio load error:', tempAudio.error);
            cleanupAndFail();
        });

        // Set source to trigger load
        tempAudio.src = fileURL;
    },

    showToast(message) {
        if (window.GlobalPlayer && typeof window.GlobalPlayer.showToast === 'function') {
            window.GlobalPlayer.showToast(message);
        }
    }
};

function openAddSongAuth() {
    AddSongManager.init();
    const pinInput = document.getElementById('add-song-pin-input');
    if (pinInput) {
        pinInput.value = '';
        pinInput.type = 'password';
    }
    const eyeIcon = document.getElementById('pin-eye-icon');
    if (eyeIcon) eyeIcon.className = 'fa-solid fa-eye';
    
    const pinError = document.getElementById('add-song-pin-error');
    if (pinError) pinError.classList.add('hidden');

    AddSongManager.openModal('add-song-pin-modal');
}

// Expose globally
window.openAddSongAuth = openAddSongAuth;
window.AddSongManager = AddSongManager;

document.addEventListener('DOMContentLoaded', () => AddSongManager.init());
