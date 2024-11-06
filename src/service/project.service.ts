import { NextFunction, Request, Response } from "express";
import projectData from "../data/project.data";
import reponseHelper from "../helper/response.helper";
import imageHelper from "../helper/image.helper";

const create = async (req: any, res: Response, next: NextFunction) => {
  try {
    const projectTags = (
      typeof req.body.projectTags === "string"
        ? req.body.projectTags.split(",").map((tag: string) => tag.trim())
        : req.body.projectTags || []
    ).map((tag: string) => ({ name: tag }));

    const imageUrls = await imageHelper.upload(
      req.files as Express.Multer.File[]
    );
    const mappedImages = imageUrls.map((url: string) => ({ imageUrl: url }));

    req.body.userId = req.user.id;
    req.body.projectImages = mappedImages;
    req.body.projectTags = projectTags;

    const project = await projectData.create(req.body);

    return res
      .status(201)
      .json(reponseHelper("create project success", null, project));
  } catch (error) {
    next(error);
  }
};

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await projectData.list();

    return res
      .status(200)
      .json(reponseHelper("list projects success", null, projects));
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await projectData.getById(req.params.id);

    return res
      .status(200)
      .json(reponseHelper("get project by id success", null, user));
  } catch (error) {
    next(error);
  }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await projectData.updateById(req.params.id, req.body);

    return res
      .status(200)
      .json(reponseHelper("update project success", null, project));
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await projectData.deleteById(req.params.id);

    return res
      .status(200)
      .json(reponseHelper("delete project success", null, project));
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
