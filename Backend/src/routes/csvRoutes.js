import express from 'express';
import { askQuestion, uploadCSV, uploadMiddleware } from '../controllers/csvController.js';

const router = express.Router();

router.post("/upload", uploadMiddleware, uploadCSV);
router.post("/ask", askQuestion);

export default router;