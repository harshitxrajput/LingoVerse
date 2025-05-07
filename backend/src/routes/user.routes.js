import express from 'express';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
import { getMyFriendsController, getRecommendedUsersController } from '../controllers/user.controller.js';

const router = express.Router();

router.use(isLoggedIn);

router.get('/', getRecommendedUsersController);
router.get('/friends', getMyFriendsController);

export default router;