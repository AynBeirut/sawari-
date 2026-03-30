const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  },
  { threshold: 0.05, rootMargin: '0px 0px 12% 0px' }
);

revealItems.forEach((item) => revealObserver.observe(item));

const mapBox = document.getElementById('mapBox');
const mapCopy = document.querySelector('.map-copy');
const mapImage = document.getElementById('mapImage');
const tabs = document.querySelectorAll('.tab');
const mapContent = {
  city: '13 mins to Al Zorah',
  airport: '15 mins to Ajman Beach',
  schools: '30 mins to Dubai Airport',
  sharjah: '10 mins to Sharjah City Center'
};
const mapImages = {
  city: 'assets/psd-export/192-vector-smart-object-3.png',
  airport: 'assets/psd-export/192-vector-smart-object-3.png',
  schools: 'assets/psd-export/192-vector-smart-object-3.png',
  sharjah: 'assets/psd-export/192-vector-smart-object-3.png'
};

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });

    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    if (mapCopy) {
      mapCopy.textContent = mapContent[tab.dataset.map] || mapContent.city;
    }
    if (mapImage) {
      mapImage.src = mapImages[tab.dataset.map] || mapImages.city;
    }
  });
});


const plans = [
  {
    "title": "ONE BED APARTMENT",
    "subtitle": "",
    "stats": [
      "Unit Area (NSA) - 81.81 SQM",
      "Balcony/Terrace Area - 11.52 SQM",
      "Total Area (GSA) - 93.33 SQM"
    ],
    "keyplan": [
      "CPT A (Triple Tower) - TYP 1 (4TH - 8TH FLOOR)",
      "CPT B (50 Floor Tower) - TYP 1 (2ND - 13TH FLOOR)",
      "CPT C (Twin Tower) - TYP 1 (4TH - 8TH FLOOR)",
      "CPT D (28 Floor Tower) - TYP 1 (2ND - 7TH), 8TH FLOOR"
    ],
    "image": "design/UNIT RENDER/UNIT RENDER/1BED TYP 1.jpg"
  },
  {
    "title": "TWO BED APARTMENT",
    "subtitle": "2 BED TYPE 1",
    "stats": [
      "Unit Area (NSA) - 141.28 SQM",
      "Balcony/Terrace Area - 9.51 SQM",
      "Total Area (GSA) - 150.79 SQM"
    ],
    "keyplan": [
      "CPT A (Triple Tower) - TYP 1 (4TH - 8TH FLOOR)",
      "CPT B (50 Floor Tower) - TYP 1 (2ND - 13TH FLOOR)",
      "CPT C (Twin Tower) - TYP 1 (4TH - 8TH FLOOR)",
      "CPT D (28 Floor Tower) - TYP 1 (2ND - 7TH), 8TH FLOOR"
    ],
    "image": "design/UNIT RENDER/UNIT RENDER/2 BED TYP 1.jpg"
  },
  {
    "title": "TWO BED APARTMENT",
    "subtitle": "2 BED TYPE 2",
    "stats": [
      "Unit Area (NSA) - 120.68 SQM",
      "Balcony/Terrace Area - 53.72 SQM",
      "Total Area (GSA) - 174.40 SQM"
    ],
    "keyplan": [
      "CPT A (Triple Tower) - 3RD FLOOR",
      "CPT B (50 Floor Tower) - NA",
      "CPT C (Twin Tower) - 3RD FLOOR",
      "CPT D (28 Floor Tower) - NA"
    ],
    "image": "design/UNIT RENDER/UNIT RENDER/2 BED TYP 2.jpg"
  },
  {
    "title": "THREE BED APARTMENT",
    "subtitle": "3 BED TYPE 1",
    "stats": [
      "Unit Area (NSA) - 185.39 SQM",
      "Balcony/Terrace Area - 22.22 SQM",
      "Total Area (GSA) - 207.61 SQM"
    ],
    "keyplan": [
      "CPT A (Triple Tower) - TYP 2 (9TH - 11TH FLOOR)",
      "CPT B (50 Floor Tower) - TYP 2 (17TH - 19TH FLOOR)",
      "CPT C (Twin Tower) - TYP 2 (9TH - 11TH FLOOR)",
      "CPT D (28 Floor Tower) - TYP 2 (10TH - 11TH FLOOR)"
    ],
    "image": "design/UNIT RENDER/UNIT RENDER/3 BED TYP 1.jpg"
  },
  {
    "title": "THREE BED APARTMENT",
    "subtitle": "3 BED TYPE 2",
    "stats": [
      "Unit Area (NSA) - 173.82 SQM",
      "Balcony/Terrace Area - 22.22 SQM",
      "Total Area (GSA) - 196.04 SQM"
    ],
    "keyplan": [
      "CPT A (Triple Tower) - TYP 3 (12TH - 17TH FLOOR)",
      "CPT B (50 Floor Tower) - TYP 3 (20TH - 32ND FLOOR)",
      "CPT C (Twin Tower) - TYP 3 (12TH - 17TH FLOOR)",
      "CPT D (28 Floor Tower) - TYP 3 (12TH - 17TH FLOOR)"
    ],
    "image": "design/UNIT RENDER/UNIT RENDER/3 BED TYP 2.jpg"
  },
  {
    "title": "THREE BED APARTMENT",
    "subtitle": "3 BED TYPE 3",
    "stats": [
      "Unit Area (NSA) - 186.51 SQM",
      "Balcony/Terrace Area - 41.24 SQM",
      "Total Area (GSA) - 227.75 SQM"
    ],
    "keyplan": [
      "CPT A (Triple Tower) - TYP 4 (18TH - 26TH FLOOR)",
      "CPT B (50 Floor Tower) - TYP 4 (33RD - 49TH FLOOR)",
      "CPT C (Twin Tower) - TYP 4 (18TH - 26TH FLOOR)",
      "CPT D (28 Floor Tower) - TYP 4 (18TH - 26TH FLOOR)"
    ],
    "image": "design/UNIT RENDER/UNIT RENDER/3 BED TYP 3.jpg"
  },
  {
    "title": "THREE BED APARTMENT",
    "subtitle": "3 BED TYPE 4",
    "stats": [
      "Unit Area (NSA) - 226.75 SQM",
      "Balcony/Terrace Area - 35.80 SQM",
      "Total Area (GSA) - 262.55 SQM"
    ],
    "keyplan": [
      "CPT A (Triple Tower) - NA",
      "CPT B (50 Floor Tower) - 14TH FLOOR",
      "CPT C (Twin Tower) - NA",
      "CPT D (28 Floor Tower) - NA"
    ],
    "image": "design/UNIT RENDER/UNIT RENDER/3 BED TYP 4.jpg"
  },
  {
    "title": "THREE BED APARTMENT",
    "subtitle": "3 BED TYPE 4A",
    "stats": [
      "Unit Area (NSA) - 226.75 SQM",
      "Balcony/Terrace Area - 155.07 SQM",
      "Total Area (GSA) - 381.82 SQM"
    ],
    "keyplan": [
      "CPT A (Triple Tower) - NA",
      "CPT B (50 Floor Tower) - 15TH - 16TH FLOOR",
      "CPT C (Twin Tower) - NA",
      "CPT D (28 Floor Tower) - NA"
    ],
    "image": "design/UNIT RENDER/UNIT RENDER/3 BED TYP 4A.jpg"
  },
  {
    "title": "FOUR BED APARTMENT",
    "subtitle": "4 BED TYPE 1",
    "stats": [
      "Unit Area (NSA) - 253.09 SQM",
      "Balcony/Terrace Area - 41.24 SQM",
      "Total Area (GSA) - 294.33 SQM"
    ],
    "keyplan": [
      "CPT A (Triple Tower) - 27TH FLOOR",
      "CPT B (50 Floor Tower) - 50TH FLOOR",
      "CPT C (Twin Tower) - 27TH FLOOR",
      "CPT D (28 Floor Tower) - 27TH FLOOR"
    ],
    "image": "design/UNIT RENDER/UNIT RENDER/4 BED TYP 1.jpg"
  },
  {
    "title": "4 BED DUPLEX TYPE 1",
    "subtitle": "LOWER FLOOR",
    "stats": [
      "Unit Area (NSA) - 342.85 SQM",
      "Balcony/Terrace Area - 7.50 SQM",
      "Total Area (GSA) - 350.35 SQM"
    ],
    "keyplan": [
      "CPT A (Triple Tower) - 28TH FLOOR",
      "CPT B (50 Floor Tower) - NA",
      "CPT C (Twin Tower) - 28TH FLOOR",
      "CPT D (28 Floor Tower) - 28TH FLOOR"
    ],
    "image": "design/UNIT RENDER/UNIT RENDER/4 BED DUPL TYP 1 LOW.jpg"
  },
  {
    "title": "4 BED DUPLEX TYPE 1",
    "subtitle": "UPPER FLOOR",
    "stats": [
      "Unit Area (NSA) - 342.85 SQM",
      "Balcony/Terrace Area - 7.50 SQM",
      "Total Area (GSA) - 350.35 SQM"
    ],
    "keyplan": [
      "CPT A (Triple Tower) - 28TH FLOOR",
      "CPT B (50 Floor Tower) - NA",
      "CPT C (Twin Tower) - 28TH FLOOR",
      "CPT D (28 Floor Tower) - 28TH FLOOR"
    ],
    "image": "design/UNIT RENDER/UNIT RENDER/4 BED DUPL TYP 1 UPP.jpg"
  },
  {
    "title": "4 BED DUPLEX TYPE 2",
    "subtitle": "LOWER FLOOR",
    "stats": [
      "Unit Area (NSA) - 404.81 SQM",
      "Balcony/Terrace Area - 0.00 SQM",
      "Total Area (GSA) - 404.81 SQM"
    ],
    "keyplan": [
      "CPT A (Triple Tower) - 1ST FLOOR",
      "CPT B (50 Floor Tower) - 1ST FLOOR",
      "CPT C (Twin Tower) - 1ST FLOOR",
      "CPT D (28 Floor Tower) - 1ST FLOOR"
    ],
    "image": "design/UNIT RENDER/UNIT RENDER/4 BED DUPL TYP 2 LOW.jpg"
  },
  {
    "title": "4 BED DUPLEX TYPE 2",
    "subtitle": "UPPER FLOOR",
    "stats": [
      "Unit Area (NSA) - 404.81 SQM",
      "Balcony/Terrace Area - 0.00 SQM",
      "Total Area (GSA) - 404.81 SQM"
    ],
    "keyplan": [
      "CPT A (Triple Tower) - 1ST FLOOR",
      "CPT B (50 Floor Tower) - 1ST FLOOR",
      "CPT C (Twin Tower) - 1ST FLOOR",
      "CPT D (28 Floor Tower) - 1ST FLOOR"
    ],
    "image": "design/UNIT RENDER/UNIT RENDER/4 BED DUPL TYP 2 UPP.jpg"
  }
];

