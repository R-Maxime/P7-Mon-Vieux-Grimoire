import bcrypt from 'bcrypt';
import IUserRepository from '../../../../repositories/Interfaces/IUserRepository';

/**
 * Represents the interface for the Signup Command.
 */
export default interface ISignupCommand {
  userRepository: IUserRepository;

  bcrypt: typeof bcrypt;

  /**
   * Signup a user with the provided email and password.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @returns A promise that resolves to the result of the signup operation.
   */
  signup(email: string, password: string): Promise<ISignupResponse>;

  /**
   * Hashes the provided password.
   * @param password - The password to be hashed.
   * @returns A promise that resolves to the hashed password.
   */
  hashPassword(password: string): Promise<string>;
}

export interface ISignupResponse {
  status: number;
  message: string;
}
