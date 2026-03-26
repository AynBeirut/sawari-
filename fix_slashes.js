const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace(/\\\\n  font-size: 33px;/g, '');

fs.writeFileSync('styles.css', css);
console.log('Done!');
