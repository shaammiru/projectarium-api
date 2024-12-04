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
    .min(4)
    .allow(null),
  fullname: joi.string().min(4).allow(null),
  password: joi.string().min(8).allow(null, ""),
  birthdate: joi.string().isoDate().allow(null),
  bio: joi.string().allow(null),
  userLinks: joi
    .alternatives()
    .try(joi.string().uri(), joi.array().items(joi.string().uri()))
    .allow(null),
});

export default {
  create,
  update,
};
