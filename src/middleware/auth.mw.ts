import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import responseBody from "../helper/response.helper";
import userData from "../data/user.data";

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const header = req.headers.authorization as string;

  if (!header) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
};

export const verifyUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const user = await userData.getById(req.user.id);

  if (!user) {
    return res.status(404).json(responseBody("user not found", null, null));
  }

  return next();
};

export const verifyAdmin = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const user = await userData.getById(req.user.id);

  if (!user) {
    return res.status(404).json(responseBody("user not found", null, null));
  }

  if (user.role !== "ADMIN") {
    return res.status(403).json(responseBody("forbidden", null, null));
  }

  return next();
};

export const checkToken = (req: any, res: Response, next: NextFunction) => {
  const header = req.headers.authorization as string;

  if (!header) {
    return next();
  }

  const token = header.split(" ")[1];

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    return next();
  } catch (error) {
    return next();
  }
};
