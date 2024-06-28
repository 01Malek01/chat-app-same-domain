import { Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
const signToken = async (id: mongoose.Types.ObjectId,res:Response) => {
 const token =   jwt.sign({ id }, process.env.JWT_SECRET as string, {
  expiresIn: process.env.JWT_EXPIRES_IN as string
 });
 res.cookie(
  'jwt',
 token,{
  httpOnly: true,
  maxAge: 15*24*60*1000, // 15 days,
  sameSite: 'strict',
 }
 );
 return token
}

export default signToken;