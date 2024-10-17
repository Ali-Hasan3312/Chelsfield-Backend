import { Document, model, Schema } from "mongoose";

export interface GetInTouchInterface extends Document {
    name: string;
    email: string;
    phoneNumber: string;
    message: string;
  }
  const GetInTouchSchema = new Schema<GetInTouchInterface>({
   name: {
    type: String,
    required: [true, "Name is required"],
   },
   email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true, 
    },
   phoneNumber: {
    type: String,
    required: [true, "Phone Number is required"],
    trim: true,
   },
   message: {
    type: String,
    required: [true, "Message is required"],
    trim: true,
   },
  
  },{timestamps:true});

  export const GetInTouch = model<GetInTouchInterface>("GetInTouch", GetInTouchSchema)