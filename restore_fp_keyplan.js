const fs = require('fs');

function splitKeyplan(file) {
  let content = fs.readFileSync(file, 'utf8');
  
  content = content.replace(
    /\.fp-stats,\s*\.fp-keyplan\s*\{\s*display:\s*flex;\s*flex-direction:\s*column;\s*gap:\s*0;\s*\}/g,
    `.fp-stats {\n    display: flex;\n    flex-direction: column;\n    gap: 0;\n  }\n  .fp-keyplan {\n    display: flex;\n    flex-direction: column;\n    gap: 0.4rem;\n  }`
  );

  fs.writeFileSync(file, content);
}

splitKeyplan('styles.css');
splitKeyplan('_zip_extract/styles.css');
console.log('Restored .fp-keyplan gap to 0.4rem');
