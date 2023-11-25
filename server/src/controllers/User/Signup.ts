import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { IUser, User } from '../../models/User';

class Signup {
  userRepository: User;

  constructor(userRepository: User) {
    this.userRepository = userRepository;
  }

  public async signup(req: Request, res: Response) {
    try {
      if (!req.body.email || !req.body.password) {
        return res.status(400).json({ error: 'Missing parameters' });
      }

      const hash = await this.hashPassword(req.body.password);
      if (!hash) {
        return res.status(500).json({ error: 'Error while hashing password' });
      }

      const user = await this.userRepository.createUser({
        email: req.body.email,
        password: hash
      } as IUser);

      if (!user) {
        return res.status(500).json({ error: 'Error while creating user' });
      }

      res.status(201).json({ message: 'User created' });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}

export default Signup;