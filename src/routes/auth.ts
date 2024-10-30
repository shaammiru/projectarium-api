import { Hono } from "hono";

export const authRoute = new Hono()
  .get("/", (c) => {
    return c.json({ username: "udin" });
  })
  .post("/", (c) => {
    return c.json({ message: "user created" });
  });
