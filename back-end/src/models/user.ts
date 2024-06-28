import mongoose from "mongoose";



interface User  {
 name: string;
 displayName: string;
 email: string;
 password: string;
 gender: string;
 profilePic: string
}
const user = new mongoose.Schema<User>({
 name: {
  type: String,
  required: true
 },
 displayName: {
  type: String,
  unique: true,
  required: true
 },
 email:{
  type: String,
  unique: true,
  required: true
 },
 password: {
  type: String,
  required: true,
  minlength: 6,
  select: false
 },
 gender:{
  type: String,
  required: true,
  enum: ['male', 'female']
 },
 profilePic:{
  type: String,
  default:""
 },
 
},{
 timestamps: true
});

const User = mongoose.model("User", user);

export default User