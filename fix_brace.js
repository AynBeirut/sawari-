const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

let fixed = css.replace(
    /\.cta-text-left strong,\s*\.cta-text-right strong\s*\{\s*font-family:\s*'Futura',\s*'Futura PT',\s*sans-serif;\s*\.video-cta\s*\{/m,
    \.cta-text-left strong,
    .cta-text-right strong {
        font-family: 'Futura', 'Futura PT', sans-serif;
        font-weight: 700;
    }

    .video-cta {\
);

if(fixed !== css) {
    fs.writeFileSync('styles.css', fixed);
    console.log('Fixed brace!');
} else {
    console.log('Regex did not match!');
}
