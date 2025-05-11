import Room from "../../types/room.type";
import { service as client } from "../service.service";

const api = `${import.meta.env.VITE_REACT_API}/rooms`;

interface ApiResponse<T> {
    data: T;
    status: number;
    error: any;
}

const getAllRoom = async (): Promise<ApiResponse<Room[]> | undefined> => {
    try {
        const response = await client.get(`${api}`);
        return {
            data: response.data,
            status: response.status,
            error: null,
        };
    } catch (err) {
        console.error(err);
        return {
            data: [],
            status: 500,
            error: err,
        };
    }
};

const getRoomsByFloorID = async (
    roomID: string
): Promise<ApiResponse<Room[]> | undefined> => {
    try {
        const response = await client.get(`${api}/${roomID}`);
        return {
            data: response.data, // chú ý: .data.data vì backend trả về { status, data }
            status: response.status,
            error: null,
        };
    } catch (err) {
        console.error(err);
        return {
            data: [],
            status: 500,
            error: err,
        };
    }
};

const addRoom = async (room: Room): Promise<Room | undefined> => {
    try {
        const response = await client.post(api, room);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm phòng:", error);
    }
};

const updateRoom = async (
    room_ID: number | string,
    room_Data: Partial<Room>
): Promise<Room | undefined> => {
    try {
        const response = await client.put(`${api}/${room_ID}`, room_Data);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật phòng:", error);
    }
};

const deleteRoom = async (
    room_ID: number | string
): Promise<{ message: string } | undefined> => {
    try {
        const response = await client.delete(`${api}/${room_ID}`);
        return response.data;
    } catch (err) {
        console.error("Lỗi khi xóa phòng:", err);
    }
};

export { getAllRoom, addRoom, updateRoom, deleteRoom, getRoomsByFloorID };
