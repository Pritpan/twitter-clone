import express from 'express'
import { registerUser, loginUser, logoutUser, bookmark, follow, getMyProfile, getOtherUsers, unfollow, updateProfile} from '../controllers/usercontroller.js'
import isAuthenticated from '../config/auth.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route("/bookmark/:id").put(isAuthenticated, bookmark)
router.route("/profile").get(isAuthenticated, getMyProfile);
router.route("/otheruser/:id").get(isAuthenticated, getOtherUsers);
router.route("/follow/:id").put(isAuthenticated, follow);
router.route("/unfollow/:id").put(isAuthenticated, unfollow);
router.route("/updateprofile/").put(isAuthenticated, updateProfile);

export default router;