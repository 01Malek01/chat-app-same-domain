import mongoose from "mongoose";
import app from "./app";
const connectDB = async () => {
 const db = await mongoose.connect(process.env.DB!);
 console.log(`MongoDB Connected: ${db.connection.host}`);
};



app.listen(process.env.PORT || 5000, () => {
  connectDB();
  console.log(`Server is listening on port ${process.env.PORT}` );
});