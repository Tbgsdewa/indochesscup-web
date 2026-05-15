!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1673686024051772');
fbq('track', 'PageView');

// Intersection Observer for reveal animations
         const reveals = document.querySelectorAll('.reveal');
         const observer = new IntersectionObserver((entries) => {
           entries.forEach((entry, i) => {
             if (entry.isIntersecting) {
               setTimeout(() => entry.target.classList.add('visible'), i * 60);
             }
           });
         }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
         
         reveals.forEach(el => observer.observe(el));
         
         // Animated counter for stats
         const counters = document.querySelectorAll('.stat-num');
         const counterObserver = new IntersectionObserver((entries) => {
           entries.forEach(entry => {
             if (entry.isIntersecting) {
               const el = entry.target;
               const text = el.textContent;
               // Only animate pure numbers
               const num = parseInt(text.replace(/\D/g, ''));
               if (!isNaN(num) && num > 0 && num < 999) {
                 let current = 0;
                 const step = Math.ceil(num / 40);
                 const interval = setInterval(() => {
                   current = Math.min(current + step, num);
                   el.textContent = text.replace(/\d+/, current);
                   if (current >= num) clearInterval(interval);
                 }, 30);
               }
               counterObserver.unobserve(el);
             }
           });
         }, { threshold: 0.5 });
         
         counters.forEach(el => counterObserver.observe(el));

// App preview carousel
const appPreview = document.querySelector('[data-app-preview]');

if (appPreview) {
  const track = appPreview.querySelector('.app-preview-track');
  const slides = Array.from(appPreview.querySelectorAll('.app-preview-card'));
  const dots = Array.from(appPreview.querySelectorAll('[data-app-preview-dot]'));
  const prevButton = appPreview.querySelector('[data-app-preview-prev]');
  const nextButton = appPreview.querySelector('[data-app-preview-next]');
  const currentCounter = appPreview.querySelector('[data-app-preview-current]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const autoplayDelay = 5200;
  let activeIndex = 0;
  let autoplayTimer = null;
  let pointerStartX = 0;
  let pointerDeltaX = 0;
  let isDragging = false;

  const formatCounter = (number) => String(number).padStart(2, '0');

  const updateCarousel = (nextIndex) => {
    activeIndex = (nextIndex + slides.length) % slides.length;
    track.style.transform = `translateX(-${activeIndex * 100}%)`;

    slides.forEach((slide, index) => {
      slide.setAttribute('aria-hidden', index === activeIndex ? 'false' : 'true');
    });

    dots.forEach((dot, index) => {
      const isActive = index === activeIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', String(isActive));
    });

    if (currentCounter) {
      currentCounter.textContent = formatCounter(activeIndex + 1);
    }
  };

  const stopAutoplay = () => {
    if (autoplayTimer) {
      window.clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  };

  const startAutoplay = () => {
    if (prefersReducedMotion || autoplayTimer || slides.length < 2) return;
    autoplayTimer = window.setInterval(() => {
      updateCarousel(activeIndex + 1);
    }, autoplayDelay);
  };

  prevButton?.addEventListener('click', () => {
    updateCarousel(activeIndex - 1);
    stopAutoplay();
    startAutoplay();
  });

  nextButton?.addEventListener('click', () => {
    updateCarousel(activeIndex + 1);
    stopAutoplay();
    startAutoplay();
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      updateCarousel(Number(dot.dataset.appPreviewDot));
      stopAutoplay();
      startAutoplay();
    });
  });

  track.addEventListener('pointerdown', (event) => {
    isDragging = true;
    pointerStartX = event.clientX;
    pointerDeltaX = 0;
    track.style.transition = 'none';
    stopAutoplay();
  });

  track.addEventListener('pointermove', (event) => {
    if (!isDragging) return;
    pointerDeltaX = event.clientX - pointerStartX;
    track.style.transform = `translateX(calc(-${activeIndex * 100}% + ${pointerDeltaX}px))`;
  });

  const finishDrag = () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = '';

    if (Math.abs(pointerDeltaX) > 48) {
      updateCarousel(activeIndex + (pointerDeltaX < 0 ? 1 : -1));
    } else {
      updateCarousel(activeIndex);
    }

    startAutoplay();
  };

  track.addEventListener('pointerup', finishDrag);
  track.addEventListener('pointercancel', finishDrag);
  track.addEventListener('pointerleave', finishDrag);

  appPreview.addEventListener('mouseenter', stopAutoplay);
  appPreview.addEventListener('mouseleave', startAutoplay);
  appPreview.addEventListener('focusin', stopAutoplay);
  appPreview.addEventListener('focusout', startAutoplay);

  updateCarousel(0);
  startAutoplay();
}

// FAQ accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  if (!button || !answer) return;

  button.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');

    faqItems.forEach((otherItem) => {
      const otherButton = otherItem.querySelector('.faq-question');
      const otherAnswer = otherItem.querySelector('.faq-answer');

      otherItem.classList.remove('is-open');
      if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
      if (otherAnswer) otherAnswer.style.maxHeight = '0px';
    });

    if (!isOpen) {
      item.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  });
});
