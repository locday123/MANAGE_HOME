import Room from "../Model/RoomModel.js";
import Floor from "../Model/FloorModel.js";

// Lấy tất cả phòng
const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.findAll({
            include: [{ model: Floor, attributes: ["floor_ID", "floor_Name"] }],
        });

        res.status(200).json({ status: 200, data: rooms });
    } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách phòng:", error);
        res.status(500).json({ message: "Lỗi máy chủ", error });
    }
};

// Lấy phòng theo floor_ID
const getRoomsByFloorID = async (req, res) => {
    const { floor_ID } = req.params;

    try {
        const rooms = await Room.findAll({ where: { floor_ID } });
        res.status(200).json({ status: 200, data: rooms });
    } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách phòng theo tầng:", error);
        res.status(500).json({ message: "Lỗi máy chủ", error });
    }
};

// Tạo phòng mới
const createRoom = async (req, res) => {
    try {
        const room = await Room.create(req.body);
        res.status(201).json({
            message: "✅ Tạo phòng thành công",
            data: room,
        });
    } catch (error) {
        console.error("❌ Lỗi khi tạo phòng:", error);
        res.status(500).json({ message: "Lỗi tạo phòng", error });
    }
};

// Xoá phòng
const deleteRoom = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Room.destroy({ where: { room_ID: id } });

        if (deleted) {
            res.json({ message: "✅ Đã xoá phòng" });
        } else {
            res.status(404).json({ message: "❌ Không tìm thấy phòng" });
        }
    } catch (error) {
        console.error("❌ Lỗi khi xoá phòng:", error);
        res.status(500).json({ message: "Lỗi máy chủ", error });
    }
};

// Cập nhật phòng
const updateRoom = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const [updated] = await Room.update(data, { where: { room_ID: id } });

        if (updated) {
            const updatedRoom = await Room.findByPk(id);
            res.json({
                message: "✅ Cập nhật phòng thành công",
                data: updatedRoom,
            });
        } else {
            res.status(404).json({
                message: "❌ Không tìm thấy phòng để cập nhật",
            });
        }
    } catch (error) {
        console.error("❌ Lỗi cập nhật phòng:", error);
        res.status(500).json({ message: "Lỗi máy chủ", error });
    }
};

export { createRoom, deleteRoom, getAllRooms, getRoomsByFloorID, updateRoom };
