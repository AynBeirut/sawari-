const http = require('http');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const rootDir = __dirname;
const dataDir = path.join(rootDir, 'data');
const leadsPath = path.join(dataDir, 'leads.json');
const SALES_EMAIL = 'sales@sawri.com';

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

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
}

function readLeads() {
  ensureDataFile();
  const raw = fs.readFileSync(leadsPath, 'utf8');
  return JSON.parse(raw);
}

function writeLeads(data) {
  fs.writeFileSync(leadsPath, JSON.stringify(data, null, 2));
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1e6) {
        reject(new Error('Payload too large'));
      }
    });

    req.on('end', () => {
      try {
        const parsed = body ? JSON.parse(body) : {};
        resolve(parsed);
      } catch {
        reject(new Error('Invalid JSON payload'));
      }
    });

    req.on('error', () => reject(new Error('Request stream error')));
  });
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

async function handleApi(req, res) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  try {
    const body = await parseBody(req);
    const routePath = decodeURIComponent(req.url).split('?')[0];

    if (routePath === '/api/newsletter') {
      const email = typeof body.email === 'string' ? body.email.trim() : '';
      if (!validEmail(email)) {
        sendJson(res, 400, { error: 'Please enter a valid email address.' });
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
      sendJson(res, 200, { message: 'Thanks for subscribing.' });
      return;
    }

    if (routePath === '/api/register-interest') {
      const name = typeof body.name === 'string' ? body.name.trim() : '';
      const email = typeof body.email === 'string' ? body.email.trim() : '';
      const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
      const message = typeof body.message === 'string' ? body.message.trim() : '';

      if (!name || !validEmail(email) || !phone) {
        sendJson(res, 400, { error: 'Please complete all fields with valid values.' });
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
      sendJson(res, 200, { message: 'Your interest has been registered.' });
      return;
    }

    sendJson(res, 404, { error: 'API route not found' });
  } catch (error) {
    const isSizeError = error.message === 'Payload too large';
    sendJson(res, isSizeError ? 413 : 400, { error: error.message || 'Bad request' });
  }
}

function serveStatic(req, res) {
  const rawPath = decodeURIComponent(req.url).split('?')[0];
  const urlPath = rawPath === '/' ? '/index.html' : rawPath;
  const normalizedPath = path.normalize(urlPath).replace(/^[/\\]+/, '');
  const safePath = normalizedPath.replace(/^([.][.][/\\])+/, '');
  const filePath = path.resolve(rootDir, safePath);

  if (filePath !== rootDir && !filePath.startsWith(rootDir + path.sep)) {
    sendJson(res, 403, { error: 'Forbidden' });
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not found');
        return;
      }

      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Server error');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': contentTypes[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  if (decodeURIComponent(req.url).startsWith('/api/')) {
    handleApi(req, res);
    return;
  }

  serveStatic(req, res);
});

server.listen(PORT, () => {
  ensureDataFile();
  if (!smtpEnabled) {
    console.warn('SMTP is not configured. Lead submissions will only be stored in data/leads.json.');
  }
  console.log(`Sawari site running at http://localhost:${PORT}`);
});
