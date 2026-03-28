const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  { threshold: 0.15 }
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
  { image: 'assets/plans/1BED TYP 1.jpg' },
  { image: 'assets/plans/2 BED TYP 1.jpg' },
  { image: 'assets/plans/2 BED TYP 2.jpg' },
  { image: 'assets/plans/3 BED TYP 1.jpg' },
  { image: 'assets/plans/3 BED TYP 2.jpg' },
  { image: 'assets/plans/3 BED TYP 3.jpg' },
  { image: 'assets/plans/3 BED TYP 4.jpg' },
  { image: 'assets/plans/3 BED TYP 4A.jpg' },
  { image: 'assets/plans/4 BED DUPL TYP 1 LOW.jpg' },
  { image: 'assets/plans/4 BED DUPL TYP 1 UPP.jpg' },
  { image: 'assets/plans/4 BED DUPL TYP 2 LOW.jpg' },
  { image: 'assets/plans/4 BED DUPL TYP 2 UPP.jpg' },
  { image: 'assets/plans/4 BED TYP 1.jpg' }
];

let planIndex = 0;
const planImage = document.getElementById('planImage');

if (planImage) {
  document.getElementById('planPrev').addEventListener('click', () => {
    planIndex = (planIndex - 1 + plans.length) % plans.length;
    planImage.src = plans[planIndex].image;
  });

  document.getElementById('planNext').addEventListener('click', () => {
    planIndex = (planIndex + 1) % plans.length;
    planImage.src = plans[planIndex].image;
  });
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
const thumbs = document.querySelectorAll('#tourThumbs img');
thumbs.forEach((thumb) => {
  thumb.addEventListener('click', () => {
    thumbs.forEach((img) => img.classList.remove('active'));
    thumb.classList.add('active');
    const tourImage = thumb.getAttribute('data-main') || thumb.getAttribute('src');
    mainTour.src = tourImage;
  });
});

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
    if (event.key === 'Escape' && galleryLightbox?.classList.contains('active')) {
      closeGalleryLightbox();
    }
  });

  const allPlans = [
    String.fromCharCode(49,66,69,68,32,84,89,80,32,49,46,106,112,103), String.fromCharCode(50,32,66,69,68,32,84,89,80,32,49,46,106,112,103), String.fromCharCode(50,32,66,69,68,32,84,89,80,32,50,46,106,112,103),
    String.fromCharCode(51,32,66,69,68,32,84,89,80,32,49,46,106,112,103), String.fromCharCode(51,32,66,69,68,32,84,89,80,32,50,46,106,112,103), String.fromCharCode(51,32,66,69,68,32,84,89,80,32,51,46,106,112,103),
    String.fromCharCode(51,32,66,69,68,32,84,89,80,32,52,46,106,112,103), String.fromCharCode(51,32,66,69,68,32,84,89,80,32,52,65,46,106,112,103), String.fromCharCode(52,32,66,69,68,32,68,85,80,76,32,84,89,80,32,49,32,76,79,87,46,106,112,103),
    String.fromCharCode(52,32,66,69,68,32,68,85,80,76,32,84,89,80,32,49,32,85,80,80,46,106,112,103), String.fromCharCode(52,32,66,69,68,32,68,85,80,76,32,84,89,80,32,50,32,76,79,87,46,106,112,103),
    String.fromCharCode(52,32,66,69,68,32,68,85,80,76,32,84,89,80,32,50,32,85,80,80,46,106,112,103), String.fromCharCode(52,32,66,69,68,32,84,89,80,32,49,46,106,112,103)
  ];
  const grid = document.querySelector('.plan-grid');
  if (grid) {
    allPlans.forEach(planName => {
      let displayName = planName.replace('.jpg', '').replace(/TYP/g, 'TYPE').replace(/DUPL/g, 'DUPLEX');
      let encodedName = encodeURIComponent(planName);
      
      let html = String.fromCharCode(60,100,105,118,32,99,108,97,115,115,61,34,112,108,97,110,45,105,116,101,109,34,62,60,100,105,118,32,99,108,97,115,115,61,34,112,108,97,110,45,105,109,103,45,119,114,97,112,34,62,60,105,109,103,32,115,114,99,61,34,97,115,115,101,116,115,47,112,108,97,110,115,47) + encodedName + String.fromCharCode(34,32,97,108,116,61,34) + displayName + String.fromCharCode(34,32,108,111,97,100,105,110,103,61,34,108,97,122,121,34,32,47,62,60,47,100,105,118,62,60,100,105,118,32,99,108,97,115,115,61,34,112,108,97,110,45,105,110,102,111,34,62,60,100,105,118,32,99,108,97,115,115,61,34,112,108,97,110,45,110,97,109,101,34,62) + displayName + String.fromCharCode(60,47,100,105,118,62,60,97,32,99,108,97,115,115,61,34,112,108,97,110,45,100,108,45,98,116,110,34,32,104,114,101,102,61,34,97,115,115,101,116,115,47,112,108,97,110,115,47) + encodedName + String.fromCharCode(34,32,116,97,114,103,101,116,61,34,95,98,108,97,110,107,34,32,100,111,119,110,108,111,97,100,62,38,35,120,50,49,57,51,59,32,68,79,87,78,76,79,65,68,32,70,76,79,79,82,32,80,76,65,78,60,47,97,62,60,47,100,105,118,62,60,47,100,105,118,62);
      grid.insertAdjacentHTML('beforeend', html);
    });
  }
});
