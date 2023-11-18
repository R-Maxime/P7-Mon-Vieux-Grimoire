import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface IUser {
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

userSchema.plugin(uniqueValidator);
export const MongoIUserModel = mongoose.model<IUser>("User", userSchema);