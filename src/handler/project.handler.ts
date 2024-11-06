import { Router } from "express";
import { verifyToken } from "../middleware/auth.mw";
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

router.get("/", projectService.list);

router.get("/:id", projectService.getById);

router.put(
  "/:id",
  verifyToken,
  imageUpload.array("images"),
  validate.imageUpdate,
  validate.body(projectValid.update),
  projectService.updateById
);

router.delete("/:id", verifyToken, projectService.deleteById);

export default router;
