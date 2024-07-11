import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

// Define an interface for the user object
interface UserPayload extends JwtPayload {
  id: string; // Adjust based on the actual structure of your JWT payload
  username: string; // Adjust based on the actual structure of your JWT payload
  // Add other properties as needed
}

// Extend the express Request interface to include the user property
declare module "express-serve-static-core" {
  interface Request {
    user?: UserPayload;
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      req.user = decoded as UserPayload; // Cast decoded payload to UserPayload
      next();
    },
  );
};
