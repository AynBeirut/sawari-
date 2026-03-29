const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');
let idx = css.indexOf('.fp-inner-wrap');
if (idx !== -1) {
  css = css.substring(0, idx);
}
// check if filter is still present
css = css.replace(/filter: brightness\(0\.6\) sepia\(0\.6\) hue-rotate\(130deg\); \/\* Applies ONLY to the floor plan image\*\//g, '');
css = css.replace(/opacity: 0\.35;/g, 'opacity: 0.85;');

css += '.fp-inner-wrap {\n  display: flex;\n  flex-direction: column;\n  gap: 2.5rem;\n  border-left: 2px solid #7A8177;\n  padding-left: 2.5rem;\n}\n\n.fp-download {\n  margin-left: calc(2.5rem + 2px);\n}';
fs.writeFileSync('styles.css', css);
console.log('cleaned');
