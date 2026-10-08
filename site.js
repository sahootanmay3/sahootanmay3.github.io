document.documentElement.classList.add("js");

const year = document.querySelector("[data-current-year]");
if (year) year.textContent = new Date().getFullYear();

const current = document.body.dataset.page;
if (current) {
  document.querySelectorAll(`[data-nav="${current}"]`).forEach((link) => {
    link.setAttribute("aria-current", "page");
  });
}

const header = document.querySelector(".header-inner");
if (header) {
  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "theme-toggle";

  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("theme");
  } catch (_) {
    savedTheme = null;
  }

  const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const initialTheme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : preferredTheme;

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const nextTheme = theme === "dark" ? "light" : "dark";
    toggle.textContent = nextTheme === "dark" ? "Dark mode" : "Light mode";
    toggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
    toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }

  applyTheme(initialTheme);
  const mobileMenu = header.querySelector(".mobile-nav");
  header.insertBefore(toggle, mobileMenu);

  toggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    try {
      localStorage.setItem("theme", nextTheme);
    } catch (_) {
      // The selected theme still applies for the current page.
    }
  });
}
