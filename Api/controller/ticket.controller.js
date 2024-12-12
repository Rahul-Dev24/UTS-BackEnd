import User from "../models/user.models.js";
import Ticket from "../models/ticket.models.js";
import Train from "../models/train.models.js";
import { errorHandler } from "../utils/error.js";

export const getNewTicket = async (req, res, next) => {
    const { userId, trainId, ticketType, payMode, validityStart, validityEnd } = req.body;
    try {
        const user = await User.findById(userId);
        const train = await Train.findById(trainId);
        if (!user || !train) return res.status(404).json({ message: 'Train Roate not Available' });
        const newTicket = new Ticket({
            user: userId,
            train: trainId,
            ticketPrice: train.fare,
            validityStart,
            validityEnd,
            ticketType,
            status: 'Booked',
        });
        await newTicket.save();
        const payment = new Payment({
            user: userId,
            ticket: newTicket._id,
            amount: train.fare,
            paymentMethod: payMode || RWellet, // This can be dynamic based on the user
            paymentStatus: 'Completed',
        });
        await payment.save();

        return res.status(201).json({
            message: 'Ticket booked successfully',
            ticket: newTicket,
            payment: payment,
        });
    } catch (err) {
        next(errorHandler(401, "Something went wrong."));
    }
};

export const getTicket = async (req, res, next) => {
    const { userId } = req.body;
    try {
        const tickets = await Ticket.find({ user: userId });
        res.status(201).json(tickets);
    } catch (err) {
        next(errorHandler(401, "Something went wrong."));
    }
}
