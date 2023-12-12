import { Request, Response } from 'express';
import PostBookCommand from './Usecase/PostBookCommand';

export default class PostBook {
  postBookCommand: PostBookCommand;

  constructor(postBookCommand: PostBookCommand) {
    this.postBookCommand = postBookCommand;
  }

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const bookObject = JSON.parse(req.body.book);
      delete bookObject._id;

      if (!req.file) {
        return res.status(400).json({ message: 'No file provided' });
      }

      const imageUrl = `${req.protocol}://${req.get('host')}/public/img/${req.file.filename}`;

      if (bookObject.ratings[0].grade <= 0 || bookObject.ratings[0].grade > 5) {
        bookObject.ratings = [];
        bookObject.averageRating = 0;
      }

      const post = await this.postBookCommand.execute({
        ...bookObject,
        imageUrl,
      });

      return res.status(post.status).json({ message: post.message });
    } catch (error) {
      console.error('Error while creating book', error);
      return res.status(500).json({ message: 'Error while creating book', error });
    }
  }
}
