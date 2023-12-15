import IBookRepository from '../../../../repositories/Interfaces/IBookRepository';

/**
 * Represents a command to post a rating for a book.
 */
export default interface IPostRatingCommand {
  bookRepository: IBookRepository;

  execute({ userId, bookId, rating }: PostRatingCommandParams): Promise<void>;
}

export interface PostRatingCommandParams {
  userId: string;
  bookId: string;
  rating: number;
}
