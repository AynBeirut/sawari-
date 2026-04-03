const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cheerio = require('cheerio');

require('dotenv').config();

const app = express();
const PORT = Number(process.env.PORT || 3000);
const rootDir = __dirname;
const dataDir = path.join(rootDir, 'data');
const leadsPath = path.join(dataDir, 'leads.json');
const plansPath = path.join(dataDir, 'plans.json');
const SALES_EMAIL = 'sales@sawri.com';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'sales@sawari.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '2025Swa.';
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'change-me-super-secret';
const ADMIN_COOKIE_NAME = 'sawari_admin_token';

const CONTENT_FILES = {
  en: path.join(rootDir, 'index.html'),
  ar: path.join(rootDir, 'index-ar.html')
};

const EDITABLE_TEXT_KEYS = [
  'loc-title',
  'loc-subtitle',
  'philosophy-center',
  'register-title',
  'footer-address',
  'overview-body',
  'amenities-title',
  'faq-1',
  'faq-2',
  'faq-3',
  'faq-4',
  'faq-5',
  'faq-6'
];

// Named image slots for site-wide image replacement
const SITE_IMAGE_SLOTS = {
  'hero-bg': true,
  'overview-1': true,
  'overview-2': true,
  'overview-3': true
};

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const isPdf = file.fieldname === 'pdf';
      const filter = String(req.body.filter || '').trim().toLowerCase();

      if (isPdf) {
        const dir = path.join(rootDir, 'assets', 'downloads');
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
        return;
      }

      const safeFilter = filter || 'lobby';
      const dir = path.join(rootDir, 'assets', 'gallery', safeFilter);
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname || '').toLowerCase() || (file.fieldname === 'pdf' ? '.pdf' : '.jpg');
      const baseName = path
        .basename(file.originalname || `upload${ext}`, ext)
        .replace(/[^a-zA-Z0-9-_]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .toLowerCase();

      cb(null, `${Date.now()}-${baseName || 'file'}${ext}`);
    }
  }),
  limits: {
    fileSize: 15 * 1024 * 1024
  }
});

// Separate multer for floor plan images (saves to assets/plans/)
const uploadPlanImage = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      const dir = path.join(rootDir, 'assets', 'plans');
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname || '').toLowerCase() || '.jpg';
      const baseName = path
        .basename(file.originalname || `plan${ext}`, ext)
        .replace(/[^a-zA-Z0-9-_\s]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      cb(null, `${Date.now()}-${baseName || 'plan'}${ext}`);
    }
  }),
  limits: { fileSize: 15 * 1024 * 1024 }
});

// Separate multer for site hero/overview images (saves to assets/uploads/)
const uploadSiteImage = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      const dir = path.join(rootDir, 'assets', 'uploads');
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname || '').toLowerCase() || '.jpg';
      const baseName = path
        .basename(file.originalname || `img${ext}`, ext)
        .replace(/[^a-zA-Z0-9-_]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .toLowerCase();
      cb(null, `${Date.now()}-${baseName || 'image'}${ext}`);
    }
  }),
  limits: { fileSize: 15 * 1024 * 1024 }
});

const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: process.env.SMTP_USER && process.env.SMTP_PASS
    ? {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
    : undefined
};

const smtpEnabled = Boolean(smtpConfig.host && smtpConfig.auth);
const mailTransport = smtpEnabled ? nodemailer.createTransport(smtpConfig) : null;
const mailFrom = process.env.SMTP_FROM || smtpConfig.auth?.user || 'no-reply@sawari.com';

function ensureDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(leadsPath)) {
    fs.writeFileSync(leadsPath, JSON.stringify({ newsletter: [], registerInterest: [] }, null, 2));
  }

  if (!fs.existsSync(CONTENT_FILES.ar) && fs.existsSync(CONTENT_FILES.en)) {
    const enHtml = fs.readFileSync(CONTENT_FILES.en, 'utf8');
    const arHtml = enHtml.replace('<html lang="en">', '<html lang="ar" dir="rtl">');
    fs.writeFileSync(CONTENT_FILES.ar, arHtml, 'utf8');
  }
}

function readLeads() {
  ensureDataFile();
  return JSON.parse(fs.readFileSync(leadsPath, 'utf8'));
}

function writeLeads(data) {
  fs.writeFileSync(leadsPath, JSON.stringify(data, null, 2));
}

