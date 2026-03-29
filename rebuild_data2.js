const fs = require('fs');

const items = [
  {
    title: 'ONE BED APARTMENT',
    stats: ['Unit Area (NSA) - 81.81 SQM', 'Balcony/Terrace Area - 11.52 SQM', 'Total Area (GSA) - 93.33 SQM'],
    kpTitle: 'KEY PLAN',
    kp: ['CPT A (Triple Tower) - TYP 1 (4TH - 8TH FLOOR)', 'CPT B (50 Floor Tower) - TYP 1 (2ND - 13TH FLOOR)', 'CPT C (Twin Tower) - TYP 1 (4TH - 8TH FLOOR)', 'CPT D (28 Floor Tower) - TYP 1 (2ND - 7TH), 8TH FLOOR'],
    img: '1BED TYP 1.jpg', alt: 'One Bed', bg: 'beige'
  },
  {
    title: 'TWO BED APARTMENT',
    subtitle: '2 BED TYPE 1',
    stats: ['Unit Area (NSA) - 141.28 SQM', 'Balcony/Terrace Area - 9.51 SQM', 'Total Area (GSA) - 150.79 SQM'],
    kpTitle: 'KEY PLAN',
    kp: ['CPT A (Triple Tower) - TYP 1 (4TH - 8TH FLOOR)', 'CPT B (50 Floor Tower) - TYP 1 (2ND - 13TH FLOOR)', 'CPT C (Twin Tower) - TYP 1 (4TH - 8TH FLOOR)', 'CPT D (28 Floor Tower) - TYP 1 (2ND - 7TH), 8TH FLOOR'],
    img: '2 BED TYP 1.jpg', alt: 'Two Bed Typ 1', bg: 'green'
  },
  {
    title: 'TWO BED APARTMENT',
    subtitle: '2 BED TYPE 2',
    stats: ['Unit Area (NSA) - 120.68 SQM', 'Balcony/Terrace Area - 53.72 SQM', 'Total Area (GSA) - 174.40 SQM'],
    kpTitle: 'KEY PLAN',
    kp: ['CPT A (Triple Tower) - 3RD FLOOR', 'CPT B (50 Floor Tower) - NA', 'CPT C (Twin Tower) - 3RD FLOOR', 'CPT D (28 Floor Tower) - NA'],
    img: '2 BED TYP 2.jpg', alt: 'Two Bed Typ 2', bg: 'beige'
  },
  {
    title: 'THREE BED APARTMENT',
    subtitle: '3 BED TYPE 1',
    stats: ['Unit Area (NSA) - 185.39 SQM', 'Balcony/Terrace Area - 22.22 SQM', 'Total Area (GSA) - 207.61 SQM'],
    kpTitle: 'KEY PLAN',
    kp: ['CPT A (Triple Tower) - TYP 2 (9TH - 11TH FLOOR)', 'CPT B (50 Floor Tower) - TYP 2 (17TH - 19TH FLOOR)', 'CPT C (Twin Tower) - TYP 2 (9TH - 11TH FLOOR)', 'CPT D (28 Floor Tower) - TYP 2 (10TH - 11TH FLOOR)'],
    img: '3 BED TYP 1.jpg', alt: 'Three Bed Typ 1', bg: 'green'
  },
  {
    title: 'THREE BED APARTMENT',
    subtitle: '3 BED TYPE 2',
    stats: ['Unit Area (NSA) - 173.82 SQM', 'Balcony/Terrace Area - 22.22 SQM', 'Total Area (GSA) - 196.04 SQM'],
    kpTitle: 'KEY PLAN',
    kp: ['CPT A (Triple Tower) - TYP 3 (12TH - 17TH FLOOR)', 'CPT B (50 Floor Tower) - TYP 3 (20TH - 32ND FLOOR)', 'CPT C (Twin Tower) - TYP 3 (12TH - 17TH FLOOR)', 'CPT D (28 Floor Tower) - TYP 3 (12TH - 17TH FLOOR)'],
    img: '3 BED TYP 2.jpg', alt: 'Three Bed Typ 2', bg: 'beige'
  },
  {
    title: 'THREE BED APARTMENT',
    subtitle: '3 BED TYPE 3',
    stats: ['Unit Area (NSA) - 186.51 SQM', 'Balcony/Terrace Area - 41.24 SQM', 'Total Area (GSA) - 227.75 SQM'],
    kpTitle: 'KEY PLAN',
    kp: ['CPT A (Triple Tower) - TYP 4 (18TH - 26TH FLOOR)', 'CPT B (50 Floor Tower) - TYP 4 (33RD - 49TH FLOOR)', 'CPT C (Twin Tower) - TYP 4 (18TH - 26TH FLOOR)', 'CPT D (28 Floor Tower) - TYP 4 (18TH - 26TH FLOOR)'],
    img: '3 BED TYP 3.jpg', alt: 'Three Bed Typ 3', bg: 'green'
  },
  {
    title: 'THREE BED APARTMENT',
    subtitle: '3 BED TYPE 4',
    stats: ['Unit Area (NSA) - 226.75 SQM', 'Balcony/Terrace Area - 35.80 SQM', 'Total Area (GSA) - 262.55 SQM'],
    kpTitle: 'KEY PLAN',
    kp: ['CPT A (Triple Tower) - NA', 'CPT B (50 Floor Tower) - 14TH FLOOR', 'CPT C (Twin Tower) - NA', 'CPT D (28 Floor Tower) - NA'],
    img: '3 BED TYP 4.jpg', alt: 'Three Bed Typ 4', bg: 'beige'
  },
  {
    title: 'THREE BED APARTMENT',
    subtitle: '3 BED TYPE 4A',
    stats: ['Unit Area (NSA) - 226.75 SQM', 'Balcony/Terrace Area - 155.07 SQM', 'Total Area (GSA) - 381.82 SQM'],
    kpTitle: 'KEY PLAN',
    kp: ['CPT A (Triple Tower) - NA', 'CPT B (50 Floor Tower) - 15TH - 16TH FLOOR', 'CPT C (Twin Tower) - NA', 'CPT D (28 Floor Tower) - NA'],
    img: '3 BED TYP 4A.jpg', alt: 'Three Bed Typ 4A', bg: 'green'
  },
  {
    title: 'FOUR BED APARTMENT',
    subtitle: '4 BED TYPE 1',
    stats: ['Unit Area (NSA) - 253.09 SQM', 'Balcony/Terrace Area - 41.24 SQM', 'Total Area (GSA) - 294.33 SQM'],
    kpTitle: 'KEY PLAN',
    kp: ['CPT A (Triple Tower) - 27TH FLOOR', 'CPT B (50 Floor Tower) - 50TH FLOOR', 'CPT C (Twin Tower) - 27TH FLOOR', 'CPT D (28 Floor Tower) - 27TH FLOOR'],
    img: '4 BED TYP 1.jpg', alt: 'Four Bed Typ 1', bg: 'beige'
  },
  {
    title: '4 BED DUPLEX TYPE 1',
    subtitle: 'LOWER FLOOR',
    stats: ['Unit Area (NSA) - 342.85 SQM', 'Balcony/Terrace Area - 7.50 SQM', 'Total Area (GSA) - 350.35 SQM'],
    kpTitle: 'KEY PLAN',
    kp: ['CPT A (Triple Tower) - 28TH FLOOR', 'CPT B (50 Floor Tower) - NA', 'CPT C (Twin Tower) - 28TH FLOOR', 'CPT D (28 Floor Tower) - 28TH FLOOR'],
    img: '4 BED DUPL TYP 1 LOW.jpg', alt: 'Four Bed Duplex Low', bg: 'green'
  },
  {
    title: '4 BED DUPLEX TYPE 1',
    subtitle: 'UPPER FLOOR',
    stats: ['Unit Area (NSA) - 342.85 SQM', 'Balcony/Terrace Area - 7.50 SQM', 'Total Area (GSA) - 350.35 SQM'],
    kpTitle: 'KEY PLAN',
    kp: ['CPT A (Triple Tower) - 28TH FLOOR', 'CPT B (50 Floor Tower) - NA', 'CPT C (Twin Tower) - 28TH FLOOR', 'CPT D (28 Floor Tower) - 28TH FLOOR'],
    img: '4 BED DUPL TYP 1 UPP.jpg', alt: 'Four Bed Duplex Upp', bg: 'beige'
  },
  {
    title: '4 BED DUPLEX TYPE 2',
    subtitle: 'LOWER FLOOR',
    stats: ['Unit Area (NSA) - 404.81 SQM', 'Balcony/Terrace Area - 0.00 SQM', 'Total Area (GSA) - 404.81 SQM'],
    kpTitle: 'KEY PLAN',
    kp: ['CPT A (Triple Tower) - 1ST FLOOR', 'CPT B (50 Floor Tower) - 1ST FLOOR', 'CPT C (Twin Tower) - 1ST FLOOR', 'CPT D (28 Floor Tower) - 1ST FLOOR'],
    img: '4 BED DUPL TYP 2 LOW.jpg', alt: 'Four Bed Duplex Type 2 Low', bg: 'green'
  },
  {
    title: '4 BED DUPLEX TYPE 2',
    subtitle: 'UPPER FLOOR',
    stats: ['Unit Area (NSA) - 404.81 SQM', 'Balcony/Terrace Area - 0.00 SQM', 'Total Area (GSA) - 404.81 SQM'],
    kpTitle: 'KEY PLAN',
    kp: ['CPT A (Triple Tower) - 1ST FLOOR', 'CPT B (50 Floor Tower) - 1ST FLOOR', 'CPT C (Twin Tower) - 1ST FLOOR', 'CPT D (28 Floor Tower) - 1ST FLOOR'],
    img: '4 BED DUPL TYP 2 UPP.jpg', alt: 'Four Bed Duplex Type 2 Upp', bg: 'beige'
  }
];

