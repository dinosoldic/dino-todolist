import { Request, Response, NextFunction } from "express";

export function CheckPassword(req: Request, res: Response, next: NextFunction) {
  const pass = req.headers["x-admin-pass"];
  if (pass === process.env.APP_PASS) {
    return next(); // authorized
  }
  return res.status(401).json({ ok: false, msg: "Unauthorized" });
}
