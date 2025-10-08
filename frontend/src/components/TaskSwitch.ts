import { AddIcon, CheckIcon } from "../constants/SVGIcons";
import "../styles/TaskSwitch.css";

export default function TaskSwitch(): {
  element: HTMLDivElement;
  getState: () => boolean;
  onChange: (callback: (state: boolean) => void) => void;
} {
  const switchContainer = document.createElement("div");
  switchContainer.className = "switch-container";

  const switchBtn = document.createElement("div");
  switchBtn.className = "task-switch";

  let state = false; // initial state
  const listeners: ((state: boolean) => void)[] = [];

  const toggle = () => {
    state = !state;
    switchBtn.classList.toggle("on", state);
    listeners.forEach((cb) => cb(state));
  };

  switchBtn.addEventListener("click", toggle);

  switchContainer.appendChild(AddIcon());
  switchContainer.appendChild(switchBtn);
  switchContainer.appendChild(CheckIcon());

  return {
    element: switchContainer,
    getState: () => state,
    onChange: (callback: (state: boolean) => void) => {
      listeners.push(callback);
    },
  };
}
