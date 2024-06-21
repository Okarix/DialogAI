import { Router } from 'express';
import { getChats, getChatById } from '../controllers/chatController';

const router = Router();

router.get('/chats', getChats);
router.get('/chats/:id', getChatById);

export default router;
