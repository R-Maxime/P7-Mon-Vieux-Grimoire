import express from 'express';
import BookController from '../controllers/Book';
import auth from '../middlewares/auth';
import multer from '../middlewares/multer';
import sharpMiddleware from '../middlewares/sharp';
const router = express.Router();


// https://course.oc-static.com/projects/D%C3%A9veloppeur+Web/DW_P7+Back-end/DW+P7+Back-end+-+Specifications+API.pdf

router.get('/', BookController.GetBooks);
router.get('/:id', BookController.GetBookById);
// router.get('/bestrating');
router.post('/', auth, multer, sharpMiddleware, BookController.PostBook);
// router.put('/:id',);
router.delete('/:id', auth, BookController.DeleteBook);
// router.post('/:id/ratings');

export default router;

