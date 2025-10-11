import "../styles/Loader.css";

export default function Loader(): HTMLDivElement {
  const loader = document.createElement("div");
  loader.className = "loader";

  // Set background color based on saved theme
  const savedTheme = localStorage.getItem("theme");
  loader.style.backgroundColor = savedTheme === "dark" ? "#242424" : "#f5f5f5";

  const loaderContainer = document.createElement("div");
  loaderContainer.className = "loader-container";

  const box1 = document.createElement("div");
  box1.className = "loader-container-box";
  const box2 = document.createElement("div");
  box2.className = "loader-container-box";
  const box3 = document.createElement("div");
  box3.className = "loader-container-box";
  const box4 = document.createElement("div");
  box4.className = "loader-container-box";
  const box5 = document.createElement("div");
  box5.className = "loader-container-box";

  loader.appendChild(loaderContainer);
  loaderContainer.appendChild(box1);
  loaderContainer.appendChild(box2);
  loaderContainer.appendChild(box3);
  loaderContainer.appendChild(box4);
  loaderContainer.appendChild(box5);

  return loader;
}
