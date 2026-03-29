const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

// Replace fp-inner-wrap
css = css.replace(/\.fp-inner-wrap\s*\{[\s\S]*?\}/, .fp-inner-wrap {\n  display: flex;\n  flex-direction: column;\n  gap: 2.5rem;\n});

// Add fp-header-block if not present
if (!css.includes('.fp-header-block')) {
    css += '\n.fp-header-block {\n  border-left: 2px solid #7A8177;\n  padding-left: 2.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n';
}

// Ensure fp-keyplan gets the proper left padding to align with text
if (!css.includes('.fp-keyplan { padding-left:')) {
    css += '\n.fp-keyplan {\n  padding-left: calc(2.5rem + 2px);\n}\n';
}

fs.writeFileSync('styles.css', css);

let html = fs.readFileSync('floor-plans.html', 'utf8');

// Wrap h2/subtitle and stats in fp-header-block, leaving keyplan outside
html = html.replace(/<div class="fp-inner-wrap">\s*<h2>([\s\S]*?)<div class="fp-stats">([\s\S]*?)<\/div>\s*<div class="fp-keyplan">/g, 
  '<div class="fp-inner-wrap">\n          <div class="fp-header-block">\n            <h2><div class="fp-stats"></div>\n          </div>\n          <div class="fp-keyplan">'
);

// Bust cache
html = html.replace(/styles\.css\?v=[0-9]+/, 'styles.css?v=' + Date.now());

fs.writeFileSync('floor-plans.html', html);

console.log('shortened bar');
