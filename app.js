// DATA TUGAS SEKOLAH (INFORMATIKA & BAHASA INDONESIA)
const tugasData = [
  // --- INFORMATIKA ---
  {
    id: 'inf-1',
    subject: 'informatika',
    category: 'praktik',
    categoryLabel: 'Praktik Coding',
    title: 'Website Portofolio Responsif',
    date: '10 Juli 2026',
    score: '98 / 100',
    shortDesc: 'Merancang halaman portofolio interaktif menggunakan Tailwind CSS untuk tata letak grid dan flexbox.',
    fullDesc: 'Tugas praktikum mandiri untuk membuat desain web portofolio satu halaman. Implementasi berfokus pada responsivitas layar (mobile-first design), navigasi bar lengket (sticky navbar), penggunaan flexbox/grid Tailwind, serta implementasi interaksi tab dinamis menggunakan vanilla JavaScript.',
    attachment: `<!-- Cuplikan Kode Utama index.html -->
<!DOCTYPE html>
<html lang="id">
<head>
  <title>Portofolio Saya</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-white flex items-center justify-center min-h-screen">
  <div class="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
    <h1 class="text-2xl font-bold text-blue-400">Halo Dunia!</h1>
    <p class="text-slate-400 text-sm mt-2">Ini adalah hasil praktikum portofolio responsif pertama saya.</p>
  </div>
</body>
</html>`,
    downloadUrl: '#'
  },
  {
    id: 'inf-2',
    subject: 'informatika',
    category: 'praktik',
    categoryLabel: 'Praktik Coding',
    title: 'Program Kasir Python Sederhana',
    date: '28 Juni 2026',
    score: '95 / 100',
    shortDesc: 'Aplikasi kasir berbasis Terminal (CLI) yang ditulis dengan Python untuk menghitung total belanja belanjaan.',
    fullDesc: 'Program sederhana untuk menyimulasikan transaksi pembelian di toko kelontong. Program dapat menerima input nama barang, harga, jumlah barang, menghitung subtotal, menerapkan diskon belanja otomatis (misal belanja di atas Rp100.000 diskon 10%), serta mencetak nota transaksi terformat.',
    attachment: `# Program Kasir Sederhana - Informatika
def hitung_diskon(total):
    if total >= 100000:
        return total * 0.10 # Diskon 10%
    return 0

print("=== PROGRAM KASIR TOKO REYNER ===")
items = []
while True:
    nama = input("Nama barang (ketik 'selesai' untuk hitung): ")
    if nama.lower() == 'selesai':
        break
    harga = int(input("Harga satuan: "))
    jumlah = int(input("Jumlah beli: "))
    subtotal = harga * jumlah
    items.append({"nama": nama, "harga": harga, "jumlah": jumlah, "subtotal": subtotal})

total_belanja = sum(i["subtotal"] for i in items)
diskon = hitung_diskon(total_belanja)
total_bayar = total_belanja - diskon

print("\\n" + "="*30)
print(f"Total Kotor  : Rp {total_belanja:,}")
print(f"Potongan (Dis): Rp {diskon:,}")
print(f"Total Bayar  : Rp {total_bayar:,}")
print("="*30 + "\\nTerima kasih!")`,
    downloadUrl: '#'
  },
  {
    id: 'inf-3',
    subject: 'informatika',
    category: 'teori',
    categoryLabel: 'Teori & Analisis',
    title: 'Analisis Keamanan Jaringan Nirkabel',
    date: '15 Mei 2026',
    score: '92 / 100',
    shortDesc: 'Laporan teoritis yang menganalisis kerentanan enkripsi WEP dibandingkan dengan WPA2/WPA3 pada jaringan Wi-Fi.',
    fullDesc: 'Studi komparasi mengenai protokol keamanan jaringan nirkabel (Wi-Fi). Membahas struktur algoritma keamanan WEP (Wired Equivalent Privacy), WPA2 (Wi-Fi Protected Access 2), dan WPA3 yang lebih modern. Menganalisis kerentanan "IV Collision" pada WEP yang membuatnya mudah didekripsi dalam hitungan menit.',
    attachment: `LAPORAN TEORITIS: ANALISIS KEAMANAN JARINGAN NIRKABEL

I. PENDAHULUAN
Protokol keamanan Wi-Fi berfungsi mengamankan transmisi data nirkabel dari penyadapan (eavesdropping).

II. PERBANDINGAN ENKRIPSI
1. WEP (Wired Equivalent Privacy):
   - Menggunakan algoritma enkripsi RC4 dengan Initialization Vector (IV) 24-bit.
   - Kerentanan: Ukuran IV terlalu kecil menyebabkan pengulangan kunci (IV Collision), sehingga paket dapat didekripsi dengan mudah menggunakan tools seperti Aircrack-ng.
2. WPA2-AES:
   - Menggunakan enkripsi Advanced Encryption Standard (AES) dan CCMP.
   - Keamanan jauh lebih kuat, namun rentan serangan 'four-way handshake key-reinstallation' (KRACK).
3. WPA3-SAE:
   - Menggunakan 'Simultaneous Authentication of Equals' menggantikan PSK untuk mencegah serangan offline dictionary attack.

III. KESIMPULAN
Jaringan modern wajib menghindari penggunaan WEP dan berpindah minimal ke WPA2 atau WPA3 guna menjamin integritas data.`,
    downloadUrl: '#'
  },
  {
    id: 'inf-4',
    subject: 'informatika',
    category: 'teori',
    categoryLabel: 'Teori & Analisis',
    title: 'Logika Gerbang Digital & Boolean',
    date: '02 April 2026',
    score: '90 / 100',
    shortDesc: 'Tugas pemecahan tabel kebenaran untuk sirkuit logika kombinatorial AND, OR, NOT, NAND, dan XOR.',
    fullDesc: 'Menyusun tabel kebenaran (truth table) berdasarkan fungsi Boolean yang diberikan. Menyelesaikan penyederhanaan ekspresi aljabar Boolean menggunakan Teorema De Morgan dan Hukum Aljabar Boolean untuk mengefisienkan jumlah gerbang logika dalam sebuah sirkuit digital.',
    attachment: `Fungsi Boolean: F(A, B, C) = A'B + AB'C + ABC' + ABC

1. Tabel Kebenaran:
A | B | C | A' | B' | C' | A'B | AB'C | ABC' | ABC | F
------------------------------------------------------
0 | 0 | 0 | 1  | 1  | 1  |  0  |  0   |  0   |  0  | 0
0 | 0 | 1 | 1  | 1  | 0  |  0  |  0   |  0   |  0  | 0
0 | 1 | 0 | 1  | 0  | 1  |  1  |  0   |  0   |  0  | 1
0 | 1 | 1 | 1  | 0  | 0  |  1  |  0   |  0   |  0  | 1
1 | 0 | 0 | 0  | 1  | 1  |  0  |  0   |  0   |  0  | 0
1 | 0 | 1 | 0  | 1  | 0  |  0  |  1   |  0   |  0  | 1
1 | 1 | 0 | 0  | 0  | 1  |  0  |  0   |  1   |  0  | 1
1 | 1 | 1 | 0  | 0  | 0  |  0  |  0   |  0   |  1  | 1

2. Penyederhanaan Aljabar Boolean:
F = A'B + AB'C + AB(C' + C)
  = A'B + AB'C + AB(1)     [Hukum Komplemen: C'+C = 1]
  = A'B + AB + AB'C        [Hukum Komutatif]
  = B(A' + A) + AB'C       [Hukum Distributif]
  = B(1) + AB'C            [A'+A = 1]
  = B + AB'C
  = (B + A)(B + B')(B + C) [Penyederhanaan Distributif]
  = (A + B)(C + B)`,
    downloadUrl: '#'
  },
  {
    id: 'inf-5',
    subject: 'informatika',
    title: "Artikel: Sistem Digital",
    image: 'assets/sistem.webp',
    category: "artikel",
    date: "29 Juli 2026",
    score: "artikel",
    description: "Artikel yang membahas pengertian sistem digital, komponen, cara kerja, kelebihan, kekurangan, serta contoh penerapannya dalam kehidupan sehari-hari.",
    attachment: `
# Sistem Digital

## Pengertian Sistem Digital
Sistem digital adalah sistem yang bekerja menggunakan data digital berupa angka biner, yaitu 0 dan 1. Sistem ini digunakan pada berbagai perangkat elektronik seperti komputer, smartphone, kalkulator, televisi digital, dan mesin otomatis.

## Komponen Sistem Digital
Beberapa komponen utama dalam sistem digital antara lain:
• Perangkat Masukan (Input)
• Unit Pemroses (Processor/CPU)
• Memori atau Penyimpanan
• Perangkat Keluaran (Output)

Semua komponen tersebut bekerja sama untuk mengolah data menjadi informasi yang berguna bagi pengguna.

## Cara Kerja Sistem Digital
1. Data dimasukkan melalui perangkat input.
2. Data diproses oleh CPU menggunakan logika biner.
3. Hasil pemrosesan disimpan di memori jika diperlukan.
4. Informasi ditampilkan melalui perangkat output.

## Kelebihan Sistem Digital
• Hasil lebih akurat.
• Kecepatan pemrosesan tinggi.
• Mudah menyimpan data.
• Lebih tahan terhadap gangguan sinyal.
• Mudah dikembangkan sesuai kebutuhan teknologi.

## Kekurangan Sistem Digital
• Membutuhkan sumber listrik.
• Biaya perangkat relatif lebih mahal.
• Bergantung pada perangkat keras dan perangkat lunak.
• Kerusakan komponen dapat mengganggu seluruh sistem.

## Contoh Penerapan Sistem Digital
• Komputer dan Laptop.
• Smartphone.
• Mesin ATM.
• Kamera Digital.
• Smart TV.
• Mesin Kasir (POS).
• Jam Digital.
• Sistem Absensi Fingerprint.

## Manfaat Sistem Digital
• Mempermudah pekerjaan manusia.
• Mempercepat pengolahan informasi.
• Meningkatkan efisiensi dan produktivitas.
• Mempermudah komunikasi jarak jauh.
• Mendukung perkembangan teknologi modern.

## Kesimpulan
Sistem digital merupakan teknologi yang memanfaatkan data biner (0 dan 1) untuk mengolah informasi secara cepat dan akurat. Saat ini hampir seluruh perangkat elektronik modern menggunakan sistem digital karena memiliki kinerja yang efisien, mudah dikembangkan, dan mampu mendukung berbagai aktivitas manusia di era teknologi.
    `,
    download: "#"
  },
  {
    id: 'inf-6',
    subject: 'informatika',
    title: "Artikel: Dampak Teknologi Informasi dan Etika (ITE)",
    image: 'assets/images.jpeg',
    category: "artikel",
    date: "29 Juli 2026",
    score: "artikel",
    description: "Artikel yang membahas perkembangan teknologi informasi, pentingnya etika digital, serta peran Undang-Undang Informasi dan Transaksi Elektronik (UU ITE) dalam mengatur penggunaan internet di Indonesia.",
    attachment: `
# Dampak Teknologi Informasi dan Etika (ITE)

## Pengertian Teknologi Informasi
Teknologi Informasi (TI) adalah teknologi yang digunakan untuk mengolah, menyimpan, dan menyebarkan informasi melalui perangkat elektronik seperti komputer, smartphone, dan internet.

## Pengertian UU ITE
Undang-Undang Informasi dan Transaksi Elektronik (UU ITE) adalah peraturan yang mengatur penggunaan teknologi informasi dan transaksi elektronik di Indonesia agar berjalan secara aman, tertib, dan bertanggung jawab.

## Dampak Positif Teknologi Informasi
• Mempermudah komunikasi jarak jauh.
• Mempercepat akses informasi.
• Mendukung proses belajar secara online.
• Membuka peluang usaha digital.

## Dampak Negatif Teknologi Informasi
• Penyebaran berita hoaks.
• Cyberbullying.
• Penipuan online.
• Kebocoran data pribadi.

## Pentingnya Etika Digital
Sebagai pengguna internet, kita harus:
- Menggunakan media sosial dengan bijak.
- Tidak menyebarkan berita bohong.
- Menghargai privasi orang lain.
- Menggunakan bahasa yang sopan saat berkomunikasi.

## Kesimpulan
Teknologi informasi memberikan banyak manfaat apabila digunakan secara bijaksana. Dengan memahami UU ITE dan menerapkan etika digital, kita dapat menciptakan lingkungan internet yang aman, nyaman, dan bermanfaat bagi semua orang.
  `,
    download: "#"
  },
  {
    id: 'inf-7',
    subject: 'informatika',
    title: "Artikel: Topologi Jaringan Komputer",
    image: 'assets/topologi.webp',
    category: "artikel",
    date: "29 Juli 2026",
    score: "artikel",
    description: "Artikel yang membahas pengertian topologi jaringan, jenis-jenis topologi, kelebihan, kekurangan, serta penerapannya dalam jaringan komputer.",
    attachment: `
# Topologi Jaringan Komputer

## Pengertian Topologi Jaringan
Topologi jaringan adalah susunan atau tata letak hubungan antar perangkat komputer dalam suatu jaringan. Topologi menentukan bagaimana setiap perangkat saling terhubung sehingga dapat bertukar data dengan baik.

## Jenis-Jenis Topologi Jaringan

### 1. Topologi Bus
Semua komputer terhubung menggunakan satu kabel utama (backbone).

Kelebihan:
• Biaya instalasi murah.
• Mudah dipasang.
• Cocok untuk jaringan kecil.

Kekurangan:
• Jika kabel utama rusak, seluruh jaringan terganggu.
• Sulit menemukan letak kerusakan.

### 2. Topologi Star
Semua komputer terhubung ke perangkat pusat seperti Hub atau Switch.

Kelebihan:
• Mudah dikelola.
• Jika satu komputer rusak, komputer lain tetap berjalan.
• Performa jaringan stabil.

Kekurangan:
• Membutuhkan lebih banyak kabel.
• Jika Hub atau Switch rusak, seluruh jaringan berhenti.

### 3. Topologi Ring
Komputer dihubungkan membentuk lingkaran sehingga data mengalir secara berurutan.

Kelebihan:
• Aliran data lebih teratur.
• Risiko tabrakan data lebih kecil.

Kekurangan:
• Jika satu kabel putus, jaringan terganggu.
• Perawatan lebih sulit.

### 4. Topologi Mesh
Setiap komputer terhubung langsung ke komputer lainnya.

Kelebihan:
• Keamanan sangat baik.
• Memiliki banyak jalur cadangan jika terjadi kerusakan.

Kekurangan:
• Biaya instalasi mahal.
• Membutuhkan banyak kabel.

### 5. Topologi Tree
Gabungan antara topologi Bus dan Star.

Kelebihan:
• Mudah dikembangkan.
• Cocok untuk jaringan berskala besar.

Kekurangan:
• Instalasi lebih rumit.
• Membutuhkan lebih banyak perangkat.

## Fungsi Topologi Jaringan
• Menghubungkan komputer agar dapat saling bertukar data.
• Mempermudah pengelolaan jaringan.
• Menentukan jalur komunikasi data.
• Meningkatkan efisiensi dan kecepatan komunikasi.

## Kesimpulan
Topologi jaringan merupakan bagian penting dalam pembangunan jaringan komputer. Setiap jenis topologi memiliki kelebihan dan kekurangan masing-masing sehingga pemilihannya harus disesuaikan dengan kebutuhan, biaya, dan skala jaringan yang akan digunakan.
    `,
    download: "#"
  },
  {
    id: 'inf-7',
    subject: 'informatika',
    title: 'Materi: Vibe Coding',
    image: 'assets/vibe.jpg',
    category: 'materi',
    date: '05 Agustus 2026',
    score: 'Materi',
    description: 'Materi tentang Vibe Coding, yaitu metode membuat aplikasi dengan bantuan AI menggunakan prompt sehingga proses coding menjadi lebih cepat, mudah, dan efisien.',

    attachment: `
# 💻 VIBE CODING

## Pengertian
Vibe Coding adalah cara membuat program dengan bantuan Artificial Intelligence (AI). Pengguna cukup menjelaskan fitur yang diinginkan melalui prompt, lalu AI akan menghasilkan kode yang bisa langsung digunakan atau dikembangkan.


---

## Cara Kerja

1. Menentukan ide aplikasi.
2. Menulis prompt yang jelas.
3. AI menghasilkan kode.
4. Menguji hasil.
5. Memperbaiki atau menambahkan fitur melalui prompt baru.

---

## Contoh Prompt

"Buat website portofolio dengan tema hitam biru menggunakan Tailwind CSS, memiliki navbar, hero section, gallery, dan dark mode."

AI akan menghasilkan struktur HTML, CSS, dan JavaScript sesuai permintaan.

---

## Kelebihan

✅ Coding lebih cepat.
✅ Cocok untuk pemula.
✅ Mengurangi penulisan kode berulang.
✅ Membantu belajar struktur program.
✅ Dapat membuat prototype dalam hitungan menit.

---

## Kekurangan

❌ Tetap harus memahami dasar pemrograman.
❌ Prompt yang kurang jelas menghasilkan kode yang kurang baik.
❌ Terkadang masih terdapat bug.
❌ Perlu dilakukan pengecekan keamanan kode.

---

## Tools Vibe Coding

• ChatGPT
• GitHub Copilot
• Cursor AI
• Claude AI
• Gemini AI
• Bolt.new
• Lovable
• Replit AI

---

## Contoh Penggunaan

- Membuat website sekolah.
- Membuat dashboard.
- Membuat aplikasi kasir.
- Membuat game sederhana.
- Membuat portfolio.
- Membuat landing page.

---

## Kesimpulan

Vibe Coding merupakan cara modern dalam mengembangkan software dengan memanfaatkan AI sebagai asisten programmer. AI tidak menggantikan programmer, tetapi membantu mempercepat proses pengembangan sehingga programmer dapat lebih fokus pada logika, desain, dan penyelesaian masalah.
`,
    download: '#'
  },


  // --- BAHASA INDONESIA ---
  {
    id: 'ind-1',
    subject: 'bahasa',
    category: 'sastra',
    categoryLabel: 'Sastra',
    title: 'anekdot',
    date: '12 Juli 2026',
    score: '96 / 100',
    shortDesc: 'teks anekdot',
    fullDesc: 'Tugas penulisan karya sastra kreatif. Puisi ini mengeksplorasi perasaan keterasingan manusia di tengah padatnya kota metropolitan, menggunakan metafora senja sebagai batas usia dan perhentian aktivitas manusia. Menekankan aspek rima, imaji visual, serta majas personifikasi.',
    attachment: `Anekdot adalah teks singkat yang berisi cerita lucu atau menghibur, tetapi memiliki sindiran atau kritik terhadap suatu peristiwa, kebiasaan, atau masalah sosial. Tujuan anekdot tidak hanya membuat pembaca tertawa, tetapi juga menyampaikan pesan atau pelajaran. Struktur teks anekdot terdiri dari abstraksi, orientasi, krisis, reaksi, dan koda. Ciri kebahasaannya menggunakan kalimat langsung, kata kerja aksi, serta unsur humor dan sindiran.`,
    downloadUrl: '#'
  },
  {
    id: 'ind-2',
    subject: 'bahasa',
    category: 'sastra',
    categoryLabel: 'Sastra',
    title: 'Cerpen: "Lentera Kecil di Balik Bukit"',
    date: '20 Juni 2026',
    score: '94 / 100',
    shortDesc: 'Cerita pendek inspiratif tentang perjuangan seorang anak desa mengakses perpustakaan keliling.',
    fullDesc: 'Penulisan cerpen fiksi naratif yang menekankan pada struktur intrinsik: tema perjuangan, alur maju-mundur yang seimbang, penokohan yang kuat (karakter utama bernama Lintang), latar desa terpencil, serta amanat moral tentang pentingnya kegigihan dalam meraih cita-cita dan ilmu pengetahuan.',
    attachment: `LENTERA KECIL DI BALIK BUKIT (Cuplikan)
Karya: Reyner

Lintang tidak pernah peduli dengan sandal jepitnya yang hampir tipis sebelah. Baginya, berjalan kaki sejauh tiga kilometer melintasi perbukitan kapur adalah rutinitas yang menyenangkan setiap hari Sabtu. Di balik bukit itu, sebuah mobil boks tua berwarna kuning pudar akan diparkir di dekat balai desa. Di situlah letak perpustakaan keliling—gerbang menuju dunia luar yang selama ini hanya bisa ia bayangkan.

"Lintang, kenapa kamu selalu meminjam buku tentang ruang angkasa?" tanya Pak Budi, sang pustakawan, sembari mengecap stempel tanggal pengembalian.

Lintang tersenyum lebar, menampakkan deretan giginya yang rapi. "Di desa kita gelap kalau malam, Pak. Saya ingin tahu bagaimana caranya bintang-bintang di atas sana bisa menyala begitu terang tanpa minyak tanah. Siapa tahu, suatu saat saya bisa membawa satu bintang itu ke bawah untuk menerangi rumah ibu."

Pak Budi tertegun. Lintang, anak yatim berumur sebelas tahun itu, tidak sekadar membaca buku; ia sedang merajut impian di bawah redupnya lentera minyak tanah rumahnya yang beralas tanah.`,
    downloadUrl: '#'
  },
  {
    id: 'ind-3',
    subject: 'bahasa',
    category: 'ilmiah',
    categoryLabel: 'Karya Ilmiah / Analisis',
    title: 'Esai: Dampak AI Terhadap Keterampilan Menulis',
    date: '05 Mei 2026',
    score: '95 / 100',
    shortDesc: 'Esai argumentatif kritis mengenai peran kecerdasan buatan generatif dalam proses kreatif kepenulisan siswa.',
    fullDesc: 'Esai kritis yang disusun secara objektif menggunakan kaidah kebahasaan eksposisi. Membahas pisau bermata dua dari perkembangan kecerdasan buatan generatif (seperti ChatGPT) dalam dunia pendidikan. Esai ini menyimpulkan bahwa AI harus digunakan sebagai mitra bertukar pikiran (brainstorming partner), bukan alat instan pengganti logika menulis mandiri.',
    attachment: `ESAI ILMIAH: DAMPAK KECERDASAN BUATAN GENERATIF TERHADAP KETERAMPILAN MENULIS SISWA

I. PENDAHULUAN
Perkembangan teknologi Large Language Models (LLM) telah mendemokrasi akses pembuatan teks. Namun, di dunia pendidikan menengah, kehadirannya menuai perdebatan terkait orisinalitas pemikiran.

II. PEMBAHASAN
Kecerdasan Buatan (AI) menawarkan kemudahan bagi siswa dalam merumuskan struktur tulisan, mengatasi fenomena writer's block, dan memeriksa ejaan sesuai PUEBI. Akan tetapi, ketergantungan berlebih berisiko menumpulkan kemampuan berpikir kritis dan orisinalitas gaya bahasa siswa. Siswa cenderung menyalin langsung keluaran AI tanpa melakukan penyuntingan mendalam atau memahami struktur logika di balik teks tersebut.

III. SOLUSI & KESIMPULAN
Kunci utama terletak pada regulasi penggunaan. Pendidik perlu mengarahkan siswa untuk memperlakukan AI sebagai 'asisten editor' dan bukan penulis utama. Proses penulisan draf awal, penyusunan argumen dasar, dan pembentukan emosi teks harus tetap bersumber murni dari kognisi manusia.`,
    downloadUrl: '#'
  },
  {
    id: 'ind-4',
    subject: 'bahasa',
    category: 'ilmiah',
    categoryLabel: 'Karya Ilmiah / Analisis',
    title: 'musikalisasi puisi',
    date: '10 April 2026',
    score: '91 / 100',
    shortDesc: 'musikalisi puisi',
    fullDesc: 'musikalisai puisi',
    attachment: `Musikalisasi puisi adalah kegiatan menggabungkan pembacaan puisi dengan iringan musik agar makna dan suasana puisi lebih terasa. Tujuan musikalisasi puisi adalah meningkatkan apresiasi terhadap karya sastra serta membuat penyampaian puisi lebih menarik. Unsur-unsurnya meliputi puisi, vokal, musik pengiring, ekspresi, dan penghayatan. Dalam musikalisasi puisi, musik berfungsi mendukung isi puisi, bukan menutupi atau mengubah makna yang ingin disampaikan.`,
    downloadUrl: '#'
  }
];