let planIndex = 0;
const planImage = document.getElementById('planImage');
const planTitle = document.getElementById('planTitle');
const planSubtitle = document.getElementById('planSubtitle');
const planStats = document.getElementById('planStats');
const planProgress = document.getElementById('planProgress');
const planDownloadLink = document.querySelector('.plan-dl-row');

function updatePlanUI() {
  const p = plans[planIndex];
  if (planImage) {
    planImage.src = p.image;
    planImage.alt = [p.title, p.subtitle].filter(Boolean).join(' · ') || 'Floor plan';
  }
  
  if (planTitle) planTitle.textContent = p.title || 'FLOOR PLAN';
  if (planSubtitle) {
    if (p.subtitle) {
      planSubtitle.textContent = p.subtitle;
      planSubtitle.hidden = false;
    } else {
      planSubtitle.hidden = true;
    }
  }
  if (planStats) {
    planStats.innerHTML = p.stats.map(s => `<p>${s}</p>`).join('');
  }
  if (planProgress) {
    planProgress.textContent = `${planIndex + 1} / ${plans.length}`;
  }
  if (planDownloadLink) {
    planDownloadLink.href = p.image;
    planDownloadLink.setAttribute('download', p.image.split('/').pop() || 'floor-plan.jpg');
    planDownloadLink.setAttribute('aria-label', `Download ${[p.title, p.subtitle].filter(Boolean).join(' ')} floor plan`);
  }
}

