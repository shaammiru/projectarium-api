import joi from "joi";

const createProject = joi.object({
  comment: joi.string().required(),
  projectId: joi.string().required(),
});

const createPartner = joi.object({
  comment: joi.string().required(),
  partnerId: joi.string().required(),
});

const reply = joi.object({
  comment: joi.string().required(),
});

export default {
  createProject,
  createPartner,
  reply,
};
