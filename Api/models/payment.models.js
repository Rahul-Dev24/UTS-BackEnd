import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Payment Schema
const paymentSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'Net Banking', 'RWellet'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    },
    paymentDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Model
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
