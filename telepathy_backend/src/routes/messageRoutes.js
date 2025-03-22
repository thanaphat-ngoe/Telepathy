import { Router } from 'express';
import { getAllMessage, sendMessage, deleteChat } from "../controllers/messageControllers.js";

const router = Router();

router.get('/get/:id', getAllMessage);
router.post('/send/:id', sendMessage);
router.delete('/:id', deleteChat);

export default router;