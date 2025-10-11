import express from "express";

const GetStatus = express.Router();

GetStatus.get("/test-status", async (_req, res) => {
  res.status(200).send("Server is working");
});

export default GetStatus;
