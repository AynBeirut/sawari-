const fs = require('fs');

const css = `
/* ==================================
   FLOOR PLANS PAGE
   ================================== */
.page-floor-plans .hero-floor-plans {
  position: relative;
  width: 100%;
  height: clamp(400px, 60vh, 700px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: var(--midnight);
}

.page-floor-plans .hero-bg {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  object-fit: cover;
  z-index: 1;
}

.page-floor-plans .hero-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  object-fit: cover;
  z-index: 2;
  mix-blend-mode: overlay;
  opacity: 0.6;
}

.page-floor-plans .hero-wordmark {
  position: relative;
  z-index: 3;
  width: min(80vw, 800px);
}

.page-floor-plans .hero-mouse {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  width: 20px;
}

.fp-header {
  padding: 8rem 0 4rem;
  display: flex;
}

.fp-title-wrap {
  position: relative;
  padding-left: 2rem;
  margin-left: max(320px, 8.3vw);
}

.fp-title-wrap::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: var(--natural-beige);
}

.fp-title {
  font-family: 'Futura', 'Futura PT', sans-serif;
  font-size: 48.75px;
  color: var(--myrtle);
  font-weight: 400;
  margin-bottom: 1rem;
}

.fp-subtitle {
  font-family: 'Manrope', sans-serif;
  font-size: 24px;
  color: #333;
}

.fp-list {
  display: flex;
  flex-direction: column;
}

.fp-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 6rem max(15vw, 150px);
  gap: 6rem;
}

.row-bg-beige {
  background-color: #CDC9BD; /* Adjusted to match design */
}

.row-bg-green {
  background-color: #B5BEB0; /* Adjusted to match design */
}

.fp-info {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.fp-info h2 {
  font-family: 'Futura', 'Futura PT', sans-serif;
  font-size: 28px;
  color: #4f5a54; /* matched myrtle or deep */
  font-weight: 500;
  margin: 0;
  letter-spacing: 0.1em;
}

.fp-subtitle-type {
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  letter-spacing: 1px;
  color: #4f5a54;
  margin-top: -1.5rem;
}

.fp-stats, .fp-keyplan {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.fp-stats p {
  font-family: 'Manrope', sans-serif;
  font-size: 15px;
  margin: 0;
  color: #4f5a54;
}

.fp-keyplan h3 {
  font-family: 'Manrope', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #4f5a54;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.fp-keyplan p {
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  margin: 0;
  color: #4f5a54;
}

.fp-download {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  text-decoration: none;
  border: 1px solid #4f5a54;
  padding: 0.5rem 1rem;
  width: max-content;
}

.fp-download img {
  width: 20px;
}

.fp-download span {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #4f5a54;
}

.fp-image {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fp-image img {
  max-width: 100%;
  max-height: 800px;
  object-fit: contain;
  mix-blend-mode: multiply; /* Helps the images blend into background better, matches original design mock */
}

/* Let's position the elements exactly for alternating row layout: */
.fp-item:nth-child(even) .fp-info {
  grid-column: 2;
  grid-row: 1;
}

.fp-item:nth-child(even) .fp-image {
  grid-column: 1;
  grid-row: 1;
}
`;

documentCSS = fs.readFileSync('styles.css', 'utf-8');
if (!documentCSS.includes('.page-floor-plans')) {
  fs.writeFileSync('styles.css', documentCSS + '\n' + css);
}

// Ensure the PDF icon path is correct in html
let html = fs.readFileSync('floor-plans.html', 'utf8');
html = html.replace(/assets\/psd-export\/48-vector-smart-object-1\.png/g, 'assets/psd-export/170-brochure2-1.png');
fs.writeFileSync('floor-plans.html', html);