if (planImage) {
  // Initial load
  updatePlanUI();

  document.getElementById('planPrev')?.addEventListener('click', () => {
    planIndex = (planIndex - 1 + plans.length) % plans.length;
    updatePlanUI();
  });

  document.getElementById('planNext')?.addEventListener('click', () => {
    planIndex = (planIndex + 1) % plans.length;
    updatePlanUI();
  });

  // Scroll functionality on the viewer
  const planViewer = document.querySelector('.plan-viewer');
  if (planViewer) {
    let scrollTimeout;
    planViewer.addEventListener('wheel', (e) => {
      e.preventDefault(); // Prevent page scrolling
      if (scrollTimeout) return; // Debounce
      
      if (e.deltaY > 0) {
        planIndex = (planIndex + 1) % plans.length;
      } else {
        planIndex = (planIndex - 1 + plans.length) % plans.length;
      }
      updatePlanUI();
      
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
      }, 500); // 500ms delay between scrolls
    }, { passive: false });
  }

  // Lightbox Functionality
  const lbWrap = document.getElementById('homeFpLightbox');
  const lbImage = document.getElementById('homeFpLightboxImage');
  const lbTitle = document.getElementById('lbPlanTitle');
  const lbSub = document.getElementById('lbPlanSubtitle');
  const lbStats = document.getElementById('lbPlanStats');
  const lbKeyplan = document.getElementById('lbPlanKeyplan');
  const lbProgress = document.getElementById('homeFpLightboxProgress');
  
  const zoomIcon = document.querySelector('.plan-zoom');
  let lbActiveIndex = 0;
  let lightboxWheelLocked = false;
  let touchStartX = 0;
  let touchStartY = 0;
  const LIGHTBOX_WHEEL_DELTA_THRESHOLD = 20;
  const LIGHTBOX_TOUCH_AXIS_LOCK_THRESHOLD = 12;
  const LIGHTBOX_TOUCH_SWIPE_THRESHOLD = 48;
  const LIGHTBOX_TOUCH_AXIS_X = 'x';
  const LIGHTBOX_TOUCH_AXIS_Y = 'y';
  let lightboxTouchAxis = null;

  function resetLightboxTouchGesture() {
    touchStartX = 0;
    touchStartY = 0;
    lightboxTouchAxis = null;
  }

  function showPrevLightboxPlan() {
    lbActiveIndex = (lbActiveIndex - 1 + plans.length) % plans.length;
    updateLightboxUI();
  }

  function showNextLightboxPlan() {
    lbActiveIndex = (lbActiveIndex + 1) % plans.length;
    updateLightboxUI();
  }

  function updateLightboxUI() {
    const p = plans[lbActiveIndex];
    if(lbImage) lbImage.src = p.image;
    if(lbTitle) lbTitle.textContent = p.title || 'FLOOR PLAN';
    if (lbSub) {
      lbSub.textContent = p.subtitle || '';
      lbSub.hidden = !p.subtitle;
    }
    if(lbStats) lbStats.innerHTML = p.stats.map(s => `<p>${s}</p>`).join('');
    if(lbKeyplan) lbKeyplan.innerHTML = p.keyplan.map(s => `<p>${s}</p>`).join('');
    if(lbProgress) lbProgress.textContent = `${lbActiveIndex + 1} / ${plans.length}`;
  }

  function openLightbox() {
    lbActiveIndex = planIndex; // sync index
    updateLightboxUI();
    if(lbWrap) {
      lbWrap.classList.add('active');
      lbWrap.setAttribute('aria-hidden', 'false');
    }
    document.body.classList.add('gallery-lightbox-open');
    window.applyPageScale?.();
  }

  function closeLightbox() {
    resetLightboxTouchGesture();
    if(lbWrap) {
      lbWrap.classList.remove('active');
      lbWrap.setAttribute('aria-hidden', 'true');
    }
    document.body.classList.remove('gallery-lightbox-open');
    window.applyPageScale?.();
  }

  if (zoomIcon) {
    zoomIcon.addEventListener('click', openLightbox);
  }
  // also allow clicking the image itself
  if (planImage) {
    planImage.style.cursor = 'pointer';
    planImage.addEventListener('click', openLightbox);
  }

  document.getElementById('homeFpLightboxClose')?.addEventListener('click', closeLightbox);
  
  document.getElementById('homeFpLightboxPrev')?.addEventListener('click', showPrevLightboxPlan);
  
  document.getElementById('homeFpLightboxNext')?.addEventListener('click', showNextLightboxPlan);

  document.addEventListener('keydown', (e) => {
    if (lbWrap && lbWrap.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showPrevLightboxPlan();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        showNextLightboxPlan();
      }
    }
  });

  if (lbWrap) {
    lbWrap.addEventListener('wheel', (e) => {
      if (!lbWrap.classList.contains('active')) return;

      const horizontalDelta = Math.abs(e.deltaX);
      const verticalDelta = Math.abs(e.deltaY);

      if (horizontalDelta < LIGHTBOX_WHEEL_DELTA_THRESHOLD || horizontalDelta < verticalDelta) return;

      e.preventDefault();
      e.stopPropagation();

      if (lightboxWheelLocked) return;
      lightboxWheelLocked = true;

      if (e.deltaX > 0) {
        showNextLightboxPlan();
      } else {
        showPrevLightboxPlan();
      }

      window.setTimeout(() => {
        lightboxWheelLocked = false;
      }, 350);
    }, { passive: false, capture: true });

    lbWrap.addEventListener('touchstart', (e) => {
      if (!lbWrap.classList.contains('active')) return;
      const touch = e.touches[0];
      if (!touch) return;
      resetLightboxTouchGesture();
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    }, { passive: true });

    lbWrap.addEventListener('touchmove', (e) => {
      if (!lbWrap.classList.contains('active')) return;
      const touch = e.touches[0];
      if (!touch) return;

      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      if (!lightboxTouchAxis) {
        if (Math.max(absDeltaX, absDeltaY) < LIGHTBOX_TOUCH_AXIS_LOCK_THRESHOLD) return;
        lightboxTouchAxis = absDeltaX > absDeltaY ? LIGHTBOX_TOUCH_AXIS_X : LIGHTBOX_TOUCH_AXIS_Y;
      }

      if (lightboxTouchAxis === LIGHTBOX_TOUCH_AXIS_X) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, { passive: false });

    lbWrap.addEventListener('touchend', (e) => {
      if (!lbWrap.classList.contains('active')) {
        resetLightboxTouchGesture();
        return;
      }
      const touch = e.changedTouches[0];
      if (!touch) {
        resetLightboxTouchGesture();
        return;
      }

      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;
      const axis = lightboxTouchAxis;

      resetLightboxTouchGesture();

      if (axis !== LIGHTBOX_TOUCH_AXIS_X) return;
      if (Math.abs(deltaX) < LIGHTBOX_TOUCH_SWIPE_THRESHOLD || Math.abs(deltaX) < Math.abs(deltaY)) return;

      if (deltaX < 0) {
        showNextLightboxPlan();
      } else {
        showPrevLightboxPlan();
      }
    }, { passive: true });

    lbWrap.addEventListener('touchcancel', () => {
      resetLightboxTouchGesture();
    }, { passive: true });

    lbWrap.addEventListener('click', (e) => {
      if (e.target === lbWrap || e.target.classList.contains('fp-lightbox-content')) {
        closeLightbox();
      }
    });
  }
}


