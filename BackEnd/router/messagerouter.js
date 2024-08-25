import express from 'express'
import {getAllMessages, sendMessage} from '../controllers/messageControllers.js'
import { isAdminAuthenicated } from '../middlewares/auth.js';
const router = express.Router();

router.post('/send',sendMessage);
router.get('/getall',getAllMessages,isAdminAuthenicated)
export default router;
