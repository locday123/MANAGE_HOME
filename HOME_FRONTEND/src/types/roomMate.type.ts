type RoomMate = {
    contract_rentID: string; // Mã hợp đồng thuê, kiểu string (tối đa 20 ký tự).
    customer_ID: string; // Mã khách hàng ở cùng phòng, kiểu string (tối đa 30 ký tự).
    roommate_Status: "ACTIVE" | "LEFT"; // Trạng thái của bạn cùng phòng: 'ACTIVE' - Đang ở, 'LEFT' - Đã rời đi.
    created_at: string; // Thời điểm thêm vào danh sách, kiểu string (theo định dạng ISO 8601).
};

export default RoomMate;
