import Station from "../models/station.models.js";

export const addStation = async (req, res, next) => {
  const { name, code, category, address } = req.body;
  const newStation = new Station({ name, code, category, address });
  try {
    await newStation.save();
    res.status(201).json({ message: "Station Added Successfully." });
  } catch (err) {
    next(errorHandler(401, "Station Failed to add."));
  }
};
