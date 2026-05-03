const themeButton = document.getElementById("themeButton");
const body = document.body;

function applyTheme(isDark) {
  body.classList.toggle("dark", isDark);
  themeButton.textContent = isDark ? "라이트 모드" : "다크 모드";
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme === "dark");

themeButton?.addEventListener("click", () => {
  applyTheme(!body.classList.contains("dark"));
});
