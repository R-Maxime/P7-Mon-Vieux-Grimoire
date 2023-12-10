import express from 'express';
import UserController from '../express/User';
import LoginQuery from '../controllers/User/LoginQuery';
import SignupCommand from '../controllers/User/SignupCommand';
import { IUserRepository, MongoDBUserRepository } from '../repositories/IUserRepository';

class UserRoutes {
  private router: express.Router;

  private UserRepository: IUserRepository = new MongoDBUserRepository();

  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    const controller = new UserController(
      new LoginQuery(this.UserRepository),
      new SignupCommand(this.UserRepository),
    );

    this.router.post('/signup', controller.signup.bind(controller));
    this.router.post('/login', controller.login.bind(controller));
  }

  getRouter(): express.Router {
    return this.router;
  }
}

export default new UserRoutes().getRouter();
