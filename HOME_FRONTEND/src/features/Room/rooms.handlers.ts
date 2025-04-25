import { deleteRoom } from "../../services/Room/room.service";
import Rooms from "../../types/room.type";

export const handleDeleteRooms = async (
    rooms: Rooms,
    setRooms: React.Dispatch<React.SetStateAction<Rooms[]>>
) => {
    try {
        await deleteRoom(rooms.room_ID); // Xóa tầng
        setRooms((prev) => prev.filter((f) => f.room_ID !== rooms.room_ID));
    } catch (error) {
        console.error("Lỗi khi xóa tầng:", error);
    }
};
