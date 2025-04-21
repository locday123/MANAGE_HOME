import Floor from "../Model/FloorModel.js"
import Home from "../Model/HomeModel.js" // Nếu cần lấy thông tin nhà liên quan

// Lấy tất cả các tầng
const getAllFloors = async (req, res) => {
    try {
        const floors = await Floor.findAll({
            include: [{model: Home}],
        })
        res.json(floors) // Trả về tất cả nhà
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
        const floors = await Floor.findAll({
            where: {home_ID},
        })

        const sortedFloors = floors.sort((a, b) => {
            const getIndex = (name) => {
                if (!name) return Infinity
                if (name.toLowerCase().includes("trệt")) return 0
                const match = name.match(/\d+/)
                return match ? parseInt(match[0]) : Infinity
            }

            return getIndex(a.floor_Name) - getIndex(b.floor_Name)
        })

        res.status(200).json(sortedFloors)
    } catch (err) {
        res.status(500).json({
            message: "Lỗi khi lấy danh sách tầng",
            error: err,
        })
    }
}

const createFloorsForHome = async (req, res) => {
    const {home_ID} = req.params
    const {totalFloors = 1} = req.body

    if (!home_ID) {
        return res.status(400).json({message: "Thiếu mã nhà (home_ID)"})
    }

    if (totalFloors < 1) {
        return res.status(400).json({message: "Số tầng phải >= 1"})
    }

    try {
        const home = await Home.findByPk(home_ID)

        if (!home) {
            return res.status(404).json({message: "❌ Không tìm thấy nhà"})
        }

        const maxFloors = home.home_TotalFloors

        // Danh sách các tầng hiện có
        const existingFloors = await Floor.findAll({where: {home_ID}})
        const existingNames = existingFloors.map((f) => f.floor_Name)

        const currentCount = existingNames.length

        if (currentCount >= maxFloors) {
            return res.status(400).json({
                message: `❌ Đã đủ số tầng (${maxFloors}) theo thông tin nhà.`,
            })
        }

        // Nếu thêm vào sẽ vượt quá giới hạn
        const canAdd = maxFloors - currentCount
        const floorsToCreate = Math.min(canAdd, totalFloors)

        const newFloors = []
        let index = 0

        while (newFloors.length < floorsToCreate) {
            const name = index === 0 ? "Tầng trệt" : `Tầng ${index}`
            if (!existingNames.includes(name)) {
                newFloors.push({home_ID, floor_Name: name})
            }
            index++
        }

        const created = await Floor.bulkCreate(newFloors)

        res.status(201).json(created)
    } catch (error) {
        console.error("❌ Lỗi khi tạo tầng:", error)
        res.status(500).json({message: "Lỗi máy chủ", error})
    }
}

export {getAllFloors, createFloor, deleteFloor, updateFloor, getFloorsByHomeID, createFloorsForHome}
