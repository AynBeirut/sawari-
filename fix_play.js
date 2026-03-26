const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');
let temp = css.split('.play {');
let before = temp[0];
let after = temp[1].split('.location {')[1];
let newPlay = '.play {\n    width: 140px;\n    height: 140px;\n    border: 4px solid #ffffff;\n    border-radius: 50%;\n    background: transparent;\n    padding: 0;\n    cursor: pointer;\n    flex: 0 0 auto;\n    position: relative;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n\n  .play img {\n    display: none;\n  }\n\n  .play::after {\n    content: \'\';\n    width: 0;\n    height: 0;\n    border-top: 22px solid transparent;\n    border-bottom: 22px solid transparent;\n    border-left: 36px solid #ffffff;\n    margin-left: 12px;\n  }\n\n  .location {';
fs.writeFileSync('styles.css', before + newPlay + after);
console.log('done');
