import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import IUserRepository from '../../../../repositories/Interfaces/IUserRepository';

/**
 * Represents the interface for the LoginQuery use case.
 */
export default interface ILoginQuery {
  userRepository: IUserRepository;

  jwt: typeof jwt;

  bcrypt: typeof bcrypt;

  /**
   * Logs in a user with the provided email and password.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @returns A promise that resolves to the user data.
   */
  login(email: string, password: string): Promise<ILoginResponse>;

  /**
   * Compares a password with its hash.
   * @param password - The password to compare.
   * @param hash - The hash to compare against.
   * @returns A promise that resolves to a boolean indicating whether the password matches the hash.
   */
  comparePassword(password: string, hash: string): Promise<boolean>;

  /**
   * Generates a token for the provided user.
   * @param user - The user data.
   * @returns The generated token.
   */
  generateToken(user: any): string;
}

export interface ILoginResponse {
  status: number;
  message?: string;
  data?: {
    token: string;
    userId: string;
  }
}
