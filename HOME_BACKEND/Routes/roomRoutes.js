import express from "express";
import {
    getAllRooms,
    getRoomsByFloorID,
    createRoom,
    updateRoom,
    deleteRoom,
} from "../Controller/roomController.js";

const router = express.Router();

// Các route đều bắt đầu với /rooms
router.get("/rooms", getAllRooms);
router.get("/rooms/floor/:floor_ID", getRoomsByFloorID);
router.post("/rooms", createRoom);
router.put("/rooms/:id", updateRoom);
router.delete("/rooms/:id", deleteRoom);

export default router;
