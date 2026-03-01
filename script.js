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

document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const slides = Array.from(carousel.querySelectorAll('[data-carousel-slide]'));
  const dots = Array.from(carousel.querySelectorAll('[data-carousel-dot]'));
  const prevButton = carousel.querySelector('[data-carousel-prev]');
  const nextButton = carousel.querySelector('[data-carousel-next]');

  if (!slides.length) {
    return;
  }

  let activeIndex = slides.findIndex(slide => slide.classList.contains('is-active'));
  if (activeIndex < 0) {
    activeIndex = 0;
  }

  const setActiveSlide = nextIndex => {
    activeIndex = (nextIndex + slides.length) % slides.length;

    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });

    dots.forEach((dot, index) => {
      const isActive = index === activeIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  };

  prevButton?.addEventListener('click', () => setActiveSlide(activeIndex - 1));
  nextButton?.addEventListener('click', () => setActiveSlide(activeIndex + 1));

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => setActiveSlide(index));
  });

  carousel.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setActiveSlide(activeIndex - 1);
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setActiveSlide(activeIndex + 1);
    }
  });

  setActiveSlide(activeIndex);
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  const fadeTargets = Array.from(document.querySelectorAll('main div'));
  const observerOptions = {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -10% 0px',
  };

  const fadeObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('is-hidden');
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions)
    : null;

  fadeTargets.forEach(target => {
    target.classList.add('scroll-fade');

    const targetTop = target.getBoundingClientRect().top;
    const startsInView = targetTop <= window.innerHeight * 0.9;

    if (startsInView || !fadeObserver) {
      target.classList.add('is-visible');
      return;
    }

    target.classList.add('is-hidden');
    fadeObserver.observe(target);
  });
}
