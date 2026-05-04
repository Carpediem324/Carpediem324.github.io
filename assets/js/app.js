class ThemeManager {
  constructor(root, button) {
    this.root = root;
    this.button = button;
    this.storageKey = 'theme';
  }

  getInitialTheme() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  getLabel(language, isDark) {
    if (!this.button) return '';
    const darkLabel = language === 'en' ? this.button.dataset.themeLabelDarkEn : this.button.dataset.themeLabelDarkKo;
    const lightLabel = language === 'en' ? this.button.dataset.themeLabelLightEn : this.button.dataset.themeLabelLightKo;
    return isDark ? (lightLabel || 'Light mode') : (darkLabel || 'Dark mode');
  }

  apply(theme, language = 'ko') {
    const isDark = theme === 'dark';
    this.root.classList.toggle('dark', isDark);
    localStorage.setItem(this.storageKey, theme);
    if (this.button) this.button.textContent = this.getLabel(language, isDark);
  }

  toggle(language) {
    this.apply(this.root.classList.contains('dark') ? 'light' : 'dark', language);
  }
}

class LanguageManager {
  constructor(root, button) {
    this.root = root;
    this.button = button;
    this.storageKey = 'language';
  }

  getInitialLanguage() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved === 'ko' || saved === 'en') return saved;
    return (navigator.language || 'ko').toLowerCase().startsWith('ko') ? 'ko' : 'en';
  }

  getValue(element, language, prefix) {
    const key = language === 'en' ? `${prefix}En` : `${prefix}Ko`;
    return element.dataset[key];
  }

  apply(language) {
    this.root.lang = language;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const v = this.getValue(el, language, 'i18n');
      if (v) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const v = this.getValue(el, language, 'i18nTitle');
      if (v) el.setAttribute('title', v);
    });
    document.querySelectorAll('[data-i18n-content]').forEach((el) => {
      const v = this.getValue(el, language, 'i18nContent');
      if (v) el.setAttribute('content', v);
    });
    if (this.button) this.button.textContent = language === 'ko' ? 'EN' : '한';
    localStorage.setItem(this.storageKey, language);
  }

  toggle() {
    this.apply(this.root.lang === 'ko' ? 'en' : 'ko');
  }
}

class CursorEffect {
  constructor() {
    this.ring = null;
    this.pointerX = window.innerWidth / 2;
    this.pointerY = window.innerHeight / 2;
    this.ringX = this.pointerX;
    this.ringY = this.pointerY;
  }

  setup() {
    if (!window.matchMedia('(min-width: 768px)').matches) return;
    this.ring = document.getElementById('cursorRing') || document.createElement('div');
    this.ring.id = 'cursorRing';
    this.ring.className = 'cursor-ring';
    if (!document.getElementById('cursorRing')) document.body.appendChild(this.ring);
    document.body.classList.add('custom-cursor');

    window.addEventListener('pointermove', (event) => {
      this.pointerX = event.clientX;
      this.pointerY = event.clientY;
      const target = event.target instanceof Element ? event.target : null;
      const interactive = target?.closest('a, button, input, textarea, select, [role="button"], .interactive');
      this.ring.classList.toggle('is-hover', Boolean(interactive));
    });
    window.addEventListener('pointerdown', () => this.ring.classList.add('is-active'));
    window.addEventListener('pointerup', () => this.ring.classList.remove('is-active'));
    requestAnimationFrame(() => this.animate());
  }

  animate() {
    if (!this.ring) return;
    this.ringX += (this.pointerX - this.ringX) * 0.16;
    this.ringY += (this.pointerY - this.ringY) * 0.16;
    this.ring.style.transform = `translate3d(${this.ringX}px, ${this.ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(() => this.animate());
  }
}

class PortfolioApp {
  init() {
    const root = document.documentElement;
    const langButton = document.getElementById('langButton');
    const themeButton = document.getElementById('themeButton');

    const language = new LanguageManager(root, langButton);
    const theme = new ThemeManager(root, themeButton);
    const cursor = new CursorEffect();

    const initialLanguage = language.getInitialLanguage();
    language.apply(initialLanguage);
    theme.apply(theme.getInitialTheme(), initialLanguage);

    langButton?.addEventListener('click', () => {
      language.toggle();
      theme.apply(root.classList.contains('dark') ? 'dark' : 'light', root.lang);
    });
    themeButton?.addEventListener('click', () => theme.toggle(root.lang));

    cursor.setup();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp().init();
});
