/**
 * ============================================================
 *  MANSAMUSA BOARDING COLLEGE — SCRIPT UTAMA
 *  Semua pengaturan dibaca dari config.js
 *  Jangan ubah file ini kecuali untuk logika baru.
 * ============================================================
 */

/* ─────────────────────────────────────────────────────────
   STATE
   ───────────────────────────────────────────────────────── */
let selectedAmount  = 0;
let selectedPayment = '';
let donaturPage     = 0;

const AVATAR_COLORS = [
  '#C8861A','#1a5e3f','#7c3aed','#db2777',
  '#0891b2','#059669','#2563eb','#9D6B14',
];


/* ─────────────────────────────────────────────────────────
   INIT  — dijalankan setelah DOM siap
   ───────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  applyConfig();
  animateProgressBar();
  animateCounter('meta-donatur', 0, CONFIG.campaign.donaturCount, 1800);
  renderAmountGrid();
  renderPaymentGrid();
  renderProgramList();
  renderNewsList();
  renderDonaturList();
  renderFooterLinks();
  setupSmoothScroll();
  document.getElementById('footer-year').textContent = new Date().getFullYear();
});


/* ─────────────────────────────────────────────────────────
   APPLY CONFIG — isi semua elemen dari config.js
   ───────────────────────────────────────────────────────── */
function applyConfig() {
  const C  = CONFIG;
  const ca = C.campaign;
  const or = C.org;

  // Header
  setEl('header-logo',        null,          'src', or.logo);
  setEl('header-org-name',    or.name);
  setEl('header-org-tagline', or.tagline);

  // Hero
  setEl('hero-bg',       null,          'src', or.heroBanner);
  setEl('hero-badge',    ca.badgeText);
  setEl('hero-title',    `Wakaf Pembangunan<br><span>${or.name}</span>`);
  setEl('hero-subtitle', ca.subtitle);

  // Campaign card
  setEl('stat-collected',  formatRupiah(ca.collectedAmount));
  setEl('stat-target',     formatRupiah(ca.targetAmount));
  setEl('meta-days',       ca.daysLeft);
  setEl('meta-location',   or.location);
  setEl('tab-donatur-count', ca.donaturCount.toLocaleString('id-ID'));

  setEl('organizer-logo', null, 'src', or.logo);
  setEl('organizer-name', or.name);

  // Footer
  setEl('footer-logo',      null,    'src', or.logo);
  setEl('footer-org-name',  or.name.toUpperCase());
  setEl('footer-copy-name', or.name);

  // Keterangan tab teks
  const d = C.description;
  setEl('ket-greeting', d.greeting);
  setEl('ket-intro',    d.intro);
  setEl('ket-sub',      d.subIntro);
  setEl('ket-closing',  d.closing);
  setEl('ket-doa',      d.doa);
  setEl('ket-thanks',   d.thanks);

  // Campaign title in step 4
  setEl('campaign-title-ty', ca.title);

  // Page title & OG
  document.title = `${ca.title} – ${or.name}`;
}

/** Helper: set textContent atau attribute */
function setEl(id, text, attr, val) {
  const el = document.getElementById(id);
  if (!el) return;
  if (attr) { el[attr] = val; }
  else       { el.innerHTML = text || ''; }
}


/* ─────────────────────────────────────────────────────────
   PROGRESS BAR ANIMATION
   ───────────────────────────────────────────────────────── */
function animateProgressBar() {
  const { collectedAmount, targetAmount } = CONFIG.campaign;
  const pct = Math.min(Math.round((collectedAmount / targetAmount) * 100), 100);

  setTimeout(() => {
    const fill  = document.getElementById('progress-fill');
    const dot   = document.getElementById('progress-dot');
    if (fill) fill.style.width = `${pct}%`;
    if (dot)  dot.style.left  = `calc(${pct}% - 8px)`;
    animateCounter('progress-pct', 0, pct, 1600, '%');
  }, 400);
}


