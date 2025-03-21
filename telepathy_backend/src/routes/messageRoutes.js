import { Router } from 'express';
import { getAllMessage, sendMessage, deleteChat } from "../controllers/messageControllers.js";

const router = Router();

router.get('/:id', getAllMessage);
router.post('/:id', sendMessage);
router.delete('/:id', deleteChat);

export default router;