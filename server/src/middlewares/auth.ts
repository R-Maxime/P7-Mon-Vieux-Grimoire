import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function AuthMiddleware(req: Request, res: Response, next: NextFunction): void {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const token = authorization.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    const { userId } = decodedToken as { userId: string };

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    req.body.userId = userId;
    next();
  } catch (error) {
    console.error('Error while authenticating user: ', error);
    res.status(500).json({ message: 'Error while authenticating user', error });
  }
}
