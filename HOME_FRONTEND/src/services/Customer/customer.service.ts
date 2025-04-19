import Customer from "../../types/customer.type";
import { service } from "../service.service";
let api = `${import.meta.env.VITE_REACT_API}/customers`;

// Định nghĩa kiểu dữ liệu cho response từ API
interface ApiResponse<T> {
    data: T;
    status: number;
    error: any;
}

// Lấy tất cả khách hàng
const getAllCustomer = async (): Promise<ApiResponse<Customer[]>> => {
    try {
        const response = await service.get(`${api}`);
        return response.data; // Trả về dữ liệu từ API, giả sử là { data: Customer[] }
    } catch (err) {
        console.error("Lỗi khi gọi API getAllCustomer:", err);
        throw err; // Ném lỗi để có thể xử lý ở nơi gọi
    }
};

// Thêm khách hàng mới
const addCustomer = async (
    customerData: Customer | FormData
): Promise<Customer | null> => {
    try {
        const isFormData = customerData instanceof FormData;

        const response = await service.post(`${api}`, customerData, {
            headers: {
                "Content-Type": isFormData
                    ? "multipart/form-data"
                    : "application/json",
            },
        });

        return response.data; // Trả về đối tượng Customer vừa được thêm
    } catch (error) {
        console.log("Lỗi khi gọi API addCustomer:", error);
        return null;
    }
};

// Cập nhật thông tin khách hàng

const updatedCustomer = async (
    customerID: string,
    customerData: Partial<Customer> | FormData
): Promise<Customer | null> => {
    try {
        const response = await service.put(
            `${api}/${customerID}`,
            customerData,
            {
                headers:
                    customerData instanceof FormData
                        ? { "Content-Type": "multipart/form-data" }
                        : undefined,
            }
        );
        return response.data;
    } catch (error) {
        console.error("❌ Lỗi khi gọi API updatedCustomer:", error);
        return null;
    }
};

// Xóa khách hàng
const deleteCustomer = async (userID: string): Promise<boolean> => {
    try {
        const response = await service.delete(`${api}/${userID}`);

        // Kiểm tra nếu xóa thành công, có thể dùng `response.data` thay vì chỉ `status`
        if (response.status === 200 || response.data?.success) {
            return true; // Trả về true nếu xóa thành công
        }

        return false; // Trả về false nếu xóa thất bại
    } catch (err) {
        console.log("Lỗi khi gọi API deleteACustomer:", err);
        return false; // Trả về false nếu có lỗi
    }
};

export { getAllCustomer, addCustomer, deleteCustomer, updatedCustomer };
