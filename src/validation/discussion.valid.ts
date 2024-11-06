import joi from "joi";

const create = joi.object({
  comment: joi.string().required(),
  projectId: joi.string().required(),
});

const reply = joi.object({
  comment: joi.string().required(),
});

export default {
  create,
  reply,
};
