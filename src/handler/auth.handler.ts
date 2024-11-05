import { Router } from "express";
import { validateBody } from "../middleware/valid.mw";
import authValid from "../validation/auth.valid";
import authService from "../service/auth.service";

const router = Router();

router.post(
  "/register",
  validateBody(authValid.register),
  authService.register
);

router.post("/login", validateBody(authValid.login), authService.login);

export default router;
