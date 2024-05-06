import { userService } from "./user.service.js";

export async function getUsers(req,res){
    try {
        const users = await userService.query()
        res.send(users)
    } catch (err) {
        res.send("Error getting users")
    }
}

export async function getUser(req,res){
    try {
        const userId = req.params.userId
        const user = await userService.getById(userId)
        res.send(user)
    } catch (err) {
        res.send("Could not find your user")
    }
}

export async function addUser(req,res){
    const { fullname, username, password, score } = req.body
    let userToSave = { fullname, username, password, score : +score }
    try {
        userToSave = await userService.save(userToSave)
        res.send(userToSave)
    }catch(err){
        res.send("Could not add user")
    }
}

export async function updateUser(req,res){
    const { _id, fullname, username, password, score } = req.body
    let userToSave = { _id, fullname, username, password, score : +score } 
    try {
        userToSave = await userService.save(userToSave)
        res.send(userToSave)
    }catch (err) {
        res.send("Could not update user")
    }
}

export async function removeUser(req,res){
    try {
        await userService.removeUser(req.params.userId)
        res.send("user with ID: " + req.params.userId + " Deleted")
    } catch (err) {
        res.send(err)
    }
}