// STATE MANAGEMENT FOR FILTERS
let infFilter = 'semua';
let indFilter = 'semua';

// TOGGLE MOBILE NAVIGATION MENU
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('menu-icon');

  if (menu && icon) {
    if (menu.classList.contains('hidden')) {
      menu.classList.remove('hidden');
      icon.className = 'fa-solid fa-xmark text-xl';
    } else {
      menu.classList.add('hidden');
      icon.className = 'fa-solid fa-bars text-xl';
    }
  }
}

// RENDER CARDS UNTUK HALAMAN TUGAS
function renderTasksList() {
  const infContainer = document.getElementById('tasks-inf-container');
  const indContainer = document.getElementById('tasks-ind-container');

  // Render Informatika jika kontainernya ada di halaman ini
  if (infContainer) {
    infContainer.innerHTML = '';
    const filteredInf = tugasData.filter(task => {
      return task.subject === 'informatika' && (infFilter === 'semua' || task.category === infFilter);
    });

    if (filteredInf.length === 0) {
      infContainer.innerHTML = `<div class="col-span-full py-8 text-center text-slate-500 text-sm">Tidak ada tugas ditemukan untuk kategori ini.</div>`;
    } else {
      filteredInf.forEach(task => {
        infContainer.appendChild(createTaskCard(task));
      });
    }
  }

  // Render Bahasa Indonesia jika kontainernya ada di halaman ini
  if (indContainer) {
    indContainer.innerHTML = '';
    const filteredInd = tugasData.filter(task => {
      return task.subject === 'bahasa' && (indFilter === 'semua' || task.category === indFilter);
    });

    if (filteredInd.length === 0) {
      indContainer.innerHTML = `<div class="col-span-full py-8 text-center text-slate-500 text-sm">Tidak ada tugas ditemukan untuk kategori ini.</div>`;
    } else {
      filteredInd.forEach(task => {
        indContainer.appendChild(createTaskCard(task));
      });
    }
  }
}

