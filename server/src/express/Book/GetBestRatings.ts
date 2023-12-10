import { Request, Response } from 'express';
import GetBookBestRatingQuery from '../../controllers/Book/GetBookBestRatingQuery';

export default class GetBestRatings {
  getBestRatingQuery: GetBookBestRatingQuery;

  constructor(getBestRatingQuery: GetBookBestRatingQuery) {
    this.getBestRatingQuery = getBestRatingQuery;
  }

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const bestRating = await this.getBestRatingQuery.execute();

      if (!bestRating.data) {
        return res.status(bestRating.status).json({ message: bestRating.message });
      }

      return res.status(bestRating.status).json(bestRating.data);
    } catch (error) {
      console.error('Error while retrieving book', error);
      return res.status(500).json({ message: 'Error while retrieving book', error });
    }
  }
}
