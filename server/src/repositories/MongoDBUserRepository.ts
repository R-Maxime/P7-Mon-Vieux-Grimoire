import { IUser, MongoIUserModel } from '../models/User';
import IUserRepository from './Interfaces/IUserRepository';

export default class MongoDBUserRepository implements IUserRepository {
  readonly userRepository: typeof MongoIUserModel;

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