// MEMBUAT ELEMENT KARTU TUGAS
function createTaskCard(task) {
  const card = document.createElement('div');
  card.className = "rounded-xl bg-slate-900/60 p-5 border border-slate-800/80 hover:border-blue-900/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group";

  const accentColorClass = task.subject === 'informatika' ? 'text-blue-400 bg-blue-500/10 border-blue-500/20' : 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';

  card.innerHTML = `
<div>

  ${task.image ? `
  <img
    src="${task.image}"
    alt="${task.title}"
    class="w-full h-44 object-cover rounded-xl mb-4 border border-slate-800"
  >
  ` : ''}

  <div class="flex items-center justify-between gap-2">
      <span class="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-semibold border ${accentColorClass}">
          ${task.categoryLabel || task.category}
      </span>

      <span class="text-[10px] text-slate-500">
          <i class="fa-regular fa-calendar mr-1"></i>${task.date}
      </span>
  </div>

  <h3 class="font-display font-bold text-white text-base mt-3">
      ${task.title}
  </h3>

  <p class="text-xs text-slate-400 mt-2 line-clamp-3">
      ${task.shortDesc || task.description}
  </p>

</div>

<div class="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">

<div>
<span class="text-slate-500 text-[10px]">Nilai</span><br>
<span class="text-emerald-400 font-bold">${task.score}</span>
</div>

<button onclick="openModal('${task.id}')"
class="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs">
Detail
</button>

</div>
`;
  return card;
}

