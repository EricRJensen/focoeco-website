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

const openModal = (title, imgSrc, description) => {
  if (imgSrc) {
    modalImg.src = imgSrc;
    modalImg.alt = `${title} illustration`;
    modalImg.style.display = 'block';
  } else {
    modalImg.src = '';
    modalImg.alt = '';
    modalImg.style.display = 'none';
  }
  modalTitle.textContent = title;
  modalDesc.textContent = description || '';
  modal.classList.add('is-open');
};

const closeModal = () => {
  modal.classList.remove('is-open');
};

document.querySelectorAll('.projects-grid .card').forEach(card => {
  const handleOpen = () => {
    const title = card.querySelector('h3')?.textContent?.trim() || card.dataset.title || 'Focus Area';
    const description = card.querySelector('p')?.textContent?.trim() || '';
    const imgSrc = card.dataset.img || '';
    openModal(title, imgSrc, description);
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
