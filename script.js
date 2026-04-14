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

  // Action menu for Discord and Email
  const popupMenu = document.createElement("div");
  popupMenu.className = "action-menu";
  document.body.appendChild(popupMenu);

  let currentActiveLink = null;

  function closeMenu() {
    popupMenu.classList.remove("active");
    currentActiveLink = null;
  }

  document.addEventListener("click", (e) => {
    if (!popupMenu.contains(e.target) && !e.target.closest(".social-link[data-copy]")) {
      closeMenu();
    }
  });

  document.querySelectorAll(".social-link[data-copy]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      if (currentActiveLink === link) {
        closeMenu();
        return;
      }

      currentActiveLink = link;
      const copyText = link.getAttribute("data-copy");
      const url = link.getAttribute("data-url") || link.getAttribute("href");
      const label = link.getAttribute("aria-label");

      popupMenu.innerHTML = `
        <button class="action-menu-btn" id="menuOpenBtn">Open ${label}</button>
        <button class="action-menu-btn" id="menuCopyBtn">Copy (${copyText})</button>
      `;

      document.getElementById("menuOpenBtn").addEventListener("click", () => {
        window.open(url, label === "Email" ? "_self" : "_blank");
        closeMenu();
      });

      document.getElementById("menuCopyBtn").addEventListener("click", () => {
        navigator.clipboard.writeText(copyText).then(() => {
          const copyBtn = document.getElementById("menuCopyBtn");
          copyBtn.textContent = "Copied!";
          copyBtn.style.color = "#a6e3a1";
          setTimeout(closeMenu, 1500);
        });
      });

      const rect = link.getBoundingClientRect();
      popupMenu.style.top = `${rect.bottom + window.scrollY + 12}px`;
      
      popupMenu.classList.add("active");
      
      requestAnimationFrame(() => {
         const menuRect = popupMenu.getBoundingClientRect();
         let leftPos = rect.left + window.scrollX + (rect.width / 2) - (menuRect.width / 2);
         if (leftPos < 16) leftPos = 16;
         if (leftPos + menuRect.width > window.innerWidth - 16) leftPos = window.innerWidth - menuRect.width - 16;
         popupMenu.style.left = `${leftPos}px`;
      });
    });
  });
})();
