import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { registerPostSchema, loginPostSchema } from "../schema/auth.schema";

export const authRoute = new Hono()
  .post("/register", zValidator("json", registerPostSchema), async (c) => {
    return c.json({
      message: "register success",
      error: null,
      data: c.req.valid("json"),
    });
  })
  .post("/login", zValidator("json", loginPostSchema), async (c) => {
    return c.json({
      message: "login success",
      error: null,
      data: c.req.valid("json"),
    });
  });
