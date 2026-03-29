const fs = require('fs');
let styles = fs.readFileSync('styles.css', 'utf8');
styles = styles.replace(/\.page-floor-plans \.hero-floor-plans::after \{[\s\S]*?\}/, '.page-floor-plans .hero-floor-plans::after {\n  content: \'\';\n  position: absolute;\n  top: 0; left: 0; width: 100%; height: 100%;\n  background: var(--deep, #4f6662);\n  opacity: 0.8;\n  mix-blend-mode: multiply;\n  z-index: 2;\n  pointer-events: none;\n}');
fs.writeFileSync('styles.css', styles);

