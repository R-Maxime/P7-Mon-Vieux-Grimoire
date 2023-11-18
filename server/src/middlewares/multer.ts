import multer from "multer";
import { Request } from 'express';
import path from "path";

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, callback: Function) => {
    callback(null, 'public/img/');
  },
  filename: (req: Request, file: Express.Multer.File, callback: Function) => {
    const filename = path.parse(file.originalname).name.split(' ').join('_');
    const extension = path.extname(file.originalname);
    callback(null, `${filename}_${Date.now()}${extension}`);
  }
})

export default multer({ storage }).single('image');
