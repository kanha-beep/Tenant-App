import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const key = process.env.JWT_SECRET;
app.use(cors({
    origin: ["https://tenant-app-thle.vercel.app","http://localhost:5173"],
    credentials: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

async function mongooseConnect() {
    await mongoose.connect(`${MONGO_URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log("mongoose connected")
}
mongooseConnect();
//auth
import NotesAuth from "./NotesAuth/NotesAuth.js";
app.use("/api/notes/auth", NotesAuth);
//notes admin + user
import NotesRoutes from "./NotesRoutes/NotesRoutes.js";
app.use("/api/notes", NotesRoutes);
//admin   /api/admin
import AdminRoutes from "./NotesRoutes/AdminRoutes.js"
app.use("/api/admin", AdminRoutes)
//health
app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
})
app.listen(PORT, () => {
    console.log(`listening port ${PORT}`)
})