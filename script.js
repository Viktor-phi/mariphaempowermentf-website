document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.main-nav');
  const dropdowns = document.querySelectorAll('.dropdown');

  // Toggle navigation menu on hamburger click
  hamburger.addEventListener('click', function() {
    nav.classList.toggle('active');
  });

  // Toggle dropdown menu on click for mobile
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault(); // Prevent navigation on mobile
        this.classList.toggle('active');
      }
    });
  });

  // Close menu when a navigation link is clicked
  const navItems = document.querySelectorAll('.main-nav a');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
      }
    });
  });

  // Close menu on Escape key press
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('active')) {
      nav.classList.remove('active');
    }
  });

  // Carousel Functionality
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const carouselInner = carousel.querySelector('.carousel-inner');
    const slides = carouselInner.querySelectorAll('.slide');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    let currentIndex = 0;

    function getSlideWidth() {
      return window.innerWidth > 768 ? 100 / 3 : 100; // 33.33% on desktop, 100% on mobile
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

    // Auto-slide every 5 seconds
    let autoSlide = setInterval(() => showSlide(currentIndex + 1), 5000);

    // Pause auto-slide on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
    carousel.addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => showSlide(currentIndex + 1), 5000);
    });

    // Initial slide
    showSlide(0);
  }

  // Fading Overlay Effect for Hero and Page Banners
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