const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace(/gap: 4rem;\s*font-family: 'Futura', 'Futura PT', sans-serif;/, 
'gap: 4rem;\n}\n\n.cta-text-left,\n.cta-text-right {\n    font-family: \'Futura\', \'Futura PT\', sans-serif;'
);

fs.writeFileSync('styles.css', css);
console.log('Done fixing selector!');
