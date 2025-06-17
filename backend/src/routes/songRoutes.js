import express from 'express';
import {
  createSong,
  getSongs,
  getSongById,
  updateSong,
  deleteSong,
} from '../controllers/songController.js';

const router = express.Router();

router.post('/', createSong);
router.get('/', getSongs);
router.get('/:id', getSongById);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);

export default router;
