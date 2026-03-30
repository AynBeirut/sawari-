const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const floorPlansHtml = fs.readFileSync('floor-plans.html', 'utf8');

// Extract from index.html: section.register, section.feature-strip, footer.site-footer
const registerMatch = indexHtml.match(/<section class="register section".*?<\/section>/s);
const featureStripMatch = indexHtml.match(/<section class="feature-strip".*?<\/section>/s);
const footerMatch = indexHtml.match(/<footer class="site-footer".*?<\/footer>/s);

if (!registerMatch || !featureStripMatch || !footerMatch) {
    console.log('Failed to match sections');
    process.exit(1);
}

const appendContent = '\n    ' + registerMatch[0] + '\n\n    ' + featureStripMatch[0] + '\n  </main>\n\n  ' + footerMatch[0];

const updatedFloorPlans = floorPlansHtml.replace(/<\/main>\s*<\/body>/s, appendContent + '\n\n</body>');

if (updatedFloorPlans !== floorPlansHtml) {
    fs.writeFileSync('floor-plans.html', updatedFloorPlans);
    console.log('Updated floor-plans.html successfully');
} else {
    console.log('Could not replace');
}