const faqItems = document.querySelectorAll('.faq-item');
const faqPlusIcon = 'assets/psd-export/061-layer-1.png';
const faqMinusIcon = 'assets/psd-export/081-layer-2.png';

faqItems.forEach((item) => {
  item.addEventListener('click', () => {
    const answer = item.nextElementSibling;
    const isOpen = answer.classList.contains('open');

    document.querySelectorAll('.faq-answer').forEach((el) => el.classList.remove('open'));
    document.querySelectorAll('.faq-item').forEach((faqItem) => {
      faqItem.classList.remove('is-open');
      faqItem.setAttribute('aria-expanded', 'false');
      const icon = faqItem.querySelector('.faq-toggle-icon');
      if (icon) {
        icon.src = faqPlusIcon;
      }
    });

    if (!isOpen) {
      answer.classList.add('open');
      item.classList.add('is-open');
      item.setAttribute('aria-expanded', 'true');
      const icon = item.querySelector('.faq-toggle-icon');
      if (icon) {
        icon.src = faqMinusIcon;
      }
    }
  });
});
const mainTour = document.getElementById('tourMain');
const tourThumbsTrack = document.getElementById('tourThumbs');
const thumbs = Array.from(document.querySelectorAll('#tourThumbs img'));
const tourArrowButtons = Array.from(document.querySelectorAll('.tour-rail .thumb-arrow'));

if (mainTour && thumbs.length) {
  let activeTourIndex = Math.max(thumbs.findIndex((thumb) => thumb.classList.contains('active')), 0);

  const keepTourThumbVisible = (activeThumb) => {
    if (!tourThumbsTrack) {
      return;
    }

    const trackWidth = tourThumbsTrack.clientWidth;
    const maxScrollLeft = tourThumbsTrack.scrollWidth - trackWidth;

    if (maxScrollLeft <= 0) {
      return;
    }

    const thumbCenter = activeThumb.offsetLeft + activeThumb.offsetWidth / 2;
    const targetScrollLeft = Math.min(
      Math.max(thumbCenter - trackWidth / 2, 0),
      maxScrollLeft
    );

    tourThumbsTrack.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth'
    });
  };

  const updateTourImage = (nextIndex) => {
    activeTourIndex = (nextIndex + thumbs.length) % thumbs.length;

    thumbs.forEach((img, index) => {
      img.classList.toggle('active', index === activeTourIndex);
    });

    const activeThumb = thumbs[activeTourIndex];
    const tourImage = activeThumb.getAttribute('data-main') || activeThumb.getAttribute('src');
    mainTour.src = tourImage;
    mainTour.alt = activeThumb.alt.replace('thumbnail', 'scene').trim() || 'Virtual tour scene';

    keepTourThumbVisible(activeThumb);
  };

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      updateTourImage(index);
    });
  });

  if (tourArrowButtons[0]) {
    tourArrowButtons[0].addEventListener('click', () => {
      updateTourImage(activeTourIndex - 1);
    });
  }

  if (tourArrowButtons[1]) {
    tourArrowButtons[1].addEventListener('click', () => {
      updateTourImage(activeTourIndex + 1);
    });
  }

  updateTourImage(activeTourIndex);
}

