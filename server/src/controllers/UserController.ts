import { Request, Response } from 'express';
import LoginQuery from './User/LoginQuery';
import SignupCommand from './User/SignupCommand';

export default class UserController {
  constructor(
    private readonly loginQuery: LoginQuery,
    private readonly signupQuery: SignupCommand,
  ) { }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const login = await this.loginQuery.login(email, password);

    if (!login.data) {
      return res.status(login.status).json({ message: login.message });
    }

    return res.status(login.status).json(login.data);
  }

  async signup(req: Request, res: Response) {
    const { email, password } = req.body;

    const signup = await this.signupQuery.signup(email, password);
    return res.status(signup.status).json({ message: signup.message });
  }
}
