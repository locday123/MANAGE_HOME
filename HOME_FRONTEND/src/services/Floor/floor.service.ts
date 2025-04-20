import Floor from "../../types/floor.type";
import { service as client } from "../service.service";

const api = `${import.meta.env.VITE_REACT_API}/floors`;

interface ApiResponse<T> {
    data: T;
    status: number;
    error: any;
}

const getAllFloor = async (): Promise<ApiResponse<Floor[]> | undefined> => {
    try {
        const response = await client.get(api);
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

const getFloorsByHomeID = async (
    homeId: string
): Promise<ApiResponse<Floor[]> | undefined> => {
    try {
        const response = await client.get(`${api}/${homeId}`);
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

const addFloor = async (floor: Floor): Promise<Floor | undefined> => {
    try {
        const response = await client.post(api, floor);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm tầng:", error);
    }
};

const updateFloor = async (
    floor_ID: number | string,
    floor_Data: Partial<Floor>
): Promise<Floor | undefined> => {
    try {
        const response = await client.put(`${api}/${floor_ID}`, floor_Data);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật tầng:", error);
    }
};

const deleteFloor = async (
    floor_ID: number | string
): Promise<{ message: string } | undefined> => {
    try {
        const response = await client.delete(`${api}/${floor_ID}`);
        return response.data;
    } catch (err) {
        console.error("Lỗi khi xóa tầng:", err);
    }
};

const createFloorsForHome = async (
    home_ID: string,
    totalFloors: number
): Promise<ApiResponse<Floor[]>> => {
    try {
        const response = await client.post<Floor[]>(`${api}/${home_ID}`, {
            totalFloors,
        });

        return {
            data: response.data,
            status: response.status,
            error: null,
        };
    } catch (error: any) {
        console.error("❌ Lỗi khi tạo tầng:", error);
        return {
            data: [] as Floor[],
            status: error?.response?.status || 500,
            error: error?.response?.data?.message || "Lỗi máy chủ",
        };
    }
};

export {
    getAllFloor,
    getFloorsByHomeID,
    addFloor,
    updateFloor,
    deleteFloor,
    createFloorsForHome,
};
