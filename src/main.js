document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.site-header');
  const logoTop = document.querySelector('.logo-block-top');
  const logoBottom = document.querySelector('.logo-block-bottom');
  let isScrolled = false;

  // Set initial state for both logo blocks
  logoTop.style.display = 'flex';
  logoBottom.style.display = 'none';

  window.addEventListener('scroll', function () {
    if (window.scrollY > 20 && !isScrolled) {
      header.classList.add('scrolled');
      logoTop.style.display = 'none';
      logoBottom.style.display = 'flex';
      isScrolled = true;
    } else if (window.scrollY <= 20 && isScrolled) {
      header.classList.remove('scrolled');
      logoTop.style.display = 'flex';
      logoBottom.style.display = 'none';
      isScrolled = false;
    }
  });

  // Vibrant animation for social icons on hover
  document.querySelectorAll('.social-icons a').forEach(function(icon) {
    icon.addEventListener('mouseenter', function() {
      anime({
        targets: icon,
        scale: [1, 1.25, 1],
        rotate: [0, 10, -10, 0],
        duration: 600,
        easing: 'easeOutElastic(1, .6)',
      });
    });
  });

  // Unique anime.js animation for hero button on hover
  var heroBtn = document.querySelector('.hero-btn');
  if (heroBtn) {
    heroBtn.addEventListener('mouseenter', function() {
      anime({
        targets: heroBtn,
        scale: [1, 1.12, 0.98, 1.08, 1],
        translateY: [0, -6, 0],
        boxShadow: [
          '0 2px 8px rgba(254,93,38,0.08)',
          '0 8px 24px rgba(254,93,38,0.25)',
          '0 2px 8px rgba(254,93,38,0.08)'
        ],
        duration: 700,
        easing: 'easeOutElastic(1, .7)'
      });
    });
    heroBtn.addEventListener('mouseleave', function() {
      anime({
        targets: heroBtn,
        scale: 1,
        translateY: 0,
        boxShadow: '0 2px 8px rgba(254,93,38,0.08)',
        duration: 300,
        easing: 'easeOutQuad'
      });
    });
  }

  // --- Simple Carousel Implementation ---
  const carouselTrack = document.querySelector('.carousel-track');
  const carouselCards = document.querySelectorAll('.carousel-card');
  const leftArrow = document.querySelector('.carousel-arrow-left');
  const rightArrow = document.querySelector('.carousel-arrow-right');
  let carouselIndex = 0;

  function getVisibleCount() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 4;
  }

  function updateCarousel() {
    const visibleCount = getVisibleCount();
    // Loop index
    if (carouselIndex < 0) carouselIndex = carouselCards.length - visibleCount;
    if (carouselIndex > carouselCards.length - visibleCount) carouselIndex = 0;
    // Show only visible cards
    carouselCards.forEach((card, i) => {
      card.style.display = (i >= carouselIndex && i < carouselIndex + visibleCount) ? 'flex' : 'none';
    });
  }
  // Show all cards in the track (for flex layout)
  carouselCards.forEach(card => card.style.display = 'flex');

  if (leftArrow && rightArrow) {
    leftArrow.style.display = '';
    rightArrow.style.display = '';
    leftArrow.addEventListener('click', () => {
      carouselIndex--;
      updateCarousel();
    });
    rightArrow.addEventListener('click', () => {
      carouselIndex++;
      updateCarousel();
    });
    window.addEventListener('resize', updateCarousel);
    updateCarousel();
  }

  // Video Modal Functionality
  const openVideoModalBtn = document.getElementById('open-video-modal');
  const videoModal = document.getElementById('video-modal');
  const closeVideoModalBtn = document.getElementById('close-video-modal');
  const youtubePlayer = document.getElementById('youtube-player');

  if (openVideoModalBtn && videoModal && closeVideoModalBtn && youtubePlayer) {
    openVideoModalBtn.addEventListener('click', function () {
      videoModal.classList.add('active');
      youtubePlayer.src = 'https://www.youtube.com/embed/omak37uuTew?autoplay=1';
    });

    function closeModal() {
      videoModal.classList.remove('active');
      youtubePlayer.src = '';
    }

    closeVideoModalBtn.addEventListener('click', closeModal);
    videoModal.addEventListener('click', function (e) {
      if (e.target === videoModal) closeModal();
    });
  }

  // Project 1 Carousel Functionality
