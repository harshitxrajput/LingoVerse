import express from 'express';

import { isLoggedIn } from '../middlewares/auth.middleware.js';
import { getStreamTokenController } from '../controllers/chat.controller.js';

const router = express.Router();

router.get('/token', isLoggedIn, getStreamTokenController);

export default router;