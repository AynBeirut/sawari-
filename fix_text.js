const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace('.cta-inner {\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    /* PSD: play button x1=898, left text x2=851, gap47px  16 */\\n    gap: 2.94rem;\\n  }', '.cta-inner {\\n    display: flex;\\n    position: relative;\\n    z-index: 1;\\n    justify-content: center;\\n    align-items: center;\\n    gap: 4rem;\\n  }');

css = css.replace(/font-family: Arial, Helvetica, sans-serif;\\s*font-size: 33px;\\s*font-weight: 300;/, 'font-family: \\'Futura\\', \\'Futura PT\\', sans-serif;\\n      font-size: clamp(28px, 4vw, 55px);\\n      font-weight: 300;');

css = css.replace(/\\.cta-text-left strong,\\s*\\.cta-text-right strong \\{\\s*font-weight: 700;\\s*\\}/, '.cta-text-left strong,\\n  .cta-text-right strong {\\n      font-weight: 700;\\n      font-family: \\'Futura\\', \\'Futura PT\\', sans-serif;\\n  }');

css = css.replace(/\\.play \\{\\s*\\/\\*[^\\*]*\\*\\/\\s*width: 136px;\\s*height: 136px;\\s*border: 0;\\s*border-radius: 50%;\\s*background: transparent;\\s*padding: 0;\\s*cursor: pointer;\\s*flex: 0 0 auto;\\s*\\}\\s*\\.play img \\{\\s*width: 100%;\\s*height: 100%;\\s*object-fit: contain;\\s*display: block;\\s*\\}/, 
'.play {\\n    width: 140px;\\n    height: 140px;\\n    border: 4px solid #ffffff;\\n    border-radius: 50%;\\n    background: transparent;\\n    padding: 0;\\n    cursor: pointer;\\n    flex: 0 0 auto;\\n    position: relative;\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n  }\\n\\n  .play img {\\n      display: none;\\n  }\\n\\n  .play::after {\\n      content: \\'\\';\\n      width: 0;\\n      height: 0;\\n      border-top: 22px solid transparent;\\n      border-bottom: 22px solid transparent;\\n      border-left: 36px solid #ffffff;\\n      margin-left: 12px;\\n  }');

fs.writeFileSync('styles.css', css);
console.log('done text size');
