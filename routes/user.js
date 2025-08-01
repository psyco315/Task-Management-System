import express from 'express'
import User from '../models/user.js'
const router = express.Router()

import { createUser, getAllUsers, getUser, updateUser, deleteUser } from '../controllers/user.js'

router.route('/').post((req, res) => createUser(req, res, User))
router.route('/').get((req, res) => getAllUsers(req, res, User))
router.route('/:id').get((req, res) => getUser(req, res, User))
router.route('/:id').put((req, res) => updateUser(req, res, User))
router.route('/:id').delete((req, res) => deleteUser(req, res, User))

export default router