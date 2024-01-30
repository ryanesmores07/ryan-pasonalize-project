import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";

// routers
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";

// public

// middlewares
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

const app = express();
const port = process.env.PORT || 5100;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Hello world");
  res.status(200).json({ status: "success", data: req.body });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

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
