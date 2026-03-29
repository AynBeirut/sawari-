const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// Replace existing fp-keyplan if padding doesn't exist
if (css.includes('.fp-keyplan {') && !css.includes('padding-left: calc(2.5rem + 2px)')) {
  css = css.replace(/\.fp-keyplan\s*\{/, '.fp-keyplan {\n  padding-left: calc(2.5rem + 2px);\n');
}

// Add padding to fp-description if it exists
if (css.includes('.fp-description') && !css.includes('padding-left: calc(2.5rem + 2px)')) {
  css = css.replace(/\.fp-description\s*\{/, '.fp-description {\n  padding-left: calc(2.5rem + 2px);\n');
}

fs.writeFileSync('styles.css', css);
console.log('Fixed padding');
