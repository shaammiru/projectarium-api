import { Router } from "express";
import { verifyToken } from "../middleware/auth.mw";
import validate from "../middleware/valid.mw";
import partnerValid from "../validation/partner.valid";
import partnerService from "../service/partner.service";

const router = Router();

router.param("id", validate.params());

router.post(
  "/",
  verifyToken,
  validate.body(partnerValid.create),
  partnerService.create
);

router.get("/", partnerService.list);

router.get("/:id", partnerService.getById);

router.put(
  "/:id",
  verifyToken,
  validate.body(partnerValid.update),
  partnerService.updateById
);

router.delete("/:id", verifyToken, partnerService.deleteById);

router.post("/:id/like", verifyToken, partnerService.userLike);

router.post("/:id/dislike", verifyToken, partnerService.userDislike);

export default router;
