document.addEventListener('DOMContentLoaded', function() {
  // Hamburger menu toggle
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.main-nav');

  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // Close menu on navigation link click or Escape key
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
    }
  });

  // Carousel functionality
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

    // Manual controls
    prevBtn?.addEventListener('click', () => showSlide(currentIndex - 1));
    nextBtn?.addEventListener('click', () => showSlide(currentIndex + 1));

    // Auto-sliding every 5 seconds
    let autoSlide = setInterval(() => showSlide(currentIndex + 1), 5000);

    // Pause on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
    carousel.addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => showSlide(currentIndex + 1), 5000);
    });

    // Start at the first slide
    showSlide(0);
  }

  // Fading overlay effect for hero and banners
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

  // Initialize AOS for fade-in animations
  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: true      // Animations occur only once when scrolling into view
  });

  // CountUp.js for number animations in influence section
  const numbers = document.querySelectorAll('.number');
  const observerOptions = {
    threshold: 0.1 // Trigger when 10% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const number = entry.target;
        const target = parseInt(number.getAttribute('data-target'));
        const countUp = new CountUp(number, 0, target, 0, 2.5); // Animate from 0 to target over 2.5 seconds
        if (!countUp.error) {
          countUp.start();
        }
        observer.unobserve(number); // Stop observing once animation runs
      }
    });
  }, observerOptions);

  numbers.forEach(number => observer.observe(number));
});