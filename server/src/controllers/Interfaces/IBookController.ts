import { Request, Response } from 'express';
import GetAllBooksQuery from '../Book/Usecase/GetAllBooksQuery';
import GetBookByIdQuery from '../Book/Usecase/GetBookByIdQuery';
import PostBookCommand from '../Book/Usecase/PostBookCommand';
import GetBookBestRatingQuery from '../Book/Usecase/GetBookBestRatingQuery';
import DeleteBookCommand from '../Book/Usecase/DeleteBookCommand';
import PutBookCommand from '../Book/Usecase/PutBookCommand';
import PostRatingCommand from '../Book/Usecase/PostRatingCommand';

/**
 * Represents the interface for a book controller.
 */
export default interface IBookController {
  readonly allBooksQuery: GetAllBooksQuery,
  readonly getByIdQuery: GetBookByIdQuery,
  readonly getBestRatingQuery: GetBookBestRatingQuery,
  readonly postBookCommand: PostBookCommand,
  readonly deleteBookCommand: DeleteBookCommand,
  readonly putBookCommand: PutBookCommand,
  readonly postRatingCommand: PostRatingCommand,

  /**
   * Retrieves all books.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to the response.
   */
  getAllBooks(req: Request, res: Response): Promise<Response>;

  /**
   * Creates a new book.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to the response.
   */
  postBook(req: Request, res: Response): Promise<Response>;

  /**
   * Retrieves a book by its ID.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to the response.
   */
  getById(req: Request, res: Response): Promise<Response>;

  /**
   * Deletes a book by its ID.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to the response.
   */
  deleteBookById(req: Request, res: Response): Promise<Response>;

  /**
   * Retrieves the books with the best rating.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to the response.
   */
  getBestRating(req: Request, res: Response): Promise<Response>;

  /**
   * Updates a book by its ID.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to the response.
   */
  putBookById(req: Request, res: Response): Promise<Response>;

  /**
   * Adds a rating to a book by its ID.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to the response.
   */
  postRatingById(req: Request, res: Response): Promise<Response>;
}
