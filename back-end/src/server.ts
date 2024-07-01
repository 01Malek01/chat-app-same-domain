import mongoose from "mongoose";
import { server } from "./socket/socket";
const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.DB as string);
    console.log(`MongoDB Connected: ${db.connection.host}`);
    
  } catch (err) {
    console.log('====================================');
    console.log(err);
    console.log('====================================');
  }
 
};


//listening on port using socket io server
server.listen(process.env.PORT || 5000, () => {
  connectDB();
  console.log(`Server is listening on port ${process.env.PORT}` );
});