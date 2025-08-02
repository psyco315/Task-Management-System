import express from 'express'
import Task from '../models/task.js'
import multer from 'multer';
import { storage } from '../database/cloudinary.js';

const router = express.Router()
const upload = multer({ storage });

import { testTask, createTask, getTask, getGivenTask, getTasksByGroup, updateTask, deleteTask, uploadPdf, deletePdf } from '../controllers/task.js'

router.route('/test').get((req, res) => testTask(req, res, Task))
router.route('/').post((req, res) => createTask(req, res, Task))
router.route('/').get((req, res) => getTask(req, res, Task))
router.route('/:id').get((req, res) => getGivenTask(req, res, Task))
router.route('/group/:id').get((req, res) => getTasksByGroup(req, res, Task))
router.route('/:id').put((req, res) => updateTask(req, res, Task))
router.route('/:id').delete((req, res) => deleteTask(req, res, Task))
router.put('/:id/upload', upload.single('file'), (req, res) => uploadPdf(req, res, Task));
router.route('/:id/deletepdf').delete((req, res) => deletePdf(req, res, Task));

export default router