import { NextFunction, Request, Response } from "express";
import partnerDiscussionData from "../data/partner.discussion.data";
import reponseHelper from "../helper/response.helper";

const create = async (req: any, res: Response, next: NextFunction) => {
  try {
    req.body.userId = req.user.id;

    const discussion = await partnerDiscussionData.create(req.body);

    return res
      .status(201)
      .json(reponseHelper("create discussion success", null, discussion));
  } catch (error) {
    next(error);
  }
};

const createReply = async (req: any, res: Response, next: NextFunction) => {
  try {
    req.body.userId = req.user.id;

    const targetDiscussion = await partnerDiscussionData.getById(req.params.id);

    if (!targetDiscussion) {
      return res
        .status(404)
        .json(reponseHelper("discussion not found", null, null));
    }

    req.body.partnerId = targetDiscussion.partnerId;
    req.body.discussionId = targetDiscussion.id;

    const reply = await partnerDiscussionData.create(req.body);

    return res
      .status(201)
      .json(reponseHelper("create discussion reply success", null, reply));
  } catch (error) {
    next(error);
  }
};

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const partnerId = req.query.partner_id as string;

    const partnerDiscussions = await partnerDiscussionData.listByPartnerId(
      partnerId
    );

    return res
      .status(200)
      .json(
        reponseHelper("list discussions success", null, partnerDiscussions)
      );
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await partnerDiscussionData.getById(req.params.id);

    return res
      .status(200)
      .json(reponseHelper("get discussion by id success", null, user));
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await partnerDiscussionData.deleteById(req.params.id);

    return res
      .status(200)
      .json(reponseHelper("delete discussion success", null, project));
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  createReply,
  list,
  getById,
  deleteById,
};
