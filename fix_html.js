const fs = require('fs');
let html = fs.readFileSync('floor-plans.html', 'utf8');

// replace double wrap
html = html.replace(/<div class="fp-inner-wrap">\s*<div class="fp-inner-wrap">/g, '<div class="fp-inner-wrap">');

// also replace double closing wrap before download
html = html.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<a href="#" class="fp-download">/g, '</div>\n          <a href="#" class="fp-download">');

// also bump cache version
html = html.replace(/styles\.css\?v=[0-9]+/, 'styles.css?v=' + Date.now());

fs.writeFileSync('floor-plans.html', html);
console.log('fixed');
