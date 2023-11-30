import express from 'express';
import { IUserRepository, MongoDBUserRepository } from '../models/User';
import UserController from '../controllers/UserController';
import LoginQuery from '../controllers/User/LoginQuery';
import SignupQuery from '../controllers/User/SignupQuery';

class UserRoutes {
    private router: express.Router;
    private UserRepository: IUserRepository = new MongoDBUserRepository;

    constructor() {
        this.router = express.Router();
        this.setupRoutes();
    }

    private setupRoutes(): void {
        const controller = new UserController(
            new LoginQuery(this.UserRepository),
            new SignupQuery(this.UserRepository)
        );

        this.router.post('/signup', controller.signup.bind(controller));
        this.router.post('/login', controller.login.bind(controller));
    }

    getRouter(): express.Router {
        return this.router;
    }
}

export default new UserRoutes().getRouter();
