import express from "express";
import Group from "../models/group.js";
import { createGroup, getAllGroups, getGroupsByUserId, updateGroup, joinGroup, deleteGroup } from "../controllers/group.js";

const router = express.Router()

router.route('/').post((req, res) => createGroup(req, res, Group))
router.route('/').get((req, res) => getAllGroups(req, res, Group))
router.route('/:id').get((req, res) => getGroupsByUserId(req, res, Group))
router.route('/:id').put((req, res) => updateGroup(req, res, Group))
router.route('/:id/join').put((req, res) => joinGroup(req, res, Group))
router.route('/:id').delete((req, res) => deleteGroup(req, res, Group))

export default router