import { Book } from '../../models/Book';
import { Request, Response } from 'express';

class GetBookById {
  private static bookRepository: Book;

  constructor(bookRepository: Book) {
    GetBookById.bookRepository = bookRepository;
  }

  public async get(req: Request, res: Response) {
    try {
      const book = await GetBookById.bookRepository.getBookById(req.params.id);

      res.status(200).json(book);
    } catch (error: any) {
      console.error(error);

      res.status(500).json({ message: error.message });
    }
  }
}

export default GetBookById;