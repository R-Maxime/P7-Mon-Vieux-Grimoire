import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export default function auth(req: Request, res: Response, next: Function) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const userId = decodedToken.userId;

    if (req.body.userId && req.body.userId !== userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
}