// Improved Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.main-nav');
  const body = document.body;

  // Updated function to toggle the .active class
  function toggleMenuVisibility() {
    nav.classList.toggle('active');
    const isExpanded = nav.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
  }

  // Add event listener to hamburger button
  hamburger.addEventListener('click', toggleMenuVisibility);
  
  // Carousel Continuous Slide
  const carouselInner = document.querySelector('.carousel-inner');
  if (carouselInner) {
    const slides = carouselInner.querySelectorAll('.slide');
    slides.forEach(slide => carouselInner.appendChild(slide.cloneNode(true)));
    let position = 0;
    const speed = 0.1;
  
    function slide() {
      position -= speed;
      if (position <= -100) position = 0;
      carouselInner.style.transform = `translateX(${position}%)`;
      requestAnimationFrame(slide);
    }
    slide();
  }
  
  // Improved Counter Animation
  const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    const duration = 2000;
    
    counters.forEach(counter => {
      const target = +counter.dataset.target;
      const start = 0;
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);
        
        counter.textContent = current === target ? `${current}+` : current;
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };
      
      requestAnimationFrame(updateCounter);
    });
  };

  // Initialize counters when section is visible
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 }).observe(document.querySelector('.impact-stats'));
});