import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import cors from "cors";
const app = express();
dotenv.config();
let port = process.env.PORT || 4040;
app.use(express.json());

mongoose
  .connect(process.env.DATABASE_ULI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// For more detailed configuration, you can pass options
app.use(
  cors({
    origin: "*", // Replace with your frontend URL
    // methods: ["GET", "POST"],
    // allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/auth/v1", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(port, () => {
  console.log("server Started in", port);
});
