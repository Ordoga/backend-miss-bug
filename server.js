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
    throw err
  }
})

app.get("/api/bug/save", async (req, res) => {})

app.get("/api/bug/:bugId", async (req, res) => {
  try {
    const bugId = req.params.bugId
    const bug = await bugService.getById(bugId)
    if (bug) {
      res.send(bug)
    } else {
      res.status(400).send("Could not find bug with id: " + req.params.bugId)
    }
  } catch (err) {
    throw err
  }
})

app.get("/api/bug/:bugId/remove", async (req, res) => {
  try {
    // TODO How to catch an error?
    const bugIdx = await bugService.removeBug(req.params.bugId)
    if (bugIdx && bugIdx > -1) {
      res.send("bug with ID: " + req.params.bugId + " Deleted")
    } else {
      res.status(400).send("Could not find bug with index: " + req.params.bugId)
    }
  } catch (err) {
    res.status(400).send(err)
  }
})

app.listen(3030, () => console.log("Server ready at port 3030"))
