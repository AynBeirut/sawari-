## Plan: Client Admin Dashboard (SSG Approach)

**TL;DR**
Migrate the raw Node.js server to Express.js to support secure uploads and admin auth. Build a lightweight dashboard where the client can upload gallery photos, manage PDF links/files, and edit text in English and Arabic. Use Cheerio to update static HTML files directly on disk.

- **Arabic Pre-requisite**: Create `index-ar.html` and add stable `data-cms-key` markers for robust updates.

**Steps**
1. **Server Migration**: Install `express`, `multer`, `cheerio`, `cookie-parser`, and `jsonwebtoken`. Refactor `server.js` while preserving existing lead APIs.
2. **Admin Authentication**: Add `/admin/login` and JWT cookie-based protection for `/api/admin/*`.
3. **HTML Preparation**: Add `data-cms-key` attributes to editable text/image/link nodes in `index.html`, then mirror in `index-ar.html`.
4. **Dashboard UI**: Build `admin/dashboard-en.html` and `admin/dashboard-ar.html` with controls for text, gallery images, and PDFs.
5. **Hydration API**: Add `GET /api/admin/content?lang=en|ar` to read current values from HTML.
6. **Update API**: Add `POST /api/admin/update` with Multer uploads + Cheerio write-back.

**Verification**
1. Existing `/api/newsletter` and `/api/register-interest` continue to work.
2. Admin can log in and access dashboard.
3. Uploaded gallery image updates filesystem and `index.html`/`index-ar.html` references.
4. Text updates are reflected on site refresh.
5. Unauthenticated users cannot access admin APIs.

**Decisions**
- Static HTML remains the runtime source (no DB required for content rendering).
- Express + Multer reduces upload complexity and risk.
- Cheerio avoids brittle regex-based HTML editing.
