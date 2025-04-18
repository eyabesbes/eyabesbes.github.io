feather.replace();

document.addEventListener('DOMContentLoaded', () => {
  const timeline = document.querySelector('.education-timeline');
  const cards = document.querySelectorAll('.education-card');
  const dots = document.querySelectorAll('.timeline-dot');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => e.target.classList.toggle('in-view', e.isIntersecting));
  }, { threshold: 0.1 });

  if (timeline) io.observe(timeline);
  cards.forEach(c => io.observe(c));
  dots.forEach(d => io.observe(d));

  // General collapse function
  function collapse(card) {
    const wrapper = card.querySelector('.edu-card-wrapper');
    const details = card.querySelector('.edu-details');
    const dot = document.querySelector(`.timeline-dot[data-target-card="${card.id}"]`);

    card.classList.remove('is-expanded');
    wrapper.setAttribute('aria-expanded', 'false');
    dot?.classList.remove('is-active');

    details.querySelectorAll('li, .edu-badge').forEach(el => {
      el.style.transitionDelay = '0ms';
      el.style.opacity = '0';
      el.style.transform = el.tagName === 'LI' ? 'translateX(-10px)' : 'scale(0.9)';
    });
  }

  // General expand function
  function expand(card) {
    const wrapper = card.querySelector('.edu-card-wrapper');
    const details = card.querySelector('.edu-details');
    const items = details.querySelectorAll('li');
    const badges = details.querySelectorAll('.edu-badge');
    const dot = document.querySelector(`.timeline-dot[data-target-card="${card.id}"]`);

    card.classList.add('is-expanded');
    wrapper.setAttribute('aria-expanded', 'true');
    dot?.classList.add('is-active');

    items.forEach((li, i) => {
      li.style.transitionDelay = `${100 + i * 50}ms`;
      li.style.opacity = '1';
      li.style.transform = 'translateX(0)';
    });

    badges.forEach((b, i) => {
      b.style.transitionDelay = `${200 + i * 40}ms`;
      b.style.opacity = '1';
      b.style.transform = 'scale(1)';
    });
  }

  cards.forEach(card => {
    const wrapper = card.querySelector('.edu-card-wrapper');
    const dot = document.querySelector(`.timeline-dot[data-target-card="${card.id}"]`);

    wrapper.addEventListener('click', () => {
      const isAlreadyExpanded = card.classList.contains('is-expanded');

      // Collapse all
      cards.forEach(c => collapse(c));

      // Expand only if not already expanded
      if (!isAlreadyExpanded) {
        expand(card);
      }
    });

    dot?.addEventListener('click', () => {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });

      setTimeout(() => {
        cards.forEach(c => collapse(c));
        expand(card);
      }, 300);
    });
  });
});
