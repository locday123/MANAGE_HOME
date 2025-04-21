import Home from "../Model/HomeModel.js"
import Floor from "../Model/FloorModel.js"
import {Op} from "sequelize"

// Lấy tất cả nhà
const getAllHomes = async (req, res) => {
    try {
        const homes = await Home.findAll()
        res.json(homes) // Trả về tất cả nhà
    } catch (error) {
        console.error("❌ Lỗi khi lấy tất cả nhà:", error)
        res.status(500).json({message: "Có lỗi xảy ra"})
    }
}

// Tạo nhà mới
const createHome = async (req, res) => {
    try {
        const home = await Home.create(req.body)
        res.status(201).json(home)
    } catch (error) {
        console.error("❌ Lỗi tạo nhà:", error)
        res.status(500).json({message: "Lỗi tạo nhà", error})
    }
}

// Xóa nhà
const deleteHome = async (req, res) => {
    const {id} = req.params

    try {
        const deleted = await Home.destroy({
            where: {home_ID: id},
        })

        if (deleted) {
            res.json({message: "✅ Nhà đã được xóa"})
        } else {
            res.status(404).json({message: "❌ Không tìm thấy nhà"})
        }
    } catch (error) {
        console.error("❌ Lỗi khi xóa nhà:", error)
        res.status(500).json({message: "Lỗi máy chủ", error})
    }
}

// Cập nhật nhà

const updateHome = async (req, res) => {
    const {id} = req.params
    const data = req.body
    const newTotalFloors = Number(data.home_TotalFloors)

    try {
        const home = await Home.findByPk(id)
        if (!home) {
            return res.status(404).json({message: "❌ Không tìm thấy nhà"})
        }

        // Lấy toàn bộ tầng dưới dạng dữ liệu thuần (plain)
        const allFloors = await Floor.findAll({where: {home_ID: id}})
        const floorPlainList = allFloors.map((f) => f.get({plain: true}))

        const currentTotalFloors = floorPlainList.length
        const expectedTotalFloors = Math.max(1, newTotalFloors) // luôn giữ lại ít nhất 1 tầng

        // Tìm tầng trệt
        const floorGround = floorPlainList.find((f) => f.floor_Name.toLowerCase().includes("trệt"))

        // Lọc ra các tầng còn lại và parse số tầng từ tên
        const otherFloors = floorPlainList
            .filter((f) => f.floor_ID !== floorGround?.floor_ID)
            .map((f) => ({
                ...f,
                floorNumber: parseInt(f.floor_Name.replace(/[^\d]/g, ""), 10),
            }))
            .filter((f) => !isNaN(f.floorNumber))
            .sort((a, b) => b.floorNumber - a.floorNumber) // cao → thấp

        const numToDelete = currentTotalFloors - expectedTotalFloors

        console.log("📌 Tổng tầng hiện tại:", currentTotalFloors)
        console.log("📌 Tổng tầng mới:", expectedTotalFloors)
        console.log("📌 Cần xóa:", numToDelete)

        if (numToDelete > 0) {
            const floorsToDelete = otherFloors.slice(0, numToDelete)
            const deleteIDs = floorsToDelete.map((f) => f.floor_ID)

            console.log(
                "🗑 Xóa tầng:",
                floorsToDelete.map((f) => f.floor_Name)
            )

            if (deleteIDs.length > 0) {
                await Floor.destroy({
                    where: {
                        floor_ID: {[Op.in]: deleteIDs},
                    },
                })
            }
        }

        // Cập nhật thông tin nhà
        await home.update(data)

        const updatedHome = await Home.findByPk(id)
        res.json(updatedHome)
    } catch (error) {
        console.error("❌ Lỗi cập nhật nhà:", error)
        res.status(500).json({message: "Lỗi máy chủ", error})
    }
}

export {getAllHomes, createHome, deleteHome, updateHome}
