import { Router } from "express";
import { verifyAdmin, verifyToken, verifyUser } from "../middleware/auth.mw";
import { validateBody, validateParams } from "../middleware/valid.mw";
import userValid from "../validation/user.valid";
import userService from "../service/user.service";

const router = Router();

router.param("id", validateParams());

router.post(
  "/",
  verifyToken,
  verifyAdmin,
  validateBody(userValid.create),
  userService.create
);

router.get("/", verifyToken, verifyAdmin, userService.list);

router.get("/:id", userService.getById);

router.put(
  "/:id",
  verifyToken,
  verifyUser,
  validateBody(userValid.update),
  userService.updateById
);

router.delete("/:id", verifyToken, verifyAdmin, userService.deleteById);

export default router;
