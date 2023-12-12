import { Request, Response } from 'express';
import GetBookByIdQuery from './Usecase/GetBookByIdQuery';

export default class GetBookById {
  getByIdQuery: GetBookByIdQuery;

  constructor(getByIdQuery: GetBookByIdQuery) {
    this.getByIdQuery = getByIdQuery;
  }

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const get = await this.getByIdQuery.execute(req.params.id);

      return res.status(get.status).json(get.data);
    } catch (error) {
      console.error('Error while retrieving book', error);
      return res.status(500).json({ message: 'Error while retrieving book', error });
    }
  }
}
