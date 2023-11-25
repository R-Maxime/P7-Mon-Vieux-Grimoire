import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../models/User';
import { Request, Response } from 'express';

class Login {
  userRepository: User;

  constructor(userRepository: User) {
    this.userRepository = userRepository;
  }

  async login(req: Request, res: Response) {
    try {
      if (!req.body.email || !req.body.password) {
        return res.status(400).json({ error: 'Missing parameters' });
      }

      const user = await this.userRepository.getUserByMail(req.body.email);

      if (!user) {
        return res.status(401).json({ error: 'Login or password incorrect' });
      }

      const passwordIsValid = await this.comparePassword(req.body.password, user.password);

      if (!passwordIsValid) {
        return res.status(401).json({ error: 'Login or password incorrect' });
      }

      const token = this.generateToken(user);

      if (!token) {
        console.error('Error while generating token for user: ', user);
        return res.status(500).json({ error: 'Error while generating token' });
      }

      res.status(200).json({
        userId: user._id,
        token: token
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  generateToken(user: any): string {
    return jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    )
  }
}

export default Login;