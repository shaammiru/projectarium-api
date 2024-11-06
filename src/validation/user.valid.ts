import joi from "joi";

const create = joi.object({
  username: joi
    .string()
    .regex(/^[a-zA-Z0-9_-]+$/)
    .min(4)
    .required(),
  fullname: joi.string().min(4).required(),
  password: joi.string().min(8).required(),
  birthdate: joi.string().isoDate().required(),
  bio: joi.string(),
  userLinks: joi
    .alternatives()
    .try(joi.string().uri(), joi.array().items(joi.string().uri())),
});

const update = joi.object({
  username: joi
    .string()
    .regex(/^[a-zA-Z0-9_-]+$/)
    .min(4),
  fullname: joi.string().min(4),
  password: joi.string().min(8),
  birthdate: joi.string().isoDate(),
  bio: joi.string(),
  userLinks: joi
    .alternatives()
    .try(joi.string().uri(), joi.array().items(joi.string().uri())),
});

export default {
  create,
  update,
};