// FILTER CONTROLLER
function filterTasks(subject, category) {
  if (subject === 'informatika') {
    infFilter = category;
    const buttons = document.querySelectorAll('.filter-btn-inf');
    buttons.forEach(btn => {
      btn.className = "filter-btn-inf px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200 transition-all duration-300";
      if (btn.getAttribute('data-filter') === category) {
        btn.className = "filter-btn-inf px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white border border-blue-500/40 transition-all duration-300";
      }
    });
  } else {
    indFilter = category;
    const buttons = document.querySelectorAll('.filter-btn-ind');
    buttons.forEach(btn => {
      btn.className = "filter-btn-ind px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200 transition-all duration-300";
      if (btn.getAttribute('data-filter') === category) {
        btn.className = "filter-btn-ind px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white border border-blue-500/40 transition-all duration-300";
      }
    });
  }
  renderTasksList();
}

// POPULATE DASHBOARD STATS & RECENT TASKS
function populateDashboard() {
  const countInfEl = document.getElementById('count-informatika');
  const countBahasaEl = document.getElementById('count-bahasa');
  const recentTasksContainer = document.getElementById('recent-tasks-container');

  if (countInfEl && countBahasaEl) {
    const countInf = tugasData.filter(t => t.subject === 'informatika').length;
    const countInd = tugasData.filter(t => t.subject === 'bahasa').length;
    countInfEl.innerText = countInf;
    countBahasaEl.innerText = countInd;
  }

  if (recentTasksContainer) {
    recentTasksContainer.innerHTML = '';
    // Ambil 2 tugas terbaru (1 informatika & 1 bahasa)
    const recentTasks = [tugasData[0], tugasData[5]];

    recentTasks.forEach(task => {
      if (!task) return;
      const card = document.createElement('div');
      card.className = "rounded-xl bg-slate-900/40 p-4 border border-slate-800/80 hover:border-blue-900/30 transition-all duration-300 flex items-center justify-between gap-4 group";

      const iconClass = task.subject === 'informatika' ? 'fa-solid fa-code text-blue-400 bg-blue-500/10' : 'fa-solid fa-pen-nib text-indigo-400 bg-indigo-500/10';

      card.innerHTML = `
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-lg flex items-center justify-center text-sm ${iconClass} shrink-0">
            <i class="${task.subject === 'informatika' ? 'fa-solid fa-code' : 'fa-solid fa-feather'}"></i>
          </div>
          <div>
            <span class="text-[9px] text-slate-555 block text-slate-500 font-semibold uppercase tracking-wider block">${task.subject === 'informatika' ? 'Informatika' : 'Bahasa Indonesia'}</span>
            <h4 class="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1">${task.title}</h4>
            <span class="text-[9px] text-slate-400 block mt-0.5"><i class="fa-regular fa-calendar mr-1"></i>${task.date}</span>
          </div>
        </div>
        <button onclick="openModal('${task.id}')" class="h-8 w-8 rounded-lg bg-slate-950 hover:bg-blue-600 hover:text-white flex items-center justify-center border border-slate-800 transition-all duration-300 shrink-0">
          <i class="fa-solid fa-chevron-right text-xs"></i>
        </button>
      `;
      recentTasksContainer.appendChild(card);
    });
  }
}

