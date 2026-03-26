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
  { image: 'assets/psd-export/165-1bed-typ-1-1.png' }
];

let planIndex = 0;
const planImage = document.getElementById('planImage');

document.getElementById('planPrev').addEventListener('click', () => {
  planIndex = (planIndex - 1 + plans.length) % plans.length;
  planImage.src = plans[planIndex].image;
});

document.getElementById('planNext').addEventListener('click', () => {
  planIndex = (planIndex + 1) % plans.length;
  planImage.src = plans[planIndex].image;
});

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  item.addEventListener('click', () => {
    const answer = item.nextElementSibling;
    const isOpen = answer.classList.contains('open');

    document.querySelectorAll('.faq-answer').forEach((el) => el.classList.remove('open'));
    document.querySelectorAll('.faq-item b').forEach((icon) => {
      icon.textContent = '+';
    });

    if (!isOpen) {
      answer.classList.add('open');
      item.querySelector('b').textContent = '-';
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
