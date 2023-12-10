import { Request, Response } from 'express';
import GetAllBooksQuery from '../controllers/Book/GetAllBooksQuery';
import GetBookByIdQuery from '../controllers/Book/GetBookByIdQuery';
import PostBookCommand from '../controllers/Book/PostBookCommand';
import DeleteBookCommand from '../controllers/Book/DeleteBookCommand';
import GetBookBestRatingQuery from '../controllers/Book/GetBookBestRatingQuery';
import PutBookCommand from '../controllers/Book/PutBookCommand';
import PostRatingCommand from '../controllers/Book/PostRatingCommand';
import GetAllBooks from './Book/GetAllBooks';
import PostBook from './Book/PostBook';
import GetBookById from './Book/GetBookById';
import DeleteBookById from './Book/DeleteBookById';
import GetBestRatings from './Book/GetBestRatings';
import PutBookById from './Book/PutBookById';
import PostRatingById from './Book/PostRatingById';

export default class BookController {
  constructor(
    private readonly allBooksQuery: GetAllBooksQuery,
    private readonly getByIdQuery: GetBookByIdQuery,
    private readonly getBestRatingQuery: GetBookBestRatingQuery,
    private readonly postBookCommand: PostBookCommand,
    private readonly deleteBookCommand: DeleteBookCommand,
    private readonly putBookCommand: PutBookCommand,
    private readonly postRatingCommand: PostRatingCommand,
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
