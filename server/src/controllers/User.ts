import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { MongoIUserModel } from '../models/User';
import { Request, Response } from 'express';

export function signup(req: Request, res: Response) {
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
    .catch((error: Error) => res.status(500).json({ message: 'Error during process', error }));
};

export function login(req: Request, res: Response) {
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
        .catch((error: Error) => res.status(500).json({ message: 'Error during process', error }));
    })
    .catch((error: Error) => res.status(500).json({ message: 'Error during process', error }));
}