function readPlans() {
  if (!fs.existsSync(plansPath)) {
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(plansPath, 'utf8'));
  } catch {
    return [];
  }
}

function writePlans(data) {
  fs.writeFileSync(plansPath, JSON.stringify(data, null, 2));
}

function validEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function appendRecord(type, payload) {
  const store = readLeads();
  store[type].push({ ...payload, submittedAt: new Date().toISOString() });
  writeLeads(store);
}

async function sendEmailToSales(subject, plainText, htmlText) {
  if (!mailTransport) {
    return false;
  }

  await mailTransport.sendMail({
    from: mailFrom,
    to: SALES_EMAIL,
    subject,
    text: plainText,
    html: htmlText
  });

  return true;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getLang(req) {
  const lang = String(req.query.lang || req.body.lang || 'en').toLowerCase();
  return lang === 'ar' ? 'ar' : 'en';
}

function getContentPath(lang) {
  return CONTENT_FILES[lang] || CONTENT_FILES.en;
}

function readHtml(lang) {
  const filePath = getContentPath(lang);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Content file is missing: ${path.basename(filePath)}`);
  }

  return fs.readFileSync(filePath, 'utf8');
}

function writeHtml(lang, html) {
  const filePath = getContentPath(lang);
  fs.writeFileSync(filePath, html, 'utf8');
}

function readGalleryCollections($) {
  const scriptNode = $('#galleryCollectionsData');
  if (!scriptNode.length) {
    return {};
  }

  const raw = scriptNode.text().trim();
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function writeGalleryCollections($, collections) {
  const normalized = JSON.stringify(collections, null, 2);
  const scriptNode = $('#galleryCollectionsData');

  if (scriptNode.length) {
    scriptNode.text(`\n${normalized}\n`);
    return;
  }

  $('body').append(`\n<script id="galleryCollectionsData" type="application/json">\n${normalized}\n</script>\n`);
}

function ensureAdminAuth(req, res, next) {
  const token = req.cookies[ADMIN_COOKIE_NAME];

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    req.admin = jwt.verify(token, ADMIN_JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/admin', (_req, res) => {
  res.redirect('/admin/login.html');
});

app.get('/admin/en', (_req, res) => {
  res.redirect('/admin/dashboard-en.html');
});

app.get('/admin/ar', (_req, res) => {
  res.redirect('/admin/dashboard-ar.html');
});

app.post('/api/admin/login', (req, res) => {
  const email = typeof req.body.email === 'string' ? req.body.email.trim() : '';
  const password = typeof req.body.password === 'string' ? req.body.password : '';

  if (!email || !password || email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  const token = jwt.sign({ role: 'admin' }, ADMIN_JWT_SECRET, { expiresIn: '12h' });
  res.cookie(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 12 * 60 * 60 * 1000
  });

  res.json({ ok: true });
});

app.post('/api/admin/logout', (_req, res) => {
  res.clearCookie(ADMIN_COOKIE_NAME);
  res.json({ ok: true });
});

app.get('/api/admin/leads', ensureAdminAuth, (_req, res) => {
  try {
    const store = readLeads();
    res.json(store);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to read leads' });
  }
});

app.delete('/api/admin/leads/:type/:index', ensureAdminAuth, (req, res) => {
  try {
    const { type, index } = req.params;
    const store = readLeads();
    if (!store[type] || !Array.isArray(store[type])) {
      return res.status(400).json({ error: 'Invalid type' });
    }
    const idx = parseInt(index, 10);
    if (isNaN(idx) || idx < 0 || idx >= store[type].length) {
      return res.status(400).json({ error: 'Invalid index' });
    }
    store[type].splice(idx, 1);
    writeLeads(store);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to delete lead' });
  }
});

// ── Plans (public) ──
app.get('/api/plans', (_req, res) => {
  try {
    res.json(readPlans());
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to read plans' });
  }
});

// ── Plans admin: update text data ──
app.put('/api/admin/update-plans', ensureAdminAuth, (req, res) => {
  try {
    const plans = readPlans();
    const { index, title, subtitle, stats, keyplan } = req.body;
    const idx = parseInt(index, 10);
    if (isNaN(idx) || idx < 0 || idx >= plans.length) {
      return res.status(400).json({ error: 'Invalid plan index' });
    }
    if (title !== undefined) plans[idx].title = String(title);
    if (subtitle !== undefined) plans[idx].subtitle = String(subtitle);
    if (Array.isArray(stats)) plans[idx].stats = stats.map(String);
    if (Array.isArray(keyplan)) plans[idx].keyplan = keyplan.map(String);
    writePlans(plans);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to update plan' });
  }
});

// ── Plans admin: upload plan image ──
app.post('/api/admin/update-plan-image', ensureAdminAuth, uploadPlanImage.single('planImage'), (req, res) => {
  try {
    const plans = readPlans();
    const idx = parseInt(req.body.index, 10);
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }
    if (isNaN(idx) || idx < 0 || idx >= plans.length) {
      return res.status(400).json({ error: 'Invalid plan index' });
    }
    const relPath = path.relative(rootDir, req.file.path).replace(/\\/g, '/');
    plans[idx].image = relPath;
    writePlans(plans);
    res.json({ ok: true, path: relPath });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to upload plan image' });
  }
});

// ── Site images admin: replace a named image slot ──
app.post('/api/admin/update-site-image', ensureAdminAuth, uploadSiteImage.single('siteImage'), (req, res) => {
  try {
    const slot = String(req.body.slot || '').trim();
    if (!SITE_IMAGE_SLOTS[slot]) {
      return res.status(400).json({ error: `Unknown image slot: ${slot}` });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }
    const relPath = path.relative(rootDir, req.file.path).replace(/\\/g, '/');
    // Update src in both HTML files
    ['en', 'ar'].forEach((lang) => {
      try {
        const html = readHtml(lang);
        const $ = cheerio.load(html);
        $(`[data-cms-img="${slot}"]`).attr('src', relPath);
        writeHtml(lang, $.html());
      } catch {
        // If AR file missing, skip
      }
    });
    res.json({ ok: true, path: relPath });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to update site image' });
  }
});

app.get('/api/admin/content', ensureAdminAuth, (req, res) => {
  try {
    const lang = getLang(req);
    const html = readHtml(lang);
    const $ = cheerio.load(html);

    const text = {};
    EDITABLE_TEXT_KEYS.forEach((key) => {
      const node = $(`[data-cms-key="${key}"]`).first();
      text[key] = node.length ? node.text().trim() : '';
    });

    const pdfs = {};
    $('[data-pdf-slot]').each((_, element) => {
      const slot = $(element).attr('data-pdf-slot');
      if (slot) {
        pdfs[slot] = $(element).attr('href') || '';
      }
    });

    const gallery = readGalleryCollections($);

    res.json({ lang, text, pdfs, gallery });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to read content' });
  }
});

app.post('/api/admin/update-text', ensureAdminAuth, (req, res) => {
  try {
    const lang = getLang(req);
    const updates = req.body && typeof req.body.updates === 'object' ? req.body.updates : {};

    const html = readHtml(lang);
    const $ = cheerio.load(html);

    Object.entries(updates).forEach(([key, value]) => {
      if (!EDITABLE_TEXT_KEYS.includes(key)) {
        return;
      }

      const node = $(`[data-cms-key="${key}"]`).first();
      if (node.length) {
        node.text(String(value || ''));
      }
    });

    writeHtml(lang, $.html());
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to update text' });
  }
});

app.post('/api/admin/update-gallery', ensureAdminAuth, upload.single('image'), (req, res) => {
  try {
    const lang = getLang(req);
    const filter = String(req.body.filter || '').trim().toLowerCase();
    const index = Number(req.body.index);

    if (!req.file) {
      res.status(400).json({ error: 'Image file is required' });
      return;
    }

    if (!filter || Number.isNaN(index) || index < 0 || index > 2) {
      res.status(400).json({ error: 'Filter and index (0..2) are required' });
      return;
    }

    const html = readHtml(lang);
    const $ = cheerio.load(html);
    const collections = readGalleryCollections($);

    const relPath = path.relative(rootDir, req.file.path).replace(/\\/g, '/');

    if (!collections[filter]) {
      collections[filter] = {
        labelImage: '',
        labelAlt: '',
        placeholderText: '',
        items: [
          { image: relPath, fullImage: relPath, lightboxAlt: `${filter} image 1` },
          { image: relPath, fullImage: relPath, lightboxAlt: `${filter} image 2` },
          { image: relPath, fullImage: relPath, lightboxAlt: `${filter} image 3` }
        ]
      };
    }

    if (!Array.isArray(collections[filter].items)) {
      collections[filter].items = [];
    }

    while (collections[filter].items.length < 3) {
      collections[filter].items.push({ image: relPath, fullImage: relPath, lightboxAlt: `${filter} image` });
    }

    collections[filter].items[index] = {
      ...collections[filter].items[index],
      image: relPath,
      fullImage: relPath,
      lightboxAlt: collections[filter].items[index].lightboxAlt || `${filter} image ${index + 1}`
    };

    writeGalleryCollections($, collections);
    writeHtml(lang, $.html());

    res.json({ ok: true, path: relPath });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to update gallery image' });
  }
});

app.post('/api/admin/update-pdf', ensureAdminAuth, upload.single('pdf'), (req, res) => {
  try {
    const lang = getLang(req);
    const slot = String(req.body.slot || '').trim();

    if (!req.file) {
      res.status(400).json({ error: 'PDF file is required' });
      return;
    }

    if (!slot) {
      res.status(400).json({ error: 'PDF slot is required' });
      return;
    }

    const html = readHtml(lang);
    const $ = cheerio.load(html);
    const node = $(`[data-pdf-slot="${slot}"]`).first();

    if (!node.length) {
      res.status(404).json({ error: `Unknown PDF slot: ${slot}` });
      return;
    }

    const relPath = path.relative(rootDir, req.file.path).replace(/\\/g, '/');
    node.attr('href', relPath);

    writeHtml(lang, $.html());
    res.json({ ok: true, path: relPath });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to update PDF' });
  }
});

app.post('/api/newsletter', async (req, res) => {
  try {
    const email = typeof req.body.email === 'string' ? req.body.email.trim() : '';
    if (!validEmail(email)) {
      res.status(400).json({ error: 'Please enter a valid email address.' });
      return;
    }

    appendRecord('newsletter', { email });

    const plainText = [
      'New newsletter subscription',
      '',
      `Email: ${email}`,
      `Submitted At: ${new Date().toISOString()}`
    ].join('\n');

    const htmlText = [
      '<h2>New newsletter subscription</h2>',
      `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
      `<p><strong>Submitted At:</strong> ${escapeHtml(new Date().toISOString())}</p>`
    ].join('');

    await sendEmailToSales('Sawari Website: Newsletter Subscription', plainText, htmlText);
    res.json({ message: 'Thanks for subscribing.' });
  } catch (error) {
    res.status(400).json({ error: error.message || 'Bad request' });
  }
});

