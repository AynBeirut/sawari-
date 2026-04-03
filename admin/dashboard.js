/* =====================================================
   Sawari Admin Dashboard — dashboard.js
   ===================================================== */

const lang  = document.body.dataset.lang || 'en';
const isRtl = document.documentElement.dir === 'rtl';

// ── DOM refs ──────────────────────────────────────────
const statusEl    = document.getElementById('adminStatus');
const galleryForm = document.getElementById('galleryForm');
const logoutBtn   = document.getElementById('logoutBtn');

// ── Status helper ─────────────────────────────────────
function setStatus(message, type = 'success') {
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.className = type;
  clearTimeout(statusEl._timer);
  statusEl._timer = setTimeout(() => { statusEl.textContent = ''; statusEl.className = ''; }, 5000);
}

// ── Fetch helper ──────────────────────────────────────
async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || 'Request failed');
  return body;
}

// ── Format date ───────────────────────────────────────
function fmtDate(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString(lang === 'ar' ? 'ar-AE' : 'en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  } catch { return iso; }
}

function isToday(iso) {
  if (!iso) return false;
  const d = new Date(iso);
  const now = new Date();
  return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}

function isThisWeek(iso) {
  if (!iso) return false;
  const d = new Date(iso);
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  weekStart.setHours(0, 0, 0, 0);
  return d >= weekStart;
}

// ── Section navigation ────────────────────────────────
const navBtns   = document.querySelectorAll('.sa-nav-btn[data-section]');
const sections  = document.querySelectorAll('.sa-section');
const pageTitle = document.getElementById('saPageTitle');

function showSection(name) {
  sections.forEach(s => {
    const active = s.id === `sec-${name}`;
    s.classList.toggle('active', active);
    if (active && pageTitle) pageTitle.textContent = s.dataset.title || name;
  });
  navBtns.forEach(b => b.classList.toggle('active', b.dataset.section === name));
}

navBtns.forEach(btn => btn.addEventListener('click', () => showSection(btn.dataset.section)));

// "View All" buttons inside sections
document.querySelectorAll('[data-section]').forEach(el => {
  if (!el.classList.contains('sa-nav-btn')) {
    el.addEventListener('click', () => showSection(el.dataset.section));
  }
});

// ── Mobile sidebar ────────────────────────────────────
const sidebar   = document.getElementById('saSidebar');
const saOverlay = document.getElementById('saOverlay');
const sBurger   = document.getElementById('saBurger');

function openSidebar()  { sidebar?.classList.add('open');    saOverlay?.classList.add('open'); }
function closeSidebar() { sidebar?.classList.remove('open'); saOverlay?.classList.remove('open'); }

sBurger?.addEventListener('click', openSidebar);
saOverlay?.addEventListener('click', closeSidebar);
navBtns.forEach(b => b.addEventListener('click', () => {
  if (window.innerWidth <= 768) closeSidebar();
}));

// ── Leads data store ──────────────────────────────────
let leadsData = { newsletter: [], registerInterest: [] };

async function loadLeads() {
  try {
    leadsData = await fetchJson('/api/admin/leads');
    renderKPIs();
    renderRecentReg();
    renderAllReg();
    renderNewsletter();
    updateNotifBadge();
    const el = document.getElementById('lastRefresh');
    if (el) el.textContent = fmtDate(new Date().toISOString());
  } catch (error) {
    if (/unauthorized/i.test(error.message)) {
      window.location.href = '/admin/login.html';
    } else {
      setStatus(error.message || 'Failed to load leads.', 'error');
    }
  }
}

function updateNotifBadge() {
  const badge = document.getElementById('notifBadge');
  if (!badge) return;
  const todayCount = (leadsData.registerInterest || []).filter(r => isToday(r.submittedAt)).length;
  badge.classList.toggle('visible', todayCount > 0);
}

// ── KPI Cards ─────────────────────────────────────────
function renderKPIs() {
  const reg  = leadsData.registerInterest || [];
  const news = leadsData.newsletter || [];
  const set  = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set('kpiTotalReg',  reg.length);
  set('kpiTodayReg',  reg.filter(r => isToday(r.submittedAt)).length);
  set('kpiWeekReg',   reg.filter(r => isThisWeek(r.submittedAt)).length);
  set('kpiTotalNews', news.length);
}

// ── Recent registrations (overview — last 5) ──────────
function renderRecentReg() {
  const tbody = document.getElementById('recentRegBody');
  if (!tbody) return;
  const rows = (leadsData.registerInterest || []).slice(-5).reverse();
  tbody.innerHTML = rows.length
    ? rows.map((r, i) => `<tr>
        <td>${rows.length - i}</td>
        <td>${esc(r.name || '—')}</td>
        <td>${esc(r.email || '—')}</td>
        <td>${esc(r.phone || '—')}</td>
        <td>${fmtDate(r.submittedAt)}</td>
      </tr>`).join('')
    : `<tr><td class="sa-table-empty" colspan="5">${isRtl ? 'لا توجد بيانات' : 'No data yet'}</td></tr>`;
}

// ── All registrations table ───────────────────────────
let regFilter = '';
document.getElementById('regSearch')?.addEventListener('input', e => {
  regFilter = e.target.value.toLowerCase();
  renderAllReg();
});

function renderAllReg() {
  const tbody = document.getElementById('allRegBody');
  if (!tbody) return;
  const all = (leadsData.registerInterest || []).slice().reverse();
  const filtered = regFilter
    ? all.filter(r => JSON.stringify(r).toLowerCase().includes(regFilter))
    : all;
  tbody.innerHTML = filtered.length
    ? filtered.map((r, i) => `<tr>
        <td>${i + 1}</td>
        <td>${esc(r.name || '—')}</td>
        <td>${esc(r.email || '—')}</td>
        <td>${esc(r.phone || '—')}</td>
        <td style="max-width:160px;white-space:normal;">${esc(r.message || '—')}</td>
        <td style="white-space:nowrap">${fmtDate(r.submittedAt)}</td>
        <td>
          <button class="sa-btn sa-btn-danger sa-btn-sm" data-type="registerInterest" data-idx="${getOriginalIndex('registerInterest', r)}" title="${isRtl ? 'حذف' : 'Delete'}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14H6L5,6"/><path d="M10,11v6"/><path d="M14,11v6"/><path d="M9,6V4h6v2"/></svg>
          </button>
        </td>
      </tr>`).join('')
    : `<tr><td class="sa-table-empty" colspan="7">${isRtl ? 'لا توجد نتائج' : 'No results'}</td></tr>`;
  attachDeleteHandlers(tbody);
}

// ── Newsletter table ──────────────────────────────────
let newsFilter = '';
document.getElementById('newsSearch')?.addEventListener('input', e => {
  newsFilter = e.target.value.toLowerCase();
  renderNewsletter();
});

function renderNewsletter() {
  const tbody = document.getElementById('allNewsBody');
  if (!tbody) return;
  const all = (leadsData.newsletter || []).slice().reverse();
  const filtered = newsFilter
    ? all.filter(r => (r.email || '').toLowerCase().includes(newsFilter))
    : all;
  tbody.innerHTML = filtered.length
    ? filtered.map((r, i) => `<tr>
        <td>${i + 1}</td>
        <td>${esc(r.email || '—')}</td>
        <td style="white-space:nowrap">${fmtDate(r.submittedAt)}</td>
        <td>
          <button class="sa-btn sa-btn-danger sa-btn-sm" data-type="newsletter" data-idx="${getOriginalIndex('newsletter', r)}" title="${isRtl ? 'حذف' : 'Delete'}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14H6L5,6"/><path d="M10,11v6"/><path d="M14,11v6"/><path d="M9,6V4h6v2"/></svg>
          </button>
        </td>
      </tr>`).join('')
    : `<tr><td class="sa-table-empty" colspan="4">${isRtl ? 'لا توجد نتائج' : 'No results'}</td></tr>`;
  attachDeleteHandlers(tbody);
}

// ── Helper: get original index ────────────────────────
function getOriginalIndex(type, record) {
  return (leadsData[type] || []).indexOf(record);
}

// ── Helper: escape HTML ───────────────────────────────
function esc(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Delete handlers ───────────────────────────────────
function attachDeleteHandlers(container) {
  container.querySelectorAll('button[data-type]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const type = btn.dataset.type;
      const idx  = parseInt(btn.dataset.idx, 10);
      if (!confirm(isRtl ? 'هل أنت متأكد من الحذف؟' : 'Delete this entry?')) return;
      try {
        await fetchJson(`/api/admin/leads/${encodeURIComponent(type)}/${idx}`, { method: 'DELETE' });
        await loadLeads();
        setStatus(isRtl ? 'تم الحذف.' : 'Deleted.', 'success');
      } catch (err) {
        setStatus(err.message || 'Delete failed.', 'error');
      }
    });
  });
}

