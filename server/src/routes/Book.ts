import express from 'express';
import PostBook from '../controllers/Book/PostBook';
import GetBooks from '../controllers/Book/GetBooks';
import GetBookById from '../controllers/Book/GetBookById';
import DeleteBook from '../controllers/Book/DeleteBook';
import AuthMiddleware from '../middlewares/auth';
import MulterConfig from '../middlewares/multer';
import SharpMiddleWare from '../middlewares/sharp';
import { Book } from '../models/Book';

class BookRoutes {
  private router: express.Router;
  private bookRepository: Book = new Book;
  private PostBook: PostBook = new PostBook(this.bookRepository);
  private GetBooks: GetBooks = new GetBooks(this.bookRepository);
  private GetBookById: GetBookById = new GetBookById(this.bookRepository);
  private DeleteBook: DeleteBook = new DeleteBook(this.bookRepository);

  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.get('/', this.GetBooks.get);
    this.router.get('/:id', this.GetBookById.get);
    this.router.post('/', AuthMiddleware.auth, MulterConfig, SharpMiddleWare.process, this.PostBook.post);
    this.router.delete('/:id', AuthMiddleware.auth, this.DeleteBook.delete);

    // this.router.get('/bestrating');
    // this.router.put('/:id',);
    // this.router.post('/:id/ratings');
  }

  public getRouter(): express.Router {
    return this.router;
  }
}

export default new BookRoutes().getRouter();