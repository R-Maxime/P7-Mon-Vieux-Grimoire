import express from 'express';
import AuthMiddleware from '../middlewares/auth';
import MulterConfig from '../middlewares/multer';
import SharpMiddleWare from '../middlewares/sharp';
import { MongoDBBookRepository, IBookRepository } from '../repositories/IBookRepository';
import BookController from '../controllers/BookController';
import GetAllBooksQuery from '../controllers/Book/Usecase/GetAllBooksQuery';
import GetBookByIdQuery from '../controllers/Book/Usecase/GetBookByIdQuery';
import GetBookBestRatingQuery from '../controllers/Book/Usecase/GetBookBestRatingQuery';
import PostBookCommand from '../controllers/Book/Usecase/PostBookCommand';
import DeleteBookCommand from '../controllers/Book/Usecase/DeleteBookCommand';
import PutBookCommand from '../controllers/Book/Usecase/PutBookCommand';
import PostRatingCommand from '../controllers/Book/Usecase/PostRatingCommand';

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
      new PostBookCommand(this.bookRepository),
      new DeleteBookCommand(this.bookRepository),
      new PutBookCommand(this.bookRepository),
      new PostRatingCommand(this.bookRepository),
    );

    this.router.get('/', controller.getAllBooks.bind(controller));
    this.router.get('/bestrating', controller.getBestRating.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.put('/:id', AuthMiddleware, MulterConfig, SharpMiddleWare, controller.putBookById.bind(controller));
    this.router.post('/', AuthMiddleware, MulterConfig, SharpMiddleWare, controller.postBook.bind(controller));
    this.router.post('/:id/rating', AuthMiddleware, controller.postRatingById.bind(controller));
    this.router.delete('/:id', AuthMiddleware, controller.deleteBookById.bind(controller));
  }

  getRouter(): express.Router {
    return this.router;
  }
}

export default new BookRoutes().getRouter();
