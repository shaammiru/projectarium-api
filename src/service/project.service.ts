import { NextFunction, Request, Response } from "express";
import projectData from "../data/project.data";
import responseBody from "../helper/response.helper";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectTags = (
      typeof req.body.projectTags === "string"
        ? req.body.projectTags.split(",").map((tag: string) => tag.trim())
        : req.body.projectTags || []
    ).map((tag: string) => ({ name: tag }));

    req.body.projectTags = projectTags;

    const project = await projectData.create(req.body);

    return res
      .status(201)
      .json(responseBody("create project success", null, project));
  } catch (error) {
    next(error);
  }
};

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await projectData.list();

    return res
      .status(200)
      .json(responseBody("list projects success", null, projects));
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await projectData.getById(req.params.id);

    return res
      .status(200)
      .json(responseBody("get project by id success", null, user));
  } catch (error) {
    next(error);
  }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await projectData.updateById(req.params.id, req.body);

    return res
      .status(200)
      .json(responseBody("update project success", null, project));
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await projectData.deleteById(req.params.id);

    return res
      .status(200)
      .json(responseBody("delete project success", null, project));
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
