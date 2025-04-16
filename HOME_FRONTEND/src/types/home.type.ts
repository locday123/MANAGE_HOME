type Home = {
    home_ID: string; // ID nhà, kiểu string với độ dài tối đa 20 ký tự.
    home_Province: string; // Tỉnh, kiểu string (tối đa 10 ký tự).
    home_District: string; // Quận, kiểu string (tối đa 10 ký tự).
    home_Ward: string; // Phường, kiểu string (tối đa 10 ký tự).
    home_Address: string; // Địa chỉ nhà, kiểu string (tối đa 50 ký tự).
    home_RentalPrice: bigint; // Giá thuê nhà, kiểu bigint.
    home_HostID: string; // ID chủ nhà, kiểu string (tối đa 12 ký tự).
    home_HostName: string; // Tên chủ nhà, kiểu string (tối đa 255 ký tự).
    home_HostPhoneNumber: string; // Số điện thoại chủ nhà, kiểu string (10 ký tự).
    home_ContractFrom: string; // Ngày bắt đầu hợp đồng, kiểu string (theo định dạng `YYYY-MM-DD`).
    home_ContractTo: string; // Ngày kết thúc hợp đồng, kiểu string (theo định dạng `YYYY-MM-DD`).
    home_HostSignature: string; // Chữ ký của chủ nhà trong hợp đồng, kiểu string.
    home_TotalFloors: number; // Tổng số tầng nhà, kiểu số nguyên (integer).
    home_Status: "ACTIVE" | "INACTIVE"; // Trạng thái nhà, có thể là 'ACTIVE' hoặc 'INACTIVE'.
    created_at: string; // Thời gian tạo thông tin nhà, kiểu string (theo định dạng ISO 8601).
};

export default Home;
