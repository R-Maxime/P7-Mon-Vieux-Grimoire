import { IUser, MongoIUserModel } from '../models/User';

export interface IUserRepository {
  getUserByMail(email: string): Promise<IUser | null>;
  createUser(userData: IUser): Promise<IUser>;
}

export class MongoDBUserRepository implements IUserRepository {
  private userRepository: typeof MongoIUserModel;

  constructor() {
    this.userRepository = MongoIUserModel;
  }

  public async getUserByMail(email: string): Promise<IUser | null> {
    return this.userRepository.findOne({ email });
  }

  public async createUser(userData: IUser): Promise<IUser> {
    return this.userRepository.create(userData);
  }
}
