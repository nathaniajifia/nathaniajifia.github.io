// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    }
  }
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Hero carousel — crossfade, 3 second auto-advance,
// updates project name + counter
(() => {
  const carousel = document.getElementById('carousel');
  if (!carousel) return;

  const slides   = [...carousel.querySelectorAll('.slide')];
  const indexEl  = document.querySelector('.carousel__index');
  const totalEl  = document.querySelector('.carousel__total');
  const nameEl   = document.querySelector('.hero__project-name');
  const typeEl   = document.querySelector('.hero__project-type');

  if (!slides.length) return;

  const INTERVAL = 3000;
  let current = 0;
  let timer = null;

  if (totalEl) totalEl.textContent = String(slides.length).padStart(2, '0');
  slides[0].classList.add('is-active');
  updateChrome(0);

  function updateChrome(i) {
    if (indexEl) indexEl.textContent = String(i + 1).padStart(2, '0');
    if (nameEl)  nameEl.textContent  = slides[i].dataset.name || '';
    if (typeEl)  typeEl.textContent  = slides[i].dataset.type || '';
  }

  const go = (n) => {
    const next = ((n % slides.length) + slides.length) % slides.length;
    if (next === current) return;
    slides[current].classList.remove('is-active');
    slides[next].classList.add('is-active');
    current = next;
    updateChrome(next);
  };

  const start = () => {
    stop();
    timer = setInterval(() => go(current + 1), INTERVAL);
  };
  const stop = () => {
    if (timer) { clearInterval(timer); timer = null; }
  };

  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else start();
  });

  start();
})();
