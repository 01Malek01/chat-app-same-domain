import { Request, Response } from "express"
import User from "../models/user";
import bcrypt from "bcryptjs";
import signToken from "../utils";
import { User as UserType } from '../types';

//https://avatar.iran.liara.run/public/boy
//https://avatar.iran.liara.run/public/girl
export const signup = async (req: Request, res: Response) => {
try {
 const {name,displayName,password,confirmPassword,gender,email} = req.body;
 if(password !== confirmPassword) {
  return res.status(400).json({message: 'Passwords do not match'})
 }
 const user = await User.findOne({
  email
 });
 if(user) {
  return res.status(400).json({message: 'User already exists'})
 }
 const salt = await bcrypt.genSalt(10);
 const hashedPassword = await bcrypt.hash(password, salt);

 const newUser = new User({
  name,
  displayName,
  password: hashedPassword,
  gender,
  email
 });
 const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${displayName}`;
 const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${displayName}`;
 newUser.profilePic = gender === 'male' ? boyProfilePic : girlProfilePic;
 const token =  await signToken(newUser._id, res);
 await newUser.save();
 res.status(201).json({
  _id: newUser._id,
  name: newUser.name,
  displayName: newUser.displayName,
  email: newUser.email,
  gender: newUser.gender,
  profilePic: newUser.profilePic,
  token
 })

} catch (err) {
 res.status(500).json({message: 'Internal server error', error: err})
}
}

export const login = async (req: Request, res: Response) => {
 try {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password") as any;

  const isPasswordCorrect =
    user && (await bcrypt.compare(password, user?.password || ""));
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = await signToken(user._id, res);
  res.status(200).json({
    _id: user._id,
    name: user.name,
    displayName: user.displayName,
    email: user.email,
    gender: user.gender,
    profilePic: user.profilePic,
    token
  })
 } catch (err) {
  res.status(500).json({message: 'Internal server error for login', error: err})
 }

}

export const logout = (req: Request, res: Response) => {

try {
res.cookie('jwt', '', { maxAge: 0 }); 
res.status(200).json({message: 'Logged out successfully'})
} catch (err) {
 console.log('====================================');
 console.log(err);
 console.log('====================================');
 res.status(500).json({message: 'Internal server error for logout', error: err})
}
}
