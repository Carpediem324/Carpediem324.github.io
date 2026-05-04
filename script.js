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

  const getTextByLanguage = (el, language, prefix = 'i18n') => {
    const key = language === 'en' ? `${prefix}En` : `${prefix}Ko`;
    return el.dataset[key];
  };

  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    root.classList.toggle('dark', isDark);

    if (themeButton) {
      const language = root.lang === 'en' ? 'en' : 'ko';
      const darkLabel = getTextByLanguage(themeButton, language, 'themeLabelDark') || (language === 'ko' ? '다크 모드' : 'Dark mode');
      const lightLabel = getTextByLanguage(themeButton, language, 'themeLabelLight') || (language === 'ko' ? '라이트 모드' : 'Light mode');
      themeButton.textContent = isDark ? lightLabel : darkLabel;
    }

    localStorage.setItem(themeStorageKey, theme);
  };

  const applyLanguage = (language) => {
    root.lang = language;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = getTextByLanguage(el, language, 'i18n');
      if (value) el.textContent = value;
    });

    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const value = getTextByLanguage(el, language, 'i18nAria');
      if (value) el.setAttribute('aria-label', value);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const value = getTextByLanguage(el, language, 'i18nPlaceholder');
      if (value) el.setAttribute('placeholder', value);
    });

    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const value = getTextByLanguage(el, language, 'i18nTitle');
      if (value) el.setAttribute('title', value);
    });

    document.querySelectorAll('[data-i18n-content]').forEach((el) => {
      const value = getTextByLanguage(el, language, 'i18nContent');
      if (value) el.setAttribute('content', value);
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
      ringX += (pointerX - ringX) * 0.15;
      ringY += (pointerY - ringY) * 0.15;
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

  applyLanguage(getInitialLanguage());
  applyTheme(getInitialTheme());

  themeButton?.addEventListener('click', () => applyTheme(root.classList.contains('dark') ? 'light' : 'dark'));
  langButton?.addEventListener('click', () => applyLanguage(root.lang === 'ko' ? 'en' : 'ko'));

  initReveal();
  initCursorRing();
})();
