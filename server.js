import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";

// routers
import userRouter from "./routes/userRouter.js";

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

app.use("/api/v1/users", userRouter);

app.use("*", (req, res) => {
  res.status(404).json({
    message: "URL Not Found",
  });
});

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log("server running");
});
