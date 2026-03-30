const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
let floorPlansHtml = fs.readFileSync('floor-plans.html', 'utf8');

// Extract from index.html: newsletter, contact-strip, register, feature-strip, footer, lightbox, script
const newsletterMatch = indexHtml.match(/<section class="newsletter".*?<\/section>/s);
const contactMatch = indexHtml.match(/<section class="contact-strip".*?<\/section>/s);
const registerMatch = indexHtml.match(/<section class="register section".*?<\/section>/s);
const featureStripMatch = indexHtml.match(/<section class="feature-strip".*?<\/section>/s);
const everythingAfterMainMatch = indexHtml.match(/<footer class="site-footer".*<\/body>/s);

if (!newsletterMatch || !registerMatch || !featureStripMatch || !everythingAfterMainMatch || !contactMatch) {
    console.log('Failed to match sections');
    process.exit(1);
}

// User requested "register ,download , footer" and "exsact same as the home page"
// Let's add them inside </main> and then append footer+scripts after main.
const insideMain = '\n\n    ' + newsletterMatch[0] + '\n\n    ' + contactMatch[0] + '\n\n    ' + registerMatch[0] + '\n\n    ' + featureStripMatch[0] + '\n  </main>';

const afterMain = '\n\n  ' + everythingAfterMainMatch[0];

floorPlansHtml = floorPlansHtml.replace(/<\/main>\s*<\/body>/s, insideMain + afterMain);

// Also bust cache just in case
floorPlansHtml = floorPlansHtml.replace(/\?v=[0-9]+/, '?v=300000');

fs.writeFileSync('floor-plans.html', floorPlansHtml);
console.log('Updated floor-plans.html successfully with full bottom sections');