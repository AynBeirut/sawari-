const fs = require('fs');
let styles = fs.readFileSync('styles.css', 'utf8');

// We want to replace everything from "/* ==================================\n   FLOOR PLANS PAGE" to the end of the file.
const splitStr = `/* ==================================\n   FLOOR PLANS PAGE`;
const parts = styles.split(splitStr);

if (parts.length > 1) {
  let newCss = `/* ==================================
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
}

/* This is the same teal filter from the front page CTA */
.page-floor-plans .hero-floor-plans::after {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: url('assets/psd-export/196-bg-7.png') center/cover;
  z-index: 2;
  pointer-events: none;
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

/* Floor Plans Intro */
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
  text-transform: uppercase;
}

.fp-subtitle {
  font-family: 'Manrope', sans-serif;
  font-size: 24px;
  color: #333;
}

/* List Structure */
.fp-list {
  display: flex;
  flex-direction: column;
}

.fp-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: stretch; /* So columns are equal height */
}

/* Make sure container handles equal widths */
.fp-info, .fp-image {
  padding: 6rem max(10vw, 100px);
  display: flex;
}

/* 
 * Apply background colors explicitly to the halves 
 */
.fp-info {
  background-color: #E2DFD3; /* The exact beige background from ref */
  flex-direction: column;
  justify-content: center;
  gap: 2.5rem;
}

.fp-image {
  background-color: #929F94; /* The exact teal/green background from ref */
  position: relative;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

/* Zebra crossing layout */
.fp-item:nth-child(even) .fp-info {
  grid-column: 2;
  grid-row: 1;
}

.fp-item:nth-child(even) .fp-image {
  grid-column: 1;
  grid-row: 1;
}

/* Typography for inner info */
.fp-info h2 {
  font-family: 'Futura', 'Futura PT', sans-serif;
  font-size: 28px;
  color: #4B524A;
  font-weight: 500;
  margin: 0;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.fp-subtitle-type {
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  letter-spacing: 1px;
  color: #7A8177;
  margin-top: -1.5rem;
  text-transform: uppercase;
}

.fp-stats, .fp-keyplan {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.fp-stats p {
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
  margin: 0;
  color: #7A8177;
}

.fp-keyplan h3 {
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #4B524A;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.fp-keyplan p {
  font-family: 'Manrope', sans-serif;
  font-size: 15px;
  margin: 0;
  color: #7A8177;
}

.fp-download {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  text-decoration: none;
  border-bottom: 1px solid #4B524A;
  padding-bottom: 0.2rem;
  width: max-content;
}

.fp-download img {
  width: 24px;
}

.fp-download span {
  font-family: 'Manrope', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #4B524A;
}

/* Image settings */
.fp-image img:not(.fp-zoom-icon) {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  opacity: 0.35;
  filter: brightness(0.6) sepia(0.6) hue-rotate(130deg); /* Applies ONLY to the floor plan image*/
  mix-blend-mode: multiply;
  transition: opacity 0.3s ease, filter 0.3s ease;
}

.fp-image:hover > img:not(.fp-zoom-icon) {
  opacity: 0.7;
  filter: brightness(0.8);
}

/* Zoom icon */
.fp-image .fp-zoom-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  z-index: 2;
  pointer-events: none;
  filter: none;
  opacity: 1;
}

`;

  fs.writeFileSync('styles.css', parts[0] + newCss);
}
