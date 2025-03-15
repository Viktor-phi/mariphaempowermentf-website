document.addEventListener('DOMContentLoaded', function() {
    // Update hamburger menu toggle
hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    nav.classList.toggle('active');
    // Toggle aria-expanded attribute
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        !nav.contains(e.target) && 
        !hamburger.contains(e.target)) {
      nav.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
  
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('active')) {
        nav.classList.remove('active');
      }
    });
  
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
  
    // Improved Count-Up Animation
    function animateNumber(element, target) {
      const duration = 2000; // 2 seconds animation
      const startTime = performance.now();
      
      const updateNumber = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          element.textContent = target.toLocaleString();
        }
      };
  
      requestAnimationFrame(updateNumber);
    }
  
    // Initialize Count-Up Observer
    function initCountUp() {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat-number');
            stats.forEach(stat => {
              const target = parseInt(stat.dataset.target, 10);
              if (!isNaN(target)) {
                animateNumber(stat, target);
              }
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
  
      document.querySelectorAll('.impact-stats').forEach(section => {
        observer.observe(section);
      });
    }
  
    // Initialize count-up when page loads
    initCountUp();
  });