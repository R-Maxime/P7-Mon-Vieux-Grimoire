import express from 'express';
import { getBookById, getBooks, postBook } from '../controllers/Book';
import auth from '../middlewares/auth';
import multer from '../middlewares/multer';
const router = express.Router();


// https://course.oc-static.com/projects/D%C3%A9veloppeur+Web/DW_P7+Back-end/DW+P7+Back-end+-+Specifications+API.pdf

router.get('/', getBooks);
router.get('/:id', getBookById);
router.get('/bestrating');
router.post('/', auth, multer, postBook);
router.put('/:id',);
router.delete('/:id');
router.post('/:id/ratings');

export default router;

