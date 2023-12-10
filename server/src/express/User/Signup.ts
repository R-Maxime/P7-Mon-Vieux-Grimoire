import { Request, Response } from 'express';
import SignupCommand from '../../controllers/User/SignupCommand';

export default class Signup {
  signupQuery: SignupCommand;

  constructor(signupQuery: SignupCommand) {
    this.signupQuery = signupQuery;
  }

  async execute(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const signup = await this.signupQuery.signup(email, password);
      return res.status(signup.status).json({ message: signup.message });
    } catch (error) {
      console.error('Error while creating user', error);
      return res.status(500).json({ message: 'Error while creating user', error });
    }
  }
}
