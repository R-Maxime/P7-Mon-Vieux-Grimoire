import { Request, Response } from 'express';
import GetAllBooks from './Book/GetAllBooks';
import PostBook from './Book/PostBook';
import GetBookById from './Book/GetBookById';
import DeleteBookById from './Book/DeleteBookById';
import GetBestRatings from './Book/GetBestRatings';
import PutBookById from './Book/PutBookById';
import PostRatingById from './Book/PostRatingById';
import GetAllBooksQuery from './Book/Usecase/GetAllBooksQuery';
import GetBookByIdQuery from './Book/Usecase/GetBookByIdQuery';
import GetBookBestRatingQuery from './Book/Usecase/GetBookBestRatingQuery';
import PostBookCommand from './Book/Usecase/PostBookCommand';
import DeleteBookCommand from './Book/Usecase/DeleteBookCommand';
import PutBookCommand from './Book/Usecase/PutBookCommand';
import PostRatingCommand from './Book/Usecase/PostRatingCommand';
import IBookController from './Interfaces/IBookController';

export default class BookController implements IBookController {
  constructor(
    readonly allBooksQuery: GetAllBooksQuery,
    readonly getByIdQuery: GetBookByIdQuery,
    readonly getBestRatingQuery: GetBookBestRatingQuery,
    readonly postBookCommand: PostBookCommand,
    readonly deleteBookCommand: DeleteBookCommand,
    readonly putBookCommand: PutBookCommand,
    readonly postRatingCommand: PostRatingCommand,
  ) { }

  async getAllBooks(req: Request, res: Response): Promise<Response> {
    const getAllBooks = await new GetAllBooks(this.allBooksQuery).execute(req, res);
    return getAllBooks;
  }

  async postBook(req: Request, res: Response): Promise<Response> {
    const postBook = await new PostBook(this.postBookCommand).execute(req, res);
    return postBook;
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const getBookById = await new GetBookById(this.getByIdQuery).execute(req, res);
    return getBookById;
  }

  async deleteBookById(req: Request, res: Response): Promise<Response> {
    const deleteBookById = await new DeleteBookById(this.deleteBookCommand).execute(req, res);
    return deleteBookById;
  }

  async getBestRating(req: Request, res: Response): Promise<Response> {
    const getBestRating = await new GetBestRatings(this.getBestRatingQuery).execute(req, res);
    return getBestRating;
  }

  async putBookById(req: Request, res: Response): Promise<Response> {
    const putBookById = await new PutBookById(this.getByIdQuery, this.putBookCommand)
      .execute(req, res);
    return putBookById;
  }

  async postRatingById(req: Request, res: Response): Promise<Response> {
    const postRatingById = await new PostRatingById(this.getByIdQuery, this.postRatingCommand)
      .execute(req, res);
    return postRatingById;
  }
}
