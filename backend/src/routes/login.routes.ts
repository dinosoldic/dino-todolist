import express from "express";
import { CheckPassword } from "../auth/CheckPassword";

const Login = express.Router();

Login.post("/tasks-login", CheckPassword, async (_req, res) => {
  return res.status(200).send("ok");
});

export default Login;
