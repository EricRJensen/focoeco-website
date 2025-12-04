const menuToggle = document.querySelector('.menu-toggle');
const header = document.querySelector('header');
const mobileMenu = document.getElementById('mobile-menu');

const toggleMenu = () => {
  const isOpen = header.classList.toggle('nav-open');
  menuToggle.setAttribute('aria-expanded', isOpen);
  mobileMenu.style.display = isOpen ? 'flex' : 'none';
};

menuToggle.addEventListener('click', toggleMenu);

mobileMenu.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('click', () => {
    header.classList.remove('nav-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.style.display = 'none';
  });
});
