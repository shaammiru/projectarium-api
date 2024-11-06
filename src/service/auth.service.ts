import { NextFunction, Request, Response } from "express";
import authHelper from "../helper/auth.helper";
import userData from "../data/user.data";
import responseBody from "../helper/response.helper";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.password = await authHelper.hashPassword(req.body.password);
    const user = await userData.create(req.body);

    return res.status(201).json(responseBody("register success", null, user));
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await userData.getByUsername(username);

    if (!user) {
      return res.status(404).json(responseBody("user not found", null, null));
    }

    const isPasswordMatch = await authHelper.comparePassword(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json(responseBody("incorrect username or password", null, null));
    }

    const token = authHelper.generateToken({
      id: user.id,
      username: user.username,
      fullname: user.fullname,
      role: user.role,
    });

    return res.status(200).json(responseBody("login success", null, { token }));
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
};
