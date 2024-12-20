import { Router } from "express";
import { verifyAdmin, verifyToken, verifyUser } from "../middleware/auth.mw";
import validate from "../middleware/valid.mw";
import userValid from "../validation/user.valid";
import userService from "../service/user.service";

const router = Router();

router.param("id", validate.params());

router.post(
  "/",
  verifyToken,
  verifyAdmin,
  validate.body(userValid.create),
  userService.create
);

router.get("/", verifyToken, verifyAdmin, userService.list);

router.get("/profile", verifyToken, userService.getProfile);

router.put(
  "/profile",
  verifyToken,
  verifyUser,
  validate.body(userValid.update),
  userService.updateById
);

router.get("/:id", userService.getById);

router.delete("/:id", verifyToken, verifyAdmin, userService.deleteById);

export default router;
