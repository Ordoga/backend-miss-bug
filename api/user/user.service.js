import fs from "fs"
import { utilService } from "../../services/util.service.js"

const users = utilService.readJsonFile("./data/users.json")

export const userService = {
    query,
    getById,
    getMiniuserById,
    removeUser,
    save,
    getByUsername,
}

async function query() {
    try{
        return users
    }catch(err){
        throw err
    }
}

async function getById(userId) {
    try {
        const user = users.find(user => user._id === userId)
        if (!user) throw new Error(`Could not find user with ID ${userId}`)
        return user
    } catch (err) {
        throw err.message
    }
}

async function getMiniuserById(userId) {
    try {
        const user = users.find(user => user._id === userId)
        if (!user) throw new Error(`Could not find user with ID ${userId}`)
        return { fullname: user.fullname, _id: user._id }
    } catch (err) {
        throw err.message
    }
}

async function removeUser(userId) {
    try {
        const userIdx = users.findIndex(user => user._id === userId)
        if (userIdx === -1)
            throw new Error(`Could not find user with ID ${userId}`)
        users.splice(userIdx, 1)
        await _saveUsersToFile()
        return userIdx
    } catch (err) {
        throw err.message
    }
}

async function save(userToSave) {
    try {
        if (userToSave._id) {
            const userIdx = users.findIndex(user => user._id === userToSave._id)
            if (userIdx === -1) {
                throw new Error(`Could not find user with id ${userToSave._id}`)
            }
            users[userIdx] = userToSave
        } else {
            userToSave._id = utilService.makeId()
            userToSave.score = 100
            userToSave.isAdmin = false
            users.push(userToSave)
        }
        await _saveUsersToFile()
        return userToSave
    } catch (err) {
        throw err.message
    }
}

async function getByUsername(username) {
    const user = users.find(user => user.username === username)
    return user
}


async function _saveUsersToFile(path = "./data/users.json") {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(users, null, 4)
        fs.writeFile(path, data, err => {
            if (err) return reject(err)
            resolve()
        })
    })
}