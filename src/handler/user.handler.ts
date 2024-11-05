import { Router } from "express";
import { verifyToken } from "../middleware/auth.mw";
import { validateBody } from "../middleware/valid.mw";
import userValid from "../validation/user.valid";
import userService from "../service/user.service";

const router = Router();

router.post("/", validateBody(userValid.create), userService.create);

router.get("/", verifyToken, userService.list);

export default router;
