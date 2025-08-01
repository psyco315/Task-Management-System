import express from 'express'
import { signIn, signUp } from '../controllers/auth.js'
import User from '../models/user.js';
const router = express.Router()


router.route('/signin').post((req, res) => signIn(req, res, User))
router.route('/signup').post((req, res) => signUp(req, res, User))

export default router