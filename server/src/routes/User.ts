import express from 'express';
import UserController from '../controllers/User';

class UserRoutes {
    private router: express.Router;

    constructor() {
        this.router = express.Router();
        this.setupRoutes();
    }

    private setupRoutes(): void {
        this.router.post('/signup', UserController.Signup);
        this.router.post('/login', UserController.Login);
    }

    getRouter(): express.Router {
        return this.router;
    }
}

export default new UserRoutes().getRouter();
