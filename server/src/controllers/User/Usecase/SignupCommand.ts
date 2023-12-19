import bcrypt from 'bcrypt';
import { IUser } from '../../../models/User';
import { ISignupResponse } from '../../Interfaces/User/Usecase/ISignupCommand';
import IUserRepository from '../../../repositories/Interfaces/IUserRepository';

export default class SignupCommand {
  userRepository: IUserRepository;

  bcrypt: typeof bcrypt;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
  }

  public async signup(email: string, password: string): Promise<ISignupResponse> {
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
    return this.bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
  }
}
