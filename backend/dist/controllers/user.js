import { User } from "../models/user.js";
import { AsyncErrorHandler } from "../middlewares/error.js";
import CustomError from "../utils/utility-class.js";
export const newUser = AsyncErrorHandler(async (req, res, next) => {
    const { name, email, photo, gender, _id, dob } = req.body;
    let user = await User.findById(_id);
    if (user)
        return res.status(200).json({
            success: true,
            message: `Welcome, ${user.name}`,
        });
    if (!_id || !name || !email || !photo || !gender || !dob)
        return next(new CustomError("Please add all fields", 400));
    user = await User.create({
        name, email, photo, gender, _id, dob: new Date(dob)
    });
    return res.status(201).json({
        success: true,
        message: `Welcome, ${user.name}`
    });
});
export const getAllUsers = AsyncErrorHandler(async (req, res, next) => {
    const users = await User.find({});
    return res.status(200).json({
        success: true,
        users,
    });
});
export const getUser = AsyncErrorHandler(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user)
        return next(new CustomError("Invalid id", 400));
    return res.status(200).json({
        success: true,
        user,
    });
});
export const deleteUser = AsyncErrorHandler(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user)
        return next(new CustomError("Invalid id", 400));
    await user.deleteOne();
    return res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
});
