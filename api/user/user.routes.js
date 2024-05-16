import express from 'express'
import { getUsers, getUser, addUser, updateUser, removeUser } from './user.contoller.js'
import { requireAdmin } from '../../middlewares/requireAuth.middleware.js'
const router = express.Router()

router.get('/', requireAdmin, getUsers)
router.get('/:userId', getUser)
router.post('/', addUser)
router.put('/:userId', requireAdmin, updateUser)
router.delete('/:userId', requireAdmin, removeUser)

export const userRoutes = router

