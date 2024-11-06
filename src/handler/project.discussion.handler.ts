import { Router } from "express";
import { verifyToken } from "../middleware/auth.mw";
import validate from "../middleware/valid.mw";
import discussionValid from "../validation/discussion.valid";
import projectDiscussionService from "../service/project.discussion.service";

const router = Router();

router.param("id", validate.params());

router.post(
  "/",
  verifyToken,
  validate.body(discussionValid.create),
  projectDiscussionService.create
);

router.get("/", validate.query(), projectDiscussionService.list);

router.get("/:id", projectDiscussionService.getById);

router.delete("/:id", verifyToken, projectDiscussionService.deleteById);

router.post(
  "/:id/reply",
  verifyToken,
  validate.body(discussionValid.reply),
  projectDiscussionService.createReply
);

export default router;
