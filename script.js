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
const mapFocusLabel = document.getElementById('mapFocusLabel');
const tabs = document.querySelectorAll('.tab');
const mapTargets = {
  sharjah: {
    copy: '10 mins to Sharjah City Center',
    label: 'Sharjah City Center',
    x: 59,
    y: 65
  },
  alzorah: {
    copy: '13 mins to Al Zorah',
    label: 'Al Zorah',
    x: 81,
    y: 35
  },
  ajman: {
    copy: '15 mins to Ajman Beach',
    label: 'Ajman Beach',
    x: 57,
    y: 34
  },
  dubai: {
    copy: '30 mins to Dubai Airport',
    label: 'Dubai Airport',
    x: 47,
    y: 86
  }
};

const isArabicPage =
  document.documentElement.lang === 'ar' ||
  document.documentElement.dir === 'rtl' ||
  /index-ar\.html$/i.test(window.location.pathname);

if (isArabicPage) {
  mapTargets.sharjah.copy = '10 دقائق من مركز مدينة الشارقة';
  mapTargets.sharjah.label = 'مركز مدينة الشارقة';
  mapTargets.alzorah.copy = '13 دقيقة من الزوراء';
  mapTargets.alzorah.label = 'الزوراء';
  mapTargets.ajman.copy = '15 دقيقة من شاطئ عجمان';
  mapTargets.ajman.label = 'شاطئ عجمان';
  mapTargets.dubai.copy = '30 دقيقة من مطار دبي';
  mapTargets.dubai.label = 'مطار دبي';
}

function activateMapTarget(targetKey) {
  const selectedTarget = mapTargets[targetKey] || mapTargets.sharjah;

  tabs.forEach((item) => {
    const isActive = item.dataset.map === targetKey;
    item.classList.toggle('active', isActive);
    item.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  if (mapCopy) {
    mapCopy.textContent = selectedTarget.copy;
  }

  if (mapBox) {
    mapBox.style.setProperty('--focus-x', `${selectedTarget.x}%`);
    mapBox.style.setProperty('--focus-y', `${selectedTarget.y}%`);
    mapBox.setAttribute('data-active-map', targetKey);
  }

  if (mapFocusLabel) {
    mapFocusLabel.textContent = selectedTarget.label;
  }

  if (mapImage) {
    mapImage.src = 'assets/psd-export/192-vector-smart-object-3.png';
  }
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    activateMapTarget(tab.dataset.map);
  });
});

const initiallyActiveTab = document.querySelector('.tab.active');
if (initiallyActiveTab) {
  activateMapTarget(initiallyActiveTab.dataset.map);
}


let plans = [];
let planIndex = 0;
const planImage = document.getElementById('planImage');
const planTitle = document.getElementById('planTitle');
const planSubtitle = document.getElementById('planSubtitle');
const planStats = document.getElementById('planStats');
const planProgress = document.getElementById('planProgress');
const planDownloadLink = document.querySelector('.plan-dl-row');

function localizePlanText(value) {
  if (!isArabicPage || typeof value !== 'string') {
    return value;
  }

  return value
    .replaceAll('ONE BED APARTMENT', 'شقة بغرفة نوم واحدة')
    .replaceAll('TWO BED APARTMENT', 'شقة بغرفتي نوم')
    .replaceAll('THREE BED APARTMENT', 'شقة بثلاث غرف نوم')
    .replaceAll('FOUR BED APARTMENT', 'شقة بأربع غرف نوم')
    .replaceAll('4 BED DUPLEX TYPE 1', 'دوبلكس 4 غرف نوم - النوع 1')
    .replaceAll('4 BED DUPLEX TYPE 2', 'دوبلكس 4 غرف نوم - النوع 2')
    .replaceAll('LOWER FLOOR', 'الطابق السفلي')
    .replaceAll('UPPER FLOOR', 'الطابق العلوي')
    .replaceAll('BED TYPE', 'نوع')
    .replaceAll('Unit Area (NSA)', 'مساحة الوحدة (NSA)')
    .replaceAll('Balcony/Terrace Area', 'مساحة الشرفة/التراس')
    .replaceAll('Total Area (GSA)', 'المساحة الإجمالية (GSA)')
    .replaceAll('SQM', 'متر مربع');
}

