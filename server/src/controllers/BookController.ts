import { Request, Response } from 'express';
import RetrieveAllBooksQuery from './Book/RetrieveAllBooksQuery';
import RetrieveBookByIdQuery from './Book/RetrieveBookByIdQuery';
import PostBookQuery from './Book/PostBookQuery';
import DeleteBookQuery from './Book/DeleteBookQuery';
import RetrieveBookBestRatingQuery from './Book/RetrieveBookBestRatingQuery';

/**
 * Interface for the BookController.
 */
export interface IBookController {
  /**
   * Get all books.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to the response.
   */
  get(req: Request, res: Response): Promise<Response>;

  /**
   * Create a new book.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to the response.
   */
  post(req: Request, res: Response): Promise<Response>;

  /**
   * Get a book by its ID.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to the response.
   */
  getById(req: Request, res: Response): Promise<Response>;

  /**
   * Delete a book by its ID.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to the response.
   */
  delete(req: Request, res: Response): Promise<Response>;

  /**
   * Get the books with the best rating.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to the response.
   */
  getBestRating(req: Request, res: Response): Promise<Response>;
}

export default class BookController implements IBookController {
  constructor(
    private readonly allBooksQuery: RetrieveAllBooksQuery,
    private readonly postBookQuery: PostBookQuery,
    private readonly getByIdQuery: RetrieveBookByIdQuery,
    private readonly deleteBookQuery: DeleteBookQuery,
    private readonly getBestRatingQuery: RetrieveBookBestRatingQuery,
  ) { }

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const books = await this.allBooksQuery.execute();

      if (!books.data) {
        return res.status(books.status).json({ message: books.message });
      }

      return res.status(books.status).json(books.data);
    } catch (error) {
      // console.error(error);
      return res.status(500).json({ message: 'Error while retrieving books' });
    }
  }

  async post(req: Request, res: Response): Promise<Response> {
    try {
      const bookObject = JSON.parse(req.body.book);
      delete bookObject._id;

      if (!req.file) {
        return res.status(400).json({ message: 'No file provided' });
      }

      const imageUrl = `${req.protocol}://${req.get('host')}/public/img/${req.file.filename}`;

      const post = await this.postBookQuery.execute({
        ...bookObject,
        imageUrl,
      });

      return res.status(post.status).json({ message: post.message });
    } catch (error) {
      console.error('Error while creating book', error);
      return res.status(500).json({ message: 'Error while creating book' });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const get = await this.getByIdQuery.execute(req.params.id);

      return res.status(get.status).json(get.data);
    } catch (error) {
      // console.error('Error while retrieving book', error);
      return res.status(500).json({ message: 'Error while retrieving book' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const deleted = await this.deleteBookQuery.execute(req);

      return res.status(deleted.status).json({ message: deleted.message });
    } catch (error) {
      console.error('Error while deleting book', error);
      return res.status(500).json({ message: 'Error while deleting book' });
    }
  }

  async getBestRating(req: Request, res: Response): Promise<Response> {
    try {
      const bestRating = await this.getBestRatingQuery.execute();

      if (!bestRating.data) {
        return res.status(bestRating.status).json({ message: bestRating.message });
      }

      return res.status(bestRating.status).json(bestRating.data);
    } catch (error) {
      console.error('Error while retrieving book', error);
      return res.status(500).json({ message: 'Error while retrieving book' });
    }
  }
}
