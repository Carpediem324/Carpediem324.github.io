(() => {
  const root = document.documentElement;
  const themeButton = document.getElementById('themeButton');
  const cursorRing = document.getElementById('cursorRing');
  const storageKey = 'theme';

  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    root.classList.toggle('dark', isDark);
    if (themeButton) themeButton.textContent = isDark ? '라이트 모드' : '다크 모드';
    localStorage.setItem(storageKey, theme);
  };

  const initReveal = () => {
    const revealTargets = document.querySelectorAll('[data-reveal]');
    if (!revealTargets.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealTargets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    revealTargets.forEach((el) => observer.observe(el));
  };

  const initCursorRing = () => {
    if (!cursorRing || !window.matchMedia('(min-width: 768px)').matches) return;

    const interactiveItems = document.querySelectorAll('a, button, .interactive');
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;

    const animateRing = () => {
      ringX += (pointerX - ringX) * 0.16;
      ringY += (pointerY - ringY) * 0.16;
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(animateRing);
    };

    window.addEventListener('pointermove', (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
    });

    interactiveItems.forEach((el) => {
      el.addEventListener('pointerenter', () => cursorRing.classList.add('is-hover'));
      el.addEventListener('pointerleave', () => cursorRing.classList.remove('is-hover'));
    });

    animateRing();
  };

  applyTheme(getInitialTheme());
  themeButton?.addEventListener('click', () => {
    applyTheme(root.classList.contains('dark') ? 'light' : 'dark');
  });

  initReveal();
  initCursorRing();
})();
