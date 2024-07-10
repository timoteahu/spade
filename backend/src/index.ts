import express, { Request, Response } from "express";

import UserRouter from "./routers/userRouter";

const app = express();

const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript, ESLint, Prettier, and Express!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.use("/user", UserRouter);
