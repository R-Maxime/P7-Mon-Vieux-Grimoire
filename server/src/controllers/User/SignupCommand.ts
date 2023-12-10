import bcrypt from 'bcrypt';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IUser } from '../../models/User';

export default class SignupCommand {
  userRepository: IUserRepository;

  bcrypt: typeof bcrypt;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
  }

  public async signup(email: string, password: string) {
    if (!email || !password) {
      return {
        status: 400,
        message: 'Missing parameters',
      };
    }

    const hash = await this.hashPassword(password);
    if (!hash) {
      return {
        status: 500,
        message: 'Error while hashing password',
      };
    }

    const user = await this.userRepository.createUser({
      email,
      password: hash,
    } as IUser);

    if (!user) {
      return {
        status: 500,
        message: 'Error while creating user',
      };
    }

    return {
      status: 200,
      message: 'User created',
    };
  }

  async hashPassword(password: string): Promise<string> {
    return this.bcrypt.hash(password, 10);
  }
}
