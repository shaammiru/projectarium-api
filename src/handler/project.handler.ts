import { Router } from "express";
import { checkToken, verifyToken } from "../middleware/auth.mw";
import { imageUpload } from "../middleware/multer.mw";
import validate from "../middleware/valid.mw";
import projectValid from "../validation/project.valid";
import projectService from "../service/project.service";

const router = Router();

router.param("id", validate.params());

router.post(
  "/",
  verifyToken,
  imageUpload.array("images"),
  validate.image("images"),
  validate.body(projectValid.create),
  projectService.create
);

router.get("/", checkToken, projectService.list);

router.get("/:id", checkToken, projectService.getById);

router.put(
  "/:id",
  verifyToken,
  imageUpload.array("images"),
  validate.imageUpdate,
  validate.body(projectValid.update),
  projectService.updateById
);

router.delete("/:id", verifyToken, projectService.deleteById);

router.post("/:id/like", verifyToken, projectService.userLike);

router.post("/:id/dislike", verifyToken, projectService.userDislike);

export default router;
