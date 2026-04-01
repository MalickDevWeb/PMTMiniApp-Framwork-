const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const docSearch = document.getElementById('docSearch');
const navLinks = Array.from(document.querySelectorAll('.sidebar__nav a'));
const sections = Array.from(document.querySelectorAll('.doc-section'));
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('is-open');
    sidebarToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

function normaliserTexte(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

if (docSearch) {
  docSearch.addEventListener('input', (event) => {
    const query = normaliserTexte(event.target.value);

    navLinks.forEach((link) => {
      const text = normaliserTexte(link.textContent);
      const section = document.querySelector(link.getAttribute('href'));
      const haystack = [text, section?.dataset?.search || ''].map(normaliserTexte).join(' ');
      const visible = !query || haystack.includes(query);

      link.style.display = visible ? '' : 'none';
      if (section) {
        section.style.opacity = visible || !query ? '' : '0.38';
      }
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const id = `#${entry.target.id}`;
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === id);
    });
  });
}, {
  rootMargin: '-35% 0px -50% 0px',
  threshold: 0.05,
});

sections.forEach((section) => observer.observe(section));

const revealTargets = Array.from(document.querySelectorAll(
  '.hero__copy, .hero__panel .panel, .doc-section, .doc-columns > div, .card, .mini-card, .step, .faq__item, .footer'
));

revealTargets.forEach((target, index) => {
  target.classList.add('reveal-target');
  target.style.setProperty('--reveal-delay', `${(index % 6) * 55}ms`);
});

function marquerVisible(target) {
  target.classList.add('is-visible');
}

const canAnimate = !prefersReducedMotion.matches && typeof window.IntersectionObserver === 'function';

if (!canAnimate || revealTargets.length === 0) {
  revealTargets.forEach(marquerVisible);
} else {
  document.body.classList.add('has-motion', 'animate-ready');
  let visibles = 0;

  const revealObserver = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.classList.contains('is-visible')) return;

      marquerVisible(entry.target);
      visibles += 1;
      currentObserver.unobserve(entry.target);

      if (visibles >= revealTargets.length) {
        document.body.classList.remove('animate-ready');
      }
    });
  }, {
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.14,
  });

  revealTargets.forEach((target) => revealObserver.observe(target));

  // Fallback: guarantee content visibility even if observer events are missed.
  window.setTimeout(() => {
    revealTargets.forEach(marquerVisible);
    document.body.classList.remove('animate-ready');
  }, 1200);
}

document.querySelectorAll('pre').forEach((pre) => {
  const code = pre.querySelector('code');
  const classNames = Array.from(code?.classList || []);
  const languageClass = classNames.find((className) => className.startsWith('language-'));
  const language = languageClass ? languageClass.replace('language-', '') : 'texte';

  const label = document.createElement('span');
  label.className = 'code-label';
  label.textContent = language;
  pre.appendChild(label);

  const button = document.createElement('button');
  button.className = 'copy-button';
  button.type = 'button';
  button.textContent = 'Copier';

  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code ? code.textContent : pre.textContent);
      button.textContent = 'Copié';
      window.setTimeout(() => {
        button.textContent = 'Copier';
      }, 1400);
    } catch (error) {
      button.textContent = 'Échec';
      window.setTimeout(() => {
        button.textContent = 'Copier';
      }, 1400);
    }
  });

  pre.appendChild(button);
});
