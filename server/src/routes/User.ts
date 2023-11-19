import express from 'express';
import UserController from '../controllers/User';
const router = express.Router();

router.post('/signup', UserController.Signup);
router.post('/login', UserController.Login);

export default router;

