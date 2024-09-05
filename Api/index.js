import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
const app = express();
let port = process.env.PORT || 4040;
dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.DATABASE_ULI)
  .then(() => {
    console.log("connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/auth/v1", authRouter);

app.get("/",(req,res)=>{
  res.json({"message":"Server is running"})
})

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
  console.log("server Started in",port);
});
