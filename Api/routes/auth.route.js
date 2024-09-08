import express from "express";
import { Login, signup } from "../controller/auth.controller.js";
import { addStation } from "../controller/station.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", Login);
router.post("/addStation", addStation);

export default router;
