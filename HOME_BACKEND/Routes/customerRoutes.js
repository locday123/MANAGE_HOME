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

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const customerID = req.body.customer_ID

        if (!customerID) {
            return cb(new Error("customer_ID is required"), false)
        }

        const uploadFolder = path.join(__dirname, "../uploads", "Images_CCCD", customerID)

        fs.ensureDirSync(uploadFolder)

        cb(null, uploadFolder)
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const fileName = `${req.body.customer_ID}_${file.fieldname}${ext}`
        cb(null, fileName)
    },
})

const upload = multer({storage: storage})

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
