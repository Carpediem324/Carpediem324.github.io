// Apply saved appearance before CSS and the React bundle render the page.
try {
  document.documentElement.classList.toggle("dark", localStorage.getItem("portfolio-theme") === "dark");
  document.documentElement.lang = localStorage.getItem("portfolio-language") === "en" ? "en" : "ko";
} catch {
  // The default appearance works when browser storage is unavailable.
}