const philosophyCenterText = document.getElementById('philCenterText');
const philosophyNodes = document.querySelectorAll('.phil-node');
const philosophyStage = document.querySelector('.philosophy-stage');

if (philosophyCenterText && philosophyNodes.length) {
  const philosophyCopy = {
    default: 'Dynamic and iconic skyline through a composition of elegantly articulated towers that establish Sawari as a landmark mixed-use destination.',
    concept: 'Dummy text about concept ideology, describing the overall vision behind Sawari and how every design decision supports a clear, unified development identity.',
    iconic: 'Dummy text about iconic urban identity, expressing how Sawari creates a recognizable landmark presence with a strong and memorable silhouette.',
    central: 'Dummy text about central point district, highlighting Sawari as a connected destination with seamless access to the city and its daily essentials.',
    premium: 'Dummy text about premium materials, reflecting refined finishes, durable surfaces, and carefully selected details that elevate everyday living.',
    human: 'Dummy text about human-centered mobility, focusing on walkability, smooth circulation, and a more intuitive experience for residents and visitors.',
    lifestyle: 'Dummy text about lifestyle integration, showing how leisure, wellness, convenience, and community functions are woven into one environment.',
    community: 'Dummy text about community-centric living, emphasizing shared experiences, social connection, and spaces designed to bring people together.',
    luxury: 'Dummy text about luxury with sustainability, balancing elegant design with responsible planning, efficiency, and long-term environmental value.'
  };

  let lockedTopic = 'concept';
  let currentPhilosophyTopic = '';

  const setPhilosophyTopic = (topic) => {
    const nextTopic = philosophyCopy[topic] ? topic : 'default';
    if (currentPhilosophyTopic !== nextTopic) {
      philosophyCenterText.textContent = philosophyCopy[nextTopic];

      if (philosophyStage?.classList.contains('show')) {
        philosophyCenterText.classList.remove('is-rising');
        void philosophyCenterText.offsetWidth;
        philosophyCenterText.classList.add('is-rising');
      }

      currentPhilosophyTopic = nextTopic;
    }

    philosophyNodes.forEach((node) => {
      node.classList.toggle('is-active', node.dataset.philosophyTopic === nextTopic);
    });
  };

  philosophyNodes.forEach((node) => {
    const topic = node.dataset.philosophyTopic;
    const label = node.getAttribute('alt') || `${topic} section`;

    node.setAttribute('role', 'button');
    node.setAttribute('tabindex', '0');
    node.setAttribute('aria-label', label);

    node.addEventListener('mouseenter', () => {
      setPhilosophyTopic(topic);
    });

    node.addEventListener('focus', () => {
      setPhilosophyTopic(topic);
    });

    node.addEventListener('click', () => {
      lockedTopic = topic;
      setPhilosophyTopic(topic);
    });

    node.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        lockedTopic = topic;
        setPhilosophyTopic(topic);
      }
    });
  });

  if (philosophyStage) {
    philosophyStage.addEventListener('mouseleave', () => {
      setPhilosophyTopic(lockedTopic);
    });
  }

  setPhilosophyTopic(lockedTopic);
}

const newsletterForm = document.getElementById('newsletterForm');
const registerForm = document.getElementById('registerForm');

function setStatus(statusEl, message, type) {
  statusEl.textContent = message;
  statusEl.classList.remove('success', 'error');
  if (type) {
    statusEl.classList.add(type);
  }
}

async function submitForm(formEl, statusEl, endpoint) {
  const submitButton = formEl.querySelector('button[type="submit"]');
  const formData = new FormData(formEl);
  const payload = Object.fromEntries(formData.entries());

  setStatus(statusEl, 'Submitting...', null);
  submitButton.disabled = true;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const body = await response.json();
    if (!response.ok) {
      throw new Error(body.error || 'Submission failed.');
    }

    setStatus(statusEl, body.message || 'Submitted successfully.', 'success');
    formEl.reset();
  } catch (error) {
    setStatus(statusEl, error.message || 'Could not submit form.', 'error');
  } finally {
    submitButton.disabled = false;
  }
}

if (newsletterForm) {
  const newsletterStatus = document.getElementById('newsletterStatus');
  newsletterForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    await submitForm(newsletterForm, newsletterStatus, '/api/newsletter');
  });
}

if (registerForm) {
  const registerStatus = document.getElementById('registerStatus');
  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    await submitForm(registerForm, registerStatus, '/api/register-interest');
  });
}

