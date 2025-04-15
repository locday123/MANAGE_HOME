import express from "express"
import {
    getAllFloors,
    createFloor,
    deleteFloor,
    updateFloor,
    getFloorsByHomeID,
    createFloorsForHome,
} from "../Controller/floorController.js"

const router = express.Router()

router.get("/floors/", getAllFloors)
router.get("/floors/:home_ID", getFloorsByHomeID)
router.post("/floors/", createFloor)
router.post("/floors/:home_ID", createFloorsForHome)
router.put("/floors/:id", updateFloor)
router.delete("/floors/:id", deleteFloor)

export default router
