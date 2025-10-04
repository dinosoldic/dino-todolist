import "./styles/global.css";
import App from "./App.ts";

const appRoot = document.getElementById("root")!;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// Initialize the App
App(appRoot, SERVER_URL);
