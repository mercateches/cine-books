// Cine & Books: pestañas de género y carga de películas de cuatro en cuatro.
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".movie-tab");
  const panels = document.querySelectorAll(".movie-panel");
  const pageSize = 4;

  function showTab(targetId) {
    tabs.forEach((tab) => {
      const active = tab.dataset.target === targetId;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.setAttribute("tabindex", active ? "0" : "-1");
    });
    panels.forEach((panel) => {
      panel.hidden = panel.id !== targetId;
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => showTab(tab.dataset.target));
    tab.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const currentIndex = Array.from(tabs).indexOf(tab);
      const nextIndex = event.key === "ArrowRight"
        ? (currentIndex + 1) % tabs.length
        : (currentIndex - 1 + tabs.length) % tabs.length;
      tabs[nextIndex].focus();
      showTab(tabs[nextIndex].dataset.target);
    });
  });

  panels.forEach((panel) => {
    const cards = Array.from(panel.querySelectorAll(".movie-card"));
    const button = panel.querySelector(".load-more");
    let visibleCount = pageSize;

    function renderCards() {
      cards.forEach((card, index) => { card.hidden = index >= visibleCount; });
      const remaining = cards.length - visibleCount;
      button.hidden = remaining <= 0;
      button.innerHTML = remaining > 0
        ? `Ver más películas (${Math.min(pageSize, remaining)}) <span aria-hidden="true">↓</span>`
        : "Ya viste todas las películas";
      button.disabled = remaining <= 0;
    }

    button.addEventListener("click", () => {
      visibleCount = Math.min(visibleCount + pageSize, cards.length);
      renderCards();
    });
    renderCards();
  });
  showTab("accion");
});
