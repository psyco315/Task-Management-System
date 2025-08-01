import express from 'express'
import { signIn, signUp } from '../controllers/auth.js'
import User from '../models/User.js';
const router = express.Router()


router.route('/signin').post((req, res) => signIn(req, res, User))

export default router