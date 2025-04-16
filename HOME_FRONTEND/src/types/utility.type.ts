type Utility = {
    utility_ID: number; // ID tiện ích, kiểu number (tự động tăng).
    utility_Name: string; // Tên tiện ích, kiểu string.
    utility_Description?: string | null; // Mô tả tiện ích, kiểu string, có thể là null.
    created_at: string; // Thời gian tạo tiện ích, kiểu string (theo định dạng ISO 8601).
};

export default Utility;
