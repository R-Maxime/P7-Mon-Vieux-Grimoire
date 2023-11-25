import { Book } from '../../models/Book';
import { Request, Response } from 'express';

class GetBooks {
  private static bookRepository: Book;

  constructor(bookRepository: Book) {
    GetBooks.bookRepository = bookRepository;
  }

  public async get(req: Request, res: Response) {
    try {
      const books = await GetBooks.bookRepository.getBooks();

      res.status(200).json(books);
    } catch (error: any) {
      console.error(error);

      res.status(500).json({ message: error.message });
    }
  }
}

export default GetBooks;
