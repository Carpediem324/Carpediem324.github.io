(() => {
  const root = document.documentElement;
  const themeButton = document.getElementById('themeButton');
  const langButton = document.getElementById('langButton');
  const cursorRing = document.getElementById('cursorRing');
  const themeStorageKey = 'theme';
  const languageStorageKey = 'language';

  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem(themeStorageKey);
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const getSystemLanguage = () => (navigator.language || 'ko').toLowerCase().startsWith('ko') ? 'ko' : 'en';

  const getInitialLanguage = () => {
    const savedLanguage = localStorage.getItem(languageStorageKey);
    if (savedLanguage === 'ko' || savedLanguage === 'en') return savedLanguage;
    return getSystemLanguage();
  };

  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    root.classList.toggle('dark', isDark);
    if (themeButton) {
      const darkLabel = themeButton.dataset.labelDark || '다크 모드';
      const lightLabel = themeButton.dataset.labelLight || '라이트 모드';
      themeButton.textContent = isDark ? lightLabel : darkLabel;
    }
    localStorage.setItem(themeStorageKey, theme);
  };

  const applyLanguage = (language) => {
    root.lang = language;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = language === 'en' ? 'i18nEn' : 'i18nKo';
      const value = el.dataset[key];
      if (value) el.textContent = value;
    });

    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const key = language === 'en' ? 'i18nAriaEn' : 'i18nAriaKo';
      const value = el.dataset[key];
      if (value) el.setAttribute('aria-label', value);
    });

    if (langButton) langButton.textContent = language === 'ko' ? 'EN' : '한';
    localStorage.setItem(languageStorageKey, language);
    applyTheme(root.classList.contains('dark') ? 'dark' : 'light');
  };

  const initReveal = () => {
    const revealTargets = document.querySelectorAll('[data-reveal]');
    if (!revealTargets.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealTargets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

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
  applyLanguage(getInitialLanguage());

  themeButton?.addEventListener('click', () => applyTheme(root.classList.contains('dark') ? 'light' : 'dark'));
  langButton?.addEventListener('click', () => applyLanguage(root.lang === 'ko' ? 'en' : 'ko'));

  initReveal();
  initCursorRing();
})();
