import express from 'express';
import BookController from '../controllers/Book';
import AuthMiddleware from '../middlewares/auth';
import MulterConfig from '../middlewares/multer';
import SharpMiddleWare from '../middlewares/sharp';
const router = express.Router();

class BookRoutes {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.get('/', BookController.GetBooks);
    this.router.get('/:id', BookController.GetBookById);
    // this.router.get('/bestrating');
    this.router.post('/', AuthMiddleware.auth, MulterConfig, SharpMiddleWare.process, BookController.PostBook);
    // this.router.put('/:id',);
    this.router.delete('/:id', AuthMiddleware.auth, BookController.DeleteBook);
    // this.router.post('/:id/ratings');
  }

  getRouter(): express.Router {
    return this.router;
  }
}

export default new BookRoutes().getRouter();