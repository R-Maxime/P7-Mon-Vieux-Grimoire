import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { MongoIUserModel } from '../../models/User';
import { Request, Response } from 'express';

export default function Login(req: Request, res: Response) {
  MongoIUserModel.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Login or password incorrect' });
      }

      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Login or password incorrect' });
          }

          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.JWT_SECRET as string,
              { expiresIn: '24h' }
            )
          });
        })
        .catch((error: Error) => {
          console.error(error);
          res.status(500).json({ message: error.message })
        });
    })
    .catch((error: Error) => {
      console.error(error);
      res.status(500).json({ message: error.message })
    });
}