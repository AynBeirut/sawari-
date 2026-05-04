# Sawari Website — Installation Guide

**Package:** `sawari-deploy-2026-04-03.zip`
**Stack:** Node.js + Express
**Requires:** cPanel with Node.js support

---

## What You'll Need

- cPanel login credentials
- The zip file: `sawari-deploy-2026-04-03.zip`
- 5–10 minutes

---

## Step 1 — Upload the Files

1. Log into **cPanel**
2. Open **File Manager**
3. Navigate to the folder for your domain (e.g. `public_html/yourdomain.com/`)
4. Click **Upload** and upload `sawari-deploy-2026-04-03.zip`
5. Once uploaded, right-click it → **Extract** — extract into that same folder
6. After extraction, you can delete the zip file

Your folder should now contain: `index.html`, `server.js`, `package.json`, `assets/`, `admin/`, `data/`, etc.

---

## Step 2 — Create the Node.js App

1. In cPanel, find **Setup Node.js App** (under Software section)
2. Click **Create Application**
3. Fill in:

| Field | Value |
|---|---|
| Node.js version | 18 (or highest available) |
| Application mode | Production |
| Application root | `/home/yourusername/public_html/yourdomain.com` |
| Application URL | `yourdomain.com` |
| Application startup file | `server.js` |

4. Click **Create**

---

## Step 3 — Install Dependencies

On the same Node.js App page, after creating the app:

1. Click **Run NPM Install**
2. Wait for it to complete (may take 1–2 minutes)

---

## Step 4 — Set Environment Variables

Still on the Node.js App page, scroll to **Environment Variables** and add:

| Key | Value |
|---|---|
| `JWT_SECRET` | `Sawari2025SecureKey!xK9mP2qR` |
| `ADMIN_PASSWORD` | `2025Swa.` |

> **Note:** If the zip already contains a `.env` file, you can skip this step — the values are already set.

---

## Step 5 — Start the App

Click **Restart** (or **Start**) on the Node.js App page.

The status should change to **Running**.

---

## Step 6 — Verify

Open your browser and go to:

- **Main site:** `https://yourdomain.com/`
- **Admin panel:** `https://yourdomain.com/admin/login.html`

**Admin login:**
- Email: `sales@sawari.com`
- Password: `2025Swa.`

---

## Troubleshooting

**Site shows 503 / Bad Gateway:**
The Node.js app is not running. Go back to Setup Node.js App and click Restart.

**Site loads but shows blank page:**
Open browser DevTools (F12) → Console tab — share the error with your developer.

**Admin login fails:**
Make sure the environment variables in Step 4 were saved correctly, then restart the app.

**Port conflict:**
cPanel assigns the port automatically. If you see a port error in the app logs, contact your developer.

---

## Notes

- The `data/` folder stores lead submissions. Do not delete it.
- The `assets/` folder contains all images and media. Do not delete or rename it.
- To update the site in future, replace individual files and click Restart in the Node.js App panel.
