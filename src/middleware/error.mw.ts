import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { ValidationError } from "joi";
import { MulterError } from "multer";
import responseBody from "../helper/response.helper";

const jsonErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof SyntaxError) {
    return res
      .status(400)
      .json(responseBody("invalid JSON format", err.message, null));
  }
  next(err);
};

const joiErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    return res
      .status(400)
      .json(responseBody("validation error", err.details[0].message, null));
  }

  next(err);
};

const prismaErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return res
          .status(400)
          .json(responseBody("duplicate record", err.code, null));
      case "P2003":
        return res
          .status(400)
          .json(
            responseBody("violates foreign key constraint", err.code, null)
          );
      case "P2025":
        return res
          .status(404)
          .json(responseBody("record not found", err.code, null));
      default:
        next(err);
    }
  }

  next(err);
};

const multerErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof MulterError) {
    switch (err.code) {
      case "LIMIT_UNEXPECTED_FILE":
        if (err.field === "File type not allowed") {
          return res
            .status(400)
            .json(responseBody("File type not allowed", err.message, null));
        }

        return res
          .status(400)
          .json(responseBody("Unexpected field", err.message, null));
      case "LIMIT_FILE_SIZE":
        return res
          .status(400)
          .json(responseBody("File too large", err.message, null));
      default:
        next(err);
    }
  }

  next(err);
};

const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  return res.status(500).json(responseBody("internal server error", err, null));
};

export default {
  jsonErrorHandler,
  joiErrorHandler,
  prismaErrorHandler,
  multerErrorHandler,
  errorHandler,
};
