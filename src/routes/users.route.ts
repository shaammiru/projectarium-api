import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { checkToken } from "../utils/auth.util";

export const userRoute = new Hono()
  .get(
    "/",
    bearerAuth({
      verifyToken: checkToken,
    }),
    async (c) => {
      return c.json(
        {
          message: "get all users success",
          error: null,
          data: "TODO",
        },
        200
      );
    }
  )
  .get("/profile", async (c) => {
    return c.json(
      {
        message: "get profile success",
        error: null,
        data: "TODO",
      },
      200
    );
  })
  .put("/profile", async (c) => {
    return c.json(
      {
        message: "update profile success",
        error: null,
        data: "TODO",
      },
      200
    );
  })
  .post("/profile/picture", async (c) => {
    return c.json(
      {
        message: "upload profile picture success",
        error: null,
        data: "TODO",
      },
      201
    );
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    return c.json(
      {
        message: "get user by id success",
        error: null,
        data: id,
      },
      200
    );
  })
  .put("/:id", async (c) => {
    const id = c.req.param("id");
    return c.json(
      {
        message: "update user by id success",
        error: null,
        data: id,
      },
      200
    );
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    return c.json(
      {
        message: "delete user by id success",
        error: null,
        data: id,
      },
      200
    );
  });
