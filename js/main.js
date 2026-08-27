// Shared behavior for all Critter Creamery pages.
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("menu-button");
  const menu = document.getElementById("mobile-menu");
  if (button && menu) {
    button.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  }
});
