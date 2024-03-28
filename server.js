import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import helmet from "helmet";
import mongSanitize from "express-mongo-sanitize";

// routers
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
import eventRouter from "./routes/eventRouter.js";

// public
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// middlewares
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

const app = express();
const port = process.env.PORT || 5100;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use(cookieParser());
app.use(express.json());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
    },
  })
);
app.use(mongSanitize());

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/events", authenticateUser, eventRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

app.use("*", (req, res) => {
  res.status(404).json({
    message: "URL Not Found",
  });
});

app.use(errorHandlerMiddleware);

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
