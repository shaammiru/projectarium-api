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

    const projectLinks = (
      typeof req.body.projectTags === "string"
        ? req.body.projectLinks.split(",").map((url: string) => url.trim())
        : req.body.projectLinks || []
    ).map((url: string) => ({ url: url }));

    const imageUrls = await imageHelper.upload(
      req.files as Express.Multer.File[]
    );
    const mappedImages = imageUrls.map((url: string) => ({ imageUrl: url }));

    req.body.userId = req.user.id;
    req.body.projectImages = mappedImages;
    req.body.projectTags = projectTags;
    req.body.projectLinks = projectLinks;

    const project = await projectData.create(req.body);

    return res
      .status(201)
      .json(reponseHelper("create project success", null, project));
  } catch (error) {
    next(error);
  }
};

const list = async (req: any, res: Response, next: NextFunction) => {
  try {
    const projects = await projectData.list();

    const projectsWithIsLiked = projects.map((project) => ({
      ...project,
      isLiked: req.user
        ? project.projectLikes.some((like) => like.userId === req.user.id)
        : false,
    }));

    return res
      .status(200)
      .json(reponseHelper("list projects success", null, projectsWithIsLiked));
  } catch (error) {
    next(error);
  }
};

const getById = async (req: any, res: Response, next: NextFunction) => {
  try {
    const project = await projectData.getById(req.params.id);

    if (!project) {
      return res
        .status(404)
        .json(reponseHelper("project not found", null, null));
    }

    const isLiked = req.user
      ? project.projectLikes.some((like) => like.userId === req.user.id)
      : false;

    const projectWithIsLiked = {
      ...project,
      isLiked,
    };

    return res
      .status(200)
      .json(
        reponseHelper("get project by id success", null, projectWithIsLiked)
      );
  } catch (error) {
    next(error);
  }
};

const updateById = async (req: any, res: Response, next: NextFunction) => {
  try {
    const projectTags = (
      typeof req.body.projectTags === "string"
        ? req.body.projectTags.split(",").map((tag: string) => tag.trim())
        : req.body.projectTags || []
    ).map((tag: string) => ({ name: tag }));

    const projectLinks = (
      typeof req.body.projectTags === "string"
        ? req.body.projectLinks.split(",").map((url: string) => url.trim())
        : req.body.projectLinks || []
    ).map((url: string) => ({ url: url }));

    req.body.userId = req.user.id;
    req.body.projectTags = projectTags;
    req.body.projectLinks = projectLinks;

    if (req.files && req.files.length > 0) {
      const projectId = req.params.id;

      const existingProjectImages = await projectData.listProjectImages(
        projectId
      );

      for (const image of existingProjectImages) {
        await imageHelper.remove(image.imageUrl);
      }

      const imageUrls = await imageHelper.upload(
        req.files as Express.Multer.File[]
      );
      const mappedImages = imageUrls.map((url: string) => ({ imageUrl: url }));

      req.body.projectImages = mappedImages;
    }

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
    const existingProjectImages = await projectData.listProjectImages(
      req.params.id
    );
    const project = await projectData.deleteById(req.params.id);

    for (const image of existingProjectImages) {
      await imageHelper.remove(image.imageUrl);
    }

    return res
      .status(200)
      .json(reponseHelper("delete project success", null, project));
  } catch (error) {
    next(error);
  }
};

const userLike = async (req: any, res: Response, next: NextFunction) => {
  try {
    await projectData.createLikeById(req.user.id, req.params.id);
    const likeCount = await projectData.getLikeById(req.params.id);

    return res
      .status(200)
      .json(reponseHelper("like project success", null, { likeCount }));
  } catch (error) {
    next(error);
  }
};

const userDislike = async (req: any, res: Response, next: NextFunction) => {
  try {
    await projectData.deletLikeById(req.user.id, req.params.id);
    const likeCount = await projectData.getLikeById(req.params.id);

    return res
      .status(200)
      .json(reponseHelper("dislike project success", null, { likeCount }));
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
  userLike,
  userDislike,
};
