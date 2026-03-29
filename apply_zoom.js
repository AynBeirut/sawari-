const fs = require('fs');

// 1. Update HTML
let html = fs.readFileSync('floor-plans.html', 'utf8');

// Ensure we don't duplicate the zoom icon if it's already there
if (!html.includes('fp-zoom-icon')) {
    html = html.replace(/<div class="fp-image">/g, `<div class="fp-image">\n          <img class="fp-zoom-icon" src="assets/psd-export/178-zoom-icon-1.png" alt="Zoom" />`);
    fs.writeFileSync('floor-plans.html', html);
}

// 2. Update CSS
let css = `
/* Zoom icon and image filters */
.fp-image .fp-zoom-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  z-index: 2;
  cursor: pointer;
  pointer-events: none;
}

.fp-image {
  cursor: pointer;
}

.fp-image > img:not(.fp-zoom-icon) {
  opacity: 0.5;
  filter: brightness(0.8);
  mix-blend-mode: multiply;
  transition: opacity 0.3s ease, filter 0.3s ease;
}

.fp-image:hover > img:not(.fp-zoom-icon) {
  opacity: 0.7;
  filter: brightness(0.9);
}
`;

let styles = fs.readFileSync('styles.css', 'utf8');
if (!styles.includes('.fp-zoom-icon')) {
    fs.writeFileSync('styles.css', styles + '\n' + css);
}