// MODAL FUNCTIONALITY
function openModal(taskId) {
  const task = tugasData.find(t => t.id === taskId);
  if (!task) return;

  const modal = document.getElementById('task-modal');
  if (!modal) return;
  const modalBox = modal.querySelector('div');

  // Populate data modal
  const modalCategory = document.getElementById('modal-category');
  if (modalCategory) {
    modalCategory.innerText = task.categoryLabel;
    const categoryColorClass = task.subject === 'informatika' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
    modalCategory.className = `inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${categoryColorClass}`;
  }

  const modalTitle = document.getElementById('modal-title');
  if (modalTitle) modalTitle.innerText = task.title;

  const modalDate = document.getElementById('modal-date');
  if (modalDate) modalDate.innerText = task.date;

  const modalScore = document.getElementById('modal-score');
  if (modalScore) modalScore.innerText = task.score;

  const modalDesc = document.getElementById('modal-desc');
  if (modalDesc) modalDesc.innerText = task.fullDesc;

  // Lampiran Tugas (Format kode / tulisan)
  const attachmentContainer = document.getElementById('modal-attachment');
  if (attachmentContainer) {
    // Escape HTML
    const escapeHTML = (str) => {
      return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    };

    if (task.subject === 'informatika' && task.category === 'praktik') {
      attachmentContainer.innerHTML = `<code class="text-xs text-blue-300 block overflow-x-auto whitespace-pre">${escapeHTML(task.attachment)}</code>`;
    } else {
      attachmentContainer.innerHTML = `<p class="font-sans text-xs text-slate-350 leading-relaxed whitespace-pre-wrap">${task.attachment}</p>`;
    }
  }

  // Tombol download
  const downloadBtn = document.getElementById('modal-download');
  if (downloadBtn) {
    downloadBtn.onclick = function (e) {
      e.preventDefault();
      alert(`Mengunduh file untuk tugas: "${task.title}"\n(Nama File: ${task.title.toLowerCase().replace(/\s+/g, '_')}_tugas.txt)`);
    };
  }

  // Tampilkan modal dengan transisi
  modal.classList.remove('pointer-events-none');
  modal.classList.remove('opacity-0');
  if (modalBox) {
    modalBox.classList.remove('scale-95');
    modalBox.classList.add('scale-100');
  }
  document.body.style.overflow = 'hidden'; // Lock screen scroll
}

