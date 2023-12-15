import { Request, Response } from 'express';
import GetBookByIdQuery from './Usecase/GetBookByIdQuery';
import IGetBookById from '../Interfaces/Book/IGetBookById';

export default class GetBookById implements IGetBookById {
  getByIdQuery: GetBookByIdQuery;

  constructor(getByIdQuery: GetBookByIdQuery) {
    this.getByIdQuery = getByIdQuery;
  }

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const book = await this.getByIdQuery.execute(req.params.id);

      return res.status(200).json(book);
    } catch (error) {
      console.error('Error while retrieving book', error);
      return res.status(500).json({ message: 'Error while retrieving book', error });
    }
  }
}
