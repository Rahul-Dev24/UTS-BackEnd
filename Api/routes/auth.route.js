import express from "express";
import { Login, signup } from "../controller/auth.controller.js";
import {
  addStation,
  searchStation,
  getStation,
  getStationById
} from "../controller/station.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", Login);
router.post("/addStation", addStation);
router.get("/searchStation", searchStation);
router.get("/getStation", getStation);
router.get("/getStationById", getStationById);

export default router;
