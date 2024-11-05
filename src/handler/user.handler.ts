import { Router } from "express";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    res.status(201).json({
      message: "create user success",
      error: null,
      data: "TODO",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json({
      message: "list users success",
      error: null,
      data: "TODO",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
