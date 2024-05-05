import { bugService } from "./bug.service.js";


export async function getBugs(req,res){
    try {
        const { textSearch, minSeverity, labels, sortBy, sortDir, pageIdx } = req.query
        const filterBy = { textSearch, minSeverity : +minSeverity, labels, pageIdx}
        const sortByObj = { sortBy, sortDir: +sortDir }
        const bugs = await bugService.query(filterBy, sortByObj)
        res.send(bugs)
        
    } catch (err) {
        res.send("Error getting bugs")
    }
}

export async function getBug(req,res){
    try {
        const bugId = req.params.bugId
        const bug = await bugService.getById(bugId)
        let visitedBugs = req.cookies.visitedBugs || "[]"
        visitedBugs = JSON.parse(visitedBugs)
        if(visitedBugs.length >= 3){
            return res.status(401).send('Wait for a bit')
        }
        if(!visitedBugs.includes(bugId)){
            visitedBugs.push(bugId)
        }
        visitedBugs = JSON.stringify(visitedBugs)
        res.cookie('visitedBugs', visitedBugs, { maxAge : 7000 })
        res.send(bug)
    } catch (err) {
        res.send("Could not find your bug")
    }
}


export async function addBug(req,res){
    const { title, description, severity, labels } = req.body
    let bugToSave = { title, description, labels, severity : +severity}
    try {
        // Get the bug with createdAt & _id after save
        bugToSave = await bugService.save(bugToSave)
        res.send(bugToSave)
    }catch(err){
        res.send("Could not add bug")
    }
}

export async function updateBug(req,res){
    const { _id, title, description, severity, labels, createdAt } = req.body
    let bugToSave = { _id, title, description, labels, severity : +severity, createdAt : +createdAt}    
    try {
        bugToSave = await bugService.save(bugToSave)
        res.send(bugToSave)
    }catch (err) {
        res.send("Could not update bug")
    }
}

export async function removeBug(req,res){
    try {
        await bugService.removeBug(req.params.bugId)
        res.send("bug with ID: " + req.params.bugId + " Deleted")
    } catch (err) {
        res.send(err)
    }
}
