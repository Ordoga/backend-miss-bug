import { authService } from "../api/auth/auth.service.js"

export function requireUser(req,res,next){
    const loggedInUser = authService.validateToken(req.cookies.loginToken)
    if(!loggedInUser) return res.status(401).send('Not Authenticated')
    req.loggedInUser = loggedInUser
    next()
}

export function checkUser(req,res,next){
 const { _id : bugId } = req.body.bugId
 console.log(bugId)
 next()

 
}