(function() {
  const images = Array.from(document.querySelectorAll('#project1-carousel .carousel-image'));
  const prevBtn = document.getElementById('carousel-prev-1');
  const nextBtn = document.getElementById('carousel-next-1');
  const modal = document.getElementById('carousel-modal-1');
  const closeModalBtn = document.getElementById('close-carousel-modal-1');
  const modalImages = Array.from(document.querySelectorAll('#carousel-modal-1 .carousel-modal-image'));
  const modalPrevBtn = document.getElementById('modal-carousel-prev-1');
  const modalNextBtn = document.getElementById('modal-carousel-next-1');
  let currentIndex = 0;

  function showImage(idx) {
    images.forEach((img, i) => img.classList.toggle('active', i === idx));
    modalImages.forEach((img, i) => img.classList.toggle('active', i === idx));
    currentIndex = idx;
  }

  prevBtn.addEventListener('click', () => {
    showImage((currentIndex - 1 + images.length) % images.length);
  });
  nextBtn.addEventListener('click', () => {
    showImage((currentIndex + 1) % images.length);
  });

  images.forEach((img, idx) => {
    img.addEventListener('click', () => {
      showImage(idx);
      modal.classList.add('active');
    });
  });

  closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });
  modalPrevBtn.addEventListener('click', () => {
    showImage((currentIndex - 1 + modalImages.length) % modalImages.length);
  });
  modalNextBtn.addEventListener('click', () => {
    showImage((currentIndex + 1) % modalImages.length);
  });

  // Close modal on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') {
      showImage((currentIndex - 1 + modalImages.length) % modalImages.length);
    } else if (e.key === 'ArrowRight') {
      showImage((currentIndex + 1) % modalImages.length);
    } else if (e.key === 'Escape') {
      modal.classList.remove('active');
    }
  });

  // Initialize
  showImage(0);
})();

// Award Image Fullscreen Modal Functionality
(function() {
  const awardImg = document.getElementById('award-image-1');
  const modal = document.getElementById('award-modal-1');
  const closeBtn = document.getElementById('close-award-modal-1');

  if (awardImg && modal && closeBtn) {
    awardImg.addEventListener('click', function () {
      modal.classList.add('active');
    });
    closeBtn.addEventListener('click', function () {
      modal.classList.remove('active');
    });
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (modal.classList.contains('active') && e.key === 'Escape') {
        modal.classList.remove('active');
      }
    });
  }
})();

