import { Response } from "express";
import User from "../models/user";
import { CustomRequest } from "../types";

export const getUsersForSidebar = async (req: CustomRequest, res: Response) => {
  try {
    const loggedInUserId = req.user?._id;
    const users = await User.find({ _id: { $ne: loggedInUserId } }); //as we wont send messages to ourselves
    res.status(200).json(users);
  } catch (err) {
    console.log("====================================");
    console.log(err, "in get users for sidebar");
    console.log("====================================");
    res.status(500).json({ message: "Internal server error", error: err });
  }
};
