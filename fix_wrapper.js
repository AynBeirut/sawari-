const fs = require('fs');
let html = fs.readFileSync('floor-plans.html', 'utf8');

// Replace standard structure
const matchInfo = /<div class="fp-info">\s*<h2/g;
let parts = html.split('<div class="fp-info">');
for (let i = 1; i < parts.length; i++) {
    // find the </a> tag ending the fp-download
    let downloadIdx = parts[i].indexOf('<a href="#" class="fp-download">');
    if (downloadIdx !== -1) {
        let contentToWrap = parts[i].substring(0, downloadIdx);
        let rest = parts[i].substring(downloadIdx);
        parts[i] = '\n          <div class="fp-inner-wrap">\n  ' + contentToWrap.trimEnd() + '\n          </div>\n          ' + rest;
    }
}
fs.writeFileSync('floor-plans.html', parts.join('<div class="fp-info">'));
console.log('done');
