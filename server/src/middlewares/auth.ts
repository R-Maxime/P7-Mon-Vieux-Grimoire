import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export default function Auth(req: Request, res: Response, next: Function) {
  try {
    const token: string | undefined = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    const { userId } = decodedToken;

    if (req.body.userId && req.body.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    next();
    return true;
  } catch (error: any) {
    console.error(error);
    res.status(401).json({ error: error.message });
    return false;
  }
}
