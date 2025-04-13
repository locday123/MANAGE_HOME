import express from "express"
import {
    getAllCustomers,
    createCustomer,
    deleteCustomer,
    updateCustomer,
} from "../Controller/customerController.js"
import Customer from "../Model/Customer.js"

const router = express.Router()

// Định tuyến lấy tất cả khách hàng
router.get("/customers", getAllCustomers)
router.post("/customers", createCustomer)
router.delete("/customers/:id", deleteCustomer)
router.put("/customers/:id", updateCustomer)

export default router
