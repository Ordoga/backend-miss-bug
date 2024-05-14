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
    try{
        const credentials = req.body
        const account = await authService.signup(credentials)
        console.log('New account created : ' + JSON.stringify(account))
        const miniUser = await authService.login(credentials.username,credentials.password)
        const loginToken = await authService.getLoginToken(miniUser)
        res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true })
        res.json(miniUser)
    }catch(error){
        res.status(400).send('Signup failed: ' + error)
    }
}

export async function logout(req,res){
    try{
        res.clearCookie('loginToken')
        res.send('Logged Out')
    }catch(error){
        res.status(400).send('Failed to logout : ' + error)
    }
}
