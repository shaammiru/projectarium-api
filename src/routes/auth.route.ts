import { Hono } from "hono";
import { sign } from "hono/jwt";
import { zValidator } from "@hono/zod-validator";
import { registerSchema, loginSchema } from "../schema/auth.schema";

export const authRoute = new Hono()
  .post("/register", zValidator("json", registerSchema), async (c) => {
    return c.json(
      {
        message: "register success",
        error: null,
        data: c.req.valid("json"),
      },
      201
    );
  })
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const { username, password } = await c.req.json();

    if (username !== "user" && password !== "password") {
      return c.json(
        {
          message: "login failed",
          error: "username or password is incorrect",
          data: null,
        },
        401
      );
    }

    const payload = {
      id: 1,
      username: username,
      fullname: "User",
      exp: Math.floor(Date.now() / 1000) + 60 * 1, // 1 minutes
    };

    const token = await sign(payload, Bun.env.JWT_SECRET!);

    return c.json(
      {
        message: "login success",
        error: null,
        data: {
          token: token,
        },
      },
      200
    );
  });
