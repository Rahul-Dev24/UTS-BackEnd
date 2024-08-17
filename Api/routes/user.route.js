import express from "express";
import { UserLogin } from "../controller/user.controller.js";
const route = express.Router();

route.get("/user", UserLogin);

export default route;
