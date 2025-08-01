import express from 'express'
// import User from '../models/user.js'
const router = express.Router()

import { createUserA, getUserA, updateUserA, deleteUserA } from '../controllers/admin.js'

router.route('/').post((req, res) => createUserA(req, res, User))
router.route('/:id').get((req, res) => getUserA(req, res, User))
router.route('/:id').put((req, res) => updateUserA(req, res, User))
router.route('/:id').delete((req, res) => deleteUserA(req, res, User))

export default router