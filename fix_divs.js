const fs = require('fs');
let html = fs.readFileSync('floor-plans.html', 'utf8');

html = html.replace(/<div class="fp-inner-wrap">\s*/g, '');
html = html.replace(/<div class="fp-info">\s*<h2/g, '<div class="fp-info">\n          <div class="fp-inner-wrap">\n            <h2');

// We currently have:
//   </div>
//   <a href="#" class="fp-download">
// Need:
//   </div>
//   </div>
//   <a href="#" class="fp-download">
html = html.replace(/<\/div>\s*<a href="#" class="fp-download">/g, '</div>\n          </div>\n          <a href="#" class="fp-download">');

// Bust cache again
html = html.replace(/styles\.css\?v=[0-9]+/, 'styles.css?v=' + Date.now());

fs.writeFileSync('floor-plans.html', html);
console.log('fixed divs');
