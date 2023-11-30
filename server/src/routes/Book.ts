import express from 'express';
import AuthMiddleware from '../middlewares/auth';
import MulterConfig from '../middlewares/multer';
import SharpMiddleWare from '../middlewares/sharp';
import { MongoDBBookRepository, IBookRepository } from '../models/Book';

import RetrieveAllBooksQuery from '../controllers/Book/RetrieveAllBooksQuery';
import RetrieveBookByIdQuery from '../controllers/Book/RetrieveBookByIdQuery';
import PostBookQuery from '../controllers/Book/PostBookQuery';
import DeleteBookQuery from '../controllers/Book/DeleteBookQuery';
import BookController from '../controllers/BookController';

class BookRoutes {
  private router: express.Router;
  private bookRepository: IBookRepository = new MongoDBBookRepository();

  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    const controller = new BookController(
      new RetrieveAllBooksQuery(this.bookRepository),
      new PostBookQuery(this.bookRepository),
      new RetrieveBookByIdQuery(this.bookRepository),
      new DeleteBookQuery(this.bookRepository)
    );

    this.router.get('/', controller.get.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.post('/', AuthMiddleware.auth, MulterConfig, SharpMiddleWare.process, controller.post.bind(controller));
    this.router.delete('/:id', AuthMiddleware.auth, controller.delete.bind(controller));
  }

  getRouter(): express.Router {
    return this.router;
  }
}



export default new BookRoutes().getRouter();