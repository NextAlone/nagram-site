// Paddle buttons for horizontally scrolling reels; touch and trackpad
// scrolling work without this script.
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

for (const root of document.querySelectorAll<HTMLElement>('[data-reel]')) {
  const rail = root.querySelector<HTMLElement>('[data-reel-rail]');
  const prev = root.querySelector<HTMLButtonElement>('[data-reel-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-reel-next]');
  if (!rail || !prev || !next) continue;

  const update = () => {
    const max = rail.scrollWidth - rail.clientWidth;
    root.toggleAttribute('data-scrollable', max > 1);
    prev.disabled = rail.scrollLeft <= 1;
    next.disabled = rail.scrollLeft >= max - 1;
  };

  const page = (direction: 1 | -1) => {
    const item = rail.querySelector('li');
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
    const step = item ? item.getBoundingClientRect().width + gap : rail.clientWidth;
    const perPage = Math.max(1, Math.floor((rail.clientWidth + gap) / step) - 1);
    rail.scrollBy({ left: direction * step * perPage, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  };

  prev.addEventListener('click', () => page(-1));
  next.addEventListener('click', () => page(1));
  rail.addEventListener('scroll', update, { passive: true });
  new ResizeObserver(update).observe(rail);
}
