import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../../repositories/IUserRepository';

export default class LoginQuery {
  userRepository: IUserRepository;

  jwt: typeof jwt;

  bcrypt: typeof bcrypt;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
    this.jwt = jwt;
    this.bcrypt = bcrypt;
  }

  async login(email: string, password: string) {
    if (!email || !password) {
      return {
        status: 400,
        message: 'Missing parameters',
      };
    }

    const user = await this.userRepository.getUserByMail(email);

    if (!user) {
      return {
        status: 404,
        message: 'User not found',
      };
    }

    const passwordIsValid = await this.comparePassword(password, user.password);

    if (!passwordIsValid) {
      return {
        status: 401,
        message: 'Login or password incorrect',
      };
    }

    const token = this.generateToken(user);

    if (!token) {
      return {
        status: 500,
        message: 'Error while generating token',
      };
    }

    return {
      status: 200,
      data: {
        token,
        userId: user._id,
      },
    };
  }

  comparePassword(password: string, hash: string): Promise<boolean> {
    return this.bcrypt.compare(password, hash);
  }

  generateToken(user: any): string {
    return this.jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' },
    );
  }
}
