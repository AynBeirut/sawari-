const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

if (!css.includes('.fp-header-block')) {
    css += '\n\n.fp-header-block {\n  border-left: 2px solid #7A8177;\n  padding-left: 2.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n';
}

if (!css.includes('.fp-keyplan {')) {
    css += '\n.fp-keyplan {\n  padding-left: calc(2.5rem + 2px);\n}\n';
}

if (!css.includes('margin-left: calc(2.5rem + 2px)')) {
    css += '\n.fp-download {\n  margin-left: calc(2.5rem + 2px);\n}\n';
}

css = css.replace(/\.fp-inner-wrap[\s\S]*?\{[\s\S]*?\}/g, '');
css = css.replace(/\.fp-info\s*\{[\s\S]*?\}/, '.fp-info {\n  background-color: #E2DFD3;\n  flex-direction: column;\n  justify-content: center;\n  gap: 2.5rem;\n}');

css = css.replace(/filter: brightness\(0\.6\).*;/g, '');
css = css.replace(/opacity: 0\.35;/g, 'opacity: 0.85;');

fs.writeFileSync('styles.css', css);
console.log('patched css');
