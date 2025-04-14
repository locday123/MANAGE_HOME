import { client } from "../Service";
let linkApi = `${import.meta.env.VITE_REACT_API}/floors`;

const getAllFloors = async () => {
    try {
        const response = await client.get(`${linkApi}`);
        return response.data;
    } catch (err) {
        console.error("Lỗi khi gọi API getAllFloors:", err);
        return {
            status: err?.response?.status || 500,
            data: null,
            error: err,
        };
    }
};

// Get floors by home_ID
const getFloorsByHome = async (homeID) => {
    try {
        const response = await client.get(`${linkApi}/${homeID}`);
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi gọi API getFloorsByHome:", error);
        return {
            status: error?.response?.status || 500,
            data: null,
            error,
        };
    }
};

const addFloor = async (floorData) => {
    try {
        const response = await client.post(`${linkApi}`, floorData);
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi thêm tầng:", error);
    }
};

const updateFloor = async (floorID, updatedData) => {
    try {
        const response = await client.put(`${linkApi}/${floorID}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi cập nhật tầng:", error);
    }
};

const deleteFloor = async (floorID) => {
    try {
        const response = await client.delete(`${linkApi}/${floorID}`);
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi xóa tầng:", error);
    }
};

// Tạo nhiều tầng cho home (gọi thủ công)
const createFloorsForHome = async (home_ID, totalFloors) => {
    try {
        const response = await client.post(`${linkApi}/${home_ID}`, {
            totalFloors,
        });
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi tạo tầng:", error);
        return {
            status: error?.response?.status || 500,
            error: error?.response?.data?.message || "Lỗi máy chủ",
        };
    }
};

export {
    getAllFloors,
    getFloorsByHome,
    addFloor,
    updateFloor,
    deleteFloor,
    createFloorsForHome,
};
