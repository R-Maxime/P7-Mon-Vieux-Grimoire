import { Request, Response } from 'express';
import LoginQuery from './User/Usecase/LoginQuery';
import SignupCommand from './User/Usecase/SignupCommand';
import Login from './User/Login';
import Signup from './User/Signup';
import IUserController from './Interfaces/IUserController';

export default class UserController implements IUserController {
  constructor(
    readonly loginQuery: LoginQuery,
    readonly signupCommand: SignupCommand,
  ) { }

  async login(req: Request, res: Response): Promise<Response> {
    const login = await new Login(this.loginQuery).execute(req, res);
    return login;
  }

  async signup(req: Request, res: Response): Promise<Response> {
    const signup = await new Signup(this.signupCommand).execute(req, res);
    return signup;
  }
}
