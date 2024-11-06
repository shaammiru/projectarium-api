import joi from "joi";

const create = joi.object({
  title: joi.string().min(4).required(),
  userId: joi.string().uuid({ version: "uuidv4" }).required(),
  content: joi.string().required(),
  validUntil: joi.string().isoDate().required(),
  partnerTags: joi
    .alternatives()
    .try(joi.string(), joi.array().items(joi.string())),
  partnerLinks: joi
    .alternatives()
    .try(joi.string().uri(), joi.array().items(joi.string().uri())),
});

const update = joi.object({
  title: joi.string().min(4),
  userId: joi.string().uuid({ version: "uuidv4" }),
  content: joi.string(),
  validUntil: joi.string().isoDate(),
  partnerTags: joi
    .alternatives()
    .try(joi.string(), joi.array().items(joi.string())),
  partnerLinks: joi
    .alternatives()
    .try(joi.string().uri(), joi.array().items(joi.string().uri())),
});

export default {
  create,
  update,
};
