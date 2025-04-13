import Home from "../Model/HomeModel.js"

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

    try {
        const [updated] = await Home.update(data, {
            where: {home_ID: id},
        })

        if (updated) {
            const updatedHome = await Home.findByPk(id)
            res.json(updatedHome)
        } else {
            res.status(404).json({message: "❌ Không tìm thấy nhà để cập nhật"})
        }
    } catch (error) {
        console.error("❌ Lỗi cập nhật nhà:", error)
        res.status(500).json({message: "Lỗi máy chủ", error})
    }
}

export {getAllHomes, createHome, deleteHome, updateHome}
