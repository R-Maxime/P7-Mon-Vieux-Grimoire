import { Request, Response } from 'express';
import SignupCommand from '../../User/Usecase/SignupCommand';

/**
 * Represents the interface for user signup.
 */
export default interface ISignup {
  signupQuery: SignupCommand;

  /**
   * Executes the signup operation.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to the response object.
   */
  execute(req: Request, res: Response): Promise<Response>;
}
