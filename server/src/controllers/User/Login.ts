import { Request, Response } from 'express';
import LoginQuery from './Usecase/LoginQuery';
import ILogin from '../Interfaces/User/ILogin';

export default class Login implements ILogin {
  loginQuery: LoginQuery;

  constructor(loginQuery: LoginQuery) {
    this.loginQuery = loginQuery;
  }

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const login = await this.loginQuery.login(email, password);

      if (!login.data) {
        return res.status(login.status).json({ message: login.message });
      }

      return res.status(login.status).json(login.data);
    } catch (error) {
      console.error('Error while logging in', error);
      return res.status(500).json({ message: 'Error while logging in', error });
    }
  }
}
