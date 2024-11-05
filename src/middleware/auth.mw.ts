import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  let token = req.cookies.token;

  if (!token) {
    const header = req.headers.authorization as string;
    if (!header) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    token = header.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
};
