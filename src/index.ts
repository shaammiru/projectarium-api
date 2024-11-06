import "dotenv/config";
import path from "path";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import authHandler from "./handler/auth.handler";
import userHandler from "./handler/user.handler";
import projectHandler from "./handler/project.handler";
import errorMw from "./middleware/error.mw";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

app.use("/api/images", express.static(path.join(__dirname, "../images")));

app.use("/api/auth", authHandler);
app.use("/api/users", userHandler);
app.use("/api/projects", projectHandler);

app.use(errorMw.jsonErrorHandler);
app.use(errorMw.joiErrorHandler);
app.use(errorMw.prismaErrorHandler);
app.use(errorMw.errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
