import fs from "fs"
import { utilService } from "./util.service.js"

const bugs = utilService.readJsonFile("data/bugs.json")

export const bugService = {
  query,
  getById,
  removeBug,
  save,
}

// async?
async function query() {
  try {
    return bugs
  } catch (err) {
    throw err
  }
}

async function getById(bugId) {
  try {
    const bug = bugs.find((bug) => bug._id === bugId)
    return bug
  } catch (err) {
    throw err
  }
}

async function removeBug(bugId) {
  // TODO Convert to what?
  try {
    const bugIdx = bugs.findIndex((bug) => bug._id === bugId)
    if (bugIdx > -1) {
      bugs.splice(bugIdx, 1)
      await _saveBugsToFile()
    }
    return bugIdx
  } catch (err) {
    throw err
  }
}

async function save(bugToSave) {}

function _saveBugsToFile(path = "data/bugs.json") {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(bugs, null, 4)
    fs.writeFile(path, data, (err) => {
      if (err) return reject(err)
      resolve()
    })
  })
}
