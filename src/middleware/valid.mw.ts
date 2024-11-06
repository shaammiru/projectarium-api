import { Request, Response, NextFunction } from "express";
import { validateBufferMIMEType } from "validate-image-type";
import { MulterError } from "multer";
import joi from "joi";

const paramsSchema = joi.object({
  id: joi
    .string()
    .uuid({ version: "uuidv4" })
    .message("Invalid UUID format")
    .required(),
});

const querySchema = joi.object({
  project_id: joi
    .string()
    .uuid({ version: "uuidv4" })
    .message("Invalid UUID format")
    .required(),
});

const params = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await paramsSchema.validateAsync(req.params);
      next();
    } catch (error) {
      next(error);
    }
  };
};

const query = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await querySchema.validateAsync(req.query as any);
      next();
    } catch (error) {
      next(error);
    }
  };
};

const body = (schema: joi.ObjectSchema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validData = await schema.validateAsync(req.body);
      req.body = validData;

      next();
    } catch (error) {
      next(error);
    }
  };
};

const image = (fieldName: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res
        .status(400)
        .json({ error: `image files for "${fieldName}" are required` });
    }

    for (const file of req.files) {
      const validationResult = await validateBufferMIMEType(file.buffer, {
        originalFilename: file.originalname,
        allowMimeTypes: ["image/jpeg", "image/jpg", "image/png"],
      });

      if (validationResult.error) {
        return next(
          new MulterError("LIMIT_UNEXPECTED_FILE", "file type not allowed")
        );
      }
    }

    next();
  };
};

const imageUpdate = async (req: Request, res: Response, next: NextFunction) => {
  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    for (const file of req.files) {
      const validationResult = await validateBufferMIMEType(file.buffer, {
        originalFilename: file.originalname,
        allowMimeTypes: ["image/jpeg", "image/jpg", "image/png"],
      });

      if (validationResult.error) {
        return next(
          new MulterError("LIMIT_UNEXPECTED_FILE", "File type not allowed")
        );
      }
    }
  }

  next();
};

export default {
  params,
  query,
  body,
  image,
  imageUpdate,
};
