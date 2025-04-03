// Add transition class when theme changes to make it smooth
document.addEventListener("DOMContentLoaded", () => {
  const themeSelects = document.querySelectorAll(
    "starlight-theme-select select",
  );

  themeSelects.forEach((select) => {
    select.addEventListener("change", () => {
      document.documentElement.classList.add("transitioning");
      setTimeout(() => {
        document.documentElement.classList.remove("transitioning");
      }, 500); // Match this to your CSS transition time
    });
  });

  // Also respond to system theme changes
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", () => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "auto") {
      document.documentElement.classList.add("transitioning");
      setTimeout(() => {
        document.documentElement.classList.remove("transitioning");
      }, 500);
    }
  });
});
