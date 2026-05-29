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

// Subtle nav background strengthens after scroll
const nav = document.querySelector('.nav');
const onScroll = () => {
  if (window.scrollY > 24) nav.style.boxShadow = '0 1px 0 rgba(14,14,14,.05)';
  else nav.style.boxShadow = 'none';
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
