import { NavBar, TaskTable } from "./components";

export default function App(root: HTMLElement, serverUrl: string) {
  // import
  const navbar = NavBar();
  const tasktable = TaskTable(serverUrl);

  // render
  root.appendChild(navbar);
  root.appendChild(tasktable);
}
