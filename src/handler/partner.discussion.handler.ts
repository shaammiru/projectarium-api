import { Router } from "express";
import { verifyToken } from "../middleware/auth.mw";
import validate from "../middleware/valid.mw";
import discussionValid from "../validation/discussion.valid";
import partnerDiscussionService from "../service/partner.discussion.service";

const router = Router();

router.param("id", validate.params());

router.post(
  "/",
  verifyToken,
  validate.body(discussionValid.createPartner),
  partnerDiscussionService.create
);

router.get("/", validate.queryPartner(), partnerDiscussionService.list);

router.get("/:id", partnerDiscussionService.getById);

router.delete("/:id", verifyToken, partnerDiscussionService.deleteById);

router.post(
  "/:id/reply",
  verifyToken,
  validate.body(discussionValid.reply),
  partnerDiscussionService.createReply
);

export default router;
