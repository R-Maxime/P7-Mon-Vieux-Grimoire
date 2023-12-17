import { Request, Response } from 'express';
import GetBookByIdQuery from './Usecase/GetBookByIdQuery';
import PostRatingCommand from './Usecase/PostRatingCommand';
import IPostRatingById from '../Interfaces/Book/IPostRatingById';

export default class PostRatingById implements IPostRatingById {
  getByIdQuery: GetBookByIdQuery;

  postRatingCommand: PostRatingCommand;

  constructor(getByIdQuery: GetBookByIdQuery, postRatingCommand: PostRatingCommand) {
    this.getByIdQuery = getByIdQuery;
    this.postRatingCommand = postRatingCommand;
  }

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const bookId = req.params.id;
      const { userId, rating } = req.body;
      await this.postRatingCommand.execute({ userId, bookId, rating });

      const book = await this.getByIdQuery.execute(bookId);

      return res.status(201).json(book);
    } catch (error) {
      console.error('Error while posting rating', error);
      return res.status(500).json({ message: 'Error while posting rating', error });
    }
  }
}
