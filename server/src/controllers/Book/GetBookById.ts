import { Book } from '../../models/Book';
import { Request, Response } from 'express';

export default class GetBookById {
bookRepository: Book;

  constructor(bookRepository: Book) {
    this.bookRepository = bookRepository;
  }

  public async get(req: Request, res: Response) {
    try {
      const book = await this.bookRepository.getBookById(req.params.id);

      res.status(200).json(book);
    } catch (error: any) {
      console.error(error);

      res.status(500).json({ message: error.message });
    }
  }
};
