import { NextFunction, Request, Response } from "express";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(201).json({
      message: "create user success",
      error: null,
      data: "TODO",
    });
  } catch (error) {
    next(error);
  }
};

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      message: "list users success",
      error: null,
      data: "TODO",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  list,
};
