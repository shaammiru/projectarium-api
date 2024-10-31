import { Hono } from "hono";

export const userRoute = new Hono()
  .get("/", async (c) => {
    return c.json({
      message: "get all users success",
      error: null,
      data: "TODO",
    });
  })
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
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    return c.json({
      message: "get user by id success",
      error: null,
      data: id,
    });
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    return c.json({
      message: "delete user by id success",
      error: null,
      data: id,
    });
  });