/* ─────────────────────────────────────────────────────────
   COUNTER ANIMATION
   ───────────────────────────────────────────────────────── */
function animateCounter(id, from, to, duration, suffix = '') {
  const el = document.getElementById(id);
  if (!el) return;
  const start = performance.now();
  const step = (now) => {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3);
    const value    = Math.round(from + (to - from) * ease);
    el.textContent = value.toLocaleString('id-ID') + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}


/* ─────────────────────────────────────────────────────────
   RENDER: AMOUNT GRID (dari config)
   ───────────────────────────────────────────────────────── */
function renderAmountGrid() {
  const grid    = document.getElementById('amount-grid');
  const presets = CONFIG.donationAmounts.presets;
  const popular = CONFIG.donationAmounts.popular;
  const emojis  = CONFIG.donationAmounts.emojis;

  grid.innerHTML = '';

  presets.forEach((amount, i) => {
    const isPopular = amount === popular;
    const btn = document.createElement('button');
    btn.className = 'amount-btn';
    btn.id        = `amt-${amount}`;
    btn.onclick   = () => selectAmount(amount);
    btn.innerHTML = `
      ${isPopular ? '<span class="badge-popular">Sering Dipilih</span>' : ''}
      <span class="amount-emoji">${emojis[i] || '💛'}</span>
      <span>Rp ${amount.toLocaleString('id-ID')}</span>
    `;
    grid.appendChild(btn);
  });

  // Nominal Lain
  const customBtn = document.createElement('button');
  customBtn.className = 'amount-btn';
  customBtn.id        = 'amt-custom';
  customBtn.onclick   = selectCustom;
  customBtn.innerHTML = `
    <span class="amount-emoji">${emojis[presets.length] || '✏️'}</span>
    <span>Nominal Lain</span>
  `;
  grid.appendChild(customBtn);
}


/* ─────────────────────────────────────────────────────────
   RENDER: PAYMENT GRID (dari config)
   ───────────────────────────────────────────────────────── */
function renderPaymentGrid() {
  const grid  = document.getElementById('payment-grid');
  grid.innerHTML = '';

  Object.entries(CONFIG.banks).forEach(([key, bank]) => {
    if (!bank.enabled) return;
    const btn = document.createElement('button');
    btn.className = 'payment-btn';
    btn.id        = `pay-${key}`;
    btn.onclick   = () => selectPayment(key);
    btn.innerHTML = `
      <div class="payment-badge" style="background:${bank.color}">${bank.label}</div>
      <div class="payment-name">${bank.name}</div>
    `;
    grid.appendChild(btn);
  });
}


/* ─────────────────────────────────────────────────────────
   RENDER: PROGRAM LIST
   ───────────────────────────────────────────────────────── */
function renderProgramList() {
  const container = document.getElementById('program-list');
  container.innerHTML = CONFIG.programItems.map(item => `
    <div class="program-item">
      <span class="prog-icon">${item.icon}</span>
      <div>
        <div class="prog-title">${item.title}</div>
        <div class="prog-sub">${item.subtitle}</div>
      </div>
    </div>
  `).join('');
}


/* ─────────────────────────────────────────────────────────
   RENDER: NEWS LIST
   ───────────────────────────────────────────────────────── */
function renderNewsList() {
  const container = document.getElementById('news-list');
  container.innerHTML = CONFIG.news.map(n => `
    <div class="news-item">
      <div class="news-date">📅 ${n.date}</div>
      <div class="news-title">${n.title}</div>
      <div class="news-body">${n.body}</div>
    </div>
  `).join('');
}


/* ─────────────────────────────────────────────────────────
   RENDER: DONATUR LIST (paginasi)
   ───────────────────────────────────────────────────────── */
