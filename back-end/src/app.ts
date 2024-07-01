import express, { Request, Response } from "express";
// import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
import messageRouter from "./routes/messages";
import userRouter from "./routes/users";
import cookieParser from "cookie-parser";
import http from "http";
import path from "path";

// const __dirname = path.resolve();
dotenv.config();
export const app = express();

export const server = http.createServer(app);
// app.use(cors());
app.use(express.json()); // for parsing application/json from request body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});
app.use(express.static(path.join(__dirname, "/front-end/dist")));

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "front-end", "dist", "index.html"));
});

export default app;
