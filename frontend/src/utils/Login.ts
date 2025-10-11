import { HidePass, ShowPass } from "../constants/SVGIcons";
import "../styles/Login.css";

export default function Login(
  serverUrl: string,
  onSuccess: () => void
): HTMLDivElement {
  const login = document.createElement("div");
  login.className = "login";

  // Set background color based on saved theme
  const savedTheme = localStorage.getItem("theme");
  login.style.backgroundColor = savedTheme === "dark" ? "#242424" : "#f5f5f5";
  login.style.color = savedTheme === "dark" ? "#f5f5f5" : "#213547";

  const loginForm = document.createElement("form");
  loginForm.className = "login-form";

  const loginContainer = document.createElement("div");
  loginContainer.className = "login-container";

  const passContainer = document.createElement("div");
  passContainer.className = "pass-container";

  const passTitle = document.createElement("div");
  passTitle.className = "pass-container-pass-title";
  passTitle.textContent = "Password";

  const pass = document.createElement("input");
  pass.type = "password";
  pass.id = "password";
  pass.name = "password";
  pass.style.backgroundColor = savedTheme === "dark" ? "#242424" : "#f5f5f5";
  pass.style.color = savedTheme === "dark" ? "#f5f5f5" : "#213547";

  const showPass = document.createElement("div");
  showPass.title = "Show/hide password";
  showPass.className = "pass-container-showpass";
  showPass.addEventListener("click", () => {
    if (pass.type === "password") {
      pass.type = "text";
      showPass.replaceChildren(HidePass());
    } else {
      pass.type = "password";
      showPass.replaceChildren(ShowPass());
    }
  });

  const submit = document.createElement("button");
  submit.title = "Log In";
  submit.textContent = "Log In";
  submit.className = "login-submit";
  pass.style.color = savedTheme === "dark" ? "#f5f5f5" : "#213547";

  login.appendChild(loginForm);
  loginForm.appendChild(loginContainer);
  loginContainer.appendChild(passTitle);
  loginContainer.appendChild(passContainer);
  passContainer.appendChild(pass);
  passContainer.appendChild(showPass);
  showPass.appendChild(ShowPass());
  loginForm.appendChild(submit);

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const password = pass.value;

    try {
      const res = await fetch(`${serverUrl}/tasks-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pass": password,
        },
      });

      if (res.ok) {
        // store password for future requests
        document.cookie = `pass=${password}; max-age=${604800}; path=/; SameSite=Strict`;
        onSuccess(); // render app after successful login
      } else {
        alert("Invalid password");
      }
    } catch (err) {
      console.error("Error logging in");
    }
  });

  return login;
}
