import express from 'express';
import {
  addMovie,
  deleteMovie,
  getMovieById,
  getMovieList,
  updateMovie,
} from '../controllers/movieController';

const router = express.Router();

router.get('/', getMovieList);
router.post('/', addMovie);
router.get('/:id', getMovieById);
router.delete('/:id', deleteMovie);
router.patch('/:id', updateMovie);

export default router;