function renderDonaturList() {
  const container = document.getElementById('donatur-list');
  if (!container) return;

  const perPage = CONFIG.settings.donaturPerPage;
  const donors  = CONFIG.sampleDonors;
  const slice   = donors.slice(0, (donaturPage + 1) * perPage);

  container.innerHTML = '';
  slice.forEach((d, i) => {
    const displayName = d.anon ? 'Hamba Allah 🤍' : d.name;
    const initial     = d.anon ? '?' : d.name.charAt(0).toUpperCase();
    const color       = AVATAR_COLORS[i % AVATAR_COLORS.length];

    const item = document.createElement('div');
    item.className = 'donatur-item';
    item.style.animationDelay = `${(i % perPage) * 0.06}s`;
    item.innerHTML = `
      <div class="donatur-avatar" style="background:${color}">${initial}</div>
      <div class="donatur-info">
        <div class="donatur-name">${displayName} <span class="donatur-verified">✔ Verified</span></div>
        <div class="donatur-time">${d.time}</div>
      </div>
      <div class="donatur-amount">${formatRupiah(d.amount)}</div>
    `;
    container.appendChild(item);
  });
}

function loadMoreDonatur() {
  donaturPage++;
  renderDonaturList();
  const perPage = CONFIG.settings.donaturPerPage;
  const total   = CONFIG.sampleDonors.length;
  if ((donaturPage + 1) * perPage >= total) {
    const btn = document.querySelector('.btn-load-more');
    if (btn) { btn.textContent = 'Semua donatur ditampilkan'; btn.disabled = true; }
  }
}


/* ─────────────────────────────────────────────────────────
   RENDER: FOOTER LINKS
   ───────────────────────────────────────────────────────── */
function renderFooterLinks() {
  const { contact, social } = CONFIG;
  setElAttr('footer-wa',    'href', `https://wa.me/${contact.whatsapp}`);
  setElAttr('footer-email', 'href', `mailto:${contact.email}`);
  if (social.instagram) setElAttr('footer-ig', 'href', social.instagram);
}

function setElAttr(id, attr, val) {
  const el = document.getElementById(id);
  if (el) el[attr] = val;
}


/* ─────────────────────────────────────────────────────────
   TABS
   ───────────────────────────────────────────────────────── */
function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.getElementById(`tab-${tab}`).classList.add('active');
  document.getElementById(`content-${tab}`).classList.add('active');
}


/* ─────────────────────────────────────────────────────────
   AMOUNT SELECTION
   ───────────────────────────────────────────────────────── */
function selectAmount(amount) {
  selectedAmount = amount;
  document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById(`amt-${amount}`).classList.add('selected');
  document.getElementById('custom-amount-wrap').style.display = 'none';
  updateSelectedSummary();
  document.getElementById('btn-next-1').disabled = false;
}

function selectCustom() {
  selectedAmount = 0;
  document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('amt-custom').classList.add('selected');
  document.getElementById('custom-amount-wrap').style.display = 'block';
  document.getElementById('custom-input').focus();
  document.getElementById('selected-summary').style.display = 'none';
  document.getElementById('btn-next-1').disabled = true;
}

function formatCustomAmount(input) {
  const raw = input.value.replace(/\D/g, '');
  input.value = raw ? Number(raw).toLocaleString('id-ID') : '';
  const num = parseInt(raw, 10) || 0;
  selectedAmount = num;
  if (num >= 1000) {
    updateSelectedSummary();
    document.getElementById('btn-next-1').disabled = false;
  } else {
    document.getElementById('selected-summary').style.display = 'none';
    document.getElementById('btn-next-1').disabled = true;
  }
}

function updateSelectedSummary() {
  const el    = document.getElementById('selected-summary');
  const amtEl = document.getElementById('summary-amount');
  if (el && amtEl && selectedAmount > 0) {
    el.style.display = 'flex';
    amtEl.textContent = formatRupiah(selectedAmount);
  }
}


/* ─────────────────────────────────────────────────────────
   STEP NAVIGATION
   ───────────────────────────────────────────────────────── */