// ── CSV Export ────────────────────────────────────────
function exportCsv(data, filename) {
  if (!data.length) return;
  const keys = Object.keys(data[0]);
  const rows = [keys.join(','), ...data.map(r => keys.map(k => `"${String(r[k] || '').replace(/"/g, '""')}"`).join(','))];
  const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

document.getElementById('exportRegBtn')?.addEventListener('click', () => exportCsv(leadsData.registerInterest || [], 'sawari-registrations.csv'));
document.getElementById('exportNewsBtn')?.addEventListener('click', () => exportCsv(leadsData.newsletter || [], 'sawari-newsletter.csv'));

// ── Gallery upload ────────────────────────────────────
document.getElementById('galleryFileInput')?.addEventListener('change', function() {
  const el = document.getElementById('galleryFileName');
  if (el) el.textContent = this.files[0]?.name || '';
});

if (galleryForm) {
  galleryForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const fd = new FormData();
    fd.append('lang', lang);
    fd.append('filter', galleryForm.elements.namedItem('filter')?.value || 'lobby');
    fd.append('index',  galleryForm.elements.namedItem('index')?.value || '1');
    const fileInput = galleryForm.elements.namedItem('image');
    if (!fileInput?.files?.[0]) {
      setStatus(isRtl ? 'اختر صورة أولاً.' : 'Please choose an image file.', 'error');
      return;
    }
    fd.append('image', fileInput.files[0]);
    try {
      await fetchJson('/api/admin/update-gallery', { method: 'POST', body: fd });
      setStatus(isRtl ? 'تم رفع الصورة بنجاح.' : 'Gallery image updated.', 'success');
      galleryForm.reset();
      const el = document.getElementById('galleryFileName');
      if (el) el.textContent = '';
    } catch (error) {
      setStatus(error.message || 'Gallery upload failed.', 'error');
    }
  });
}

