// Play/pause for looping marquees, and a stop while one is off screen so a
// long page does not keep animating what nobody sees.
for (const root of document.querySelectorAll<HTMLElement>('[data-marquee]')) {
  const toggle = root.querySelector<HTMLButtonElement>('[data-marquee-toggle]');
  toggle?.addEventListener('click', () => {
    const paused = root.toggleAttribute('data-paused');
    toggle.setAttribute('aria-label', (paused ? toggle.dataset.labelPlay : toggle.dataset.labelPause) ?? '');
  });

  new IntersectionObserver(([entry]) => root.toggleAttribute('data-offscreen', !entry.isIntersecting)).observe(root);
}

// Lazy images clipped by the marquee would only start loading once they slide
// into view, so a marquee loads all of its images when it comes near.
const prime = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const img of entry.target.querySelectorAll<HTMLImageElement>('img[loading="lazy"]')) img.loading = 'eager';
      prime.unobserve(entry.target);
    }
  },
  { rootMargin: '800px 0px' },
);
for (const root of document.querySelectorAll('[data-marquee]')) prime.observe(root);
