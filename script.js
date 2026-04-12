(() => {
  "use strict";

  const THEME_KEY = "khoipm06-theme";
  const html = document.documentElement;
  const toggle = document.getElementById("themeToggle");

  function setTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  toggle.addEventListener("click", () => {
    toggle.classList.remove("animate");
    void toggle.offsetWidth;
    toggle.classList.add("animate");

    const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";

    const rect = toggle.getBoundingClientRect();
    html.style.setProperty("--ripple-x", `${rect.left + rect.width / 2}px`);
    html.style.setProperty("--ripple-y", `${rect.top + rect.height / 2}px`);

    if (!document.startViewTransition) {
      setTheme(next);
      return;
    }

    document.startViewTransition(() => setTheme(next));
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        setTheme(e.matches ? "dark" : "light");
      }
    });
})();
