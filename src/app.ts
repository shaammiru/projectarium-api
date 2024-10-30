import { Hono } from "hono";
import { logger } from "hono/logger";
import { authRoute } from "./routes/auth";

const app = new Hono();

app.use("*", logger());

app.get("/", (c) => {
  return c.json({
    message: "Hello from Honoooo!",
  });
});

app.route("/api/accounts", authRoute);

export default app;
