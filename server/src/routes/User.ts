import express from 'express';
import Login from '../controllers/User/Login';
import Signup from '../controllers/User/Signup';
import { User } from '../models/User';

class UserRoutes {
    private router: express.Router;
    private UserRepository: User = new User;
    private Login: Login = new Login(this.UserRepository);
    private Signup: Signup = new Signup(this.UserRepository);

    constructor() {
        this.router = express.Router();
        this.setupRoutes();
    }

    private setupRoutes(): void {
        this.router.post('/signup', this.Signup.signup);
        this.router.post('/login', this.Login.login);
    }

    getRouter(): express.Router {
        return this.router;
    }
}

export default new UserRoutes().getRouter();