// Testimonials Carousel True Infinite Loop
(function() {
  const testimonials = [
    {
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      name: 'Amanda Peters',
      meta: 'COMMERCIAL PROPERTY, USA, 2024.',
      text: '«Our company hired Tsegaw to complete a project for the construction of our new office. We were absolutely satisfied with the cooperation. Tsegaw is an experienced architect with fresh ideas and extensive expertise in construction, permitting, and design.»'
    },
    {
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      name: 'Jessica Gordons',
      meta: 'PRIVATE HOUSE, USA, 2024.',
      text: '«We decided to approach the construction of our country house seriously and hire an experienced architect. Cooperation with Tsegaw has brought us only positive emotions! From the first minute, we were on the same wavelength, and the results are gorgeous!»'
    },
    {
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      name: 'Michael Brown',
      meta: 'OFFICE RENOVATION, UK, 2023.',
      text: '«Tsegaw transformed our workspace into a modern, inspiring environment. The process was smooth and the results exceeded our expectations. Highly recommended!»'
    },
    {
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      name: 'David Lee',
      meta: 'RETAIL STORE, CANADA, 2022.',
      text: '«Working with Tsegaw was a pleasure. He brought creative solutions to every challenge and delivered our project on time and within budget.»'
    }
  ];

  const track = document.getElementById('testimonials-carousel-track');
  const prevBtn = document.getElementById('testimonials-carousel-prev');
  const nextBtn = document.getElementById('testimonials-carousel-next');

  function getCardsPerView() {
    return window.innerWidth <= 900 ? 1 : 2;
  }

  let currentIndex = 0;

  function renderTestimonials() {
    const cardsPerView = getCardsPerView();
    const total = testimonials.length;
    let html = '';
    for (let i = 0; i < cardsPerView; i++) {
      const idx = (currentIndex + i + total) % total;
      const t = testimonials[idx];
      html += `<div class="testimonial-card">
        <div class="testimonial-profile">
          <img src="${t.avatar}" alt="${t.name}" class="testimonial-avatar" />
          <div>
            <div class="testimonial-name">${t.name}</div>
            <div class="testimonial-meta">${t.meta}</div>
          </div>
        </div>
        <div class="testimonial-quote-icon">&#10077;</div>
        <div class="testimonial-text">${t.text}</div>
      </div>`;
    }
    track.innerHTML = html;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    renderTestimonials();
  });
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    renderTestimonials();
  });
  window.addEventListener('resize', renderTestimonials);
  renderTestimonials();
})();

// Services Carousel True Infinite Loop
(function() {
  const services = [
    { icon: 'fas fa-drafting-compass', title: 'Architectural Design', desc: 'Creative and functional building design for all project types.' },
    { icon: 'fas fa-couch', title: 'Interior Design', desc: 'Modern, comfortable, and stylish interior solutions.' },
    { icon: 'fas fa-city', title: 'Commercial Design', desc: 'Efficient and attractive spaces for business and retail.' },
    { icon: 'fas fa-home', title: 'Residential Design', desc: 'Personalized home designs for comfortable living.' },
    { icon: 'fas fa-cube', title: 'Modeling', desc: '3D models for visualizing and refining your ideas.' },
    { icon: 'fas fa-ruler-combined', title: 'Floor Plan Design', desc: 'Detailed and efficient floor plan layouts.' },
    { icon: 'fas fa-cubes', title: '3D Architectural Rendering', desc: 'Photo-realistic 3D renders for your projects.' },
    { icon: 'fas fa-user-tie', title: 'Architecture Consultation', desc: 'Expert advice for your architectural projects.' },
    { icon: 'fas fa-file-contract', title: 'Construction Document Preparation', desc: 'Comprehensive documentation for construction.' },
    { icon: 'fas fa-tree', title: 'Landscape Design', desc: 'Beautiful, functional outdoor environments and gardens.' },
    { icon: 'fas fa-ruler-horizontal', title: 'Floor Plan', desc: 'Clear and accurate floor plans for your space.' },
    { icon: 'fas fa-th-large', title: '3D Floor Plan', desc: 'Interactive 3D floor plans for better visualization.' },
    { icon: 'fas fa-book', title: 'Lecture Notes', desc: 'Educational resources and notes for students.' },
    { icon: 'fas fa-calculator', title: 'Bill of Quantity', desc: 'Accurate quantity and cost estimation for projects.' },
    { icon: 'fas fa-file-alt', title: 'Research Paper Writing', desc: 'Professional research and academic writing services.' }
  ];

  const cardsContainer = document.getElementById('services-carousel-cards');
  const prevBtn = document.getElementById('services-carousel-prev');
  const nextBtn = document.getElementById('services-carousel-next');

  function getCardsPerView() {
    if (window.innerWidth <= 700) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 4;
  }

  let currentIndex = 0;

  function renderCards(direction = 0) {
    const cardsPerView = getCardsPerView();
    const total = services.length;
    let html = '';
    for (let i = 0; i < cardsPerView; i++) {
      const idx = (currentIndex + i + total) % total;
      const s = services[idx];
      html += `<div class="services-carousel-card carousel-active">
        <div class="services-carousel-icon"><i class="${s.icon}"></i></div>
        <div class="services-carousel-title">${s.title}</div>
        <div class="services-carousel-desc">${s.desc}</div>
      </div>`;
    }
    cardsContainer.innerHTML = html;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + services.length) % services.length;
    renderCards(-1);
  });
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % services.length;
    renderCards(1);
  });
  window.addEventListener('resize', () => renderCards(0));
  renderCards();
})();

