type Room = {
    room_ID: string; // ID phòng, kiểu string (tối đa 20 ký tự).
    floor_ID: string; // ID tầng (liên kết với bảng FLOOR), kiểu string (tối đa 20 ký tự).
    room_Name: string; // Tên phòng, kiểu string (tối đa 50 ký tự).
    room_Area: string; // Diện tích phòng, kiểu string (tối đa 50 ký tự).
    room_Status:
        | "AVAILABLE"
        | "OCCUPIED"
        | "MAINTENANCE"
        | "INACTIVE"
        | "ACTIVE"; // Trạng thái phòng.
    created_at: string; // Thời gian tạo phòng, kiểu string (theo định dạng ISO 8601).
};

export default Room;
