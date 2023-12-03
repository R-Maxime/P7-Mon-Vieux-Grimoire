import sharp from 'sharp';
import { Request, Response, NextFunction } from 'express';
import path from 'path';

export default function SharpMiddleWare(req: Request, res: Response, next: NextFunction) {
  if (!req.file) {
    return next();
  }

  const fileName = path.parse(req.file.originalname).name;
  const newFilename = `${fileName}_${Date.now()}.webp`;
  req.file.filename = newFilename;

  sharp(req.file.buffer)
    .resize({ width: 500, height: 500, fit: 'contain' })
    .webp({ quality: 90 })
    .toFile(`public/img/${newFilename}`)
    .then(() => next())
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ message: error.message });
    });
  return true;
}
