import { Request, Response } from 'express';
import LoginQuery from '../User/Usecase/LoginQuery';
import SignupCommand from '../User/Usecase/SignupCommand';

export default interface IUserController {
  readonly loginQuery: LoginQuery,
  readonly signupCommand: SignupCommand,

  /**
   * Logs in a user.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to the response.
   */
  login(req: Request, res: Response): Promise<Response>;

  /**
   * Signs up a user.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to the response.
   */
  signup(req: Request, res: Response): Promise<Response>;
}
