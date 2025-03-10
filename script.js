document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.main-nav');
  const dropdowns = document.querySelectorAll('.dropdown');

  hamburger.addEventListener('click', function() {
    mainNav.classList.toggle('active');
  });

  // Toggle navigation menu
  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // Handle dropdown menus
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    
    link.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle('active');
        
        // Close other dropdowns
        dropdowns.forEach(other => {
          if (other !== dropdown) other.classList.remove('active');
        });
      }
    });
  });

  // Close menus when clicking outside
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      if (!nav.contains(e.target)) {  // Fixed syntax error here
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        dropdowns.forEach(d => d.classList.remove('active'));
      }
    }
  });

  // Close menu on navigation or Escape key
  document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('active')) {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
      dropdowns.forEach(d => d.classList.remove('active'));
    }
  });

  // Carousel Functionality (unchanged)
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const carouselInner = carousel.querySelector('.carousel-inner');
    const slides = carouselInner.querySelectorAll('.slide');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    let currentIndex = 0;

    function getSlideWidth() {
      return window.innerWidth > 768 ? 100 / 3 : 100;
    }

    function showSlide(index) {
      const totalSlides = slides.length;
      if (index >= totalSlides) index = 0;
      if (index < 0) index = totalSlides - 1;
      const slideWidth = getSlideWidth();
      carouselInner.style.transform = `translateX(-${index * slideWidth}%)`;
      currentIndex = index;
    }

    prevBtn?.addEventListener('click', () => showSlide(currentIndex - 1));
    nextBtn?.addEventListener('click', () => showSlide(currentIndex + 1));

    let autoSlide = setInterval(() => showSlide(currentIndex + 1), 5000);
    carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
    carousel.addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => showSlide(currentIndex + 1), 5000);
    });
    showSlide(0);
  }

  // Fading Overlay Effect (unchanged)
  const overlays = document.querySelectorAll('.hero-overlay, .banner-overlay');
  if (overlays.length > 0) {
    window.addEventListener('scroll', () => {
      overlays.forEach(overlay => {
        const parent = overlay.parentElement;
        const scrollPosition = window.scrollY;
        const parentTop = parent.getBoundingClientRect().top + scrollPosition;
        const parentHeight = parent.offsetHeight;
        const relativeScroll = scrollPosition - parentTop;

        if (relativeScroll > 0) {
          const opacity = Math.min(0.8, relativeScroll / parentHeight);
          overlay.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
        } else {
          overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        }
      });
    });
  }
});