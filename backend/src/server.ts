import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

// Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }, // Restrict access to same-origin only
  })
);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Allow requests from the frontend dev server
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

// Routes

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
