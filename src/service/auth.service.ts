import { NextFunction, Request, Response } from "express";
import authHelper from "../helper/auth.helper";
import userService from "../data/user.data";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.create(req.body);

    return res.status(201).json({
      message: "register success",
      error: null,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await userService.getByUsername(username);

    if (!user) {
      return res
        .status(404)
        .json({ message: "user not found", error: null, data: null });
    }

    const isPasswordMatch = await authHelper.comparePassword(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "incorrect username or password",
        error: null,
        data: null,
      });
    }

    const token = authHelper.generateToken({
      id: user.id,
      username: user.username,
      fullname: user.fullname,
    });

    return res.status(200).json({
      message: "login success",
      error: null,
      data: {
        token: token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
};