// ── PDF file name display ─────────────────────────────
document.querySelectorAll('.pdf-file-input').forEach(input => {
  input.addEventListener('change', () => {
    const nameEl = input.closest('label.sa-upload-zone')?.parentElement?.querySelector('.pdf-file-name');
    if (nameEl) nameEl.textContent = input.files[0]?.name || '';
  });
});

// ── PDF Forms ─────────────────────────────────────────
document.querySelectorAll('.pdfForm').forEach((form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const slot = form.dataset.slot;
    const fileInput = form.elements.namedItem('pdf');
    if (!fileInput?.files?.[0]) {
      setStatus(isRtl ? 'اختر ملف PDF أولاً.' : 'Please choose a PDF file.', 'error');
      return;
    }
    const fd = new FormData();
    fd.append('lang', lang);
    fd.append('slot', slot);
    fd.append('pdf', fileInput.files[0]);
    try {
      await fetchJson('/api/admin/update-pdf', { method: 'POST', body: fd });
      setStatus(isRtl ? `تم رفع ${slot} بنجاح.` : `PDF updated for ${slot}.`, 'success');
      form.reset();
      form.querySelectorAll('.pdf-file-name').forEach(el => { el.textContent = ''; });
    } catch (error) {
      setStatus(error.message || 'PDF upload failed.', 'error');
    }
  });
});

// ── CMS Text Forms (content section — grouped cards) ──
async function loadAllCmsText() {
  try {
    const payload = await fetchJson(`/api/admin/content?lang=${encodeURIComponent(lang)}`);
    const textMap = payload.text || {};
    document.querySelectorAll('.cms-text-form').forEach(form => {
      Object.entries(textMap).forEach(([key, value]) => {
        const el = form.elements.namedItem(key);
        if (el) el.value = value;
      });
    });
  } catch (error) {
    if (/unauthorized/i.test(error.message)) window.location.href = '/admin/login.html';
  }
}

document.querySelectorAll('.cms-text-form').forEach(form => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const updates = {};
    Array.from(form.elements).forEach(el => {
      if (el.name) updates[el.name] = el.value;
    });
    try {
      await fetchJson('/api/admin/update-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang, updates })
      });
      setStatus(isRtl ? 'تم حفظ التغييرات.' : 'Content saved.', 'success');
    } catch (error) {
      setStatus(error.message || 'Save failed.', 'error');
    }
  });
});

// ── Plans cache ───────────────────────────────────────
let plansData = [];

async function loadPlans() {
  try {
    plansData = await fetchJson('/api/plans');
    populatePlanSelects();
  } catch { /* silent — public page may not need this */ }
}

function populatePlanSelects() {
  const opts = plansData.map((p, i) =>
    `<option value="${i}">${i + 1}. ${esc(p.title)}${p.subtitle ? ' — ' + esc(p.subtitle) : ''}</option>`
  ).join('');
  [document.getElementById('planImageSelect'), document.getElementById('fpEditSelect')].forEach(sel => {
    if (!sel) return;
    sel.innerHTML = opts || `<option value="">— ${isRtl ? 'لا توجد بيانات' : 'no data'} —</option>`;
  });
  // Auto-populate floor plan form with first plan
  if (plansData.length) populateFpForm(0);
}

// ── Floor Plan Image Upload ───────────────────────────
document.getElementById('planImageFileInput')?.addEventListener('change', function() {
  const el = document.getElementById('planImageFileName');
  if (el) el.textContent = this.files[0]?.name || '';
});

