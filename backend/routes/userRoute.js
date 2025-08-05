import express from 'express'
import { registerUser, loginUser, logoutUser, bookmarkTweet, getMyProfile, otherUserProfile} from '../controllers/usercontroller.js'
import isAuthenticated from '../config/auth.js';
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/bookmark/:id').put(isAuthenticated, bookmarkTweet);
router.route('/profile/:id').get(isAuthenticated, getMyProfile);
router.route('/otheruser/:id').get(isAuthenticated, otherUserProfile);


export default router;