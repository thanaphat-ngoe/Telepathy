import { Router } from 'express';
import { createChat, getChat, deleteChat } from "../controllers/chatControllers.js";

const router = Router();

router.post('/createChat', createChat);
router.get('/getChat', getChat);
router.delete('/deleteChat', deleteChat);

export default router;