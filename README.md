# Sawari Website

Arabic/English bilingual static website for Sawari real estate project.

## Stack
- **Frontend:** HTML, CSS, JavaScript (vanilla)
- **Backend:** Node.js + Express
- **Languages:** English (LTR) + Arabic (RTL)
- **Fonts:** Futura 100 (EN), Cairo (AR)

## Project Structure
- `index.html` / `index-ar.html` - Homepage (EN/AR)
- `floor-plans.html` / `floor-plans-ar.html` - Floor plans page (EN/AR)
- `styles.css` - Shared stylesheet (bilingual)
- `script.js` - Client-side JavaScript
- `server.js` - Express server
- `admin/` - Admin dashboard for leads management
- `assets/` - Fonts, gallery images, icons, floor plans
- `data/` - JSON data files (leads, plans)

## Local Development
```bash
npm install
node server.js
```
Server runs on `http://localhost:3000`

## ⚠️ CRITICAL DEPLOYMENT NOTE

**Port Configuration for Production:**

- **Local development:** PORT=3000 (default)
- **Production (indigo-ca.com):** PORT=30000 (REQUIRED)

**IMPORTANT:** If you deploy a fresh copy of the app with `.env` containing `PORT=3000`, it will crash. The correct port for indigo-ca.com is **30000**.

**Before deployment, ensure `.env` has:**
```
PORT=30000
```

Source: VPS manager note (May 7, 2026)

## Recent Fixes
### May 6, 2026
1. Contact text styling - matched email style (color: var(--muted), font-weight: 400)
2. FAQ text size - increased for better readability (EN: 18px, AR: 1.5rem)
3. Virtual tour trembling - fixed IntersectionObserver behavior
4. Arabic concept ideology text - corrected to "المنطقة المركزية"
5. Arabic floor plans - fixed spacing: "النوع" (with definite article)
6. Gallery white line - hidden in Arabic version (-2px top margin)
7. Gallery 4bed indicator - aligned position in Arabic (bottom: -1.6rem)
8. Mobile responsiveness - all fixes applied across desktop, tablet, mobile

## Git Repository
- **Repo:** AynBeirut/sawari-
- **Branch:** master
- **Latest commit:** 2128935 (May 6, 2026)

## Deployment
See `deploy/` folder for:
- Apache proxy configuration
- Installation guide
- Setup scripts
