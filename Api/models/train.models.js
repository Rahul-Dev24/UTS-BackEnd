import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Train Schema for local trains with stops and zones
const trainSchema = new Schema({
    trainNumber: {
        type: String,
        required: true,
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    originCode: {
        type: String,
        required: true
    },
    destinationCode: {
        type: String,
        required: true
    },
    stops: [{
        station: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Station',
            required: true
        },
        arrivalTime: {
            type: Date,
        },
        departureTime: {
            type: Date,
        },
    }, { _id: false }],
    fare: {
        type: Number,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    zone: {
        type: String, // e.g., "Zone 1", "Zone 2"
        required: true
    },
}, { timestamps: true });

// Model
const Train = mongoose.model("Train", trainSchema);
export default Train;