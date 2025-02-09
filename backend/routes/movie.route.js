import express from 'express';
import { getTrandingMovie } from '../controllers/movieController.js';
const router = express.Router();

router.get("/trending",getTrandingMovie);

export default router;