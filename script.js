(() => {
  const root = document.documentElement;
  const themeButton = document.getElementById('themeButton');
  const langButton = document.getElementById('langButton');
  const themeStorageKey = 'theme';
  const languageStorageKey = 'language';

  const ensureCursorRing = () => {
    if (!window.matchMedia('(min-width: 768px)').matches) return null;
    let ring = document.getElementById('cursorRing');
    if (!ring) {
      ring = document.createElement('div');
      ring.id = 'cursorRing';
      ring.className = 'cursor-ring';
      document.body.appendChild(ring);
    }
    document.body.classList.add('custom-cursor');
    return ring;
  };

  const cursorRing = ensureCursorRing();

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

  const initCursorRing = () => {
    if (!cursorRing) return;
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
      const interactive = event.target.closest('a, button, input, textarea, select, [role="button"], .interactive');
      cursorRing.classList.toggle('is-hover', Boolean(interactive));
    });

    window.addEventListener('pointerdown', () => cursorRing.classList.add('is-active'));
    window.addEventListener('pointerup', () => cursorRing.classList.remove('is-active'));

    animateRing();
  };

  applyLanguage(getInitialLanguage());
  applyTheme(getInitialTheme());

  themeButton?.addEventListener('click', () => applyTheme(root.classList.contains('dark') ? 'light' : 'dark'));
  langButton?.addEventListener('click', () => applyLanguage(root.lang === 'ko' ? 'en' : 'ko'));

  initCursorRing();
})();
