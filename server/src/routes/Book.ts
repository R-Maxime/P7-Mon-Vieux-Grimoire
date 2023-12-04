import express from 'express';
import AuthMiddleware from '../middlewares/auth';
import MulterConfig from '../middlewares/multer';
import SharpMiddleWare from '../middlewares/sharp';
import { MongoDBBookRepository, IBookRepository } from '../models/Book';

import GetAllBooksQuery from '../controllers/Book/GetAllBooksQuery';
import GetBookByIdQuery from '../controllers/Book/GetBookByIdQuery';
import PostBookQuery from '../controllers/Book/PostBookQuery';
import DeleteBookQuery from '../controllers/Book/DeleteBookQuery';
import BookController from '../controllers/BookController';
import GetBookBestRatingQuery from '../controllers/Book/GetBookBestRatingQuery';
import PutBookQuery from '../controllers/Book/PutBookQuery';

class BookRoutes {
  private router: express.Router;

  private bookRepository: IBookRepository = new MongoDBBookRepository();

  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    const controller = new BookController(
      new GetAllBooksQuery(this.bookRepository),
      new GetBookByIdQuery(this.bookRepository),
      new GetBookBestRatingQuery(this.bookRepository),
      new PostBookQuery(this.bookRepository),
      new DeleteBookQuery(this.bookRepository),
      new PutBookQuery(this.bookRepository),
    );

    this.router.get('/', controller.get.bind(controller));
    this.router.get('/bestrating', controller.getBestRating.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.put('/:id', AuthMiddleware, MulterConfig, SharpMiddleWare, controller.put.bind(controller));
    this.router.post('/', AuthMiddleware, MulterConfig, SharpMiddleWare, controller.post.bind(controller));
    this.router.delete('/:id', AuthMiddleware, controller.delete.bind(controller));
  }

  getRouter(): express.Router {
    return this.router;
  }
}

export default new BookRoutes().getRouter();
