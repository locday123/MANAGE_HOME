import Home from "../../types/home.type";
import { service as client } from "../service.service";

const api = `${import.meta.env.VITE_REACT_API}/homes`;

interface ApiResponse<T> {
    data: T;
    status: number;
    error: any;
}

const getAllHome = async (): Promise<ApiResponse<Home[]> | undefined> => {
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

const addHome = async (home: Home): Promise<Home | undefined> => {
    try {
        const response = await client.post(api, home);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm nhà:", error);
    }
};

const updateHome = async (
    home_ID: number | string,
    home_Data: Partial<Home>
): Promise<Home | undefined> => {
    try {
        const response = await client.put(`${api}/${home_ID}`, home_Data);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật nhà:", error);
    }
};

const deleteHome = async (
    home_ID: number | string
): Promise<{ message: string } | undefined> => {
    try {
        const response = await client.delete(`${api}/${home_ID}`);
        return response.data;
    } catch (err) {
        console.error("Lỗi khi xóa nhà:", err);
    }
};

export { getAllHome, addHome, updateHome, deleteHome };
