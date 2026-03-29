const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// Add specific classes at the very end to guarantee they override previous
css += '\n\n/* Align Key Plan and Download Button with the text inside the shortened header bar */\n';
css += '.fp-keyplan {\n  padding-left: calc(2.5rem + 2px) !important;\n}\n';
css += '.fp-info > .fp-download {\n  margin-left: calc(2.5rem + 2px) !important;\n}\n';

fs.writeFileSync('styles.css', css);

// Force cache bust to be sure
let html = fs.readFileSync('floor-plans.html', 'utf8');
html = html.replace(/styles\.css\?v=[0-9]+/, 'styles.css?v=' + Date.now());     
fs.writeFileSync('floor-plans.html', html);

console.log('Appended padding overrides and updated HTML cache timestamp');
