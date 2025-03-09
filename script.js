document.addEventListener('DOMContentLoaded', function () {
  // Mobile Navigation
  const navLinks = document.querySelector('.main-nav ul');
  const navbarContainer = document.querySelector('.site-header .container');

  if (!navLinks || !navbarContainer) {
    console.error('Navigation elements not found.');
    return;
  }

  // Create and append toggle button
  const navToggle = document.createElement('button');
  navToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
  navToggle.classList.add('nav-toggle');
  navToggle.setAttribute('aria-label', 'Toggle navigation menu');
  navToggle.setAttribute('aria-expanded', 'false');
  navbarContainer.appendChild(navToggle);

  // Toggle menu on button click
  navToggle.addEventListener('click', function () {
    const isExpanded = navLinks.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    const icon = navToggle.querySelector('i');
    icon.classList.replace(isExpanded ? 'fa-bars' : 'fa-times', isExpanded ? 'fa-times' : 'fa-bars');
  });

  // Close menu when a navigation link is clicked
  const navItems = document.querySelectorAll('.main-nav a');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        const icon = navToggle.querySelector('i');
        icon.classList.replace('fa-times', 'fa-bars');
      }
    });
  });

  // Close menu on Escape key press
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      const icon = navToggle.querySelector('i');
      icon.classList.replace('fa-times', 'fa-bars');
    }
  });

  // Carousel Functionality
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const carouselInner = carousel.querySelector('.carousel-inner');
    const slides = carouselInner.querySelectorAll('img');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    let currentIndex = 0;

    function showSlide(index) {
      if (index >= slides.length) index = 0;
      if (index < 0) index = slides.length - 1;
      carouselInner.style.transform = `translateX(-${index * 100}%)`;
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