import { Request, Response } from 'express';
import LoginQuery from '../controllers/User/LoginQuery';
import SignupCommand from '../controllers/User/SignupCommand';
import Login from './User/Login';
import Signup from './User/Signup';

export default class UserController {
  constructor(
    private readonly loginQuery: LoginQuery,
    private readonly signupCommand: SignupCommand,
  ) { }

  async login(req: Request, res: Response) {
    const login = await new Login(this.loginQuery).execute(req, res);
    return login;
  }

  async signup(req: Request, res: Response) {
    const signup = await new Signup(this.signupCommand).execute(req, res);
    return signup;
  }
}