const planImageForm = document.getElementById('planImageForm');
if (planImageForm) {
  planImageForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const sel = document.getElementById('planImageSelect');
    const idx = sel?.value;
    if (idx === '' || idx === undefined) {
      setStatus(isRtl ? 'اختر وحدة أولاً.' : 'Select a floor plan unit first.', 'error');
      return;
    }
    const fileInput = planImageForm.elements.namedItem('planImage');
    if (!fileInput?.files?.[0]) {
      setStatus(isRtl ? 'اختر صورة أولاً.' : 'Please choose an image file.', 'error');
      return;
    }
    const fd = new FormData();
    fd.append('index', idx);
    fd.append('planImage', fileInput.files[0]);
    try {
      await fetchJson('/api/admin/update-plan-image', { method: 'POST', body: fd });
      setStatus(isRtl ? 'تم تحديث صورة المخطط.' : 'Floor plan image updated.', 'success');
      planImageForm.reset();
      const el = document.getElementById('planImageFileName');
      if (el) el.textContent = '';
      await loadPlans();
    } catch (error) {
      setStatus(error.message || 'Plan image upload failed.', 'error');
    }
  });
}

// ── Floor Plans Text Editor ───────────────────────────
function populateFpForm(idx) {
  const p = plansData[idx];
  if (!p) return;
  const get = id => document.getElementById(id);
  if (get('fpEditIndex')) get('fpEditIndex').value = idx;
  if (get('fpTitle'))    get('fpTitle').value    = p.title    || '';
  if (get('fpSubtitle')) get('fpSubtitle').value = p.subtitle || '';
  ['fpStat0','fpStat1','fpStat2'].forEach((id, i) => { if (get(id)) get(id).value = (p.stats || [])[i] || ''; });
  ['fpKp0','fpKp1','fpKp2','fpKp3'].forEach((id, i) => { if (get(id)) get(id).value = (p.keyplan || [])[i] || ''; });
}

document.getElementById('fpEditSelect')?.addEventListener('change', function() {
  const idx = parseInt(this.value, 10);
  if (!isNaN(idx)) populateFpForm(idx);
});

const fpTextForm = document.getElementById('fpTextForm');
if (fpTextForm) {
  fpTextForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const rawIdx = document.getElementById('fpEditIndex')?.value;
    if (rawIdx === '' || rawIdx === undefined) {
      setStatus(isRtl ? 'اختر وحدة أولاً.' : 'Select a unit first.', 'error');
      return;
    }
    const idx = parseInt(rawIdx, 10);
    const g   = id => document.getElementById(id)?.value || '';
    const payload = {
      index:   idx,
      title:   g('fpTitle'),
      subtitle: g('fpSubtitle'),
      stats:   [g('fpStat0'), g('fpStat1'), g('fpStat2')].filter(Boolean),
      keyplan: [g('fpKp0'), g('fpKp1'), g('fpKp2'), g('fpKp3')].filter(Boolean)
    };
    try {
      await fetchJson('/api/admin/update-plans', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setStatus(isRtl ? 'تم حفظ تفاصيل المخطط.' : 'Floor plan details saved.', 'success');
      await loadPlans();
      // Re-select same item after reload
      const sel = document.getElementById('fpEditSelect');
      if (sel) { sel.value = idx; populateFpForm(idx); }
    } catch (error) {
      setStatus(error.message || 'Save failed.', 'error');
    }
  });
}

// ── Site Image Upload ─────────────────────────────────
document.getElementById('siteImageFileInput')?.addEventListener('change', function() {
  const el = document.getElementById('siteImageFileName');
  if (el) el.textContent = this.files[0]?.name || '';
});

const siteImageForm = document.getElementById('siteImageForm');
if (siteImageForm) {
  siteImageForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const slot = siteImageForm.elements.namedItem('slot')?.value;
    const fileInput = siteImageForm.elements.namedItem('siteImage');
    if (!fileInput?.files?.[0]) {
      setStatus(isRtl ? 'اختر صورة أولاً.' : 'Please choose an image file.', 'error');
      return;
    }
    const fd = new FormData();
    fd.append('slot', slot);
    fd.append('siteImage', fileInput.files[0]);
    try {
      await fetchJson('/api/admin/update-site-image', { method: 'POST', body: fd });
      setStatus(isRtl ? 'تم تحديث صورة الموقع.' : 'Site image updated.', 'success');
      siteImageForm.reset();
      const el = document.getElementById('siteImageFileName');
      if (el) el.textContent = '';
    } catch (error) {
      setStatus(error.message || 'Site image upload failed.', 'error');
    }
  });
}

// ── Logout ────────────────────────────────────────────
logoutBtn?.addEventListener('click', async () => {
  await fetch('/api/admin/logout', { method: 'POST' });
  window.location.href = '/admin/login.html';
});

// ── Init ──────────────────────────────────────────────
loadAllCmsText();
loadLeads();
loadPlans();
