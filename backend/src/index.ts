import cors from "cors";
import express, { Request, Response } from "express";

import { handleErrors } from "./middleware/handleErrors";
import EventRouter from "./routers/eventRouter";
import UserRouter from "./routers/userRouter";

/* setup express */
const app = express();
const port = 3000;

/* request middleware */
app.use(cors());
app.use(express.json());

/* go to routes */
app.use("/user", UserRouter);
app.use("/event", EventRouter);

/* frontend/other */
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript, ESLint, Prettier, and Express!");
});

/* response middleware */
app.use(handleErrors);
/* begin listening */
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
