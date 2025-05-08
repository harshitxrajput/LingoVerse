import express from 'express';

import { isLoggedIn } from '../middlewares/auth.middleware.js';
import {
    getRecommendedUsersController,
    getMyFriendsController,
    sendFriendRequestController,
    acceptFriendRequestController,
    getFriendRequestController,
    getOutgoingFriendRequestController
} from '../controllers/user.controller.js';

const router = express.Router();

router.use(isLoggedIn);

router.get('/', getRecommendedUsersController);
router.get('/friends', getMyFriendsController);

router.post('/friend-request/:id', sendFriendRequestController);
router.put('/friend-request/:id/accept', acceptFriendRequestController);

router.get('/friend-request', getFriendRequestController);
router.get('/outgoing-friend-request', getOutgoingFriendRequestController);

export default router;