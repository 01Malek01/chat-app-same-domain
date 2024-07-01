import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { CustomRequest } from "../types";

export const protectRoute = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    const decodedUser = await User.findById(decoded.id);
    if (!decodedUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = decodedUser;

    next();
  } catch (err) {
    console.log("====================================");
    console.log(err, "in protected route middleware");
    console.log("====================================");
    res.status(500).json({ message: "Internal server error", error: err });
  }
};
