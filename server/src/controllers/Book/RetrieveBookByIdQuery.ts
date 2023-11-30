import { IBookRepository } from '../../models/Book';
import { Request, Response } from 'express';

export default class RetrieveBookByIdQuery {
  bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(id: string) {
    const book = await this.bookRepository.getBookById(id);

    if (!book) {
      return {
        status: 404,
        message: 'Book not found'
      }
    }

    return {
      status: 200,
      data: book
    }
  }
}