// Instagram Section Carousel
(function() {
  const images = [
    'public/my_projects/photo_1_2025-07-23_18-05-55.jpg',
    'public/my_projects/photo_2_2025-07-23_18-05-55.jpg',
    'public/my_projects/photo_3_2025-07-23_18-05-55.jpg',
    'public/my_projects/photo_4_2025-07-23_18-05-55.jpg',
    'public/my_projects/photo_5_2025-07-23_18-05-55.jpg',
    'public/my_projects/photo_6_2025-07-23_18-05-55.jpg',
    'public/my_projects/photo_7_2025-07-23_18-05-55.jpg',
    'public/my_projects/photo_8_2025-07-23_18-05-55.jpg',
    'public/my_projects/photo_9_2025-07-23_18-05-55.jpg',
    'public/my_projects/photo_10_2025-07-23_18-05-55.jpg'
  ];
  const track = document.getElementById('instagram-carousel-track');
  const prevBtn = document.getElementById('instagram-carousel-prev');
  const nextBtn = document.getElementById('instagram-carousel-next');

  function getImagesPerView() {
    if (window.innerWidth <= 700) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 3;
  }

  let currentIndex = 0;

  function renderImages() {
    const imagesPerView = getImagesPerView();
    const total = images.length;
    let html = '';
    for (let i = 0; i < imagesPerView; i++) {
      const idx = (currentIndex + i + total) % total;
      html += `<img src="../${images[idx]}" alt="Instagram ${idx + 1}" class="instagram-carousel-image" />`;
    }
    track.innerHTML = html;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    renderImages();
  });
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    renderImages();
  });
  window.addEventListener('resize', renderImages);
  renderImages();
})();
});

// Mobile Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const mobileNavClose = document.getElementById('mobile-nav-close');
    const body = document.body;
    const header = document.querySelector('.site-header');

    // Toggle mobile navigation
    mobileNavToggle.addEventListener('click', function() {
        mobileNavToggle.classList.toggle('active');
        mobileNavOverlay.classList.toggle('active');
        body.classList.toggle('mobile-nav-open');
        
        // Ensure proper z-index for scrolled header
        if (header.classList.contains('scrolled')) {
            mobileNavOverlay.style.zIndex = '1002';
            mobileNavToggle.style.zIndex = '1003';
        }
    });

    // Close mobile nav when clicking the X close button
    mobileNavClose.addEventListener('click', function() {
        mobileNavToggle.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        body.classList.remove('mobile-nav-open');
    });

    // Close mobile nav when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNavToggle.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            body.classList.remove('mobile-nav-open');
        });
    });

    // Close mobile nav when clicking outside
    mobileNavOverlay.addEventListener('click', function(e) {
        if (e.target === mobileNavOverlay) {
            mobileNavToggle.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            body.classList.remove('mobile-nav-open');
        }
    });

    // Close mobile nav on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900) {
            mobileNavToggle.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            body.classList.remove('mobile-nav-open');
        }
    });

    // Handle scroll events for mobile nav
    window.addEventListener('scroll', function() {
        // Ensure mobile nav stays on top when scrolling
        if (mobileNavOverlay.classList.contains('active')) {
            mobileNavOverlay.style.zIndex = '1002';
            mobileNavToggle.style.zIndex = '1003';
        }
    });
}); 