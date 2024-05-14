import { authService } from "./auth.service.js"


export async function login(req,res){
    const { username, password } = req.body
    try{
        const user = await authService.login(username,password)
        const loginToken = authService.getLoginToken(user)
        res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true })
        res.json(user)
    }catch(error){
        res.status(401).send('Failed to Login : ' + error)
    }
}

export async function signup(req,res){
    res.send('Hi!2')
}

export async function logout(req,res){
    try{
        res.clearCookie('loginToken')
        res.send('Logged Out')
    }catch(error){
        res.status(400).send('Failed to logout : ' + error)
    }
}
