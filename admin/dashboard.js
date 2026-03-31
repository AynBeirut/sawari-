const lang = document.body.dataset.lang || 'en';
const statusEl = document.getElementById('adminStatus');
const textForm = document.getElementById('textForm');
const galleryForm = document.getElementById('galleryForm');
const logoutBtn = document.getElementById('logoutBtn');

function setStatus(message, type = 'success') {
  if (!statusEl) {
    return;
  }

  statusEl.textContent = message;
  statusEl.className = `status ${type}`;
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(body.error || 'Request failed');
  }

  return body;
}

async function loadContent() {
  try {
    const payload = await fetchJson(`/api/admin/content?lang=${encodeURIComponent(lang)}`);

    if (textForm && payload.text) {
      Object.entries(payload.text).forEach(([key, value]) => {
        const input = textForm.elements.namedItem(key);
        if (input) {
          input.value = value;
        }
      });
    }

    setStatus('Content loaded.', 'success');
  } catch (error) {
    setStatus(error.message || 'Please log in first.', 'error');
    if (/unauthorized/i.test(error.message)) {
      window.location.href = '/admin/login.html';
    }
  }
}

if (textForm) {
  textForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const updates = {
      'loc-title': textForm.elements.namedItem('loc-title')?.value || '',
      'loc-subtitle': textForm.elements.namedItem('loc-subtitle')?.value || '',
      'philosophy-center': textForm.elements.namedItem('philosophy-center')?.value || '',
      'register-title': textForm.elements.namedItem('register-title')?.value || '',
      'footer-address': textForm.elements.namedItem('footer-address')?.value || ''
    };

    try {
      await fetchJson('/api/admin/update-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang, updates })
      });
      setStatus('Text content updated.', 'success');
    } catch (error) {
      setStatus(error.message || 'Text update failed.', 'error');
    }
  });
}

if (galleryForm) {
  galleryForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const fd = new FormData();
    fd.append('lang', lang);
    fd.append('filter', galleryForm.elements.namedItem('filter')?.value || 'lobby');
    fd.append('index', galleryForm.elements.namedItem('index')?.value || '1');

    const fileInput = galleryForm.elements.namedItem('image');
    if (!fileInput?.files?.[0]) {
      setStatus('Please choose an image file.', 'error');
      return;
    }

    fd.append('image', fileInput.files[0]);

    try {
      await fetchJson('/api/admin/update-gallery', {
        method: 'POST',
        body: fd
      });
      setStatus('Gallery image updated.', 'success');
      galleryForm.reset();
    } catch (error) {
      setStatus(error.message || 'Gallery upload failed.', 'error');
    }
  });
}

document.querySelectorAll('.pdfForm').forEach((form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const slot = form.dataset.slot;
    const fileInput = form.elements.namedItem('pdf');
    if (!fileInput?.files?.[0]) {
      setStatus('Please choose a PDF file.', 'error');
      return;
    }

    const fd = new FormData();
    fd.append('lang', lang);
    fd.append('slot', slot);
    fd.append('pdf', fileInput.files[0]);

    try {
      await fetchJson('/api/admin/update-pdf', {
        method: 'POST',
        body: fd
      });
      setStatus(`PDF updated for ${slot}.`, 'success');
      form.reset();
    } catch (error) {
      setStatus(error.message || 'PDF upload failed.', 'error');
    }
  });
});

if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login.html';
  });
}

loadContent();
