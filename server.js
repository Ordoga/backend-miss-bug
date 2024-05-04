import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'
import { bugRoutes } from "./api/bug/bug.routes.js"
import { userRoutes } from "./api/user/user.routes.js"

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
app.use(cookieParser())


app.use('/api/bug', bugRoutes)
app.use('/api/user', userRoutes)

const port = process.env.PORT || 3030

app.listen(port, () => console.log("Server ready at port 3030"))