function updatePlanUI() {
  if (!plans.length) return;
  const p = plans[planIndex];
  const localizedTitle = localizePlanText(p.title || '');
  const localizedSubtitle = localizePlanText(p.subtitle || '');
  const localizedStats = Array.isArray(p.stats) ? p.stats.map(localizePlanText) : [];

  if (planImage) {
    planImage.src = p.image;
    planImage.alt = [localizedTitle, localizedSubtitle].filter(Boolean).join(' · ') || (isArabicPage ? 'مخطط طابق' : 'Floor plan');
  }
  
  if (planTitle) planTitle.textContent = localizedTitle || (isArabicPage ? 'مخطط الطابق' : 'FLOOR PLAN');
  if (planSubtitle) {
    if (localizedSubtitle) {
      planSubtitle.textContent = localizedSubtitle;
      planSubtitle.hidden = false;
    } else {
      planSubtitle.hidden = true;
    }
  }
  if (planStats) {
    planStats.innerHTML = localizedStats.map(s => `<p>${s}</p>`).join('');
  }
  if (planProgress) {
    planProgress.textContent = `${planIndex + 1} / ${plans.length}`;
  }
  if (planDownloadLink) {
    planDownloadLink.href = p.image;
    planDownloadLink.setAttribute('download', p.image.split('/').pop() || 'floor-plan.jpg');
    if (isArabicPage) {
      planDownloadLink.setAttribute('aria-label', `تحميل مخطط ${[localizedTitle, localizedSubtitle].filter(Boolean).join(' ')}`);
    } else {
      planDownloadLink.setAttribute('aria-label', `Download ${[p.title, p.subtitle].filter(Boolean).join(' ')} floor plan`);
    }
  }
}

