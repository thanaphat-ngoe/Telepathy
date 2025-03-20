import { Router } from 'express';
const router = Router();
import { getAllMessage, sendMessage, deleteChat } from "../controllers/messageControllers.js";


router.get('/:id', getAllMessage);
router.post('/:id', sendMessage);
router.delete('/:id', deleteChat);

export default router;