function closeModal() {
  const modal = document.getElementById('task-modal');
  if (!modal) return;
  const modalBox = modal.querySelector('div');

  modal.classList.add('opacity-0');
  modal.classList.add('pointer-events-none');
  if (modalBox) {
    modalBox.classList.remove('scale-100');
    modalBox.classList.add('scale-95');
  }
  document.body.style.overflow = ''; // Unlock screen scroll
}

// --- FITUR GANTI PROFILE ---

// Helper untuk memperbarui semua gambar profil di halaman
function updateProfileImages() {
  const customImg = window.AppStorage ? window.AppStorage.get('custom_profile_image') : localStorage.getItem('portfolio_custom_profile_image');
  if (!customImg) return;

  // Elemen <img> standar (misal di profil.html)
  const imgs = document.querySelectorAll('img');
  imgs.forEach(img => {
    // Cocokkan gambar yang menampilkan reyner.jpeg atau ber-class/alt profil
    if (img.src && (img.src.includes('reyner.jpeg') || img.alt === 'reyner')) {
      img.src = customImg;
    }
  });

  // Elemen <image> di dalam SVG (misal di index.html)
  const svgImages = document.querySelectorAll('image');
  svgImages.forEach(img => {
    const href = img.getAttribute('href') || img.getAttribute('xlink:href');
    if (href && href.includes('reyner.jpeg')) {
      img.setAttribute('href', customImg);
      img.setAttribute('xlink:href', customImg);
    }
  });
}

