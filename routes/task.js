import express from 'express'
import Task from '../models/task.js'
const router = express.Router()

import { testTask, createTask, getTask, updateTask, deleteTask } from '../controllers/task.js'

router.route('/test').get((req, res) => testTask(req, res, Task))
router.route('/').post((req, res) => createTask(req, res, Task))
router.route('/').get((req, res) => getTask(req, res, Task))
router.route('/:id').put((req, res) => updateTask(req, res, Task))
router.route('/:id').delete((req, res) => deleteTask(req, res, Task))

export default router