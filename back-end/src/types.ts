import { Request } from "express";
import mongoose from 'mongoose';
export type User = {
 _id: string | mongoose.Types.ObjectId;
 name: string;
 displayName: string;
 email: string;
 password: string;
 gender: string;
 profilePic: string
}


export type Message = {
 sender: string;
 receiver: string;
 message: string;
 conversationId: string
}

export interface CustomRequest extends Request {
 user?: User;
}