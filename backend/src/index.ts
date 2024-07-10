import cors from "cors";
import express, { Request, Response } from "express";

import UserRouter from "./routers/userRouter";

/* setup express */
const app = express();
const port = 3000;

/* middleware */
app.use(cors());
app.use(express.json());

/* go to routes */
app.use("/user", UserRouter);

/* frontend/other */
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript, ESLint, Prettier, and Express!");
});

/* begin listening */
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
