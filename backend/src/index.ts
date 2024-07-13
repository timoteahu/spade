import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
// import { expressjwt } from "express-jwt";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import { authenticateToken } from "./middleware/authMiddleware";
import { handleErrors } from "./middleware/handleErrors";
import EventRouter from "./routers/eventRouter";
import UserRouter from "./routers/userRouter";
/* setup express */
const app = express();
const port = 3000;
dotenv.config();

/* request middleware */
app.use(cors());
app.use(helmet());
app.use(express.json());

/* rate limiter (prevent api abuse/overload) */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

/* go to routes */
app.use("/user", UserRouter);
app.use("/event", authenticateToken, EventRouter);

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

// /* authentication middleware */
// app.use(
//   expressjwt({
//     secret: process.env.JWT_SECRET!,
//     algorithms: ["HS256"],
//   }).unless({ path: ["/"] }),
// );
export default app;
