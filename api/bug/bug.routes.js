import express from 'express'
import { getBugs, getBug, addBug, updateBug, removeBug } from './bug.contoller.js'
import { checkUser, requireUser } from '../../middlewares/requireAuth.middleware.js'

const router = express.Router()

router.get('/', getBugs)
router.get('/:bugId', getBug)
router.post('/', requireUser, addBug)
router.put('/:bugId',requireUser, checkUser, updateBug)
router.delete('/:bugId',removeBug)

export const bugRoutes = router

