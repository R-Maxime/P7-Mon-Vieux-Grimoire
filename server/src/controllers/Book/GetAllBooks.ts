import { Request, Response } from 'express';
import GetAllBooksQuery from './Usecase/GetAllBooksQuery';

export default class GetAllBooks {
  allBooksQuery: GetAllBooksQuery;

  constructor(allBooksQuery: GetAllBooksQuery) {
    this.allBooksQuery = allBooksQuery;
  }

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const books = await this.allBooksQuery.execute();

      if (!books.data) {
        return res.status(books.status).json({ message: books.message });
      }

      return res.status(books.status).json(books.data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error while retrieving books', error });
    }
  }
}
