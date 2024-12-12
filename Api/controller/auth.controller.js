import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { phoneNo, name, password, gender, dob } = req.body;
  const hashPass = bcryptjs?.hashSync(password, 10);
  const newUser = new User({ phoneNo, name, password: hashPass, gender, dob });
  try {
    await newUser.save();
    res.status(201).json({ message: "Register sucessfully" });
  } catch (err) {
    next(errorHandler(401, "Registeration Failed"));
  }
};

export const Login = async (req, res, next) => {
  const { phoneNo, password } = req.body;
  try {
    const validUser = await User?.findOne({ phoneNo });
    if (!validUser) return next(errorHandler(401, "Invalid Number"));
    const validPassword = bcryptjs?.compareSync(password, validUser?.password);
    if (!validPassword) return next(errorHandler(401, "Invalid Password"));
    const token = jwt.sign({ id: validUser?._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (err) {
    next(errorHandler(401, "Login Failed"));
  }
};
