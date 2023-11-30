import bcrypt from 'bcrypt';
import { IUser, IUserRepository } from '../../models/User';

export default class SignupQuery {
  userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async signup(email: string, password: string) {
    if (!email || !password) {
      return {
        status: 400,
        message: 'Missing parameters'
      }
    }

    const hash = await this.hashPassword(password);
    if (!hash) {
      return {
        status: 500,
        message: 'Error while hashing password'
      }
    }

    const user = await this.userRepository.createUser({
      email,
      password: hash
    } as IUser);

    if (!user) {
      return {
        status: 500,
        message: 'Error while creating user'
      }
    }

    return {
      status: 200,
      message: 'User created'
    }
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
