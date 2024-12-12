import { errorHandler } from "../utils/error.js";
import Payment from "../models/payment.models.js";

export const makePayment = async (req, res, next) => {
    const { userId, payMode, amount } = req.body;
    try {
        const payment = new Payment({
            user: userId,
            ticket: null,
            amount: amount,
            paymentMethod: payMode || RWellet, // This can be dynamic based on the user
            paymentStatus: 'Completed',
        });
        await payment.save();
    } catch (err) {
        next(errorHandler(401, "Payment Failed"));
    }
};