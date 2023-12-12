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

      if (!userId || !bookId || rating === undefined) {
        return res.status(400).json({ message: 'Missing parameters' });
      }

      const book = await this.getByIdQuery.execute(bookId);

      if (!book.data) {
        return res.status(book.status).json({ message: book.message });
      }

      if (book.data.ratings.some((r) => r.userId === userId)) {
        return res.status(400).json(book.data);
      }

      if (Number.isNaN(rating) || rating < 0 || rating > 5) {
        return res.status(400).json(book.data);
      }

      book.data.ratings.push({
        userId,
        grade: rating.toFixed(1),
      });

      book.data.averageRating = book.data.ratings
        .reduce((acc, curr) => acc + Number(curr.grade), 0) / book.data.ratings.length;

      const post = await this.postRatingCommand.execute(book.data);

      if (!post.data) {
        return res.status(post.status).json(book.data);
      }

      return res.status(post.status).json(post.data);
    } catch (error) {
      console.error('Error while posting rating', error);
      return res.status(500).json({ message: 'Error while posting rating', error });
    }
  }
}
