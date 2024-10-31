import { Hono } from "hono";
import { logger } from "hono/logger";
import { authRoute } from "./routes/auth.route";
import { userRoute } from "./routes/users.route";

const app = new Hono();

app.use("*", logger());

app.get("/", (c) => {
  return c.json({
    message: "Hello from Honoooo!",
  });
});

app.route("/api/auth", authRoute);
app.route("/api/user", userRoute);

export default app;
