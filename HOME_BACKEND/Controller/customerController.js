import Customer from "../Model/CustomerModel.js"
import fs from "fs"
import path from "path"
import {fileURLToPath} from "url"
import {dirname} from "path"
import {createDirectoryIfNotExists} from "../utils/utils.js" // Import hàm kiểm tra và tạo thư mục

// Định nghĩa __dirname trong ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Hàm xử lý upload ảnh
const handleImageUpload = (customerId, imageBuffer, imageName, oldImagePath = null) => {
    const imageDir = path.join(__dirname, "../uploads/Images_CCCD", customerId) // Lấy đường dẫn thư mục của khách hàng
    createDirectoryIfNotExists(imageDir) // Tạo thư mục nếu chưa có
    const imagePath = path.join(imageDir, imageName) // Đường dẫn ảnh

    // Xóa ảnh cũ nếu có
    if (oldImagePath) {
        const oldImageFullPath = path.join(__dirname, oldImagePath.replace("/uploads", "")) // Tạo đường dẫn đầy đủ cho ảnh cũ
        if (fs.existsSync(oldImageFullPath)) {
            fs.unlinkSync(oldImageFullPath) // Xóa ảnh cũ
        }
    }

    // Lưu file ảnh vào thư mục đã tạo
    fs.writeFileSync(imagePath, imageBuffer)
    return `/uploads/Images_CCCD/${customerId}/${imageName}` // Trả về đường dẫn ảnh
}

// Lấy tất cả khách hàng
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll()
        res.json({
            status: 200,
            data: customers,
        }) // Trả về tất cả khách hàng
    } catch (error) {
        console.error("❌ Lỗi khi lấy tất cả khách hàng:", error)
        res.status(500).json({message: "Có lỗi xảy ra"})
    }
}

// Tạo khách hàng mới
const createCustomer = async (req, res) => {
    try {
        const {
            customer_ID,
            customer_Name,
            customer_Sex,
            customer_PhoneNumber,
            customer_Date,
            customer_Status,
        } = req.body

        // Nếu có ảnh mặt trước và mặt sau
        const frontImage = req.files?.frontImage
            ? `/uploads/Images_CCCD/${customer_ID}/${req.files.frontImage[0].filename}`
            : null
        const backImage = req.files?.backImage
            ? `/uploads/Images_CCCD/${customer_ID}/${req.files.backImage[0].filename}`
            : null

        // Tạo khách hàng mới
        const newCustomer = new Customer({
            customer_ID,
            customer_Name,
            customer_Sex,
            customer_PhoneNumber,
            customer_Date,
            customer_Status,
            customer_FrontImage: frontImage,
            customer_BackImage: backImage,
        })

        // Lưu khách hàng vào database
        await newCustomer.save()

        res.status(201).json({
            message: "Khách hàng đã được tạo thành công",
            customer: newCustomer,
        })
    } catch (error) {
        res.status(500).json({message: "Đã có lỗi xảy ra khi tạo khách hàng", error: error.message})
    }
}

// Xóa khách hàng
const deleteCustomer = async (req, res) => {
    const {id} = req.params

    try {
        const customer = await Customer.findByPk(id)

        if (!customer) {
            return res.status(404).json({message: "❌ Không tìm thấy khách hàng để xóa"})
        }

        // Xóa ảnh liên quan
        const frontImagePath = customer.customer_FrontImage
            ? customer.customer_FrontImage.replace("/uploads", "")
            : null
        const backImagePath = customer.customer_BackImage
            ? customer.customer_BackImage.replace("/uploads", "")
            : null

        if (frontImagePath && fs.existsSync(path.join(__dirname, frontImagePath))) {
            fs.unlinkSync(path.join(__dirname, frontImagePath)) // Xóa ảnh mặt trước
        }
        if (backImagePath && fs.existsSync(path.join(__dirname, backImagePath))) {
            fs.unlinkSync(path.join(__dirname, backImagePath)) // Xóa ảnh mặt sau
        }

        // Xóa khách hàng khỏi database
        const deleted = await Customer.destroy({
            where: {customer_ID: id},
        })

        if (deleted) {
            res.json({message: "✅ Khách hàng đã được xóa"})
        } else {
            res.status(404).json({message: "❌ Không tìm thấy khách hàng để xóa"})
        }
    } catch (error) {
        console.error("❌ Lỗi khi xóa khách hàng:", error)
        res.status(500).json({message: "Lỗi máy chủ", error})
    }
}

// Cập nhật khách hàng
const updateCustomer = async (req, res) => {
    const {id} = req.params
    const data = {
        customer_ID: req.body.customer_ID,
        customer_Name: req.body.customer_Name,
        customer_Sex: req.body.customer_Sex,
        customer_PhoneNumber: req.body.customer_PhoneNumber,
        customer_Date: req.body.customer_Date,
        customer_Status: req.body.customer_Status,
    }

    try {
        const customer = await Customer.findByPk(id)

        if (!customer) {
            return res.status(404).json({
                message: "❌ Không tìm thấy khách hàng để cập nhật",
            })
        }

        const frontImageFile = req.files?.frontImage?.[0]
        const backImageFile = req.files?.backImage?.[0]

        if (frontImageFile) {
            const oldFrontPath = customer.customer_FrontImage
            data.customer_FrontImage = `/uploads/Images_CCCD/${customer.customer_ID}/${frontImageFile.filename}`
            if (oldFrontPath) {
                const fullOldFront = path.join(__dirname, "..", oldFrontPath)
                if (fs.existsSync(fullOldFront)) fs.unlinkSync(fullOldFront)
            }
        }

        if (backImageFile) {
            const oldBackPath = customer.customer_BackImage
            data.customer_BackImage = `/uploads/Images_CCCD/${customer.customer_ID}/${backImageFile.filename}`
            if (oldBackPath) {
                const fullOldBack = path.join(__dirname, "..", oldBackPath)
                if (fs.existsSync(fullOldBack)) fs.unlinkSync(fullOldBack)
            }
        }

        await Customer.update(data, {
            where: {customer_ID: id},
        })

        const updatedCustomer = await Customer.findByPk(id)
        res.json(updatedCustomer)
    } catch (error) {
        console.error("❌ Lỗi cập nhật khách hàng:", error)
        res.status(500).json({message: "Lỗi máy chủ", error})
    }
}

export {getAllCustomers, createCustomer, deleteCustomer, updateCustomer}
