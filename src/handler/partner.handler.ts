import { Router } from "express";
import { verifyToken } from "../middleware/auth.mw";
import validate from "../middleware/valid.mw";
import projectValid from "../validation/project.valid";
import projectService from "../service/project.service";

const router = Router();

router.param("id", validate.params());

router.post(
  "/",
  verifyToken,
  validate.body(projectValid.create),
  projectService.create
);

router.get("/", projectService.list);

router.get("/:id", projectService.getById);

router.put(
  "/:id",
  verifyToken,
  validate.body(projectValid.update),
  projectService.updateById
);

router.delete("/:id", verifyToken, projectService.deleteById);

router.post("/:id/like", verifyToken, projectService.userLike);

router.post("/:id/dislike", verifyToken, projectService.userDislike);

export default router;
