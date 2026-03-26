const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

let pattern = /\.play \{\s*\/\*[^\*]*\*\/\s*width: 136px;\s*height: 136px;\s*border: 0;\s*border-radius: 50%;\s*background: transparent;\s*padding: 0;\s*cursor: pointer;\s*flex: 0 0 auto;\s*\}\s*\.play img \{\s*width: 100%;\s*height: 100%;\s*object-fit: contain;\s*display: block;\s*\}/m;

css = css.replace(pattern, 
\.play {
    width: 140px;
    height: 140px;
    border: 4px solid #ffffff;
    border-radius: 50%;
    background: transparent;
    padding: 0;
    cursor: pointer;
    flex: 0 0 auto;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .play img {
    display: none;
  }
  
  .play::after {
    content: '';
    width: 0;
    height: 0;
    border-top: 22px solid transparent;
    border-bottom: 22px solid transparent;
    border-left: 36px solid #ffffff;
    margin-left: 12px;
  }\
);

fs.writeFileSync('styles.css', css);
