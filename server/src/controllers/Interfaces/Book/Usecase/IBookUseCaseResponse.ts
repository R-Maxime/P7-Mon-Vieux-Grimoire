import { IBook } from '../../../../models/Book';

export default interface IBookUseCaseResponse {
  status: number;
  message?: string;
  data?: IBook | null;
  datas?: IBook[] | null;
}
