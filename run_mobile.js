const fs = require('fs');

const css = `
/* == ADDED MOBILE OVERRIDES == */
@media (max-width: 1024px) {
  .fp-item { grid-template-columns: 1fr; }
  .fp-item:nth-child(even) .fp-info, .fp-item:nth-child(odd) .fp-info { grid-column: 1; grid-row: 2; }
  .fp-item:nth-child(even) .fp-image, .fp-item:nth-child(odd) .fp-image { grid-column: 1; grid-row: 1; }
  .fp-header { flex-direction: column; align-items: flex-start; padding: 4rem 1.5rem; }
  .fp-header-block::before { top: 0; min-height: 100%; transform: none; bottom: 0; }
  .fp-title-wrap { margin-left: 0; padding-left: 1.5rem; margin-bottom: 2rem; }
  .fp-header-block { margin-left: 0; padding-left: 1.5rem; margin-top: 1.5rem; }
  .fp-keyplan { margin-left: 0; padding-left: 1.5rem; margin-top: 1.5rem; }
  .fp-info > .fp-download { margin-left: 1.5rem; }
  .fp-info, .fp-image { padding: 4rem 1.5rem !important; }
  .fp-image { min-height: 50vh; }
  
  /* Make sure philosophy stage scales safely */
  .philosophy-stage {
    min-height: 50vw;
  }
}
@media (max-width: 767px) {
  .fp-info > .fp-download { margin-top: 2rem; }
  .fp-info, .fp-image { padding: 3rem 1.5rem !important; }
  .fp-image { min-height: 40vh; }
  .fp-info h2 { font-size: 26px; }
  .fp-subtitle-type, .fp-stats p, .fp-keyplan h3 { font-size: 18px; }
  .fp-keyplan p, .fp-download span { font-size: 16px; }
  .fp-header { padding: 3rem 1.5rem; }
  .fp-title { font-size: 38px; }
  .fp-subtitle { font-size: 20px; }
  
  /* Fix Home Page Plans Layout */
  .plan-text-container { position: relative; left: 0; top: 0; width: 100%; margin-bottom: 2rem; padding: 1.5rem; }
  .plan-viewer { display: flex !important; flex-direction: column-reverse; }
  .plan-left, .plan-right { min-height: auto; width: 100%; }
  .plan-vline { display: none; }
  
  .plan-prev { left: 1rem; top: auto; bottom: 1rem; transform: none; z-index: 10; padding: 1rem; }
  .plan-next { right: 1rem; top: auto; bottom: 1rem; transform: none; z-index: 10; padding: 1rem; }
}
`;

fs.appendFileSync('styles.css', css);
fs.appendFileSync('_zip_extract/styles.css', css);
console.log('Mobile overrides appended.');