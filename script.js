document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelector('.main-nav ul');
  const navToggle = document.createElement('button');
  navToggle.innerHTML = '<i class="fas fa-bars"></i>';
  navToggle.classList.add('nav-toggle');
  const navbarContainer = document.querySelector('.site-header .container');
  navbarContainer.appendChild(navToggle);

  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('active');
  });
});