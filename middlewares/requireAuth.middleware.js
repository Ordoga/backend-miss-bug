import { authService } from "../api/auth/auth.service.js"
import { bugService } from "../api/bug/bug.service.js"

export function requireUser(req,res,next){
    const loggedInUser = authService.validateToken(req.cookies.loginToken)
    if(!loggedInUser) return res.status(401).send('Not Authenticated')
    req.loggedInUser = loggedInUser
    next()
}

export function checkUser(req,res,next){
    const { createdBy } = req.body
     if(req.loggedInUser._id !== createdBy._id) return res.status(401).send('Not your bug')
    next() 
}

export async function checkUserByParams(req,res,next){
    const { bugId } = req.params
    const bug = await bugService.getById(bugId)
    if(!bug) return res.status(404).send('Bug not found')

    console.log(bug)

    if(req.loggedInUser._id !== bug.createdBy._id) return res.status(401).send('Not your bug')
    next() 
}