// src/app.ts
import express from "express";
import type { Application, Request, Response } from "express";
import cors from "cors";
import { userRoute } from "./modules/auth/auth.route";
import { authRoute } from "./modules/user/user.route";

const app: Application = express();

// Parsers & Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Routes - THIS IS KEY
app.use("/api/auth", userRoute);

//app.use("/api/user", authRoute);

app.use("/api/auth", authRoute);

// Base route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express Server running smoothly",
    author: "Cute Programmer"
  });
});

export default app;