import express from 'express';
import { askQuestion } from '../controllers/csvController.js';

const router = express.Router();

// router.post("/upload", uploadMiddleware, uploadCSV);
router.post("/ask", askQuestion);

export default router;