// Helper untuk menampilkan notifikasi Toast kustom (sukses / gagal)
function showProfileToast(title, message, iconStr, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  // Gaya box glassmorphism slate-900 yang sesuai dengan gaya web existing
  toast.className = 'border shadow-lg rounded-xl p-4 flex items-center gap-4 transform transition-all duration-500 translate-x-full opacity-0 max-w-sm pointer-events-auto bg-slate-900';
  
  if (type === 'success') {
    toast.classList.add('border-emerald-500/50', 'shadow-emerald-900/20');
  } else {
    toast.classList.add('border-rose-500/50', 'shadow-rose-900/20');
  }

  const iconBgClass = type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400';

  toast.innerHTML = `
    <div class="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${iconBgClass}">
      <i class="fa-solid ${iconStr} text-xl"></i>
    </div>
    <div>
      <h4 class="text-sm font-bold text-white">${title}</h4>
      <p class="text-xs text-slate-400 mt-0.5">${message}</p>
    </div>
  `;

  container.appendChild(toast);

  // Animasi masuk
  requestAnimationFrame(() => {
    toast.classList.remove('translate-x-full', 'opacity-0');
  });

  // Mainkan efek suara sukses jika ada SoundManager
  if (type === 'success' && window.SoundManager && typeof window.SoundManager.playAchievement === 'function') {
    window.SoundManager.playAchievement();
  }

  // Hapus otomatis setelah 4 detik
  setTimeout(() => {
    toast.classList.add('translate-x-full', 'opacity-0');
    setTimeout(() => toast.remove(), 500);
  }, 4000);
}

