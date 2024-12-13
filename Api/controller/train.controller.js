import Station from "../models/station.models.js";
import Train from "../models/train.models.js";
import { errorHandler } from "../utils/error.js";

export const getTrainById = async (req, res, next) => {
    const { trianId } = req.body;
    try {
        const train = await Train.findById(trianId);
        res.status(201).json(train);
    } catch (err) {
        next(errorHandler(401, "Train Failed to add."));
    }
};

export const getTrain = async (req, res, next) => {
    try {
        const train = await Train.find().sort({createdAt:1}).skip(skip).exec();
        res.status(201).json(train);
    } catch (err) {
        next(errorHandler(401, "Train Failed to add."));
    }
};

export const insertTrain = async (req, res, next) => {
    const { trainNumber, origin, destination, stops, distance, fare, zone, originCode, destinationCode } = req.body;
    const stopsList = await Station.find({ code: { "$in": [...stops] } });
    const stopsIds = stopsList?.map((stop) => ({ "station": stop._id?.toString() }));
    const newTrain = new Train({ trainNumber, origin, destination, stops: stopsIds, distance, fare, zone, originCode, destinationCode });
    try {
        await newTrain.save();
        res.status(201).json({ message: "Train Added Successfully." });
    } catch (err) {
        next(errorHandler(401, "Train Failed to add."));
    }
}