function scrollToDonate() {
  document.getElementById('donate-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function goToStep2() {
  if (!selectedAmount || selectedAmount < 1000) return;
  showStep(2);
  document.getElementById('step2-amount').textContent = formatRupiah(selectedAmount);
  scrollToDonate();
}

function goToStep3() {
  const name = document.getElementById('donor-name').value.trim();
  if (!name) {
    showToast('⚠️ Mohon isi nama donatur terlebih dahulu');
    document.getElementById('donor-name').focus();
    return;
  }
  const isAnon = document.getElementById('is-anon').checked;
  const displayName = isAnon ? 'Hamba Allah' : name;

  showStep(3);
  document.getElementById('step3-amount').textContent = formatRupiah(selectedAmount);
  document.getElementById('step3-name').textContent   = displayName;
  scrollToDonate();
}

function goBack(stepNum) {
  showStep(stepNum);
  scrollToDonate();
}

function showStep(n) {
  document.querySelectorAll('.step-panel').forEach(p => p.classList.remove('active'));
  document.getElementById(`step-${n}`).classList.add('active');
}


/* ─────────────────────────────────────────────────────────
   PAYMENT SELECTION
   ───────────────────────────────────────────────────────── */
function selectPayment(method) {
  selectedPayment = method;
  document.querySelectorAll('.payment-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById(`pay-${method}`).classList.add('selected');
  document.getElementById('btn-next-3').disabled = false;
}


/* ─────────────────────────────────────────────────────────
   GO TO STEP 4 — Instruksi Pembayaran
   ───────────────────────────────────────────────────────── */
function goToStep4() {
  if (!selectedPayment) return;

  const isAnon      = document.getElementById('is-anon').checked;
  const name        = document.getElementById('donor-name').value.trim();
  const displayName = isAnon ? 'Hamba Allah' : name;

  // Kode unik 3 digit
  const uniqueCode  = Math.floor(Math.random() * 899) + 100;
  const finalAmount = selectedAmount + uniqueCode;

  // Deadline
  const deadline = new Date();
  deadline.setHours(deadline.getHours() + CONFIG.settings.paymentDeadlineHours);

  // Bank info
  const bank = CONFIG.banks[selectedPayment];
  document.getElementById('instr-bank-row').innerHTML = `
    <div class="instr-bank-logo" style="background:${bank.color}">${bank.label}</div>
    <div class="instr-bank-detail">
      <span class="instr-bank-name">${bank.name}</span>
      <span class="instr-account-no">${bank.account}</span>
      <span class="instr-account-name">${bank.holder}</span>
    </div>
    <button class="copy-btn" onclick="copyText('${bank.account.replace(/\s/g,'')}')">Salin</button>
  `;

  document.getElementById('instr-amount').textContent  = formatRupiah(finalAmount);
  document.getElementById('deadline-time').textContent  = formatDateTime(deadline);
  document.getElementById('ty-name').textContent        = displayName;

  showStep(4);
  scrollToDonate();

  if (CONFIG.settings.enableConfetti) launchConfetti();
}


/* ─────────────────────────────────────────────────────────
   CONFIRM PAYMENT via WhatsApp
   ───────────────────────────────────────────────────────── */
function confirmPayment() {
  const name   = document.getElementById('donor-name').value.trim() || 'Hamba Allah';
  const amount = document.getElementById('instr-amount').textContent;
  const bank   = CONFIG.banks[selectedPayment];

  const msg = encodeURIComponent(
    `Assalaamu'alaikum,\n\nSaya ${name} ingin mengkonfirmasi pembayaran donasi:\n\n` +
    `*Program:* ${CONFIG.campaign.title}\n` +
    `*Nominal:* ${amount}\n*Bank:* ${bank.name}\n\n` +
    `Mohon dikonfirmasi. Jazaakallahu Khairan 🤲`
  );
  window.open(`https://wa.me/${CONFIG.contact.whatsapp}?text=${msg}`, '_blank');
}


/* ─────────────────────────────────────────────────────────
   COPY FUNCTIONS
   ───────────────────────────────────────────────────────── */
function copyAmount() {
  const txt = document.getElementById('instr-amount').textContent.replace(/\D/g, '');
  copyText(txt);
}

function copyText(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
      .then(() => showToast('✅ Berhasil disalin!'))
      .catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
  document.body.appendChild(ta);
  ta.focus(); ta.select();
  try { document.execCommand('copy'); showToast('✅ Berhasil disalin!'); }
  catch { showToast('❌ Gagal menyalin'); }
  document.body.removeChild(ta);
}


/* ─────────────────────────────────────────────────────────
   SHARE FUNCTIONS
   ───────────────────────────────────────────────────────── */
function shareWhatsApp() {
  const { campaign, org } = CONFIG;
  const msg = encodeURIComponent(
    `🕌 *Wakaf ${org.name}*\n\n` +
    `Mari bergabung dalam wakaf pembangunan pesantren yang akan mencetak generasi Qurani.\n\n` +
    `Terkumpul: ${formatRupiah(campaign.collectedAmount)} dari target ${formatRupiah(campaign.targetAmount)}\n\n` +
    `Donasi sekarang di: ${window.location.href}\n\n` +
    `_Jazaakallahu Khairan_ 🤲`
  );
  window.open(`https://wa.me/?text=${msg}`, '_blank');
}

function shareFacebook() {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
    '_blank'
  );
}

function copyLink() {
  copyText(window.location.href);
}


/* ─────────────────────────────────────────────────────────
   RESET FORM
   ───────────────────────────────────────────────────────── */
function resetForm() {
  selectedAmount  = 0;
  selectedPayment = '';
  donaturPage     = 0;

  document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('selected'));
  document.querySelectorAll('.payment-btn').forEach(b => b.classList.remove('selected'));

  ['donor-name','donor-phone','donor-email','donor-doa','custom-input'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });

  document.getElementById('is-anon').checked = false;
  document.getElementById('custom-amount-wrap').style.display = 'none';
  document.getElementById('selected-summary').style.display   = 'none';
  document.getElementById('btn-next-1').disabled = true;

  showStep(1);
  scrollToDonate();
}


