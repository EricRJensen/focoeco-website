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

const modal = document.getElementById('focus-modal');
const modalImg = document.getElementById('focus-modal-img');
const modalTitle = document.getElementById('focus-modal-title');
const modalDesc = document.getElementById('focus-modal-desc');
const modalClose = document.querySelector('.modal-close');
const modalBackdrop = document.querySelector('.modal-backdrop');

const loremIpsum200 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut libero in nibh porttitor faucibus. Integer vel lectus vel elit fermentum lacinia vitae vel est. Vivamus semper viverra nisi, at vulputate mauris malesuada nec. Aliquam erat volutpat. Sed eget luctus neque. Curabitur congue facilisis ipsum, ac faucibus erat varius et. Fusce maximus, justo at efficitur sodales, nisl odio fermentum velit, sed tempor magna mi quis massa. Cras fringilla, sapien id sagittis luctus, lorem augue tincidunt orci, at condimentum orci lacus id nulla. Sed faucibus lacus dolor, vitae condimentum eros dignissim id. Ut pulvinar urna vitae pellentesque posuere. Pellentesque a lorem tempor, sollicitudin neque quis, convallis sem. Praesent feugiat euismod faucibus. Mauris interdum ex id placerat efficitur. Nulla tincidunt sapien est, non facilisis nulla pellentesque eget. Duis faucibus ex vitae tortor facilisis, et euismod enim vehicula. Quisque vel lacinia mi, id ornare lacus. Integer blandit pulvinar leo, ut euismod purus convallis in. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam sit amet risus id mi condimentum vulputate. Donec aliquet, metus nec efficitur blandit, elit felis commodo ipsum, sit amet porta odio lorem in ipsum. Vestibulum tincidunt eros nec nulla gravida, non placerat neque hendrerit. Aenean at ligula vel dolor fermentum interdum. Curabitur id justo sit amet augue ultricies congue nec sed risus.`;

const openModal = (title, imgSrc) => {
  modalImg.src = imgSrc;
  modalImg.alt = `${title} illustration`;
  modalTitle.textContent = title;
  modalDesc.textContent = loremIpsum200;
  modal.classList.add('is-open');
};

const closeModal = () => {
  modal.classList.remove('is-open');
};

document.querySelectorAll('.projects-grid .card').forEach(card => {
  const handleOpen = () => {
    const title = card.dataset.title || 'Focus Area';
    const imgSrc = card.dataset.img || '';
    openModal(title, imgSrc);
  };

  card.setAttribute('tabindex', '0');
  card.addEventListener('click', handleOpen);
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  });
});

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('is-open')) {
    closeModal();
  }
});
