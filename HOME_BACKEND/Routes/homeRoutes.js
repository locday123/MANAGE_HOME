import express from "express"
import {getAllHomes, createHome, deleteHome, updateHome} from "../Controller/homeController.js"

const router = express.Router()

// Định tuyến cho nhà thuê
router.get("/homes", getAllHomes)
router.post("/homes", createHome)
router.delete("/homes/:id", deleteHome)
router.put("/homes/:id", updateHome)

export default router
