type Floor = {
    floor_ID: string; // ID tầng, kiểu string (tối đa 20 ký tự).
    home_ID: string; // ID nhà (liên kết với bảng HOME), kiểu string (tối đa 20 ký tự).
    floor_Name: string; // Tên tầng, kiểu string (tối đa 10 ký tự).
    floor_TotalRooms: number; // Tổng số phòng, kiểu số nguyên (integer).
    created_at: string; // Thời gian tạo thông tin tầng, kiểu string (theo định dạng ISO 8601).
};

export default Floor;
