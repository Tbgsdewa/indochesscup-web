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
