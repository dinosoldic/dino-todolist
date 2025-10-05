import "../styles/ColorSchemeButton.css";

export default function ColorSchemeButton(): HTMLButtonElement {
  // check preferred theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  }

  // theme switch icon
  const csbutton = document.createElement("button");
  csbutton.className = "color-scheme-btn";
  csbutton.title = "Theme";

  // make icon svg
  const svgNS = "http://www.w3.org/2000/svg";
  const icon = document.createElementNS(svgNS, "svg");
  icon.setAttribute("width", "24");
  icon.setAttribute("height", "24");
  icon.setAttribute("viewBox", "0 0 16 16");
  icon.style.display = "block";

  const path = document.createElementNS(svgNS, "path");
  path.setAttribute(
    "d",
    "M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5"
  );
  path.setAttribute("fill", "currentColor");

  // append
  csbutton.appendChild(icon);
  icon.appendChild(path);

  csbutton.addEventListener("click", () => {
    // Toggle a "dark" class on <html> for dark/light theme
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light"); // save user choice
  });

  return csbutton;
}
