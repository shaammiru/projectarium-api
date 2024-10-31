import { Hono } from "hono";

export const userRoute = new Hono()
  .get("/profile", async (c) => {
    return c.json({
      message: "get profile success",
      error: null,
      data: "TODO",
    });
  })
  .put("/profile", async (c) => {
    return c.json({
      message: "update profile success",
      error: null,
      data: "TODO",
    });
  })
  .post("/profile/picture", async (c) => {
    return c.json({
      message: "upload profile picture success",
      error: null,
      data: "TODO",
    });
  });
