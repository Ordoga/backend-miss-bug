import express from "express"
import cors from "cors"
import { bugService } from "./services/bug-service.js"

const app = express()

const corsOptions = {
    origin: [
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://localhost:3000",
    ],
    credentials: true,
}

app.use(express.static("public"))
app.use(cors(corsOptions))

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
            description: req.query.description,
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
        res.send("Could not find you bug")
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

const port = process.env.PORT || 3030

app.listen(port, () => console.log("Server ready at port 3030"))
