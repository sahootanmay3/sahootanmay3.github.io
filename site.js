document.documentElement.classList.add("js");

const year = document.querySelector("[data-current-year]");
if (year) year.textContent = new Date().getFullYear();

const current = document.body.dataset.page;
if (current) {
  document.querySelectorAll(`[data-nav="${current}"]`).forEach((link) => {
    link.setAttribute("aria-current", "page");
  });
}

