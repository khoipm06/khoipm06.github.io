(() => {
  'use strict';

  const THEME_KEY = 'khoipm06-theme';
  const html = document.documentElement;
  const toggle = document.getElementById('themeToggle');

  // Determine initial theme: saved > system preference > dark
  function getInitialTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    return 'dark';
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  // Initialize
  setTheme(getInitialTheme());

  // Toggle
  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Respond to system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_KEY)) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
})();
