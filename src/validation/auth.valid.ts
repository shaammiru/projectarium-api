import joi from "joi";

const register = joi.object({
  username: joi
    .string()
    .regex(/^[a-zA-Z0-9_-]+$/)
    .min(4)
    .required(),
  fullname: joi.string().min(4).required(),
  password: joi.string().min(8).required(),
  birthdate: joi.string().isoDate().required(),
});

const login = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});

export default {
  register,
  login,
};
