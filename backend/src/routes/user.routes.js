import express from 'express';

import { isLoggedIn } from '../middlewares/auth.middleware.js';
import {
    getMyFriendsController,
    getRecommendedUsersController,
    sendFriendRequestController
} from '../controllers/user.controller.js';

const router = express.Router();

router.use(isLoggedIn);

router.get('/', getRecommendedUsersController);

router.get('/friends', getMyFriendsController);

router.post('/friend-request/:id', sendFriendRequestController);

export default router;