let itemsHtml = items.map(item => {
  let subHtml = item.subtitle ? '<p class="fp-subtitle-type">' + item.subtitle + '</p>' : '';
  let statsHtml = item.stats.map(s => '<p>' + s + '</p>').join('\n              ');
  let kpHtml = item.kp.map(k => '<p>' + k + '</p>').join('\n              ');
  
  let infoBlock = '\n        <div class="fp-info">\n' +
                  '          <div class="fp-header-block">\n' +
                  '            <h2>' + item.title + '</h2>\n' +
                  '            ' + subHtml + '\n' +
                  '            <div class="fp-stats">\n' +
                  '              ' + statsHtml + '\n' +
                  '            </div>\n' +
                  '          </div>\n' +
                  '          <div class="fp-keyplan">\n' +
                  '            <h3>' + item.kpTitle + '</h3>\n' +
                  '            ' + kpHtml + '\n' +
                  '          </div>\n' +
                  '          <a href="#" class="fp-download">\n' +
                  '            <img src="assets/psd-export/170-brochure2-1.png" alt="PDF" />\n' +
                  '            <span>DOWNLOAD FLOOR PLAN</span>\n' +
                  '          </a>\n' +
                  '        </div>\n';

  let imgBlock = '\n        <div class="fp-image">\n' +
                 '          <img class="fp-zoom-icon" src="assets/psd-export/178-zoom-icon-1.png" alt="Zoom" />\n' +
                 '          <img src="design/UNIT RENDER/UNIT RENDER/' + item.img + '" alt="' + item.alt + '" />\n' +
                 '        </div>\n';

  return '      <article class="fp-item row-bg-' + item.bg + '">\n' +
         (item.bg === 'beige' ? infoBlock + imgBlock : imgBlock + infoBlock) +
         '      </article>\n';
}).join('');

let html = fs.readFileSync('floor-plans.html', 'utf8');
html = html.replace(/<div class="fp-list">[\s\S]*?(?=<\/main>)/, '<div class="fp-list">\n' + itemsHtml + '\n    </div>\n  ');
html = html.replace(/styles\.css\?v=[0-9]+/, 'styles.css?v=' + Date.now());
fs.writeFileSync('floor-plans.html', html);

console.log('rebuilt completely clean');
