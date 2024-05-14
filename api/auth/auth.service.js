import Cryptr from 'cryptr'
import bcrypt from 'bcrypt'

import { userService } from '../user/user.service.js'

const cryptr = new Cryptr('MyKey654321')

export const authService = {
    getLoginToken,
    validateToken,
    login,
    signup
}

function getLoginToken(miniUser){
    const userAsStr = JSON.stringify(miniUser)
    const encryptedStr = cryptr.encrypt(userAsStr)
    return encryptedStr
}

function validateToken(token){
    try{
        const miniUserJson = cryptr.decrypt(token)
        const loggedinMiniUser = JSON.parse(miniUserJson)
        return loggedinMiniUser
    }catch(error){
        console.log('Invalid login token')
    }
}

async function login(username,password){
    const user = await userService.getByUsername(username)
    if(!user) throw 'Unkown username'

    // const match = await bcrypt.compare(password, user.password)
    // if (!match) throw 'Invalid username or password'

    const miniUser = {
        _id : user._id,
        fullname: user.fullname,
        score: user.score,
        isAdmin: user.isAdmin
    }
    return miniUser
}

async function signup({username, password}){
    const userExist = await userService.getByUsername(username)
    if(userExist) throw 'Username already taken'

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password. saltRounds)
    return userService.save({username, password:hashedPassword})
}