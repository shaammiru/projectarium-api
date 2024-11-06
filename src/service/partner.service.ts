import { NextFunction, Request, Response } from "express";
import partnerData from "../data/partner.data";
import reponseHelper from "../helper/response.helper";

const create = async (req: any, res: Response, next: NextFunction) => {
  try {
    const partnerTags = (
      typeof req.body.partnerTags === "string"
        ? req.body.partnerTags.split(",").map((tag: string) => tag.trim())
        : req.body.partnerTags || []
    ).map((tag: string) => ({ name: tag }));

    const partnerLinks = (
      typeof req.body.partnerTags === "string"
        ? req.body.partnerLinks.split(",").map((url: string) => url.trim())
        : req.body.partnerLinks || []
    ).map((url: string) => ({ url: url }));

    req.body.userId = req.user.id;
    req.body.partnerTags = partnerTags;
    req.body.partnerLinks = partnerLinks;

    const partner = await partnerData.create(req.body);

    return res
      .status(201)
      .json(reponseHelper("create partner success", null, partner));
  } catch (error) {
    next(error);
  }
};

const list = async (req: any, res: Response, next: NextFunction) => {
  try {
    const partners = await partnerData.list();

    const partnersWithIsLiked = partners.map((partner) => ({
      ...partner,
      isLiked: req.user
        ? partner.partnerLikes.some((like) => like.userId === req.user.id)
        : false,
    }));

    return res
      .status(200)
      .json(reponseHelper("list partners success", null, partnersWithIsLiked));
  } catch (error) {
    next(error);
  }
};

const getById = async (req: any, res: Response, next: NextFunction) => {
  try {
    const partner = await partnerData.getById(req.params.id);

    if (!partner) {
      return res
        .status(404)
        .json(reponseHelper("partner not found", null, null));
    }

    const isLiked = req.user
      ? partner.partnerLikes.some((like) => like.userId === req.user.id)
      : false;

    const partnerWithIsLiked = {
      ...partner,
      isLiked,
    };

    return res
      .status(200)
      .json(
        reponseHelper("get partner by id success", null, partnerWithIsLiked)
      );
  } catch (error) {
    next(error);
  }
};

const updateById = async (req: any, res: Response, next: NextFunction) => {
  try {
    const partnerTags = (
      typeof req.body.partnerTags === "string"
        ? req.body.partnerTags.split(",").map((tag: string) => tag.trim())
        : req.body.partnerTags || []
    ).map((tag: string) => ({ name: tag }));

    const partnerLinks = (
      typeof req.body.partnerTags === "string"
        ? req.body.partnerLinks.split(",").map((url: string) => url.trim())
        : req.body.partnerLinks || []
    ).map((url: string) => ({ url: url }));

    req.body.userId = req.user.id;
    req.body.partnerTags = partnerTags;
    req.body.partnerLinks = partnerLinks;

    const partner = await partnerData.updateById(req.params.id, req.body);

    return res
      .status(200)
      .json(reponseHelper("update partner success", null, partner));
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const partner = await partnerData.deleteById(req.params.id);

    return res
      .status(200)
      .json(reponseHelper("delete partner success", null, partner));
  } catch (error) {
    next(error);
  }
};

const userLike = async (req: any, res: Response, next: NextFunction) => {
  try {
    await partnerData.createLikeById(req.user.id, req.params.id);
    const likeCount = await partnerData.getLikeById(req.params.id);

    return res
      .status(200)
      .json(reponseHelper("like partner success", null, { likeCount }));
  } catch (error) {
    next(error);
  }
};

const userDislike = async (req: any, res: Response, next: NextFunction) => {
  try {
    await partnerData.deletLikeById(req.user.id, req.params.id);
    const likeCount = await partnerData.getLikeById(req.params.id);

    return res
      .status(200)
      .json(reponseHelper("dislike partner success", null, { likeCount }));
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
