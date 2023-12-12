import { Request, Response } from 'express';
import LoginQuery from '../../User/Usecase/LoginQuery';

/**
 * Represents the interface for the Login controller.
 */
export default interface ILogin {
  loginQuery: LoginQuery;

  /**
   * Executes the login operation.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to the response object.
   */
  execute(req: Request, res: Response): Promise<Response>;
}
