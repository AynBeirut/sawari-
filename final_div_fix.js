const fs = require('fs');
let html = fs.readFileSync('floor-plans.html', 'utf8');

const target = /<\/div>\s*<\/div>\s*<\/div>\s*<a href="#" class="fp-download">/g;
html = html.replace(target, '</div>\n          </div>\n          <a href="#" class="fp-download">');

// Bust cache again
html = html.replace(/styles\.css\?v=[0-9]+/, 'styles.css?v=' + Date.now());

fs.writeFileSync('floor-plans.html', html);
console.log('fixed extra div');
