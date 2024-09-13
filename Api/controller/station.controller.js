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

export const searchStation = async (req, res, next) => {
  try {
    const query = req.query.query;
    if (query) {
      // Create a regular expression pattern
      const regex = new RegExp(query, "i");

      // Search for documents where either name or code matches the query
      const stations = await Station.find({
        $or: [{ name: { $regex: regex } }, { code: { $regex: regex } }],
      });
      res.status(201).json(stations);
    }
  } catch (err) {
    next(errorHandler(401, "Something went wrong."));
  }
};

export const getStation = async (req, res, next) => {
  try {
    // Extract page and limit from query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;

    // Ensure limit is positive
    if (limit <= 0) {
      return res
        .status(400)
        .json({ message: "Limit must be a positive number" });
    }

    // Calculate skip value
    const skip = (page - 1) * limit;

    // Fetch the paginated records
    const stations = await Station.find().skip(skip).limit(limit).exec();

    // Send response
    res.json(stations);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