if (planImage) {
  // Load plans from server then initialise
  fetch('/api/plans')
    .then(r => r.json())
    .then(data => {
      plans = Array.isArray(data) ? data : [];
      updatePlanUI();
    })
    .catch(() => {});

  document.getElementById('planPrev')?.addEventListener('click', () => {
    planIndex = (planIndex - 1 + plans.length) % plans.length;
    updatePlanUI();
  });

  document.getElementById('planNext')?.addEventListener('click', () => {
    planIndex = (planIndex + 1) % plans.length;
    updatePlanUI();
  });

  // Reposition planPrev for mobile
  function adjustPlanPrevPosition() {
    const prev = document.getElementById('planPrev');
    const right = document.querySelector('.plan-right');
    const left = document.querySelector('.plan-left');
    if (prev && right && left) {
      if (window.innerWidth <= 767) {
        if (prev.parentNode !== right) {
          right.appendChild(prev);
        }
      } else {
        if (prev.parentNode !== left) {
          left.insertBefore(prev, left.firstChild);
        }
      }
    }
  }
  window.addEventListener('resize', adjustPlanPrevPosition);
  adjustPlanPrevPosition();

  // Scroll functionality on the viewer
  const planViewer = document.querySelector('.plan-viewer');
  if (planViewer) {
    let scrollTimeout;
    let planWheelEnabled = false;
    let planWheelEnableTimer = null;

    const planSection = document.getElementById('plans');
    if (planSection) {
      const planSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Section entered viewport — enable wheel after 3 seconds
            planWheelEnableTimer = setTimeout(() => {
              planWheelEnabled = true;
            }, 3000);
          } else {
            // Section left viewport — disable and cancel pending activation
            planWheelEnabled = false;
            if (planWheelEnableTimer) {
              clearTimeout(planWheelEnableTimer);
              planWheelEnableTimer = null;
            }
          }
        });
      }, { threshold: 0.3 });
      planSectionObserver.observe(planSection);
    }

    planViewer.addEventListener('wheel', (e) => {
      if (!planWheelEnabled) return; // Not yet activated — let page scroll normally
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

  // Block ALL wheel/trackpad scroll on document when any lightbox is open
  // This prevents browser back/forward navigation on horizontal swipe
  document.addEventListener('wheel', (e) => {
    if (document.body.classList.contains('gallery-lightbox-open')) {
      e.preventDefault();
    }
  }, { passive: false, capture: true });

  if (lbWrap) {
    lbWrap.addEventListener('wheel', (e) => {
      if (!lbWrap.classList.contains('active')) return;

      // Always block page scroll / browser back-forward navigation when lightbox is open
      e.preventDefault();
      e.stopPropagation();

      const horizontalDelta = Math.abs(e.deltaX);
      const verticalDelta = Math.abs(e.deltaY);

      if (horizontalDelta < LIGHTBOX_WHEEL_DELTA_THRESHOLD || horizontalDelta < verticalDelta) return;

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

// Visual Tour Modal Functionality
const tourPlayBtn = document.getElementById('tourPlayBtn');
const tourSecondaryBtn = document.getElementById('tourSecondaryBtn');
const tourModal = document.getElementById('tourModal');
const tourModalOverlay = document.getElementById('tourModalOverlay');
const tourModalClose = document.getElementById('tourModalClose');

function openTourModal() {
  if (tourModal) {
    tourModal.setAttribute('aria-hidden', 'false');
    tourModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
}

function closeTourModal() {
  if (tourModal) {
    tourModal.setAttribute('aria-hidden', 'true');
    tourModal.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}

if (tourPlayBtn) {
  tourPlayBtn.addEventListener('click', openTourModal);
}

if (tourSecondaryBtn) {
  tourSecondaryBtn.addEventListener('click', openTourModal);
}

if (tourModalClose) {
  tourModalClose.addEventListener('click', closeTourModal);
}

if (tourModalOverlay) {
  tourModalOverlay.addEventListener('click', closeTourModal);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && tourModal?.classList.contains('is-open')) {
    closeTourModal();
  }
});

const philosophyCenterText = document.getElementById('philCenterText');
const philosophyNodes = document.querySelectorAll('.phil-node');
const philosophyStage = document.querySelector('.philosophy-stage');
const philosophySection = document.querySelector('.philosophy');

if (philosophyCenterText && philosophyNodes.length) {
  const philosophyCopy = isArabicPage
    ? {
        default: 'هوية حضرية مميزة تتجلى في تكوين معماري لأبراج أنيقة تجعل سواري وجهة بارزة متعددة الاستخدامات.',
        concept: 'أيديولوجية المفهوم: رؤية متكاملة لمجتمع عصري يوازن بين الراحة، الهوية المعمارية، والاتصال الحضري.',
        iconic: 'هوية حضرية مميزة: تصميم معماري يرسخ حضور سواري كمعلم بصري واضح ضمن مشهد المدينة.',
        central: 'منطقة سنترال بوينت: موقع محوري يربط السكن بالخدمات اليومية والمراكز الحيوية بسهولة.',
        premium: 'مواد فاخرة: تشطيبات مختارة بعناية تجمع بين الجودة العالية والاستدامة طويلة المدى.',
        human: 'تنقل يركز على الإنسان: حركة سلسة ومسارات مريحة تعزز تجربة السكان والزوار يومياً.',
        lifestyle: 'تكامل أنماط الحياة: مزج متناغم بين السكن والترفيه والرفاهية في بيئة واحدة.',
        community: 'حياة تتمحور حول المجتمع: مساحات مشتركة تعزز التفاعل وروح الانتماء بين السكان.',
        luxury: 'الفخامة مع الاستدامة: جودة معيشية راقية مدعومة بحلول مسؤولة وفعالة للمستقبل.'
      }
    : {
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
  let philModalLastFocus = null;

  const closePhilosophyMobileModal = () => {
    const modal = document.getElementById('philMobileModal');
    if (!modal) {
      return;
    }

    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement && modal.contains(activeElement)) {
      if (philModalLastFocus instanceof HTMLElement) {
        philModalLastFocus.focus();
      } else {
        activeElement.blur();
      }
    }

    modal.classList.remove('is-open');
    modal.inert = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('phil-modal-open');
    document.body.style.overflow = '';
  };

  const openPhilosophyMobileModal = (topicKey) => {
    if (window.innerWidth > 767) {
      return;
    }

    let modal = document.getElementById('philMobileModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'philMobileModal';
      modal.className = 'phil-mobile-modal';
      modal.setAttribute('aria-hidden', 'true');
      modal.inert = true;
      modal.innerHTML = `
        <button class="phil-mobile-modal-close" type="button" aria-label="Close">&times;</button>
        <div class="phil-mobile-modal-stage">
          <img class="phil-mobile-wheel" src="assets/psd-export/088-vector-smart-object-2.png" alt="" />
          <img class="phil-mobile-wheel phil-mobile-wheel-inner" src="assets/psd-export/088-vector-smart-object-2.png" alt="" />
          <div class="phil-mobile-modal-text"></div>
        </div>
      `;
      document.body.appendChild(modal);

      const closeBtn = modal.querySelector('.phil-mobile-modal-close');
      closeBtn?.addEventListener('click', closePhilosophyMobileModal);

      modal.addEventListener('click', (event) => {
        if (event.target === modal) {
          closePhilosophyMobileModal();
        }
      });
    }

    const nextTopic = philosophyCopy[topicKey] ? topicKey : 'default';
    const textHolder = modal.querySelector('.phil-mobile-modal-text');
    const closeBtn = modal.querySelector('.phil-mobile-modal-close');

    philModalLastFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    if (textHolder) {
      textHolder.textContent = philosophyCopy[nextTopic];
    }

    modal.classList.add('is-open');
    modal.inert = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('phil-modal-open');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  };

  const setPhilosophyTopic = (topic) => {
    const nextTopic = philosophyCopy[topic] ? topic : 'default';
    if (currentPhilosophyTopic !== nextTopic) {
      if (window.innerWidth <= 767) {
        philosophyCenterText.innerHTML = `
          <div class="phil-text-content">${philosophyCopy[nextTopic]}</div>
          <button class="phil-read-more" type="button">${isArabicPage ? 'اقرأ المزيد' : 'Read More'}</button>
        `;
        const expandBtn = philosophyCenterText.querySelector('.phil-read-more');
        expandBtn?.addEventListener('click', () => {
          openPhilosophyMobileModal(nextTopic);
        });
      } else {
        philosophyCenterText.textContent = philosophyCopy[nextTopic];
      }

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

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.classList.contains('phil-modal-open')) {
      closePhilosophyMobileModal();
    }
  });

  if (philosophySection) {
    philosophySection.addEventListener('click', (event) => {
      if (window.innerWidth <= 767) {
        const readMoreBtn = event.target.closest('.phil-read-more');
        if (readMoreBtn) {
          event.preventDefault();
        }
      }
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
  const header = document.querySelector('.site-header');
  const languageToggleButton = document.querySelector('.nav-lang');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const primaryNav = document.getElementById('primaryNav');
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
  const menuOpenLabel = isArabicPage ? 'فتح القائمة' : 'Open menu';
  const menuCloseLabel = isArabicPage ? 'إغلاق القائمة' : 'Close menu';

  if (languageToggleButton) {
    languageToggleButton.addEventListener('click', () => {
      const isArabic =
        document.documentElement.lang === 'ar' ||
        document.documentElement.dir === 'rtl' ||
        /index-ar\.html$/i.test(window.location.pathname);
      const isFloorPlansPage = /floor-plans(?:-ar)?\.html$/i.test(window.location.pathname);
      const targetPath = isFloorPlansPage
        ? (isArabic ? 'floor-plans.html' : 'floor-plans-ar.html')
        : (isArabic ? 'index.html' : 'index-ar.html');
      window.location.href = targetPath;
    });
  }

  const closeMobileMenu = () => {
    if (!header || !mobileMenuToggle) {
      return;
    }

    header.classList.remove('menu-open');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileMenuToggle.setAttribute('aria-label', menuOpenLabel);
  };

  if (mobileMenuToggle && header) {
    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('menu-open');
      mobileMenuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileMenuToggle.setAttribute('aria-label', isOpen ? menuCloseLabel : menuOpenLabel);
    });

    primaryNav?.querySelectorAll('a, button').forEach((element) => {
      element.addEventListener('click', () => {
        if (window.innerWidth <= 767) {
          closeMobileMenu();
        }
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 767) {
        closeMobileMenu();
      }
    });

    document.addEventListener('click', (event) => {
      if (!header.classList.contains('menu-open')) {
        return;
      }

      if (window.innerWidth > 767) {
        closeMobileMenu();
        return;
      }

      const target = event.target;
      if (target instanceof Node && !header.contains(target)) {
        closeMobileMenu();
      }
    });
  }

  let galleryCollections = {
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

  const galleryCollectionsDataNode = document.getElementById('galleryCollectionsData');
  if (galleryCollectionsDataNode) {
    try {
      const parsed = JSON.parse(galleryCollectionsDataNode.textContent || '{}');
      if (parsed && typeof parsed === 'object') {
        galleryCollections = parsed;
      }
    } catch {
      // Keep default gallery collections when JSON is malformed.
    }
  }

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

  let videoInlineLastFocus = null;

  if (videoInlinePlayer) {
    videoInlinePlayer.inert = videoInlinePlayer.getAttribute('aria-hidden') !== 'false';
  }

  const closeInlineVideo = () => {
    if (!videoSection || !videoInlinePlayer) {
      return;
    }

    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement && videoInlinePlayer.contains(activeElement)) {
      const fallbackFocus =
        videoInlineLastFocus instanceof HTMLElement && document.contains(videoInlineLastFocus)
          ? videoInlineLastFocus
          : videoPlayButton instanceof HTMLElement && document.contains(videoPlayButton)
            ? videoPlayButton
            : null;

      if (fallbackFocus) {
        fallbackFocus.focus();
      } else {
        activeElement.blur();
      }
    }

    videoSection.classList.remove('is-playing');
    videoInlinePlayer.inert = true;
    videoInlinePlayer.setAttribute('aria-hidden', 'true');

    if (videoInlineFrame) {
      videoInlineFrame.src = '';
    }

    videoInlineLastFocus = null;
  };

  if (videoPlayButton && videoSection && videoInlinePlayer && videoInlineFrame) {
    videoPlayButton.addEventListener('click', () => {
      const baseEmbed = videoPlayButton.dataset.videoEmbed;

      if (!baseEmbed) {
        return;
      }

      videoInlineLastFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      const autoplayUrl = `${baseEmbed}${baseEmbed.includes('?') ? '&' : '?'}autoplay=1&rel=0`;
      videoInlineFrame.src = autoplayUrl;
      videoSection.classList.add('is-playing');
      videoInlinePlayer.inert = false;
      videoInlinePlayer.setAttribute('aria-hidden', 'false');
      videoInlineClose?.focus();
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
    if (isArabicPage) {
      const fpTitle = document.querySelector('.fp-title');
      const fpSubtitle = document.querySelector('.fp-subtitle');
      if (fpTitle) fpTitle.textContent = 'مخططات الطوابق';
      if (fpSubtitle) fpSubtitle.textContent = 'مساحات مصممة بعناية لتجمع بين الطابع العملي والأناقة';

      document.querySelectorAll('.fp-header-block h2').forEach((el) => {
        el.textContent = localizePlanText(el.textContent.trim());
      });

      document.querySelectorAll('.fp-subtitle-type').forEach((el) => {
        el.textContent = localizePlanText(el.textContent.trim());
      });

      document.querySelectorAll('.fp-stats p').forEach((el) => {
        el.textContent = localizePlanText(el.textContent.trim());
      });

      document.querySelectorAll('.fp-keyplan h3').forEach((el) => {
        el.textContent = 'المخطط الرئيسي';
      });

      document.querySelectorAll('.fp-download span').forEach((el) => {
        el.textContent = 'تحميل مخطط الطابق';
      });
    }

    // Wire each download button to its floor plan image
    document.querySelectorAll('.fp-item').forEach(item => {
      const img = item.querySelector('.fp-image > img:not(.fp-zoom-icon)');
      const dlBtn = item.querySelector('.fp-download');
      if (img && dlBtn) {
        const filename = img.src.split('/').pop() || 'floor-plan.jpg';
        dlBtn.href = img.src;
        dlBtn.setAttribute('download', filename);
        dlBtn.setAttribute('aria-label', isArabicPage ? `تحميل ${img.alt || 'مخطط الطابق'}` : `Download ${img.alt || 'floor plan'}`);
      }
    });

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
      // Populate info panel from the matching fp-item
      const item = document.querySelectorAll('.fp-item')[activeFpIndex];
      if (item) {
        const titleEl = document.getElementById('fpLbTitle');
        const subtitleEl = document.getElementById('fpLbSubtitle');
        const statsEl = document.getElementById('fpLbStats');
        const keyplanEl = document.getElementById('fpLbKeyplan');
        if (titleEl) titleEl.textContent = item.querySelector('h2')?.textContent || '';
        if (subtitleEl) {
          const sub = item.querySelector('.fp-subtitle-type');
          subtitleEl.textContent = sub ? sub.textContent : '';
          subtitleEl.style.display = sub ? '' : 'none';
        }
        if (statsEl) {
          statsEl.innerHTML = '';
          item.querySelectorAll('.fp-stats p').forEach(p => statsEl.appendChild(p.cloneNode(true)));
        }
        if (keyplanEl) {
          keyplanEl.innerHTML = '';
          item.querySelectorAll('.fp-keyplan p').forEach(p => keyplanEl.appendChild(p.cloneNode(true)));
        }
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

