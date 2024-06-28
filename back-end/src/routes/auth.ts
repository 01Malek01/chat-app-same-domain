import express from 'express'
import { login, logout, signup } from '../controllers/authController';
import validateUser from '../middlewares/validateUser';
import { body } from 'express-validator';


  const router = express.Router();

router.post ('/login',body("email").isEmail().withMessage("Email must be a valid email address."),login);
router.post("/signup", validateUser, signup);
router.post ('/logout',logout);


export default router