// Handler pemilihan berkas gambar
function handleProfileFileSelect(e) {
  const file = e.target.files[0];
  if (!file) return;

  // 1. Validasi tipe file
  if (!file.type.startsWith('image/')) {
    showProfileToast('Gagal', 'File yang dipilih bukan gambar!', 'fa-circle-xmark', 'error');
    return;
  }

  // 2. Validasi format/ekstensi berkas
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
  const ext = file.name.split('.').pop().toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    showProfileToast('Gagal', 'Format harus JPG, PNG, atau WEBP!', 'fa-circle-xmark', 'error');
    return;
  }

  // 3. Validasi ukuran (maksimal 2MB agar LocalStorage tidak penuh)
  const maxSize = 2 * 1024 * 1024;
  if (file.size > maxSize) {
    showProfileToast('Gagal', 'Ukuran gambar maksimal adalah 2MB!', 'fa-triangle-exclamation', 'error');
    return;
  }

  // 4. Membaca file gambar
  const reader = new FileReader();
  reader.onload = function(evt) {
    const dataUrl = evt.target.result;
    
    // Simpan gambar ke penyimpanan
    if (window.AppStorage) {
      window.AppStorage.set('custom_profile_image', dataUrl);
    } else {
      localStorage.setItem('portfolio_custom_profile_image', dataUrl);
    }
    
    // Sinkronisasi seluruh elemen gambar di halaman
    updateProfileImages();
    
    showProfileToast('Berhasil', 'Foto profile berhasil diperbarui!', 'fa-circle-check', 'success');
  };

  reader.onerror = function() {
    showProfileToast('Gagal', 'Gagal membaca file gambar!', 'fa-circle-xmark', 'error');
  };

  reader.readAsDataURL(file);
}

// Membuat tombol mengambang "Ganti Profile" secara dinamis
function createChangeProfileButton() {
  if (document.getElementById('change-profile-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'change-profile-btn';
  
  // Styling modern glassmorphism + tailwind classes
  btn.className = 'fixed z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/80 hover:bg-blue-600 backdrop-blur-md border border-slate-700/50 hover:border-blue-500/50 text-white shadow-lg shadow-black/40 hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 group text-sm font-semibold';
  
  // Posisi: sits above Spotify player bar
  btn.classList.add('bottom-24', 'right-4', 'md:bottom-28', 'md:right-8');

  btn.innerHTML = `
    <i class="fa-solid fa-circle-user text-base text-blue-400 group-hover:text-white transition-colors"></i>
    <span>Ganti Profile</span>
  `;

  // Hidden input file
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.id = 'change-profile-input';
  fileInput.accept = 'image/png, image/jpeg, image/jpg, image/webp';
  fileInput.className = 'hidden';

  btn.appendChild(fileInput);

  btn.addEventListener('click', (e) => {
    if (e.target === fileInput) return;
    fileInput.click();
  });

  fileInput.addEventListener('change', handleProfileFileSelect);

  document.body.appendChild(btn);
}

function initApp() {
  // Bind mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  if (mobileMenuBtn) {
    // Prevent multiple bindings
    mobileMenuBtn.removeEventListener('click', toggleMobileMenu);
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }

  // Bind close modal on background click
  const taskModal = document.getElementById('task-modal');
  if (taskModal) {
    const clickHandler = function (e) {
      if (e.target === this) {
        closeModal();
      }
    };
    taskModal.removeEventListener('click', clickHandler);
    taskModal.addEventListener('click', clickHandler);
  }

  // Populate data page-specific
  if (typeof populateDashboard === 'function') populateDashboard();
  if (typeof renderTasksList === 'function') renderTasksList();

  // Inisialisasi Fitur Gambar Profil
  updateProfileImages();
  createChangeProfileButton();
}

// INITIALIZATION
window.addEventListener('DOMContentLoaded', initApp);
window.addEventListener('pageChanged', initApp);
window.initApp = initApp; // Make it globally accessible for spa.js
