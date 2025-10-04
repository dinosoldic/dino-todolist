import { ColorSchemeButton, NavBar } from "./components";

export default function App(root: HTMLElement, serverUrl: string) {
  // import
  const navbar = NavBar();

  // render
  root.appendChild(navbar);
}
