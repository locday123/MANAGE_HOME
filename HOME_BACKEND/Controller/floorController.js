import {log} from "console"
import Floor from "../Model/FloorModel.js"
import Home from "../Model/HomeModel.js" // Nếu cần lấy thông tin nhà liên quan

// Lấy tất cả các tầng
const getAllFloors = async (req, res) => {
    try {
        const floors = await Floor.findAll({
            include: [{model: Home, attributes: ["home_ID", "home_Address"]}],
        })
        res.status(200).json({
            status: 200,
            data: floors,
        })
    } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách tầng:", error)
        res.status(500).json({message: "Lỗi máy chủ", error})
    }
}

// Tạo tầng mới
const createFloor = async (req, res) => {
    try {
        const floor = await Floor.create(req.body)
        res.status(201).json({
            message: "✅ Tạo tầng thành công",
            data: floor,
        })
    } catch (error) {
        console.error("❌ Lỗi khi tạo tầng:", error)
        res.status(500).json({message: "Lỗi tạo tầng", error})
    }
}

// Xóa tầng
const deleteFloor = async (req, res) => {
    const {id} = req.params

    try {
        const deleted = await Floor.destroy({
            where: {floor_ID: id},
        })

        if (deleted) {
            res.json({message: "✅ Đã xóa tầng"})
        } else {
            res.status(404).json({message: "❌ Không tìm thấy tầng"})
        }
    } catch (error) {
        console.error("❌ Lỗi khi xóa tầng:", error)
        res.status(500).json({message: "Lỗi máy chủ", error})
    }
}

// Cập nhật thông tin tầng
const updateFloor = async (req, res) => {
    const {id} = req.params
    const data = req.body

    try {
        const [updated] = await Floor.update(data, {
            where: {floor_ID: id},
        })

        if (updated) {
            const updatedFloor = await Floor.findByPk(id)
            res.json({
                message: "✅ Cập nhật tầng thành công",
                data: updatedFloor,
            })
        } else {
            res.status(404).json({
                message: "❌ Không tìm thấy tầng để cập nhật",
            })
        }
    } catch (error) {
        console.error("❌ Lỗi cập nhật tầng:", error)
        res.status(500).json({message: "Lỗi máy chủ", error})
    }
}

// Lấy tất cả tầng theo home_ID
const getFloorsByHomeID = async (req, res) => {
    const {home_ID} = req.params

    try {
        const floors = await Floor.findAll({where: {home_ID: home_ID}})

        // ✅ Luôn trả 200, dù kết quả rỗng
        res.status(200).json({
            message: `✅ Danh sách tầng của nhà ${home_ID}`,
            data: floors,
        })
    } catch (error) {
        console.error("❌ Lỗi khi lấy tầng theo home_ID:", error)
        res.status(500).json({message: "Lỗi máy chủ", error})
    }
}

export {getAllFloors, createFloor, deleteFloor, updateFloor, getFloorsByHomeID}
