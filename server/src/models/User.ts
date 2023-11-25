import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface IUser extends mongoose.Document {
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

export class User {
  private userRepository: typeof MongoIUserModel;
  constructor() {
    this.userRepository = MongoIUserModel;
  }

  public async getUserByMail(email: string): Promise<IUser | null> {
    return await this.userRepository.findOne({ email: email });
  }

  public async createUser(userData: IUser): Promise<IUser> {
    return await this.userRepository.create(userData);
  }
}