/* ─────────────────────────────────────────────────────────
   TOAST
   ───────────────────────────────────────────────────────── */
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}


/* ─────────────────────────────────────────────────────────
   CONFETTI
   ───────────────────────────────────────────────────────── */
function launchConfetti() {
  const colors = ['#E8A020','#F0B535','#ffffff','#C8861A','#FEF3C7','#FBBF24'];
  for (let i = 0; i < 70; i++) {
    const c    = document.createElement('div');
    const size = Math.random() * 9 + 5;
    const deg  = Math.random() * 720;
    Object.assign(c.style, {
      position:        'fixed',
      top:             '-12px',
      left:            Math.random() * 100 + 'vw',
      width:           size + 'px',
      height:          size + 'px',
      background:      colors[Math.floor(Math.random() * colors.length)],
      borderRadius:    Math.random() > .5 ? '50%' : '2px',
      animationDelay:  Math.random() * .9 + 's',
      zIndex:          9999,
      pointerEvents:   'none',
      animation:       `confettiFall ${1.5 + Math.random() * 2}s ease forwards`,
    });
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4000);
  }
}

// Inject confetti keyframes once
(function injectConfettiStyle() {
  const s = document.createElement('style');
  s.textContent = `
    @keyframes confettiFall {
      0%   { transform: translateY(0)    rotate(0deg);   opacity: 1; }
      100% { transform: translateY(100vh) rotate(540deg); opacity: 0; }
    }
  `;
  document.head.appendChild(s);
})();


/* ─────────────────────────────────────────────────────────
   SMOOTH SCROLL for internal links
   ───────────────────────────────────────────────────────── */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
}


/* ─────────────────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────────────────── */
function formatRupiah(amount) {
  return 'Rp ' + amount.toLocaleString('id-ID');
}

function formatDateTime(date) {
  return date.toLocaleString('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
    timeZoneName: 'short',
  });
}
