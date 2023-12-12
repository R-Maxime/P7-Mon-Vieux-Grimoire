import { Request, Response } from 'express';
import PostBookCommand from '../../Book/Usecase/PostBookCommand';

/**
 * Represents the interface for posting a book.
 */
export default interface IPostBook {
  postBookCommand: PostBookCommand

  /**
   * Executes the post book command.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to the response object.
   */
  execute(req: Request, res: Response): Promise<Response>;
}
