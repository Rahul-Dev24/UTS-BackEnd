import express from "express";
import { insertTrain, getTrainById,getTrain } from "../controller/train.controller.js";
import { getNewTicket, getTicket } from "../controller/ticket.controller.js";

const trainRouter = express.Router();

trainRouter.post("/addTrain", insertTrain);
trainRouter.post("/newTicket", getNewTicket);
trainRouter.get("/getTrainById", getTrainById);
trainRouter.get("/getTicket", getTicket);
trainRouter.get("/getTrain",getTrain);

export default trainRouter;
