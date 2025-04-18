import express from "express"
import multer from "multer"
import fs from "fs-extra"
import path from "path"
import {
    getAllCustomers,
    createCustomer,
    deleteCustomer,
    updateCustomer,
} from "../Controller/customerController.js"
import upload from "../utils/utils.js"

const router = express.Router()

router.get("/customers", getAllCustomers)

router.post(
    "/customers",
    upload.fields([
        {name: "frontImage", maxCount: 1},
        {name: "backImage", maxCount: 1},
    ]),
    createCustomer
)

router.delete("/customers/:id", deleteCustomer)

router.put(
    "/customers/:id",
    upload.fields([
        {name: "frontImage", maxCount: 1},
        {name: "backImage", maxCount: 1},
    ]),
    updateCustomer
)

export default router
