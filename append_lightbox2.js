const fs = require('fs'); 
let js = fs.readFileSync('script.js', 'utf8'); 
js += \n\n  /* ==================================
     FLOOR PLANS LIGHTBOX
     ================================== */
  if (document.body.classList.contains('page-floor-plans')) {
    const fpLightbox = document.getElementById('fpLightbox');
    const fpLightboxImage = document.getElementById('fpLightboxImage');
    const fpLightboxClose = document.getElementById('fpLightboxClose');
    const fpLightboxPrev = document.getElementById('fpLightboxPrev');
    const fpLightboxNext = document.getElementById('fpLightboxNext');
    const fpLightboxProgress = document.getElementById('fpLightboxProgress');

    const fpImages = Array.from(document.querySelectorAll('.fp-image > img:not(.fp-zoom-icon)'));
    const fpContainers = document.querySelectorAll('.fp-image');
    let activeFpIndex = 0;

    const updateFpLightbox = () => {
      if (!fpLightboxImage || !fpImages[activeFpIndex]) return;
      fpLightboxImage.src = fpImages[activeFpIndex].src;
      fpLightboxImage.alt = fpImages[activeFpIndex].alt;
      if (fpLightboxProgress) {
        fpLightboxProgress.textContent = \\ / \\;
      }
    };

    const openFpLightbox = (index) => {
      activeFpIndex = index;
      updateFpLightbox();
      if (fpLightbox) {
        fpLightbox.classList.add('active');
        fpLightbox.setAttribute('aria-hidden', 'false');
      }
      document.body.classList.add('gallery-lightbox-open');
    };

    const closeFpLightbox = () => {
      if (fpLightbox) {
        fpLightbox.classList.remove('active');
        fpLightbox.setAttribute('aria-hidden', 'true');
      }
      document.body.classList.remove('gallery-lightbox-open');
      if (fpLightboxImage) {
        fpLightboxImage.src = '';
        fpLightboxImage.alt = '';
      }
    };

    fpContainers.forEach((container, index) => {
      container.addEventListener('click', () => openFpLightbox(index));
    });

    if (fpLightboxClose) fpLightboxClose.addEventListener('click', closeFpLightbox);

    if (fpLightboxPrev) {
      fpLightboxPrev.addEventListener('click', () => {
        activeFpIndex = (activeFpIndex - 1 + fpImages.length) % fpImages.length;
        updateFpLightbox();
      });
    }

    if (fpLightboxNext) {
      fpLightboxNext.addEventListener('click', () => {
        activeFpIndex = (activeFpIndex + 1) % fpImages.length;
        updateFpLightbox();
      });
    }

    if (fpLightbox) {
      fpLightbox.addEventListener('click', (event) => {
        if (event.target === fpLightbox) closeFpLightbox();
      });
    }

    document.addEventListener('keydown', (event) => {
      if (!fpLightbox?.classList.contains('active')) return;
      if (event.key === 'Escape') closeFpLightbox();
      if (event.key === 'ArrowLeft') {
        activeFpIndex = (activeFpIndex - 1 + fpImages.length) % fpImages.length;
        updateFpLightbox();
      }
      if (event.key === 'ArrowRight') {
        activeFpIndex = (activeFpIndex + 1) % fpImages.length;
        updateFpLightbox();
      }
    });
  }
; 
fs.writeFileSync('script.js', js, 'utf8'); 
console.log('Appended FP lightbox js');
