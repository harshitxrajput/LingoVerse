import express from "express";

import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { 
    loginController,
    logoutController,
    onboardController,
    profileController,
    signupController
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/signup', signupController);

router.post('/login', loginController);

router.post('/logout', isLoggedIn, logoutController);

router.post('/onboarding', isLoggedIn, onboardController);

router.get('/profile', isLoggedIn, profileController);

export default router;