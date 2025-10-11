import "./styles/global.css";
import App from "./App";
import Loader from "./utils/Loader";
import Login from "./utils/Login";
import GetCookies from "./utils/GetCookies";

const appRoot = document.getElementById("root")!;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

async function checkServer(url: string, retries = 50, delay = 500) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(`${url}/test-status`);
      if (res.ok) return true;
    } catch {}
    await new Promise((r) => setTimeout(r, delay));
  }
  return false;
}

async function init() {
  const loader = Loader();
  appRoot.appendChild(loader);

  const ready = await checkServer(SERVER_URL);
  if (ready) {
    appRoot.removeChild(loader);

    const pass = GetCookies("pass");

    if (pass) {
      // Password exists: skip login
      App(appRoot, SERVER_URL);
    } else {
      // Render login first
      const loginComponent = Login(SERVER_URL, () => {
        // This callback runs after successful login
        appRoot.innerHTML = ""; // Clear login
        App(appRoot, SERVER_URL);
      });

      appRoot.appendChild(loginComponent);
    }
  } else {
    loader.textContent = "Server not responding...";
  }
}

init();
