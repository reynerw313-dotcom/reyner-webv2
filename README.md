# Personal Profile Web with SPA & Mini Games

Proyek web profil pribadi interaktif yang di-upgrade dengan berbagai fitur canggih menggunakan teknologi HTML, CSS (Tailwind), dan Vanilla JavaScript.

## Fitur Baru ✨

1. **SPA (Single Page Application) Router**
   - Berpindah halaman tanpa me-reload browser.
   - Musik dari Spotify akan terus berjalan lancar meski berpindah halaman.
2. **Global Spotify Player**
   - Floating music player di pojok kanan bawah.
   - Dapat di-minimize dan diexpand.
3. **10 Mini Games Interaktif**
   - Terdiri dari: Snake, Flappy Bird, 2048, Tic Tac Toe, Memory Card, Tebak Angka, Batu Gunting Kertas, Breakout, Whack A Mole, dan Typing Speed Test.
   - Dilengkapi dengan sistem skor dan efek suara interaktif (Web Audio API).
4. **Sistem Achievement & Daily Challenges**
   - Sistem "Toast" notification untuk pencapaian (misal: "Menang 10 Kali").
   - Statistik menang/kalah tersimpan secara lokal (Local Storage) dan ditampilkan dalam bentuk Grafik menggunakan Chart.js.
5. **Tema Dinamis**
   - Fitur penggantian tema (Dark Mode/Light Mode/Auto) dengan penyimpanan State.

## Cara Menjalankan

Karena web ini menggunakan JavaScript Module dan `fetch` API untuk memuat halaman, Anda perlu menjalankannya melalui web server lokal agar CORS tidak memblokir file lokal.

Gunakan salah satu cara berikut:
- **Live Server (VS Code):** Klik kanan pada `index.html` dan pilih "Open with Live Server".
- **Python HTTP Server:** Buka terminal di folder ini dan ketik `python -m http.server 8000`. Akses `http://localhost:8000`.
- **Node HTTP-Server:** Gunakan command `npx http-server .`.

## Struktur Direktori
- `/assets/js/`: Berisi logika utama SPA (`router.js`), Spotify (`player.js`), Data (`storage.js`, `achievements.js`), dan utility lainnya.
- `/games/`: Berisi skrip individual untuk ke-10 mini games.
- `index.html`: Titik masuk utama aplikasi (Main Shell).
- `playlist.html`, `games.html`, `stats.html`: Halaman-halaman baru.

Selamat bermain dan mengeksplorasi!
