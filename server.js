import e from "express"
import { bugService } from "./services/bug-service.js"

import express from "express"

const app = express()

app.get("/", (req, res) => res.send("Hello there"))

// return bugLists
app.get("/api/bug", async (req, res) => {
    try {
        const bugs = await bugService.query()
        res.send(bugs)
    } catch (err) {
        res.send("Error getting bugs")
    }
})

app.get("/api/bug/save", async (req, res) => {
    try {
        const bugToSave = {
            _id: req.query._id,
            title: req.query.title,
            severity: +req.query.severity,
        }
        const bugSaved = await bugService.save(bugToSave)
        res.status(200).send(bugSaved)
    } catch (err) {
        res.send(err)
    }
})

app.get("/api/bug/:bugId", async (req, res) => {
    try {
        const bugId = req.params.bugId
        const bug = await bugService.getById(bugId)
        res.send(bug)
    } catch (err) {
        res.send(err)
    }
})

app.get("/api/bug/:bugId/remove", async (req, res) => {
    try {
        await bugService.removeBug(req.params.bugId)
        res.send("bug with ID: " + req.params.bugId + " Deleted")
    } catch (err) {
        res.send(err)
    }
})

app.listen(3030, () => console.log("Server ready at port 3030"))