/* POPUP LOGIC */
document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('registerPopup');
  const closePopup = document.getElementById('closePopup');
  const enquireBtns = document.querySelectorAll('.nav-enquire, a[href="#register"]');
  const projectStats = document.getElementById('projectStats');
  const statCountNumbers = Array.from(document.querySelectorAll('#projectStats strong[data-count-target]'));
  const videoSection = document.querySelector('.video-cta');
  const videoPlayButton = document.querySelector('.play[data-video-embed]');
  const videoInlinePlayer = document.getElementById('videoInlinePlayer');
  const videoInlineClose = document.getElementById('videoInlineClose');
  const videoInlineFrame = document.getElementById('videoInlineFrame');
  const galleryButtons = document.querySelectorAll('.gallery-filter button');
  const gallerySideLeft = document.getElementById('gallerySideLeft');
  const gallerySideRight = document.getElementById('gallerySideRight');
  const galleryMainCard = document.getElementById('galleryMainCard');
  const galleryMainLabelImage = document.getElementById('galleryMainLabelImage');
  const galleryMainLabelText = document.getElementById('galleryMainLabelText');
  const galleryProgress = document.getElementById('galleryProgress');
  const galleryLightbox = document.getElementById('galleryLightbox');
  const galleryLightboxImage = document.getElementById('galleryLightboxImage');
  const galleryLightboxClose = document.getElementById('galleryLightboxClose');
  const galleryLightboxPrev = document.getElementById('galleryLightboxPrev');
  const galleryLightboxNext = document.getElementById('galleryLightboxNext');
  const galleryLightboxProgress = document.getElementById('galleryLightboxProgress');
  const galleryTriggers = document.querySelectorAll('.gallery-open');

  const galleryCollections = {
    lobby: {
      labelImage: 'assets/psd-export/154-entrance-lobby-1.png',
      labelAlt: 'Entrance Lobby',
      placeholderText: '',
      items: [
        {
          image: 'assets/psd-export/151-4-2.png',
          fullImage: 'assets/psd-export/151-4-2.png',
          lightboxAlt: 'Lobby reception image'
        },
        {
          image: 'assets/psd-export/149-1-5.png',
          fullImage: 'assets/psd-export/149-1-5.png',
          lightboxAlt: 'Entrance lobby image'
        },
        {
          image: 'assets/psd-export/150-2-2.png',
          fullImage: 'assets/psd-export/150-2-2.png',
          lightboxAlt: 'Lobby interior image'
        }
      ]
    },
    '1bed': {
      labelImage: '',
      labelAlt: '',
      placeholderText: '',
      items: [
        {
          image: 'assets/psd-export/151-4-2.png',
          fullImage: 'assets/psd-export/151-4-2.png',
          lightboxAlt: '1 bedroom placeholder image 3'
        },
        {
          image: 'assets/psd-export/118-2-1.png',
          fullImage: 'assets/psd-export/118-2-1.png',
          lightboxAlt: '1 bedroom placeholder image 1'
        },
        {
          image: 'assets/psd-export/150-2-2.png',
          fullImage: 'assets/psd-export/150-2-2.png',
          lightboxAlt: '1 bedroom placeholder image 2'
        }
      ]
    },
    '2bed': {
      labelImage: '',
      labelAlt: '',
      placeholderText: '',
      items: [
        {
          image: 'assets/psd-export/118-2-1.png',
          fullImage: 'assets/psd-export/118-2-1.png',
          lightboxAlt: '2 bedrooms placeholder image 3'
        },
        {
          image: 'assets/psd-export/150-2-2.png',
          fullImage: 'assets/psd-export/150-2-2.png',
          lightboxAlt: '2 bedrooms placeholder image 1'
        },
        {
          image: 'assets/psd-export/151-4-2.png',
          fullImage: 'assets/psd-export/151-4-2.png',
          lightboxAlt: '2 bedrooms placeholder image 2'
        }
      ]
    },
    '3bed': {
      labelImage: '',
      labelAlt: '',
      placeholderText: '',
      items: [
        {
          image: 'assets/psd-export/149-1-5.png',
          fullImage: 'assets/psd-export/149-1-5.png',
          lightboxAlt: '3 bedrooms placeholder image 3'
        },
        {
          image: 'assets/psd-export/151-4-2.png',
          fullImage: 'assets/psd-export/151-4-2.png',
          lightboxAlt: '3 bedrooms placeholder image 1'
        },
        {
          image: 'assets/psd-export/118-2-1.png',
          fullImage: 'assets/psd-export/118-2-1.png',
          lightboxAlt: '3 bedrooms placeholder image 2'
        }
      ]
    },
    garden: {
      labelImage: '',
      labelAlt: '',
      placeholderText: '',
      items: [
        {
          image: 'assets/psd-export/150-2-2.png',
          fullImage: 'assets/psd-export/150-2-2.png',
          lightboxAlt: 'Garden placeholder image 3'
        },
        {
          image: 'assets/psd-export/149-1-5.png',
          fullImage: 'assets/psd-export/149-1-5.png',
          lightboxAlt: 'Garden placeholder image 1'
        },
        {
          image: 'assets/psd-export/118-2-1.png',
          fullImage: 'assets/psd-export/118-2-1.png',
          lightboxAlt: 'Garden placeholder image 2'
        }
      ]
    }
  };

  let activeGalleryFilter = 'lobby';
  let activeGalleryIndex = 1;

  const statAnimationFrameIds = new WeakMap();
  const statAnimationTimeoutIds = new WeakMap();

  const resetStatCount = (element) => {
    const pendingFrame = statAnimationFrameIds.get(element);
    const pendingTimeout = statAnimationTimeoutIds.get(element);

    if (pendingFrame) {
      cancelAnimationFrame(pendingFrame);
      statAnimationFrameIds.delete(element);
    }

    if (pendingTimeout) {
      window.clearTimeout(pendingTimeout);
      statAnimationTimeoutIds.delete(element);
    }

    element.textContent = '0';
  };

  const animateStatCount = (element, delay = 0) => {
    const targetValue = Number(element.dataset.countTarget || '0');
    const duration = 5200;

    resetStatCount(element);

    const startAnimation = () => {
      const startTime = performance.now();

      const tick = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        element.textContent = Math.round(targetValue * easedProgress).toString();

        if (progress < 1) {
          const nextFrame = requestAnimationFrame(tick);
          statAnimationFrameIds.set(element, nextFrame);
          return;
        }

        element.textContent = targetValue.toString();
        statAnimationFrameIds.delete(element);
      };

      const firstFrame = requestAnimationFrame(tick);
      statAnimationFrameIds.set(element, firstFrame);
    };

    const timeoutId = window.setTimeout(startAnimation, delay);
    statAnimationTimeoutIds.set(element, timeoutId);
  };

  if (projectStats && statCountNumbers.length) {
    let statsInView = false;

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (statsInView) {
              return;
            }

            statsInView = true;
            statCountNumbers.forEach((item, index) => animateStatCount(item, index * 280));
            return;
          }

          statsInView = false;
          statCountNumbers.forEach((item) => resetStatCount(item));
        });
      },
      { threshold: 0.35 }
    );

    statsObserver.observe(projectStats);
  }

  const closeInlineVideo = () => {
    if (!videoSection || !videoInlinePlayer) {
      return;
    }

    videoSection.classList.remove('is-playing');
    videoInlinePlayer.setAttribute('aria-hidden', 'true');

    if (videoInlineFrame) {
      videoInlineFrame.src = '';
    }
  };

  if (videoPlayButton && videoSection && videoInlinePlayer && videoInlineFrame) {
    videoPlayButton.addEventListener('click', () => {
      const baseEmbed = videoPlayButton.dataset.videoEmbed;

      if (!baseEmbed) {
        return;
      }

      const autoplayUrl = `${baseEmbed}${baseEmbed.includes('?') ? '&' : '?'}autoplay=1&rel=0`;
      videoInlineFrame.src = autoplayUrl;
      videoSection.classList.add('is-playing');
      videoInlinePlayer.setAttribute('aria-hidden', 'false');
    });
  }

  if (videoInlineClose) {
    videoInlineClose.addEventListener('click', closeInlineVideo);
  }
  
  if (enquireBtns && popup) {
    enquireBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        popup.classList.add('active');
        popup.setAttribute('aria-hidden', 'false');
      });
    });
  }

  if (closePopup && popup) {
    closePopup.addEventListener('click', () => {
      popup.classList.remove('active');
      popup.setAttribute('aria-hidden', 'true');
    });
  }

  if (popup) {
    popup.addEventListener('click', (e) => {
      if(e.target === popup) {
        popup.classList.remove('active');
        popup.setAttribute('aria-hidden', 'true');
      }
    });
  }

  const renderGalleryProgress = (container, total, currentIndex, onSelect) => {
    if (!container) {
      return;
    }

    container.textContent = '';
    for (let index = 0; index < total; index += 1) {
      const step = document.createElement('button');
      step.type = 'button';
      step.classList.toggle('active', index === currentIndex);
      step.setAttribute('aria-label', `Show gallery image ${index + 1} of ${total}`);
      step.addEventListener('click', () => onSelect(index));
      container.appendChild(step);
    }
  };

  const updateGalleryDisplay = () => {
    const collection = galleryCollections[activeGalleryFilter] || galleryCollections.lobby;
    const totalItems = collection.items.length;
    const currentItem = collection.items[activeGalleryIndex];
    const prevItem = collection.items[(activeGalleryIndex - 1 + totalItems) % totalItems];
    const nextItem = collection.items[(activeGalleryIndex + 1) % totalItems];

    if (galleryMainCard) {
      galleryMainCard.style.backgroundImage = `url("${currentItem.image}")`;
      galleryMainCard.dataset.galleryFull = currentItem.fullImage;
      galleryMainCard.setAttribute('aria-label', `Open ${currentItem.lightboxAlt}`);
    }

    if (gallerySideLeft) {
      gallerySideLeft.src = prevItem.image;
      gallerySideLeft.alt = prevItem.lightboxAlt;
    }

    if (gallerySideRight) {
      gallerySideRight.src = nextItem.image;
      gallerySideRight.alt = nextItem.lightboxAlt;
    }

    if (galleryMainLabelImage) {
      if (collection.labelImage) {
        galleryMainLabelImage.src = collection.labelImage;
        galleryMainLabelImage.alt = collection.labelAlt;
        galleryMainLabelImage.hidden = false;
      } else {
        galleryMainLabelImage.hidden = true;
      }
    }

    if (galleryMainLabelText) {
      if (collection.placeholderText) {
        galleryMainLabelText.textContent = `${collection.placeholderText}\n${activeGalleryIndex + 1} / ${totalItems}`;
        galleryMainLabelText.hidden = false;
      } else {
        galleryMainLabelText.textContent = '';
        galleryMainLabelText.hidden = true;
      }
    }

    galleryButtons.forEach((button) => {
      button.classList.toggle('active', button.dataset.filter === activeGalleryFilter);
    });

    renderGalleryProgress(galleryProgress, totalItems, activeGalleryIndex, (index) => {
      activeGalleryIndex = index;
      updateGalleryDisplay();
    });

    renderGalleryProgress(galleryLightboxProgress, totalItems, activeGalleryIndex, (index) => {
      activeGalleryIndex = index;
      updateGalleryDisplay();
      if (galleryLightbox?.classList.contains('active') && galleryLightboxImage) {
        const selectedItem = collection.items[activeGalleryIndex];
        galleryLightboxImage.src = selectedItem.fullImage;
        galleryLightboxImage.alt = selectedItem.lightboxAlt;
      }
    });
  };

  if (galleryButtons.length) {
    galleryButtons.forEach((button) => {
      button.addEventListener('click', () => {
        activeGalleryFilter = button.dataset.filter;
        activeGalleryIndex = 1;
        updateGalleryDisplay();
      });
    });

    const activeGalleryButton = document.querySelector('.gallery-filter button.active');
    activeGalleryFilter = activeGalleryButton?.dataset.filter || 'lobby';
    updateGalleryDisplay();
  }

  const closeGalleryLightbox = () => {
    if (!galleryLightbox) {
      return;
    }

    galleryLightbox.classList.remove('active');
    galleryLightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('gallery-lightbox-open');
    if (galleryLightboxImage) {
      galleryLightboxImage.src = '';
      galleryLightboxImage.alt = '';
    }
  };

  if (galleryTriggers.length && galleryLightbox && galleryLightboxImage) {
    galleryTriggers.forEach((trigger) => {
      const openGalleryLightbox = () => {
        const collection = galleryCollections[activeGalleryFilter] || galleryCollections.lobby;
        const currentItem = collection.items[activeGalleryIndex];
        const fullImage = trigger.dataset.galleryFull || currentItem.fullImage || trigger.getAttribute('src');
        const imageLabel = currentItem.lightboxAlt || trigger.getAttribute('aria-label') || trigger.getAttribute('alt') || 'Gallery image';

        if (!fullImage) {
          return;
        }

        galleryLightboxImage.src = fullImage;
        galleryLightboxImage.alt = imageLabel;
        galleryLightbox.classList.add('active');
        galleryLightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('gallery-lightbox-open');
      };

      trigger.addEventListener('click', openGalleryLightbox);
      trigger.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openGalleryLightbox();
        }
      });
    });
  }

  if (galleryLightboxClose) {
    galleryLightboxClose.addEventListener('click', closeGalleryLightbox);
  }

  if (galleryLightboxPrev) {
    galleryLightboxPrev.addEventListener('click', () => {
      const collection = galleryCollections[activeGalleryFilter] || galleryCollections.lobby;
      activeGalleryIndex = (activeGalleryIndex - 1 + collection.items.length) % collection.items.length;
      updateGalleryDisplay();
      if (galleryLightboxImage) {
        galleryLightboxImage.src = collection.items[activeGalleryIndex].fullImage;
        galleryLightboxImage.alt = collection.items[activeGalleryIndex].lightboxAlt;
      }
    });
  }

  if (galleryLightboxNext) {
    galleryLightboxNext.addEventListener('click', () => {
      const collection = galleryCollections[activeGalleryFilter] || galleryCollections.lobby;
      activeGalleryIndex = (activeGalleryIndex + 1) % collection.items.length;
      updateGalleryDisplay();
      if (galleryLightboxImage) {
        galleryLightboxImage.src = collection.items[activeGalleryIndex].fullImage;
        galleryLightboxImage.alt = collection.items[activeGalleryIndex].lightboxAlt;
      }
    });
  }

  if (galleryLightbox) {
    galleryLightbox.addEventListener('click', (event) => {
      if (event.target === galleryLightbox) {
        closeGalleryLightbox();
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && videoSection?.classList.contains('is-playing')) {
      closeInlineVideo();
      return;
    }

    if (event.key === 'Escape' && galleryLightbox?.classList.contains('active')) {
      closeGalleryLightbox();
    }
  });

});

  /* ==================================
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
      fpLightboxImage.alt = fpImages[activeFpIndex].alt || 'Floor Plan';
      if (fpLightboxProgress) {
        fpLightboxProgress.textContent = (activeFpIndex + 1) + ' / ' + fpImages.length;
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

    if (fpLightboxClose) {
      fpLightboxClose.addEventListener('click', closeFpLightbox);
    }

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
        if (event.target === fpLightbox) {
          closeFpLightbox();
        }
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

  /* ============================================================
     REGISTER INTEREST POPUP — shows after 7s on home page
     ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    var overlay = document.getElementById('regPopupOverlay');
    if (!overlay) return;

    // Don't show if user already dismissed this session
    if (sessionStorage.getItem('regPopupDismissed')) return;

    function openPopup() {
      overlay.classList.add('active');
      document.addEventListener('keydown', onKey);
    }

    function closePopup() {
      overlay.classList.remove('active');
      sessionStorage.setItem('regPopupDismissed', '1');
      document.removeEventListener('keydown', onKey);
    }

    function onKey(e) {
      if (e.key === 'Escape') closePopup();
    }

    // Close button
    var closeBtn = document.getElementById('regPopupClose');
    if (closeBtn) closeBtn.addEventListener('click', closePopup);

    // Click outside the popup card closes it
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closePopup();
    });

    // Handle form submission
    var form = document.getElementById('regPopupForm');
    var statusEl = document.getElementById('regPopupStatus');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var name    = (form.querySelector('[name="name"]') || {}).value || '';
        var email   = (form.querySelector('[name="email"]') || {}).value || '';
        var phone   = (form.querySelector('[name="phone"]') || {}).value || '';
        var message = '';

        fetch('/api/register-interest', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name, email: email, phone: phone, message: message })
        })
          .then(function (r) { return r.json(); })
          .then(function (data) {
            if (statusEl) statusEl.textContent = data.message || 'Thank you!';
            form.reset();
            setTimeout(closePopup, 2000);
          })
          .catch(function () {
            if (statusEl) statusEl.textContent = 'Something went wrong. Please try again.';
          });
      });
    }

    // Trigger after 7 seconds
    setTimeout(openPopup, 7000);
  });

