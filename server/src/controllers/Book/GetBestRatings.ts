import { Request, Response } from 'express';
import GetBookBestRatingQuery from './Usecase/GetBookBestRatingQuery';
import IGetBestRatings from '../Interfaces/Book/IGetBestRatings';

export default class GetBestRatings implements IGetBestRatings {
  getBestRatingQuery: GetBookBestRatingQuery;

  constructor(getBestRatingQuery: GetBookBestRatingQuery) {
    this.getBestRatingQuery = getBestRatingQuery;
  }

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const bestRating = await this.getBestRatingQuery.execute();

      if (!bestRating.datas) {
        return res.status(bestRating.status).json({ message: bestRating.message });
      }

      return res.status(bestRating.status).json(bestRating.datas);
    } catch (error) {
      console.error('Error while retrieving book', error);
      return res.status(500).json({ message: 'Error while retrieving book', error });
    }
  }
}
