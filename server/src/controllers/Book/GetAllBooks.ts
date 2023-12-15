import { Request, Response } from 'express';
import GetAllBooksQuery from './Usecase/GetAllBooksQuery';
import IGetAllBooks from '../Interfaces/Book/IGetAllBooks';

export default class GetAllBooks implements IGetAllBooks {
  allBooksQuery: GetAllBooksQuery;

  constructor(allBooksQuery: GetAllBooksQuery) {
    this.allBooksQuery = allBooksQuery;
  }

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const books = await this.allBooksQuery.execute();

      return res.status(200).json(books);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error while retrieving books', error });
    }
  }
}
