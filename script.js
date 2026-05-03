(() => {
  const root = document.documentElement;
  const themeButton = document.getElementById('themeButton');
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

  applyTheme(getInitialTheme());
  themeButton?.addEventListener('click', () => {
    applyTheme(root.classList.contains('dark') ? 'light' : 'dark');
  });
})();
