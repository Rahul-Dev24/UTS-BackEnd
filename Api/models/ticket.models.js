import mongoose from "mongoose";
const Schema = mongoose.Schema;


// Ticket Schema for local train with date, time, and zone-based fare
const ticketSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    train: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Train',
        required: true
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    validityStart: {
        type: Date,  // Date and time when the ticket is valid
        required: true
    },
    validityEnd: {
        type: Date,  // Date and time when the ticket expires
        required: true
    },
    ticketType: {
        type: String,
        enum: ['Single', 'Return', 'Season Pass'],
        required: true
    },
    status: {
        type: String,
        enum: ['Booked', 'Cancelled', 'Completed'],
        default: 'Booked'
    }
}, { timestamps: true });

// Model
const Ticket = mongoose.model('Ticket', ticketSchema);
export default Ticket;
