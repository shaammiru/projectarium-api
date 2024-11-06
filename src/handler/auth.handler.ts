import { Router } from "express";
import validate from "../middleware/valid.mw";
import authValid from "../validation/auth.valid";
import authService from "../service/auth.service";

const router = Router();

router.post(
  "/register",
  validate.body(authValid.register),
  authService.register
);

router.post("/login", validate.body(authValid.login), authService.login);

export default router;
