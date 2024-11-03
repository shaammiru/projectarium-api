import { Hono } from "hono";
import { logger } from "hono/logger";
import { authRoute } from "./routes/auth.route";
import { userRoute } from "./routes/users.route";

const app = new Hono();

app.use("*", logger());

app.route("/api/auths", authRoute);
app.route("/api/users", userRoute);

export default app;
