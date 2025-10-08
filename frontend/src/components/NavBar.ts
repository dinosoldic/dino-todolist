import { Ainz, Kumoko, Rimuru } from "../constants/Imaages";
import "../styles/NavBar.css";
import ColorSchemeButton from "./ColorSchemeButton";
import { SharedTaskSwitch } from "../utils/SharedTaskSwitch";

export default function NavBar(): HTMLDivElement {
  //navbar
  const compBody = document.createElement("div");
  compBody.className = "navbar-div";

  const navbarMenu = document.createElement("div");
  navbarMenu.className = "navbar-menu";

  const navbarMenuUtilContainer = document.createElement("div");
  navbarMenuUtilContainer.className = "navbar-menu-util-container";

  // navbar text
  const navbarMenuText = document.createElement("div");
  navbarMenuText.className = "navbar-menu-text";
  navbarMenuText.textContent = "My Tasks";

  // navbar images
  const navbarMenuImages = document.createElement("div");
  navbarMenuImages.className = "navbar-menu-images";

  const navbarImg1 = document.createElement("img");
  navbarImg1.src = Rimuru;
  navbarImg1.alt = "rimuru";

  const navbarImg2 = document.createElement("img");
  navbarImg2.src = Kumoko;
  navbarImg2.alt = "kumoko";

  const navbarImg3 = document.createElement("img");
  navbarImg3.src = Ainz;
  navbarImg3.alt = "ainz";

  // import comps
  const ThemeButton = ColorSchemeButton();

  // append
  compBody.appendChild(navbarMenu);

  navbarMenu.appendChild(navbarMenuImages);
  navbarMenuImages.appendChild(navbarImg1);
  navbarMenuImages.appendChild(navbarImg2);
  navbarMenuImages.appendChild(navbarImg3);

  navbarMenu.appendChild(navbarMenuText);
  navbarMenu.appendChild(navbarMenuUtilContainer);
  navbarMenuUtilContainer.appendChild(SharedTaskSwitch.element);
  navbarMenuUtilContainer.appendChild(ThemeButton);

  return compBody;
}
