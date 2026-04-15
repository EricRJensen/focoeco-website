const initMobileMenu = () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const header = document.querySelector('header');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!menuToggle || !header || !mobileMenu) {
    return;
  }

  const closeMenu = () => {
    header.classList.remove('nav-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.style.display = 'none';
  };

  const toggleMenu = () => {
    const isOpen = header.classList.toggle('nav-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.style.display = isOpen ? 'flex' : 'none';
  };

  menuToggle.addEventListener('click', toggleMenu);

  mobileMenu.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', closeMenu);
  });
};

const initFocusModal = () => {
  const modal = document.getElementById('focus-modal');
  const cards = document.querySelectorAll('.projects-grid .card');

  if (!modal || !cards.length) {
    return;
  }

  const modalImg = document.getElementById('focus-modal-img');
  const modalTitle = document.getElementById('focus-modal-title');
  const modalDesc = document.getElementById('focus-modal-desc');
  const modalClose = modal.querySelector('.modal-close');
  const modalBackdrop = modal.querySelector('.modal-backdrop');

  if (!modalImg || !modalTitle || !modalDesc || !modalClose || !modalBackdrop) {
    return;
  }

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

  cards.forEach(card => {
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
};

const initPdfModal = () => {
  const modal = document.getElementById('pdf-modal');
  const cards = document.querySelectorAll('.doc-card');

  if (!modal || !cards.length) {
    return;
  }

  const frame = document.getElementById('pdf-modal-frame');
  const title = document.getElementById('pdf-modal-title');
  const link = document.getElementById('pdf-modal-link');
  const description = document.getElementById('pdf-modal-desc');
  const closeTriggers = modal.querySelectorAll('[data-pdf-close]');

  if (!frame || !title || !link || !description || !closeTriggers.length) {
    return;
  }

  const closeModal = () => {
    modal.classList.remove('is-open');
    frame.src = 'about:blank';
    document.body.style.overflow = '';
  };

  const openModal = card => {
    const pdfUrl = card.dataset.pdf;
    if (!pdfUrl) {
      return;
    }

    const docTitle = card.dataset.title || 'Plan Document';
    const docFilename = card.dataset.filename || '';
    const docDescription = card.dataset.description || '';

    title.textContent = docTitle;
    description.textContent = docDescription;
    link.href = pdfUrl;
    link.textContent = docFilename ? `Open ${docFilename} in new tab` : 'Open in new tab';
    frame.src = `${pdfUrl}#view=FitH`;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  cards.forEach(card => {
    card.addEventListener('click', e => {
      if (e.target instanceof Element && e.target.closest('a')) {
        return;
      }
      openModal(card);
    });
    card.addEventListener('keydown', e => {
      if (e.target instanceof Element && e.target.closest('a')) {
        return;
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  closeTriggers.forEach(trigger => {
    trigger.addEventListener('click', closeModal);
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
};

const initCarousel = () => {
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
};

const initScrollFade = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return;
  }

  const main = document.querySelector('main');
  if (!main) {
    return;
  }

  const fadeTargets = Array.from(main.querySelectorAll('div'));
  if (!fadeTargets.length) {
    return;
  }

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
};

initMobileMenu();
initFocusModal();
initPdfModal();
initCarousel();
initScrollFade();
