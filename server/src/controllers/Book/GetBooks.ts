import { Book } from '../../models/Book';
import { Request, Response } from 'express';

export default class GetBooks {
  bookRepository: Book;

  constructor(bookRepository: Book) {
    this.bookRepository = bookRepository;
  }

  async get(req: Request, res: Response) {
    try {
      const books = await this.bookRepository.getBooks();

      res.status(200).json(books);
    } catch (error: any) {
      console.error(error);

      res.status(500).json({ message: error.message });
    }
  }
}