app.post('/api/register-interest', async (req, res) => {
  try {
    const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
    const email = typeof req.body.email === 'string' ? req.body.email.trim() : '';
    const phone = typeof req.body.phone === 'string' ? req.body.phone.trim() : '';
    const message = typeof req.body.message === 'string' ? req.body.message.trim() : '';

    if (!name || !validEmail(email) || !phone) {
      res.status(400).json({ error: 'Please complete all fields with valid values.' });
      return;
    }

    appendRecord('registerInterest', { name, email, phone, message });

    const plainText = [
      'New register interest submission',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Message: ${message || '(empty)'}`,
      `Submitted At: ${new Date().toISOString()}`
    ].join('\n');

    const htmlText = [
      '<h2>New register interest submission</h2>',
      `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
      `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
      `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>`,
      `<p><strong>Message:</strong> ${escapeHtml(message || '(empty)')}</p>`,
      `<p><strong>Submitted At:</strong> ${escapeHtml(new Date().toISOString())}</p>`
    ].join('');

    await sendEmailToSales('Sawari Website: Register Interest', plainText, htmlText);
    res.json({ message: 'Your interest has been registered.' });
  } catch (error) {
    res.status(400).json({ error: error.message || 'Bad request' });
  }
});

app.use(express.static(rootDir, {
  setHeaders(res) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
}));

app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    res.status(404).json({ error: 'API route not found' });
    return;
  }

  res.status(404).send('Not found');
});

ensureDataFile();

app.listen(PORT, () => {
  if (!smtpEnabled) {
    console.warn('SMTP is not configured. Lead submissions will only be stored in data/leads.json.');
  }
  console.log(`Sawari site running at http://localhost:${PORT}`);
});
