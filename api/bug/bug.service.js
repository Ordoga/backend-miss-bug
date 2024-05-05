import fs from "fs"
import { utilService } from "../../services/util.service.js"

const PAGE_SIZE = 6
const bugs = utilService.readJsonFile("./data/bugs.json")



export const bugService = {
    query,
    getById,
    removeBug,
    save,
}

async function query(filterBy = getDefaultFilter(), sortBy = getDefaultSort()) {
    let filteredBugs = [...bugs]    

    try {
        filteredBugs = _filterBugs(filteredBugs ,filterBy)
        filteredBugs = _sortBugs(filteredBugs,sortBy)
        const response = {
            amountOfToalMathchingBugs : filteredBugs.length
        }

        filteredBugs = _getPage(filteredBugs, filterBy.pageIdx)
        response.bugs = filteredBugs
        return response
    } catch (err) {
        throw err
    }
}

function _getPage(bugs, pageIdx = 0){
    const startIdx = pageIdx * PAGE_SIZE
    return bugs.slice(startIdx, startIdx + PAGE_SIZE)
}

async function getById(bugId) {
    try {
        const bug = bugs.find(bug => bug._id === bugId)
        if (!bug) throw new Error(`Could not find bug with ID ${bugId}`)
        return bug
    } catch (err) {
        throw err.message
    }
}

async function removeBug(bugId) {
    try {
        const bugIdx = bugs.findIndex(bug => bug._id === bugId)
        if (bugIdx === -1)
            throw new Error(`Could not find bug with ID ${bugId}`)
        bugs.splice(bugIdx, 1)
        await _saveBugsToFile()
        return bugIdx
    } catch (err) {
        throw err.message
    }
}

async function save(bugToSave) {
    try {
        if (bugToSave._id) {
            const bugIdx = bugs.findIndex(bug => bug._id === bugToSave._id)
            if (bugIdx === -1) {
                throw new Error(`Could not find bug with id ${bugToSave._id}`)
            }
            // TODO : Add labels functionality
            bugToSave = { ...bugs[bugIdx], severity: bugToSave.severity }
            bugs[bugIdx] = bugToSave
        } else {
            bugToSave._id = utilService.makeId()
            bugToSave.createdAt = Date.now()
            bugs.push(bugToSave)
        }
        await _saveBugsToFile()
        return bugToSave
    } catch (err) {
        throw err.message
    }
}

async function _saveBugsToFile(path = "./data/bugs.json") {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(bugs, null, 4)
        fs.writeFile(path, data, err => {
            if (err) return reject(err)
            resolve()
        })
    })
}

function getDefaultFilter() {
    return {
        textSearch: "",
        minSeverity: "",
        labels: "",
        pageIdx: 0
    }
}

function getDefaultSort(){
    return {
        sortBy: "severity",
        sortDir: -1
    }
}

function _filterBugs(bugs, filterBy){
    if(filterBy.textSearch){
        bugs = bugs.filter(bug => (
            bug.title.toLowerCase().includes(filterBy.textSearch.toLowerCase()) ||
            bug.description.toLowerCase().includes(filterBy.textSearch.toLowerCase())))
        }
    if(filterBy.minSeverity){
        bugs = bugs.filter(bug => bug.severity >= filterBy.minSeverity)
    }
    if(filterBy.labels){
        // TODO
    }
    return bugs
}

function _sortBugs(bugs,sortBy){
    switch(sortBy.sortBy){
        case 'createdAt':
            bugs = bugs.sort((a,b) => (a.createdAt - b.createdAt)*sortBy.sortDir)
            break;
        case 'severity':
            bugs = bugs.sort((a,b) => (a.severity - b.severity)*sortBy.sortDir)
            break;
        case 'title':
            bugs = _sortByTitle(bugs, sortBy.sortDir)
            break;
    }
    return bugs
}

function _sortByTitle(bugs,sortDir){
    const sortComperator = utilService.sortingByTitleComparator(sortDir)
    bugs = bugs.sort(sortComperator)
    return bugs
}