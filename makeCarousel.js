const fs = require('fs');
const top = fs.readFileSync('script_top.js', 'utf8');

const newLogic = /* POPUP LOGIC */
document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('registerPopup');
  const closePopup = document.getElementById('closePopup');
  const enquireBtns = document.querySelectorAll('.nav-enquire, a[href="#register"]');
  
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

  /* DYNAMIC CAROUSEL RENDERER */
  const allPlans = [
    "1BED TYP 1.jpg", "2 BED TYP 1.jpg", "2 BED TYP 2.jpg",
    "3 BED TYP 1.jpg", "3 BED TYP 2.jpg", "3 BED TYP 3.jpg",
    "3 BED TYP 4.jpg", "3 BED TYP 4A.jpg", "4 BED DUPL TYP 1 LOW.jpg",
    "4 BED DUPL TYP 1 UPP.jpg", "4 BED DUPL TYP 2 LOW.jpg",
    "4 BED DUPL TYP 2 UPP.jpg", "4 BED TYP 1.jpg"
  ];
  
  const carouselContainer = document.getElementById('planCarousel');
  let currentSlide = 0;
  
  if (carouselContainer) {
    allPlans.forEach((planName, index) => {
      let displayName = planName.replace('.jpg', '').replace(/TYP/g, 'TYPE').replace(/DUPL/g, 'DUPLEX');
      let encodedName = encodeURIComponent(planName);
      
      let infoSubtext = "Size: 156 sqm"; // Placeholder logic from design
      let titleName = "UNIT " + (index + 1);
      let bedroomCount = displayName.includes("1BED") || displayName.includes("1 BED") ? "1 bedroom" :
                         displayName.includes("2 BED") ? "2 bedroom" :
                         displayName.includes("3 BED") ? "3 bedroom" :
                         displayName.includes("4 BED") ? "4 bedroom" : "Various";
                         
      let levelText = displayName.includes("UPP") ? "Upper Level" : 
                      displayName.includes("LOW") ? "Lower Level" : "Level Typical";
      
      let html = \
        <div class="plan-slide \" data-index="\">
          <div class="plan-info-box">
            <h3 class="plan-title">\</h3>
            <p class="plan-desc">\ - \<br>Size: \</p>
            <a class="plan-dl-btn" href="assets/plans/\" target="_blank" download>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-right:12px; vertical-align:middle;">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3"></path>
              </svg> 
              DOWNLOAD FLOOR PLAN
            </a>
          </div>
          <div class="plan-img-box">
            <img src="assets/plans/\" alt="\" loading="lazy" />
          </div>
        </div>
      \;
      carouselContainer.insertAdjacentHTML('beforeend', html);
    });

    const slides = document.querySelectorAll('.plan-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    function updateSlide(newIndex) {
      if (slides.length === 0) return;
      slides[currentSlide].classList.remove('active');
      currentSlide = (newIndex + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
    }

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => updateSlide(currentSlide - 1));
      nextBtn.addEventListener('click', () => updateSlide(currentSlide + 1));
    }
  }
});


fs.writeFileSync('script.js', top + newLogic);
