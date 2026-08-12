const Storage = {
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(`portfolio_${key}`);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Storage get error', e);
            return defaultValue;
        }
    },
    set(key, value) {
        try {
            localStorage.setItem(`portfolio_${key}`, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage set error', e);
            return false;
        }
    },
    remove(key) {
        localStorage.removeItem(`portfolio_${key}`);
    }
};

window.AppStorage = Storage;

// ============================================================
// INDEXEDDB MUSIC DATABASE WRAPPER
// ============================================================
const DB_NAME = 'LocalMusicDB';
const DB_VERSION = 1;
const STORE_NAME = 'songs';

const MusicDB = {
    db: null,
    
    open() {
        return new Promise((resolve, reject) => {
            if (this.db) {
                resolve(this.db);
                return;
            }
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onerror = (e) => {
                console.error('IndexedDB open error:', e);
                reject(e);
            };
            request.onsuccess = (e) => {
                this.db = e.target.result;
                resolve(this.db);
            };
            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                }
            };
        });
    },

    getAll() {
        return new Promise((resolve, reject) => {
            this.open().then(db => {
                const transaction = db.transaction([STORE_NAME], 'readonly');
                const store = transaction.objectStore(STORE_NAME);
                const request = store.getAll();
                request.onsuccess = (e) => resolve(e.target.result || []);
                request.onerror = (e) => reject(e);
            }).catch(reject);
        });
    },

    save(song) {
        return new Promise((resolve, reject) => {
            this.open().then(db => {
                const transaction = db.transaction([STORE_NAME], 'readwrite');
                const store = transaction.objectStore(STORE_NAME);
                const request = store.put(song);
                request.onsuccess = () => resolve(true);
                request.onerror = (e) => reject(e);
            }).catch(reject);
        });
    },

    delete(id) {
        return new Promise((resolve, reject) => {
            this.open().then(db => {
                const transaction = db.transaction([STORE_NAME], 'readwrite');
                const store = transaction.objectStore(STORE_NAME);
                const request = store.delete(id);
                request.onsuccess = () => resolve(true);
                request.onerror = (e) => reject(e);
            }).catch(reject);
        });
    }
};

window.MusicDB = MusicDB;
