const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace('.fp-image img:not(.fp-zoom-icon) {\r\n  max-width: 100%;\r\n  max-height: 80vh;\r\n  object-fit: contain;\r\n  opacity: 0.35;\r\n  filter: brightness(0.6) sepia(0.6) hue-rotate(130deg); /* Applies ONLY to the floor plan image*/\r\n  mix-blend-mode: multiply;\r\n  transition: opacity 0.3s ease, filter 0.3s ease;\r\n}', '.fp-image img:not(.fp-zoom-icon) {\r\n  max-width: 100%;\r\n  max-height: 80vh;\r\n  object-fit: contain;\r\n  mix-blend-mode: multiply;\r\n  opacity: 0.85;\r\n  transition: opacity 0.3s ease;\r\n}');

css = css.replace('.fp-image img:not(.fp-zoom-icon) {\n  max-width: 100%;\n  max-height: 80vh;\n  object-fit: contain;\n  opacity: 0.35;\n  filter: brightness(0.6) sepia(0.6) hue-rotate(130deg); /* Applies ONLY to the floor plan image*/\n  mix-blend-mode: multiply;\n  transition: opacity 0.3s ease, filter 0.3s ease;\n}', '.fp-image img:not(.fp-zoom-icon) {\n  max-width: 100%;\n  max-height: 80vh;\n  object-fit: contain;\n  mix-blend-mode: multiply;\n  opacity: 0.85;\n  transition: opacity 0.3s ease;\n}');

css = css.replace('.fp-image:hover > img:not(.fp-zoom-icon) {\r\n  opacity: 0.7;\r\n  filter: brightness(0.8);\r\n}', '.fp-image:hover > img:not(.fp-zoom-icon) {\r\n  opacity: 1;\r\n}');
css = css.replace('.fp-image:hover > img:not(.fp-zoom-icon) {\n  opacity: 0.7;\n  filter: brightness(0.8);\n}', '.fp-image:hover > img:not(.fp-zoom-icon) {\n  opacity: 1;\n}');

// remove the bad literal \n that was appended
css = css.replace(/\\n\.fp-inner-wrap[\s\S]*/, '');

css += '\n\n.fp-inner-wrap {\n  display: flex;\n  flex-direction: column;\n  gap: 2.5rem;\n  border-left: 2px solid #7A8177;\n  padding-left: 2.5rem;\n}\n\n.fp-download {\n  margin-left: calc(2.5rem + 2px);\n}\n';

fs.writeFileSync('styles.css', css);

let html = fs.readFileSync('floor-plans.html', 'utf8');
html = html.replace(/styles\.css\?v=[0-9]+/, 'styles.css?v=' + Date.now());
fs.writeFileSync('floor-plans.html', html);

console.log('Done!');
