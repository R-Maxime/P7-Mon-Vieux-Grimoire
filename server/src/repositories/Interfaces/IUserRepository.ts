import { IUser, MongoIUserModel } from '../../models/User';

/**
 * Represents a user repository.
 */
export default interface IUserRepository {
  readonly userRepository: typeof MongoIUserModel;

  /**
   * Retrieves a user by their email.
   * @param email - The email of the user.
   * @returns A promise that resolves with the user object if found, or null if not found.
   */
  getUserByMail(email: string): Promise<IUser | null>;

  /**
   * Creates a new user.
   * @param userData - The data of the user to create.
   * @returns A promise that resolves with the created user object.
   */
  createUser(userData: IUser): Promise<IUser>;
}
