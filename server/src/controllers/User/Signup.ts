import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { MongoIUserModel } from '../../models/User';

class Signup {
  static async signup(req: Request, res: Response) {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new MongoIUserModel({
          email: req.body.email,
          password: hash
        });

        user.save()
          .then(() => res.status(201).json({ message: 'User created' }))
          .catch((error: Error) => res.status(409).json({ message: 'User already exists', error }));
      })
      .catch((error: Error) => {
        console.error(error);
        res.status(500).json({ message: error.message })
      });
  }
}

export default Signup.signup;