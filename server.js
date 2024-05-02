import express from "express"
import cors from "cors"
import { bugRoutes } from "./api/bug/bug.routes.js"

const app = express()

const corsOptions = {
    origin: [
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://localhost:3000",
        "https://backend-miss-bug.onrender.com",
    ],
    credentials: true,
}

app.use(express.static("public"))
app.use(cors(corsOptions))
app.use(express.json())

app.use('/api/bug', bugRoutes)

const port = process.env.PORT || 3030

app.listen(port, () => console.log("Server ready at port 3030"))
