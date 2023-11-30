import RetrieveAllBooksQuery from '../controllers/Book/RetrieveAllBooksQuery';
import RetrieveBookByIdQuery from '../controllers/Book/RetrieveBookByIdQuery';
import PostBookQuery from '../controllers/Book/PostBookQuery';
import DeleteBookQuery from '../controllers/Book/DeleteBookQuery';
import { Request, Response } from 'express';

export default class BookController {
  constructor(
    private readonly allBooksQuery: RetrieveAllBooksQuery,
    private readonly postBookQuery: PostBookQuery,
    private readonly getByIdQuery: RetrieveBookByIdQuery,
    private readonly deleteBookQuery: DeleteBookQuery) { }

  async get(req: Request, res: Response) {
    try {
      const books = await this.allBooksQuery.execute();

      if (!books.data) {
        return res.status(books.status).json({ message: books.message });
      }

      return res.status(books.status).json(books.data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error while retrieving books' });
    }
  }

  async post(req: Request, res: Response) {
    try {
      const bookObject = JSON.parse(req.body.book);
      delete bookObject._id;

      if (!req.file) {
        return res.status(400).json({ message: 'No file provided' });
      }

      const imageUrl = `${req.protocol}://${req.get('host')}/public/img/${req.file.filename}`;

      const post = await this.postBookQuery.execute({
        ...bookObject,
        imageUrl
      });

      return res.status(post.status).json({ message: post.message });
    } catch (error) {
      console.error('Error while creating book', error);
      return res.status(500).json({ message: 'Error while creating book' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const get = await this.getByIdQuery.execute(req.params.id);

      return res.status(get.status).json(get.data);
    } catch (error) {
      console.error('Error while retrieving book', error);
      return res.status(500).json({ message: 'Error while retrieving book' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const deleted = await this.deleteBookQuery.execute(req, res);

      return res.status(deleted.status).json({ message: deleted.message });
    } catch (error) {
      console.error('Error while deleting book', error);
      return res.status(500).json({ message: 'Error while deleting book' });
    }
  }
}