import multer from "multer"
import path from "path"
import fs from "fs"
import {fileURLToPath} from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Tạo thư mục nếu chưa có
const createDirectoryIfNotExists = (directory) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, {recursive: true})
    }
}

// Cấu hình Multer: nơi lưu trữ file, tên file và kiểm tra loại file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const customerId = req.params.id || req.body.customer_ID // Lấy customer ID từ URL hoặc body
        const uploadDir = path.join(__dirname, "../uploads/Images_CCCD", customerId)

        // Tạo thư mục nếu chưa có
        createDirectoryIfNotExists(uploadDir)
        cb(null, uploadDir) // Đặt thư mục lưu trữ file
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname) // lấy đuôi .jpg, .png,...
        const customerId = req.params.id || req.body.customer_ID

        // Phân biệt file mặt trước / mặt sau
        const isFront = file.fieldname === "frontImage"
        const prefix = isFront ? "front" : "back"

        cb(null, `${customerId}_${prefix}${ext}`)
    },
})

// Tạo middleware Multer với kiểm tra loại file
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        console.log(req.file)
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error("File không hợp lệ! Chỉ cho phép file ảnh (JPEG, PNG, JPG)"), false)
        }
    },
})

export default upload
export {createDirectoryIfNotExists}
