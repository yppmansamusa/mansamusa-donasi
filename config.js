/**
 * ============================================================
 *  MANSAMUSA BOARDING COLLEGE – KONFIGURASI UTAMA
 *  Edit file ini untuk mengubah semua pengaturan halaman donasi
 * ============================================================
 */

const CONFIG = {

  /* ─────────────────────────────────────────────────────────
   *  IDENTITAS LEMBAGA
   * ───────────────────────────────────────────────────────── */
  org: {
    name:       'Mansamusa Boarding College',
    tagline:    'Pesantren Enterpreneurship',
    location:   'Gresik, Jawa Timur',
    verified:   true,

    // Logo: gunakan mansamusa2.jpeg (versi putih, untuk bg gelap)
    // atau mansamusa1.jpeg (versi gelap, untuk bg terang)
    logo:       'mansamusa2.jpeg',

    // Hero banner belakang
    heroBanner: 'hero.jpg',
  },


  /* ─────────────────────────────────────────────────────────
   *  INFORMASI KAMPANYE / WAKAF
   * ───────────────────────────────────────────────────────── */
  campaign: {
    title:      'Wakaf Pembangunan Mansamusa Boarding College',
    subtitle:   'Mari bersama membangun generasi Qurani yang berakhlak mulia dan berdaya guna bagi umat',
    badgeText:  'Program Wakaf Aktif',

    targetAmount:    10_000_000_000,   // Target total (Rupiah)
    collectedAmount: 2_847_500_000,   // Dana terkumpul (Rupiah) — update berkala
    donaturCount:    3742,            // Jumlah donatur
    daysLeft:        '5 Bulan 12 Hari',
  },


  /* ─────────────────────────────────────────────────────────
   *  NOMINAL DONASI
   * ───────────────────────────────────────────────────────── */
  donationAmounts: {
    // Nominal pilihan (dalam Rupiah)
    presets: [20000, 50000, 100000, 500000, 1000000],

    // Nominal yang akan ditandai "Sering Dipilih"
    popular: 50000,

    // Emoji untuk setiap nominal (urutan sesuai presets, + 1 untuk "Nominal Lain")
    emojis: ['😊', '😁', '😍', '🤩', '🥰', '✏️'],
  },


  /* ─────────────────────────────────────────────────────────
   *  REKENING BANK PENERIMA DONASI
   *  Aktifkan/nonaktifkan bank dengan mengubah enabled: true/false
   * ───────────────────────────────────────────────────────── */
  banks: {
    bsi: {
      enabled:     true,
      label:       'BSI',
      name:        'Bank Syariah Indonesia',
      account:     '7128 4567 890',
      holder:      'Yayasan Mansamusa Boarding College',
      color:       '#1a5e3f',
    },
    bca: {
      enabled:     true,
      label:       'BCA',
      name:        'Bank Central Asia',
      account:     '0568 7711 44',
      holder:      'Yayasan Mansamusa Boarding College',
      color:       '#003087',
    },
    bri: {
      enabled:     true,
      label:       'BRI',
      name:        'Bank Rakyat Indonesia',
      account:     '0096 0101 1234 567',
      holder:      'Yayasan Mansamusa Boarding College',
      color:       '#003580',
    },
    mandiri: {
      enabled:     true,
      label:       'MDR',
      name:        'Bank Mandiri',
      account:     '1400 0012 3456 78',
      holder:      'Yayasan Mansamusa Boarding College',
      color:       '#002b5c',
    },
    bni: {
      enabled:     true,
      label:       'BNI',
      name:        'Bank Negara Indonesia',
      account:     '0523 4567 89',
      holder:      'Yayasan Mansamusa Boarding College',
      color:       '#e6681e',
    },
    qris: {
      enabled:     true,
      label:       'QRIS',
      name:        'QRIS (Semua E-Wallet)',
      account:     'Scan QRIS',
      holder:      'GoPay · OVO · DANA · ShopeePay',
      color:       '#cc0001',
    },
  },


  /* ─────────────────────────────────────────────────────────
   *  KONTAK & SOSIAL MEDIA
   * ───────────────────────────────────────────────────────── */
  contact: {
    // Format: kode negara tanpa + (contoh: 6281234567890)
    whatsapp: '6281234567890',
    email:    'info@mansamusa.id',
    website:  'https://mansamusa.id',
  },

  social: {
    instagram: 'https://instagram.com/mansamusa',
    youtube:   'https://youtube.com/@mansamusa',
    facebook:  'https://facebook.com/mansamusa',
    tiktok:    '',
  },


  /* ─────────────────────────────────────────────────────────
   *  ITEM PROGRAM PEMBANGUNAN
   *  Tampil di tab "Keterangan"
   * ───────────────────────────────────────────────────────── */
  programItems: [
    {
      icon:     '📚',
      title:    'Pembebasan Lahan MMBC',
      subtitle: 'Estimasi Rp 2.500.000.000',
    },
    {
      icon:     '🕌',
      title:    'Masjid Pesantren',
      subtitle: 'Kapasitas 300 jamaah, estimasi Rp 1.500.000.000',
    },
    {
      icon:     '🏫',
      title:    'Ruang Kelas dan Perpustakaan',
      subtitle: '8 ruang kelas + perpustakaan digital, estimasi Rp 5.000.000.000',
    },
    {
      icon:     '⚡',
      title:    'Sarana & Prasarana Pendukung',
      subtitle: 'Listrik, air bersih, sanitasi, dapur umum, estimasi Rp 1.000.000.000',
    },
  ],


  /* ─────────────────────────────────────────────────────────
   *  KABAR TERBARU
   *  Tampil di tab "Kabar Terbaru"
   * ───────────────────────────────────────────────────────── */
  news: [
    {
      date:  '02 Jun 2026',
      title: 'Alhamdulillah! Fondasi Masjid Pesantren Selesai Dibangun',
      body:  'Dengan izin Allah, pekerjaan fondasi masjid pesantren telah rampung dikerjakan. Kami mengucapkan terima kasih yang sebesar-besarnya kepada seluruh donatur yang telah mempercayakan infaqnya kepada kami.',
      image: '',  // kosongkan jika tidak ada gambar, isi path jika ada (contoh: 'news1.jpg')
    },
    {
      date:  '15 Mei 2026',
      title: 'Asrama Santri Putri Tahap 1: 40% Selesai',
      body:  'Progress pembangunan asrama santri putri terus berjalan. Dinding sudah berdiri dan atap dalam proses pemasangan. Target selesai bulan Agustus 2026.',
      image: '',
    },
    {
      date:  '01 Apr 2026',
      title: 'Peletakan Batu Pertama Gedung Perpustakaan',
      body:  'Alhamdulillah, peletakan batu pertama gedung perpustakaan digital Mansamusa Boarding College telah dilaksanakan. Gedung ini akan menjadi pusat literasi Islam yang modern.',
      image: '',
    },
  ],


  /* ─────────────────────────────────────────────────────────
   *  DATA DONATUR SAMPEL
   *  Tampil di tab "Donatur" — update sesuai donatur nyata
   * ───────────────────────────────────────────────────────── */
  sampleDonors: [
    { name: 'Ahmad Fauzi',    amount: 500000,  time: '5 menit lalu',  anon: false },
    { name: 'Siti Rahmah',    amount: 100000,  time: '12 menit lalu', anon: false },
    { name: 'Hamba Allah',    amount: 1000000, time: '28 menit lalu', anon: true  },
    { name: 'Budi Santoso',   amount: 200000,  time: '1 jam lalu',    anon: false },
    { name: 'Nurul Hidayah',  amount: 50000,   time: '1 jam lalu',    anon: false },
    { name: 'M. Rizki',       amount: 500000,  time: '2 jam lalu',    anon: false },
    { name: 'Hamba Allah',    amount: 2000000, time: '3 jam lalu',    anon: true  },
    { name: 'Indah Permata',  amount: 150000,  time: '4 jam lalu',    anon: false },
    { name: 'Yusuf Hakim',    amount: 1000000, time: '5 jam lalu',    anon: false },
    { name: 'Dewi Lestari',   amount: 300000,  time: '7 jam lalu',    anon: false },
    { name: 'Hamba Allah',    amount: 500000,  time: '8 jam lalu',    anon: true  },
    { name: 'Reza Pratama',   amount: 100000,  time: '9 jam lalu',    anon: false },
  ],


  /* ─────────────────────────────────────────────────────────
   *  TEKS DESKRIPSI KAMPANYE
   *  (tab Keterangan — paragraf pembuka)
   * ───────────────────────────────────────────────────────── */
  description: {
    greeting:  "Assalaamu'alaikum Warahmatullahi Wabarakatuh,",
    intro:     "Alhamdulillah, atas izin Allah Ta'ala, <strong>Mansamusa Boarding College</strong> terus berkembang dalam mengemban amanah mendidik generasi Qurani yang berakhlak mulia, berilmu, dan berdaya guna bagi umat dan bangsa.",
    subIntro:  "Saat ini kami sedang dalam proses <strong>pembangunan dan pengembangan kawasan pesantren</strong>, yang meliputi:",
    closing:   "Setiap rupiah yang Anda titipkan akan dipergunakan sepenuhnya untuk pembangunan pesantren dan dipertanggungjawabkan secara transparan.",
    doa:       "Semoga kebaikan ini menjadi <em>jariyah</em> yang terus mengalir, insya Allah.",
    thanks:    "Jazaakumullahu Khairan Katsiiran 🤲",
  },


  /* ─────────────────────────────────────────────────────────
   *  PENGATURAN TEKNIS
   * ───────────────────────────────────────────────────────── */
  settings: {
    donaturPerPage:      6,     // Jumlah donatur per halaman
    paymentDeadlineHours: 24,   // Batas waktu transfer (jam)
    enableConfetti:      true,  // Animasi confetti setelah donasi
    enableShareButtons:  true,  // Tombol share sosmed
  },

};
