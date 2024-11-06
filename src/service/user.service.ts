import { NextFunction, Request, Response } from "express";
import authHelper from "../helper/auth.helper";
import userData from "../data/user.data";
import responseBody from "../helper/response.helper";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.password = await authHelper.hashPassword(req.body.password);
    const user = await userData.create(req.body);

    return res.status(201).json(responseBody("register success", null, user));
  } catch (error) {
    next(error);
  }
};

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userData.list();

    return res
      .status(200)
      .json(responseBody("list users success", null, users));
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userData.getById(req.params.id);

    return res
      .status(200)
      .json(responseBody("get user by id success", null, user));
  } catch (error) {
    next(error);
  }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.password = await authHelper.hashPassword(req.body.password);
    const users = await userData.updateById(req.params.id, req.body);

    return res
      .status(200)
      .json(responseBody("update user success", null, users));
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userData.deleteById(req.params.id);

    return res
      .status(200)
      .json(responseBody("delete user success", null, users));
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  list,
  getById,
  updateById,
  deleteById,
};
