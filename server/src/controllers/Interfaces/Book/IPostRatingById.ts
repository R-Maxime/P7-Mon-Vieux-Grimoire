import { Request, Response } from 'express';
import GetBookByIdQuery from '../../Book/Usecase/GetBookByIdQuery';
import PostRatingCommand from '../../Book/Usecase/PostRatingCommand';

/**
 * Represents the interface for posting a rating by book ID.
 */
export default interface IPostRatingById {
  getByIdQuery: GetBookByIdQuery;

  postRatingCommand: PostRatingCommand;

  /**
   * Executes the post rating operation.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to the response object.
   */
  execute(req: Request, res: Response): Promise<Response>;
}
